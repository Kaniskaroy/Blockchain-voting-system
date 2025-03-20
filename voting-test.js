// test/voting_test.js
const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let votingInstance;

    before(async () => {
        votingInstance = await Voting.deployed();
    });

    it("should initialize with correct candidate names", async () => {
        const candidate1 = await votingInstance.candidateList(0);
        const candidate2 = await votingInstance.candidateList(1);
        const candidate3 = await votingInstance.candidateList(2);

        assert.equal(web3.utils.hexToAscii(candidate1), "Candidate1", "Candidate1 is not correct");
        assert.equal(web3.utils.hexToAscii(candidate2), "Candidate2", "Candidate2 is not correct");
        assert.equal(web3.utils.hexToAscii(candidate3), "Candidate3", "Candidate3 is not correct");
    });

    it("should allow a voter to cast a vote", async () => {
        await votingInstance.voteForCandidate(web3.utils.asciiToHex("Candidate1"), { from: accounts[0] });
        const votes = await votingInstance.totalVotesFor(web3.utils.asciiToHex("Candidate1"));
        assert.equal(votes, 1, "Vote count for Candidate1 is not correct");
    });
});