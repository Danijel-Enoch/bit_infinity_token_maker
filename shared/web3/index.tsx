import ERC20Contract from "./contracts/ERC20Custom.json";
import detectEthereumProvider from "@metamask/detect-provider";

import Web3 from "web3";
import {AbiItem} from "web3-utils";
import { Url } from "url";
import axios from "axios";

export type ContractArguments = {
  symbol: string;
  name: string;
  decimals: string;
  initialSupply: string;
  maxSupply: string;
  burnable: boolean;
  mintable: boolean;
  pausable: boolean;
  cappable: boolean;
};

export const deploy = async (contractConfig: ContractArguments) => {
  const bytecode = ERC20Contract.bytecode;
  const abi = ERC20Contract.abi;

  const web3 = new Web3(window.ethereum as any);
  const accounts = await web3.eth.getAccounts();

  const incrementer = new web3.eth.Contract(abi as AbiItem[]);
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [
      `${contractConfig.initialSupply}${new Array(Number(contractConfig.decimals))
        .fill("0")
        .join("")}`,
      contractConfig.decimals,
      `${contractConfig.maxSupply}${new Array(Number(contractConfig.decimals))
        .fill("0")
        .join("")}`,
      contractConfig.name,
      contractConfig.symbol,
      [
        contractConfig.burnable,
        contractConfig.mintable,
        contractConfig.pausable,
        contractConfig.cappable,
      ],
    ],
  });

  const txHash = await (window.ethereum as any).request({
    method: "eth_sendTransaction",
    params: [
      {
        data: incrementerTx.encodeABI(),
        from: accounts[0],
      },
    ],
  });
  return txHash;
};

export const makePayment = async ({
  amount,
  paymentToken,
}: {
  amount: number;
  paymentToken: Currency;
}) => {
  if (Number(paymentToken.price) <= 0 || amount <= 0) return;
  const web3 = new Web3(window.ethereum as any);
   const amountToSend = web3.utils.toWei((amount / paymentToken.price).toString());
   console.log({amount,price:paymentToken.price,amountToSend})
  const accounts = await web3.eth.getAccounts();
  const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest')
  console.log((amount / (paymentToken.price)*10000*100000000000000).toString())
  if(paymentToken.address==="0x2170ed0880ac9a755fd29b2688956bd959f933f8" ){
    const priceUrl:string="https://api.coinconvert.net/convert/usdt/eth?amount="+amount.toString();
    const ethPrice:any=await axios.get(priceUrl).then((res:any)=>{
      //console.log({res:res.data.MATIC})
      return res.data.ETH})
    var send = web3.eth.sendTransaction({ from: accounts[0], to: "0x3D186899e8AC6929f7cADd8432B342CE651E5B54", value: (parseFloat(ethPrice)*10000*100000000000000).toString(),'gas': 30000,

    'nonce': nonce, });
  }else if(paymentToken.address==="0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"){
    //get api price
    const priceUrl:string="https://api.coinconvert.net/convert/usdt/matic?amount="+amount.toString();
    const maticPrice:any=await axios.get(priceUrl).then((res:any)=>{
      //console.log({res:res.data.MATIC})
      return res.data.MATIC})
    console.log(maticPrice)
    var send = web3.eth.sendTransaction({ from: accounts[0], to: "0x3D186899e8AC6929f7cADd8432B342CE651E5B54", value: (parseFloat(maticPrice)*10000*100000000000000).toString() });

  }else{
  const paymentContract = new web3.eth.Contract(
    ERC20Contract.abi as AbiItem[],
    paymentToken.address
  );
  const decimals = Number((await paymentContract.methods.decimals().call()).toString());

  const finalAmount = `${(amount / paymentToken.price) * 10 ** decimals}`;
  await paymentContract.methods
    .transfer("0x3D186899e8AC6929f7cADd8432B342CE651E5B54", finalAmount)
    .send({from: accounts[0]});
  }
};

export const connectMetamask = async () => {
  console.log("connect");
  await (window.ethereum as any).request({method: "eth_requestAccounts"});
};

export const isWeb3Enabled = async () => {
  const provider = await detectEthereumProvider();
  if (provider) return provider;
  return null;
};

export const networkMapper = {
  polygon: {id: "0x89"},
  binance: {id: "0x38"},
};

//test network mapper
//export const networkMapper = {
//polygon: {id: "0x1F41"},
//ethereum: {id: "0x4"},
//binance: {id: "0x61"},
//};
