// Initialize with one empty party row
document.addEventListener('DOMContentLoaded', function() {
    addPartyRow();
});

function addPartyRow() {
    const tbody = document.getElementById('partiesBody');
    const row = document.createElement('tr');
    row.className = 'border-b';
    row.innerHTML = `
        <td class="py-2 px-4">
            <input type="text" class="w-full px-2 py-1 border rounded party-name" placeholder="Party name">
        </td>
        <td class="py-2 px-4">
            <input type="number" min="0" class="w-full px-2 py-1 border rounded party-votes" placeholder="Votes">
        </td>
        <td class="py-2 px-4 text-right">
            <button onclick="removePartyRow(this)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

function removePartyRow(button) {
    const row = button.closest('tr');
    row.remove();
    // Don't allow removing the last row
    if (document.querySelectorAll('#partiesBody tr').length === 0) {
        addPartyRow();
    }
}

function validateInputs() {
    let isValid = true;
    
    // Validate total seats
    const totalSeats = parseInt(document.getElementById('totalSeats').value);
    if (isNaN(totalSeats) || totalSeats < 1) {
        document.getElementById('seatsError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('seatsError').style.display = 'none';
    }

    // Validate parties
    const partyRows = document.querySelectorAll('#partiesBody tr');
    let hasValidParties = false;
    
    partyRows.forEach(row => {
        const name = row.querySelector('.party-name').value.trim();
        const votes = parseInt(row.querySelector('.party-votes').value);
        
        if (name && !isNaN(votes) && votes >= 0) {
            hasValidParties = true;
        }
    });

    if (!hasValidParties) {
        document.getElementById('partiesError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('partiesError').style.display = 'none';
    }

    return isValid;
}

function getPartiesData() {
    const parties = [];
    document.querySelectorAll('#partiesBody tr').forEach(row => {
        const name = row.querySelector('.party-name').value.trim();
        const votes = parseInt(row.querySelector('.party-votes').value);
        
        if (name && !isNaN(votes) && votes >= 0) {
            parties.push({ name, votes });
        }
    });
    return parties;
}

function calculate(method) {
    if (!validateInputs()) return;

    const totalSeats = parseInt(document.getElementById('totalSeats').value);
    const parties = getPartiesData();

    let results;
    if (method === 'dHondt') {
        results = calculateDHondt(parties, totalSeats);
    } else {
        results = calculateHareNiemeyer(parties, totalSeats);
    }

    // Store results in localStorage and redirect
    localStorage.setItem('electionResults', JSON.stringify({
        method,
        totalSeats,
        parties,
        results
    }));
    window.location.href = 'results.html';
}

function calculateDHondt(parties, totalSeats) {
    // Create a copy of parties array to avoid modifying the original
    const results = parties.map(party => ({
        name: party.name,
        votes: party.votes,
        seats: 0,
        quotients: []
    }));

    // Calculate quotients and assign seats
    for (let seat = 1; seat <= totalSeats; seat++) {
        let maxQuotient = 0;
        let winningPartyIndex = 0;

        // Calculate quotient for each party (votes / (seats + 1))
        for (let i = 0; i < results.length; i++) {
            const quotient = results[i].votes / (results[i].seats + 1);
            results[i].quotients.push(quotient);

            if (quotient > maxQuotient) {
                maxQuotient = quotient;
                winningPartyIndex = i;
            }
        }

        // Assign seat to party with highest quotient
        results[winningPartyIndex].seats++;
    }

    return results;
}

function calculateHareNiemeyer(parties, totalSeats) {
    const totalVotes = parties.reduce((sum, party) => sum + party.votes, 0);
    const quota = totalVotes / totalSeats;

    // First allocation: integer part of votes/quota
    const results = parties.map(party => {
        const seats = Math.floor(party.votes / quota);
        const remainder = (party.votes / quota) - seats;
        return {
            name: party.name,
            votes: party.votes,
            seats: seats,
            remainder: remainder
        };
    });

    // Calculate remaining seats
    const allocatedSeats = results.reduce((sum, party) => sum + party.seats, 0);
    let remainingSeats = totalSeats - allocatedSeats;

    if (remainingSeats > 0) {
        // Sort by remainder descending
        const sortedByRemainder = [...results].sort((a, b) => b.remainder - a.remainder);
        
        // Distribute remaining seats to parties with largest remainders
        for (let i = 0; i < remainingSeats; i++) {
            sortedByRemainder[i].seats++;
        }
    }

    return results;
}