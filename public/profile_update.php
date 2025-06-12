<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Simulate logged-in user ID (replace with session or token logic)
session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Get raw input
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
$errors = [];

if (empty($data['name'])) {
    $errors['name'] = 'Name is required.';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'A valid email is required.';
}

$updatePassword = false;
if (!empty($data['password'])) {
    if (strlen($data['password']) < 8) {
        $errors['password'] = 'Password must be at least 8 characters.';
    } elseif ($data['password'] !== $data['password_confirmation']) {
        $errors['password_confirmation'] = 'Passwords do not match.';
    } else {
        $updatePassword = true;
    }
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit;
}

// DB connection
$host = '127.0.0.1';
$db   = 'ai_note_editor_2';
$user = 'root';
$pass = '';
$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Escape values
$name = $mysqli->real_escape_string($data['name']);
$email = $mysqli->real_escape_string($data['email']);
$updated_at = date('Y-m-d H:i:s');

if ($updatePassword) {
    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
    $sql = "UPDATE users
            SET name = '$name', email = '$email', password = '$hashedPassword', updated_at = '$updated_at'
            WHERE id = $user_id";
} else {
    $sql = "UPDATE users
            SET name = '$name', email = '$email', updated_at = '$updated_at'
            WHERE id = $user_id";
}

if ($mysqli->query($sql)) {
    echo json_encode(['message' => 'Profile updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update profile']);
}

$mysqli->close();
