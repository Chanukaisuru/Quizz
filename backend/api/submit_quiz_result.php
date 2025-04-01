<?php
// backend/api/submit_quiz_result.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/database.php';

// Receive JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid input data'
    ]);
    exit;
}

try {
    // Create database connection
    $database = new Database();
    $conn = $database->getConnection();

    // Prepare SQL statement
    $stmt = $conn->prepare(
        "INSERT INTO quiz_results (
            full_name, 
            email, 
            mobile_number, 
            work_place, 
            job_role, 
            skills_score, 
            result_category
        ) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    // Bind parameters
    $stmt->bind_param(
        "sssssss", 
        $data['fullName'], 
        $data['email'], 
        $data['mobileNumber'], 
        $data['workPlace'], 
        $data['jobRole'], 
        $data['skillsScore'], 
        $data['resultCategory']
    );

    // Execute statement
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => true, 
            'message' => 'Quiz result saved successfully',
            'id' => $stmt->insert_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to save quiz result'
        ]);
    }

    // Close statement and connection
    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>