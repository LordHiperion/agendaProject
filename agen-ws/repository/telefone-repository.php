<?php
include_once 'db.php';
class TelefoneRepository extends DatabaseConnection {
    public function __construct() {
        parent::__construct();
    }

    // public function getAll() {}
    public function getByUsuario($id_usuario) {
        $telefones = [];
        $consulta = parent::getConn()->prepare('SELECT id, numero, agenda_id FROM Telefone WHERE agenda_id = :id_usuario');
        $consulta->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
        $consulta->execute();
        foreach ($consulta as $row) {

            $telefone = new Telefone();

            $telefone->id = intval($row['id']);
            $telefone->numero = $row['numero'];
            $telefone->agenda_id = intval($row['agenda_id']);
            $telefones[] = $telefone;

        }
        return $telefones;
    }

    public function cadastrarTelefone($numero, $agenda_id) {
        $consulta = parent::getConn()->prepare('INSERT INTO Telefone (numero, agenda_id) VALUES (:numero, :agenda_id)');
        $consulta->bindParam(':numero', $numero);
        $consulta->bindParam(':agenda_id', $agenda_id, PDO::PARAM_INT);
        $consulta->execute();

        // Verifica se o telefone foi cadastrado com sucesso
        if ($consulta->rowCount() > 0) {
            return true; // Retorna true em caso de sucesso
        } else {
            return false; // Retorna false em caso de falha
        }
    }

    public function excluirTelefonesPorAgenda($agenda_id) {
        $consulta = parent::getConn()->prepare('DELETE FROM Telefone WHERE agenda_id = :agenda_id');
        $consulta->bindParam(':agenda_id', $agenda_id, PDO::PARAM_INT);
        $consulta->execute();

        // Verifica se os telefones foram excluídos com sucesso
        if ($consulta->rowCount() > 0) {
            return true; // Retorna true em caso de sucesso
        } else {
            return false; // Retorna false em caso de falha
        }
    }
}