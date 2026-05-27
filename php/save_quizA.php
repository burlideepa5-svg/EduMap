<?php

header("Content-Type: application/json");

/* CONNECT DATABASE */

$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

/* GET DATA */

$data = json_decode(file_get_contents("php://input"), true);

// fallback
if (!$data) {
    $data = $_POST;
}

/* VALIDATION */

if (empty($data["answers"])) {
    echo json_encode([
        "success" => false,
        "message" => "Answers missing"
    ]);
    exit;
}

/* PREPARE VALUES */

$quiz_type = "quizA";
$user_level = $data["user_level"] ?? "unknown";
$responses = json_encode($data);

/* INSERT */

$stmt = $conn->prepare("
    INSERT INTO quiz_responses (quiz_type, user_level, responses)
    VALUES (?, ?, ?)
");

$stmt->bind_param("sss", $quiz_type, $user_level, $responses);

/* EXECUTE */

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

/* CLOSE */

$stmt->close();
$conn->close();

?>