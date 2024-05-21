async function addAppointment(event) {
    event.preventDefault();

    // Get values from the form
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

    // Example: Send the data to your backend API for saving
    const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            address: address,
            date: date,
            time: time,
            message: message
        })
    });

    if (response.ok) {
        // Client added successfully, refresh client list
        let forms = document.getElementById('addAppointmentForm');
        forms.reset();
        forms.querySelector('.sent-message').classList.add('d-block');


    } else {
        console.error('Error adding client:', response.statusText);
        // Handle error, show message, etc.
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log(document.getElementById("addAppointmentForm"))
    document.getElementById('addAppointmentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addAppointment(event);
    });
})
// document.getElementById("appointmentForm").addEventListener("submit", submit)