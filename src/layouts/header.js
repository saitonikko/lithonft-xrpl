import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import jotart from "../assets/img/jotart.png";

export default function Header({ page, network, account, setAccount }) {



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
                {
                    network === 0
                        ? <ConnectButton label="CONNECT WALLET" accountStatus={{ smallScreen: 'none', largeScreen: 'address' }} />
                        : account?.address
                            ? <button onClick={() => setAccount(null)}>{account.address.substring(0, 3) + "..." + account.address.substring(30, 34)}</button>
                            : <button onClick={signIn}>CONNECT WALLET</button>
                }
            </div>
        </div>
    )
}
