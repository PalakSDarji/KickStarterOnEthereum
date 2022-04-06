import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x5d45F089fB2d4f2f0CeFc0c73D692EAE4c816997'
);

export default instance;