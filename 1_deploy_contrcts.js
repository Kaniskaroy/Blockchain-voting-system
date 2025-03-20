// migrations/1_deploy_contracts.js
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    const candidateNames = [
        web3.utils.asciiToHex("Candidate1"),
        web3.utils.asciiToHex("Candidate2"),
        web3.utils.asciiToHex("Candidate3")
    ];
    deployer.deploy(Voting, candidateNames);
};