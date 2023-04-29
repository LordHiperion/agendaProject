<?php
// echo(json_encode($_SERVER));
if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1') {
    // o script está sendo executado localmente
    include_once 'connection_config_local.php';
} else {
    // o script está sendo executado remotamente
    include_once 'config-remoto.php';
}

class DatabaseConnection {
    
    private $host;
    private $username;
    private $password;
    private $database;
    private $conn;
    
    public function __construct() {
        global $conn_db_host;
        global $conn_db_username;
        global $conn_db_password;
        global $conn_db_database;
        $this->host = $conn_db_host;
        $this->username = $conn_db_username;
        $this->password = $conn_db_password;
        $this->database = $conn_db_database;

        $dsn = "mysql:host={$this->host};dbname={$this->database};charset=utf8mb4";
        $this->conn = new PDO($dsn, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // $this->conn->set_charset("utf8mb4");
    }
    
    public function query($sql) {
        // var_dump($this);
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function __destruct() {
        $this->conn = null;
    }
}