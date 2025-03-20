const Web3 = require('web3');
const votingArtifact = require('../build/contracts/Voting.json');

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const votingContract = new web3.eth.Contract(votingArtifact.abi, contractAddress);

async function loadCandidates() {
    const candidatesDiv = document.getElementById("candidates");
    const candidates = await votingContract.methods.candidateList().call();

    candidates.forEach(async (candidate, index) => {
        const candidateName = web3.utils.hexToAscii(candidate).replace(/\u0000/g, ''); // Remove null bytes
        const votes = await votingContract.methods.totalVotesFor(candidate).call();

        // Create a candidate card
        const candidateCard = document.createElement("div");
        candidateCard.className = "col-md-4 candidate-card";
        candidateCard.innerHTML = `
            <h3>${candidateName}</h3>
            <p>Votes: <strong>${votes}</strong></p>
            <button class="vote-button" data-candidate="${candidate}">Vote</button>
        `;
        candidatesDiv.appendChild(candidateCard);

        // Add event listener to the vote button
        const voteButton = candidateCard.querySelector('.vote-button');
        voteButton.addEventListener('click', async () => {
            await votingContract.methods.voteForCandidate(candidate).send({ from: (await web3.eth.getAccounts())[0] });
            alert(`You voted for ${candidateName}!`);
            location.reload(); // Refresh the page to update vote counts
        });
    });
}

loadCandidates();