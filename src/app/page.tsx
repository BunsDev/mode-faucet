"use client"
import { ethers } from "ethers";
import React, { useState } from 'react';
import contractArtifact from '../../artifacts/contracts/Faucet.sol/Faucet.json'



export default function Home() {
  const [walletAddress, setWalletAddress] = React.useState("Enter your wallet address (ex. 0x)");

  const deployedContract = "0x8700f1aead6f9d10314993a10d6dd0047d4517d8";
  const privateKey = `0x` + process.env.DEPLOYER!
  const provider = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_KEY}`)


  const signer = new ethers.Wallet(privateKey, provider)
  //const readContract = new ethers.Contract(deployedContract, contractArtifact.abi, provider);
  const writeContract = new ethers.Contract(deployedContract, contractArtifact.abi, signer);

  async function submitTx() {
    const tx = await writeContract.requestTokens(0.2, walletAddress);
    alert(`Transaction submitted: ", ${tx.hash}`);
  }



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <h6 className='text-2xl font-bold'>This is <kbd className="kbd kbd-lg">Mode Sepolia</kbd> Faucet</h6>
          <br />
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your address?</span>
            </label>
            <input type="text" placeholder={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="input input-bordered input-primary w-full max-w-xs" />
          </div>
          <p className="py-6">By clicking the button below after you enter your wallet address <div className="badge badge-accent">0.2 ETH</div> allocated to your account and a transaction is initiated.</p>
          <button className="btn btn-primary" onClick={() => submitTx}>Request Test Token</button>
        </div>
      </div>
    </div>
  )
}