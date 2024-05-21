// Function to fetch clients from API and populate the client list

async function getClients() {
    try {
        const response = await fetch('http://localhost:8080/api/clients');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        // Handle error, show message, etc.
        return {};
    }

}

async function displayClientsDropdown() {
    const clients = await getClients();
    
    clients.sort((a, b) => {
        // Convert names to lowercase for case-insensitive sorting
        let nameA = a.fullName.toLowerCase();
        let nameB = b.fullName.toLowerCase();
        
        if (nameA < nameB) {
            return -1; // Name A comes before name B
        }
        if (nameA > nameB) {
            return 1; // Name B comes before name A
        }
        return 0; // Names are equal
    });
    const clientList = document.getElementById('clientDropdown');
    clientList.innerHTML = ''; // Clear existing list
    clients.sort((a,b)=>a.fullName > b.fullName).forEach(client => {
        const listItem = document.createElement('option');
        listItem.innerHTML = client.fullName
        listItem.value = client.clientId

        clientList.appendChild(listItem);

    });

}

async function fetchAndPopulateClientList() {
    try {
        const response = await fetch('http://localhost:8080/api/clients');
        const data = await response.json();

        if (response.ok) {
            const clientList = document.getElementById('clientList');
            clientList.innerHTML = ''; // Clear existing list

            data.forEach(client => {
                const listItem = document.createElement('tr');
                listItem.innerHTML = `
                <td>${client.clientId}</td>
                <td> ${client.fullName}</td>
                <td>${client.contactNumber}</td>
                <td>${client.panNumber}</td>
                <td>${client.dob}</td>
                <td>${client.income}</td>
                <td>${client.occupation}</td>
                <td>${client.address}</td>
                <td><i class="bi bi-trash" onclick="deleteClient(${client.clientId})"></i></td> `;
                clientList.appendChild(listItem);
            });
        } else {
            console.error('Error fetching clients:', data);
            // Handle error, show message, etc.
        }
    } catch (error) {
        console.error('Error fetching clients:', error);
        // Handle error, show message, etc.
    }
}

async function fetchAndPopulateSips() {
    try {
        const response = await fetch('http://localhost:8080/api/sips');
        const data = await response.json();

        if (response.ok) {
            const sipList = document.getElementById('sipList');
            sipList.innerHTML = ''; // Clear existing list

            data.forEach(sip => {
                const listItem = document.createElement('tr');
                listItem.innerHTML = `
                <td>${sip.sipId}</td>
                <td> ${sip.title}</td>
                <td>${sip.value}</td>
                <td>${sip.capFund}</td> 
                <td>${sip.startDate}</td>
                <td><i class="bi bi-trash" onclick="deleteSip(${sip.sipId})"></i></td> `;
                sipList.appendChild(listItem);
            });
        } else {
            console.error('Error fetching clients:', data);
            // Handle error, show message, etc.
        }
    } catch (error) {
        console.error('Error fetching clients:', error);
        // Handle error, show message, etc.
    }
}
// Function to show the add client popup
function showAddClientPopup() {
    document.getElementById('addClientPopup').style.display = 'block';
}

// Function to hide the add client popup
function hideAddClientPopup() {
    document.getElementById('addClientPopup').style.display = 'none';
}

// Function to hide the add client popup
function hideSipPopup() {
    document.getElementById('addSIPPopup').style.display = 'none';
}



// Function to handle adding a new client
async function addClient(event) {
    event.preventDefault();

    // Get values from the form
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientMobile = document.getElementById('clientMobile').value;
    const clientAge = document.getElementById('clientAge').value;
    const clientDob = document.getElementById('clientDob').value;
    const clientPan = document.getElementById('clientPan').value;
    const clientIncome = document.getElementById('clientIncome').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientOccupation = document.getElementById('clientOccupation').value;

    // Example: Send the data to your backend API for saving
    const response = await fetch('http://localhost:8080/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: clientName,
            age: clientAge,
            address: clientAddress,
            income: clientIncome,
            contactNumber: clientMobile,
            email: clientEmail,
            occupation: clientOccupation,
            panNumber: clientPan,
            dob: clientDob
        })
    });

    if (response.ok) {
        // Client added successfully, refresh client list
        fetchAndPopulateClientList();
        hideAddClientPopup();
    } else {
        console.error('Error adding client:', response.statusText);
        // Handle error, show message, etc.
    }
}

