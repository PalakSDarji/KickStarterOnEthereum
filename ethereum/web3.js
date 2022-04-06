import Web3 from 'web3';

let web3;

if(typeof window !== "undefined" 
    && typeof window.ethereum !== "undefined"){

    //on browser and metamask running
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
}
else{
    //on server.
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c9f18875b25d4c40aa0b79104fe9a920"
    );
    web3 = new Web3(provider);
}
 
export default web3;