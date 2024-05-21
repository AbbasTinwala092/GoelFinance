document.addEventListener('DOMContentLoaded', function() {
    // Handle 'Forgot Password' link click
    document.getElementById('forgotPassword').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('forgotPasswordModal').style.display = 'block';
    });

    // Handle 'Close' button click in the modal
    document.getElementsByClassName('close')[0].addEventListener('click', function(){
        document.getElementById('forgotPasswordModal').style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event){
        if (event.target == document.getElementById('forgotPasswordModal')) {
            document.getElementById('forgotPasswordModal').style.display = 'none';
        }
    });

    // Handle form submission for login
    document.getElementById('loginForm').addEventListener('submit', function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        // Check if username and password are 'admin' and 'admin' respectively
        if(username === 'admin' && password === 'admin') {
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            // Show error message or handle invalid login
            window.alert('Invalid username or password. Please try again.');
        }
    });
});
