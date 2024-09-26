<?php
// Include the database configuration file
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Assign variables to incoming data
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    // Validate required fields
    if (!$email || !$password) {
        echo json_encode(['error' => 'Email and password are required.']);
        exit();
    }

    // Prepare a select statement to fetch user by email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, 's', $email);

    // Execute the query
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    // Check if user exists and if the password is correct
    if ($user && password_verify($password, $user['password'])) {
        // Start a session for the user
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        // Respond with a success message
        echo json_encode([
            'success' => 'Login successful!',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ]
        ]);
    } else {
        // Respond with an error if credentials are invalid
        echo json_encode(['error' => 'Invalid email or password.']);
    }

    // Close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>
