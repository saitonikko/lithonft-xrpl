import React from 'react';
import Header from "./header";
import Right from "./right";


export default function Layout({ children, page }) {
  return (
    <>
      <Header page={page} />
      <div className="page-content">
        {children}
      </div>
      <Right />
    </>
  )
}
