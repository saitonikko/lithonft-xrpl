import Web3 from "web3";
import contracts from "../contracts/contracts.json";

const web3 = new Web3(window.ethereum);

export const getLithoContract = async (isConnected) => {
    if(!isConnected) return;
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if(networkId == 56) {
        const _lithoContract = await _getContract(contracts.Litho.mainnet);
        return _lithoContract;
    }
    if(networkId == 97) {
        const _lithoContract = await _getContract(contracts.Litho.testnet);
        return _lithoContract;
    }
}

const _getContract = async ({address, abi}) => {
    const _contract = await new web3.eth.Contract(abi, address);
    return _contract;
}