<?php
// backend/config/database.php
class Database {
    private $host;
    private $username;
    private $password;
    private $database;
    public $connection;

    public function __construct() {
        // Read configuration from ini file
        $config = parse_ini_file(__DIR__ . '/config.ini');
        
        $this->host = $config['host'];
        $this->username = $config['username'];
        $this->password = $config['password'];
        $this->database = $config['database'];

        // Create connection
        $this->connection = new mysqli(
            $this->host, 
            $this->username, 
            $this->password, 
            $this->database
        );

        // Check connection
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function __destruct() {
        $this->connection->close();
    }
}
?>