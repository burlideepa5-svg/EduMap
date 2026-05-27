<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$quiz_type = "quizB";
$user_level = "ug";
$responses = json_encode($data);

$stmt = $conn->prepare(
    "INSERT INTO quiz_responses
    (quiz_type, user_level, responses, created_at)
    VALUES (?, ?, ?, NOW())"
);

$stmt->bind_param("sss", $quiz_type, $user_level, $responses);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "insert_id" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}
?>