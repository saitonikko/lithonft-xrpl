import React from 'react';
import discord from "../assets/img/discord.png";
import twitter from "../assets/img/twitter.png";
import telegram from "../assets/img/telegram.png";

export default function Right() {
  return (
    <div className="link-list">
        <a><img src={discord} /></a>
        <a><img src={twitter} /></a>
        <a><img src={telegram} /></a>
    </div>
  )
}