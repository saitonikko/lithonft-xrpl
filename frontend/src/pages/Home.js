import React, { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getLithoContract } from "../utils/contractFunctions";
import { notify } from "../utils/notifyFunctions";

const responsive = {
  0: { items: 1 },
  900: { items: 2 },
  1920: { items: 3 },
};



export default function Home({ setPage }) {

  const { address, isConnected } = useAccount();

  const [nftData, setNFTData] = useState([]);

  const getNftData = async () => {
    const contract = await getLithoContract(isConnected);
    console.log(contract);
    const mintable = await contract.methods.getMintables().call();
    const baseUri = await contract.methods.BASE_URI().call();
    let _nftData = []
    for (let i of mintable) {
      const nft = `${baseUri}${i}.json`;
      const response = await fetch(nft);
      const json = await response.json();
      _nftData.push(json.image);
    }
    setNFTData(_nftData);
  };

  const getPrice = async () => {
    const contract = await getLithoContract(isConnected);
    const price = await contract.methods.getSalePriceEth().call();
    return price;
  }

  const randomMint = async () => {
    const contract = await getLithoContract(isConnected);
    const price = await getPrice();
    console.log(price);
    try {
      await contract.methods.randomMint(address).send({ from: address, value: price });
      notify(0, "Successfully minted!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
      notify(2, "Something went wrong!");
    }
  }

  useEffect(() => {
    getNftData();
  }, []);

  const items = nftData.map((data, index) => {
    return (
      <img src={data} alt={index} />
    );
  });

  useEffect(() => {
    setPage(0);
  }, [])

  return (
    <div className="home">
      <div className="title">FINESSE GENESIS NFT MINT</div>
      <div className="content">
        <div className="nft-list">
          <AliceCarousel mouseTracking items={items} responsive={responsive} />
        </div>
        <div className="btn-container">
          <button className="mint-btn" onClick={randomMint}>MINT NOW</button>
        </div>
      </div>
    </div>
  )
}
