require('dotenv').config({path: __dirname+'/../.env'});
console.log(require('dotenv').config({path: __dirname+'/.env'}))

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiled_contract = require('./build/CampaignFactory.json');
const interface = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const metamask = process.env.METAMASK;
console.log('metamask: '+ metamask);

const provider = new HDWalletProvider(
  metamask,
  'https://rinkeby.infura.io/v3/c9f18875b25d4c40aa0b79104fe9a920'
);
const web3 = new Web3(provider);

const deploy = async function(){
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account',accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({data: bytecode, arguments: ['Hi Palak']})
    .send({from: accounts[0], gas: '1000000'});

  console.log('Contract deployed to',result.options.address);
  provider.engine.stop();
};

deploy();
