import React from 'react';
import Header from "./header";
import Right from "./right";


export default function Layout({ children, page, network, account, setAccount }) {
  return (
    <>
      <Header page={page} network={network} account={account} setAccount={setAccount} />
      <div className="page-content">
        {children}
      </div>
      <Right />
    </>
  )
}
