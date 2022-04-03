const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
    language: 'Solidity',
    sources:
    {
        'Campaign.sol': 
        {
            content: source
        }
    },
    settings:
    {
        optimizer: {
            enabled: true,
            runs: 200
        },
        outputSelection:
        {
            '*':{
                '*':['*']
            }
        }
    }
};

var compiled = solc.compile(JSON.stringify(input));
const output = JSON.parse(compiled);

fs.ensureDirSync(buildPath);

for(let contract in output.contracts['Campaign.sol']){
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output.contracts['Campaign.sol'][contract]
    );
}