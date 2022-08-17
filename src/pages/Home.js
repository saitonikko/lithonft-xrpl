import React, { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import img1 from "../assets/img/1.jpg";
import img2 from "../assets/img/2.jpg";
import img3 from "../assets/img/3.jpg";
import img4 from "../assets/img/4.jpg";
import img5 from "../assets/img/5.jpg";
import img6 from "../assets/img/6.jpg";

const responsive = {
  0: { items: 1 },
  900: { items: 2 },
  1920: { items: 3 },
};



export default function Home({ setPage }) {

  const { address, isConnected } = useAccount();

  const nftData = [img1, img2, img3, img4, img5, img6];

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
          <button className="mint-btn">MINT NOW</button>
        </div>
      </div>
    </div>
  )
}
