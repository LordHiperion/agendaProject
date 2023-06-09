<?php
    include_once 'db.php';
    class UsuarioRepository extends DatabaseConnection {
        public function __construct() {
            parent::__construct();
        }

        public function getAll() {
            // echo('1');
            return parent::query('select * from Usuario');
        }

        public function getOne($sub_google) {
            $consulta = parent::getConn()->prepare('SELECT id, nome FROM Usuario WHERE id = :sub_google');
            $consulta->bindParam(':sub_google', $sub_google);
            $consulta->execute();
            $user_raw = $consulta->fetch(PDO::FETCH_OBJ);
            $usuario = null;

            if ($user_raw) {
                $usuario = new Usuario();
                $usuario->id = $user_raw->id;
                $usuario->nome = $user_raw->nome;
            }
            return $usuario;
        }

        public function exists($sub_google) {
            $consulta = parent::getConn()->prepare('SELECT COUNT(*) as total FROM Usuario WHERE id = :sub_google');
            $consulta->bindParam(':sub_google', $sub_google);
            $consulta->execute();
            $result = $consulta->fetch(PDO::FETCH_ASSOC);
            $total = $result['total'];
    
            return $total > 0;
        }

        public function create($id, $nome) {
            $consulta = parent::getConn()->prepare('INSERT INTO Usuario (id, nome) VALUES (:id, :nome)');
            $consulta->bindParam(':id', $id);
            $consulta->bindParam(':nome', $nome);
            $consulta->execute();
    
            return $consulta->rowCount() > 0;
        }
    }