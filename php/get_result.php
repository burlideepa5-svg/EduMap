<?php

header("Content-Type: application/json");

/* DATABASE CONNECTION */

$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

/* GET RESULT ID */

if (!isset($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing result ID"
    ]);
    exit;
}

$id = intval($_GET['id']);

/* FETCH RECORD */

$stmt = $conn->prepare("
    SELECT id, quiz_type, user_level, responses
    FROM quiz_responses
    WHERE id = ?
");

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "Result not found"
    ]);

    exit;
}

$row = $result->fetch_assoc();

/* DECODE RESPONSES JSON */

$responses = json_decode($row['responses'], true);

/* RETURN DATA */

echo json_encode([
    "success" => true,
    "id" => $row['id'],
    "quiz_type" => $row['quiz_type'],
    "user_level" => $row['user_level'],
    "responses" => $responses
]);

$stmt->close();
$conn->close();

?>