import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import jotart from "../assets/img/jotart.png";

console.log(ConnectButton);

export default function Header({page}) {
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
                <ConnectButton label="CONNECT WALLET" accountStatus={{smallScreen: 'none', largeScreen: 'address'}} />
            </div>
        </div>
    )
}
