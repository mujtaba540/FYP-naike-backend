const ethAirBalloons = require('ethairballoons');
const path = require('path');
let savePath = path.resolve(__dirname + '/contracts');

const ethAirBalloonsProvider = ethAirBalloons('http://localhost:7545', savePath);
//ethereum blockchain provider URL, path to save auto generated smart contracts

const Category = ethAirBalloonsProvider.createSchema({
    name: "Category",
    contractName: "CategorysContract",
    properties: [
        {
            name: "name",
            type: "bytes32",
            primaryKey: true
        },
        {
            name: "type",
            type: "bytes32",
        },
        {
            name: "detail",
            type: "bytes32"
        }
    ]
});

module.exports=Category;