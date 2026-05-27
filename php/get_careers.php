<?php
$conn = new mysqli("localhost", "root", "", "edumap");

if ($conn->connect_error) {
    die("Connection failed");
}

$cluster_id = $_GET['cluster_id'];

$result = $conn->query("SELECT * FROM careers WHERE cluster_id = $cluster_id");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>