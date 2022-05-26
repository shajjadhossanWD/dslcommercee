// import axios from 'axios';
// import React, { useEffect, useState, createContext } from 'react';
// import { ethers } from 'ethers';
// import swal from 'sweetalert';
// import { contractABI, contractAddress } from '../utils/constant';
// import { useMoralis, useNFTBalances, useMoralisWeb3Api } from "react-moralis";
// // import Web3 from 'web3';
// import HashLoader from "react-spinners/HashLoader";
// import { css } from "@emotion/react";


// export const DSLCommerceContext = createContext();
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const { ethereum } = window;

// const getEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const MintNFTContract = new ethers.Contract(contractAddress, contractABI, signer);

//   return MintNFTContract;
// }

// export default function DslProvider({ children }) {
//   const { authenticate, isAuthenticated, isAuthenticating, account, user, logout } = useMoralis();
//   const { data: NFTBalances } = useNFTBalances();
//   const Web3Api = useMoralisWeb3Api();
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [user1, setUser] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [Id, setId] = useState();
//   const [bscUri, setBscUri] = useState();
//   const [leftAmount, setLeftAmount] = useState();
//   const [chains, setChains] = useState('');
  



//   // const navigate = useNavigate();
//   console.log(user1)
//   window.addEventListener("load", function () {
//     if (window.ethereum) {
//       // detect Metamask account change
//       window.ethereum.on('accountsChanged', function (accounts) {
//         console.log('account is Changed', accounts);
//         // logOut();
//         // return swal({
//         //   title: "Attention",
//         //   text: "You are being logged out since you changed account. Please login again with the account you need.",
//         //   icon: "warning",
//         //   button: "OK",
//         //   dangerMode: true,
//         //   className: "modal_class",
//         // });
//       });

//       // detect Network account change
//       window.ethereum.on('networkChanged', function (networkId) {
//         console.log('network is changed: ', networkId);
//         // logOut();
//         // return swal({
//         //   title: "Attention",
//         //   text: "You are being logged out since you Changed network. Please login after changing to Binance Chain.",
//         //   icon: "warning",
//         //   button: "OK",
//         //   dangerMode: true,
//         //   className: "modal_class",

//         // });
//       });
//     } else {
//       throw new Error("No ethereum object");
//     }

//   });

//   const logOut = async () => {
//     setCurrentAccount(null);
//     setUser({});
//     localStorage.removeItem("token");
//     // await logout();
//   };

//   const checkIfWalletIsConnect = async () => {
//     try {
//       if (!ethereum) {
//         return console.log("please use metamask")
//       }
//       //  return swal({
//       //   title: "Attention",
//       //   text: "Please use Metamask browser to access Dapps of https://grighund.net. You can access normally after pressing OK.",
//       //   icon: "warning",
//       //   button: "OK",
//       //   dangerMode: true,
//       //   className: "modal_class",

//       // });

//       const accounts = await ethereum.request({ method: "eth_accounts" });

//       if (accounts.length) {
//         setCurrentAccount(accounts[0]);
//       } else {
//         console.log("No accounts found");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const connectWallet = async (wallet, id) => {
//     try {
//       if (wallet === "Metamask") {
//         if (!ethereum) {
//           return console.log("please use metamask")
//         }
//         setLoading(true);
//         // return swal({
//         //   title: "Attention",
//         //   text: "Please use Metamask browser to access Dapps of https://grighund.net. You can access normally after pressing OK.",
//         //   icon: "warning",
//         //   button: "OK",
//         //   dangerMode: true,
//         //   className: "modal_class",
//         // });
//         const chainid = await window.ethereum.request({ method: 'eth_chainId' });
//         console.log("This is Chain ID: ", chainid)
//         setChains(chainid);
//         if (chainid === "0x38" || chainid === "0x61") {
//           // const accounts = await ethereum.request({ method: "eth_requestAccounts", });
//           await authenticate({ signingMessage: "Login: Grighund.net." })
//           console.log("This is user: ", user.get("ethAddress"))
//           setCurrentAccount(user.get("ethAddress"));

//           await axios.post(`https://backend.grighund.net/api/users/`, {
//             walletAddress: user.get("ethAddress"),
//             referralID: id
//           })
//             .then((res) => {
//               if (res.data.user) {
//                 setUser(res.data.user);
//                 setLoading(false);
//                 localStorage.setItem("token", res.data.token);
//                 const wrapper = document.createElement('div');
//                 wrapper.innerHTML = `<p class='text-break text-white fs-6'>You have succesfully logged in with <br/>Binance Chain.</p>`;
//                 return swal({
//                   title: "Success",
//                   // text: "You have succesfully logged in with Binance Chain.",
//                   content: wrapper,
//                   icon: "success",
//                   button: "OK",
//                   // dangerMode: true,
//                   className: "modal_class_success",

//                 });
//               }
//             });

//         }
//         else {
//           swal({
//             title: "Attention",
//             text: "Please change to Binance Chain before connecting.",
//             icon: "warning",
//             button: "OK",
//             dangerMode: true,
//             className: "modal_class",
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error("No ethereum object");
//     }

//   };

//   const options = {
//     address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
//     chain: "bsc",
//     exchange: "PancakeSwapv2",
//   };


//   const Withdraw = async () => {
//     try {
//       if (ethereum) {
//         const MintNFTContract = getEthereumContract();
//         const addressTo = "0xd7b3De408C49DC693aA44193fB44240F1bFe1772";
//         const amount = "0.005";
//         const parsedAmount = ethers.utils.parseEther(amount);
//         await MintNFTContract.withdraw(addressTo, parsedAmount._hex);
//       } else {
//         console.log("No ethereum object");
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error("No ethereum object");
//     }
//   };


//   const setID = async () => {
//     try {
//       if (ethereum) {
//         const MintNFTContract = getEthereumContract();
//         const ID = await MintNFTContract.totalSupply();
//         setId(ID.toString());
//         // console.log("This is ID in setID: " + ID);
//         // console.log("This is Id in setID: " + Id);
//       } else {
//         console.log("No ethereum object");
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error("No ethereum object");
//     }
//   };


//   useEffect(() => {
//     checkIfWalletIsConnect();
//   }, [])


//   useEffect(() => {
//     if (currentAccount && localStorage.getItem("token")) {
//       setLoading(true);
//       axios.get(`https://backend.grighund.net/api/users/${currentAccount}`, {
//         headers: {
//           "authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//       })
//         .then(res => {
//           setUser(res.data);
//         })
//         .catch(err => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [currentAccount]);

//   return (
//     <DSLCommerceContext.Provider value={{
//       connectWallet,
//       currentAccount,
//       user1,
//       setUser,
//       logOut,
//       loading,
//       contractAddress,
//       Id,
//       setID,
//       setNFTData,
//       bscUri,
//       Withdraw,
//       chains,
//     }}>
//       {children}
//     </DSLCommerceContext.Provider>
//   )
// }