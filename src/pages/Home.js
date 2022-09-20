import React, { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getLithoContract } from "../utils/contractFunctions";
import { notify } from "../utils/notifyFunctions";
import price from "../contracts/price.json";

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
  const [rate, setRate] = useState(null);

  const getPrice = async () => {
    if (!isConnected) {
      return;
    }
    const contract = await getLithoContract(isConnected);
    const _rate = await contract.methods.getBnbUsd().call();
    return _rate;
  }

  // const getUsdPrice = async () => {
  //   if (!isConnected) {
  //     return;
  //   }
  //   const contract = await getLithoContract(isConnected);
  //   const price = await contract.methods.salePrice_usd(1).call();
  //   return price;
  // }

  const randomMint = async () => {
    if (!isConnected) {
      notify(1, "Wallet not connected");
      return;
    }
    const contract = await getLithoContract(isConnected);
    const price = await contract.methods.convertBnbUsd(300*1e6).call();
    console.log(price);
    try {
      await contract.methods.randomMint(address, true).send({ from: address, value: price });
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
  }, [isConnected])

  useEffect(() => {
    setInterval(async () => {
      const _rate = await getPrice();
      setRate(_rate);
      // const _priceUsd = await getUsdPrice();
      // setPriceUsd(_priceUsd);
      console.log(_rate);
    }, 1000)
  }, [isConnected])

  return (
    <div className="home">
      <div className="title">FINESSE GENESIS NFT MINT</div>
      <div className="content">
        <div className="price">
          {
            rate
            ?`1 BNB = ${(rate/1e8).toFixed(3)} $` 
            : null
          }
          
        </div>
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