async function deleteClient(clientId) {
    if (window.confirm("You sure you want to delete this Client Data?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/clients/${clientId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Client deleted successfully, refresh client list
                fetchAndPopulateClientList();
            } else {
                console.error('Error deleting client:', response.statusText);
                // Handle error, show message, etc.
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            // Handle error, show message, etc.
        }
    }
}

async function deleteSip(sipId) {
    if (window.confirm("You sure you want to delete this SIP?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/sips/${sipId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Client deleted successfully, refresh client list
                fetchAndPopulateSips();
            } else {
                console.error('Error deleting SIP:', response.statusText);
                // Handle error, show message, etc.
            }
        } catch (error) {
            console.error('Error deleting SIP:', error);
            // Handle error, show message, etc.
        }
    }
}

async function addSip(event) {
    event.preventDefault();

    // Get values from the form
    const clientId = document.getElementById('clientDropdown').value;
    const fundName = document.getElementById('fundName').value;
    const amount = document.getElementById('amount').value;
    const capFund = document.getElementById('capFund').value;
    const startDate = document.getElementById('startDate').value;

    // Example: Send the data to your backend API for saving
    const response = await fetch('http://localhost:8080/api/sips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientId: clientId,
            title: fundName,
            value: amount,
            capFund: capFund,
            startDate: startDate
        })
    });

    if (response.ok) {
        // Client added successfully, refresh client list
        fetchAndPopulateSips();
        hideSipPopup();
    } else {
        console.error('Error adding client:', response.statusText);
        // Handle error, show message, etc.
    }
}

// Function to edit a client by ID
async function editClient(clientId) {
    try {
        const response = await fetch(`http://localhost:8080/api/clients/${clientId}`);
        const clientData = await response.json();

        if (response.ok) {
            // Populate the form fields with the fetched client data
            document.getElementById('clientName').value = clientData.fullName;
            document.getElementById('clientEmail').value = clientData.email;
            document.getElementById('clientMobile').value = clientData.contactNumber;
            document.getElementById('clientAge').value = clientData.age;
            document.getElementById('clientDob').value = clientData.dob;
            document.getElementById('clientPan').value = clientData.panNumber;
            document.getElementById('clientIncome').value = clientData.income;
            document.getElementById('clientAddress').value = clientData.address;
            document.getElementById('clientOccupation').value = clientData.occupation;

            // Show the add client popup for editing
            document.getElementById('addClientPopup').style.display = 'block';
        } else {
            console.error('Error fetching client data:', response.statusText);
            // Handle error, show message, etc.
        }
    } catch (error) {
        console.error('Error fetching client data:', error);
        // Handle error, show message, etc.
    }
}


// Event listener for the Add Client button to show the popup form
document.getElementById('addClientBtn').addEventListener('click', function () {
    document.getElementById('addClientPopup').style.display = 'block';
});

// Event listener for the Cancel button in the popup form to hide the form
document.getElementById('cancelAddSipBtn').addEventListener('click', function () {
    document.getElementById('addSIPPopup').style.display = 'none';
});

document.getElementById('addSIPBtn').addEventListener('click', function () {
    document.getElementById('addSIPPopup').style.display = 'block';
    displayClientsDropdown();
});

// Event listener for the form submission to add/edit a client
document.getElementById('addClientForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addClient(event);
});

// Event listener for the form submission to add/edit a client
document.getElementById('addSIPForm').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Sip added")
    addSip(event);
});
// Event listeners
document.addEventListener('DOMContentLoaded', fetchAndPopulateClientList);
document.addEventListener('DOMContentLoaded', fetchAndPopulateSips);

document.getElementById('addClientBtn').addEventListener('click', showAddClientPopup);
document.getElementById('cancelAddClientBtn').addEventListener('click', hideAddClientPopup); 