<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Honeypot field check
    if (!empty($_POST['honeypot'])) {
        die("Spam detected.");
    }

    // Time-based validation
    $formStartTime = $_POST['formStartTime'];
    $currentTime = time() * 1000;
    if (($currentTime - $formStartTime) < 5000) { // Less than 5 seconds
        die("Form submitted too quickly.");
    }

    // IP address check
    $ipAddress = $_SERVER['REMOTE_ADDR'];
    $blockedIps = ['123.456.789.000']; // Add blocked IP addresses here
    if (in_array($ipAddress, $blockedIps)) {
        die("IP address blocked.");
    }

    // Process form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Here you can add code to send an email or save the data to a database

    echo "Form submitted successfully.";
} else {
    die("Invalid request.");
}
?>
