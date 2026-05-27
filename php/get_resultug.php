<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false
    ]);
    exit;
}

$id = $_GET["id"];

$stmt = $conn->prepare(
    "SELECT responses
     FROM quiz_responses
     WHERE id = ?"
);

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo $row["responses"];
?>