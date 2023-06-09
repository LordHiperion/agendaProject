<?php
include_once 'db.php';
class TokenInvalidoRepository extends DatabaseConnection {
    public function __construct() {
        parent::__construct();
    }

    public function exists($token) {
        $consulta = parent::getConn()->prepare('SELECT COUNT(*) as total FROM Token_invalido WHERE token_invalido = :token');
        $consulta->bindParam(':token', $token);
        $consulta->execute();
        $result = $consulta->fetch(PDO::FETCH_ASSOC);
        $total = $result['total'];

        return $total > 0;
    }

    public function deleteTokensExpirados() {
        // $limiteTempo = date('Y-m-d H:i:s', strtotime('-40 seconds'));
        // var_dump($limiteTempo);
        
        // 30 second | 1 hour
        $sql = "DELETE FROM Token_invalido WHERE data_cadastro < DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)";
        $stmt = parent::getConn()->prepare($sql);
        // $stmt->bindParam(':limite', $limiteTempo);
        $stmt->execute();
        
        $rowCount = $stmt->rowCount();
        return $rowCount; // Retorna o número de registros excluídos
    }

    public function cadastrarTokenExpirado($token) {
        $sql = "INSERT INTO Token_invalido (token_invalido) VALUES (:token)";
        $stmt = parent::getConn()->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        
        $rowCount = $stmt->rowCount();
        return $rowCount; // Retorna o número de registros afetados (deve ser 1 se o token for cadastrado com sucesso)
    }
}