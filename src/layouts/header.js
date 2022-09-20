import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import jotart from "../assets/img/jotart.png";
import wallet from "../assets/img/wallet.png";
import {ConnectWallet} from "../components/connect-button"

export default function Header({ page, network, setNetwork, account, setAccount }) {



    const signIn = () => {
        fetch("http://localhost:8080", { method: "POST" })
            .then((res) => res.json())
            .then((data) => window.open(data.url, '_blank'));
        setInterval(() => {
            fetch("http://localhost:8080/info", { method: "POST" })
                .then((res) => res.json())
                .then((data) => { console.log(data.address, data.balance); setAccount(data) });
        }, 3000);

    }

    return (
        <div className="header">
            <div className="left">
                <img src={jotart} />
            </div>
            {/* <div className="center">
                <Link to="/"><span className={page === 0? "active": ""}>First</span></Link>
                <Link to="/second"><span className={page === 1? "active": ""}>Second</span></Link>
                <Link to="/third"><span className={page === 2? "active": ""}>Third</span></Link>
            </div> */}
            <div className="right">
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
                <img className="wallet" src={wallet} />
                {
                    network === 0
                        // ? <ConnectButton label="CONNECT WALLET" accountStatus={{ smallScreen: 'none', largeScreen: 'address' }} chainStatus="none" showBalance={false} />
                        ? <ConnectWallet />
                        : account?.address
                            ? <button onClick={() => setAccount(null)}>{account.address.substring(0, 3) + "..." + account.address.substring(30, 34)}</button>
                            : <button onClick={signIn}>CONNECT WALLET</button>
                }
            </div>
        </div>
    )
}
