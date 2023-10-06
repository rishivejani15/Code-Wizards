<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["T1"];
    $email = $_POST["E1"];
    $password = password_hash($_POST["pass1"], PASSWORD_DEFAULT);

    // Establish a database connection (modify these with your credentials)
    $servername = "localhost";
    $username = "root";
    $password_db = "";
    $dbname = "user_registration";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
