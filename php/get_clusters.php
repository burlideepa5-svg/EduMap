<?php
$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    die("Connection failed");
}

$result = $conn->query("SELECT * FROM career_clusters");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>