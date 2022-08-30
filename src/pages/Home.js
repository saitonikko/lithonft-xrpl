import React, { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getLithoContract } from "../utils/contractFunctions";
import { notify } from "../utils/notifyFunctions";

import nft1 from "../assets/img/1.png";
import nft2 from "../assets/img/2.png";
import nft3 from "../assets/img/3.png";
import nft4 from "../assets/img/4.png";
import nft5 from "../assets/img/5.png";
import nft6 from "../assets/img/6.png";
import nft7 from "../assets/img/7.png";
import nft8 from "../assets/img/8.png";

const responsive = {
  0: { items: 1 },
  900: { items: 2 },
  1920: { items: 3 },
};

const imgData = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8];

export default function Home({ setPage, network, setNetwork, account }) {

  const { address, isConnected } = useAccount();

  const getPrice = async () => {
    const contract = await getLithoContract(isConnected);
    const price = await contract.methods.getSalePriceEth().call();
    return price;
  }

  const randomMint = async () => {
    if (!isConnected) {
      notify(1, "Wallet not connected");
      return;
    }
    const contract = await getLithoContract(isConnected);
    const price = await getPrice();
    console.log(price);
    try {
      await contract.methods.randomMint(address).send({ from: address, value: price });
      notify(0, "Successfully minted!");
    } catch (err) {
      console.log(err);
      notify(2, "Something went wrong!");
    }
  }

  const signAndMint = () => {
    if (!account?.address) {
      notify(1, "Wallet not connected");
      return;
    }
    try {
      fetch("http://localhost:8080/mint", { method: "POST" })
        .then((res) => res.json())
        .then((data) => window.open(data.url, '_blank'));
    } catch (err) {
      console.log(err);
      notify(2, "Something went wrong!");
    }
  }

  const items = imgData.map((data, index) => {
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
      <div className="network">
        <div className="net-select">
          <input type="radio" checked={network === 0} onChange={() => setNetwork(0)}></input>
          <span>BSC</span>
        </div>
        <div className="net-select">
          <input type="radio" className="net-select" checked={network === 1} onChange={() => setNetwork(1)}></input>
          <span>XRPL</span>
        </div>
      </div>
      <div className="content">
        <div className="nft-list">
          <AliceCarousel mouseTracking items={items} responsive={responsive} />
        </div>
        <div className="btn-container">
          <button className="mint-btn" onClick={network === 0 ? randomMint : signAndMint}>MINT NOW</button>
        </div>
      </div>
    </div>
  )
}
