const PharmaChain = artifacts.require("PharmaSupplyChain");

module.exports = function (deployer) {
  deployer.deploy(PharmaChain,"Admin",1234,"Admin","Admin","Admin@gmail.com");
};
