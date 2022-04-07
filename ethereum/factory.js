import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xE1697a08977b3d2DCEAe5f5Ae1D2bD0240DC80eC'
);

export default instance;