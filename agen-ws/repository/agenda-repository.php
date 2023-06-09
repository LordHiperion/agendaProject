<?php
    include_once 'db.php';
    class AgendaRepository extends DatabaseConnection {
        public $telefone_repository;
        public function __construct() {
            parent::__construct();
            $this->telefone_repository = new TelefoneRepository();
        }

        public function getAll($usuario_id) {
            // echo('1');
            $agendas = [];
            $consulta = parent::getConn()->prepare('SELECT a.id, a.nome, a.sobre_nome, a.email, a.data_aniversario, a.observacao, a.usuario_id FROM Agenda a WHERE a.usuario_id = :usuario_id');
            $consulta->bindParam(':usuario_id', $usuario_id);
            $consulta->execute();
            foreach ($consulta as $row) {
                // var_dump($row);
                $agenda = new Agenda();

                $agenda->id = intval($row['id']);
                $agenda->nome = $row['nome'];
                $agenda->sobreNome = $row['sobre_nome'];
                $agenda->dataAniversario = $row['data_aniversario'];
                $agenda->email = $row['email'];
                $agenda->observacao = $row['observacao'];
                $agenda->usuario_id = $row['usuario_id'];

                
                // var_dump($telefone_repository);
                $telefones = $this->telefone_repository->getByUsuario($agenda->id);
                $agenda->telefones = $telefones;
                $agendas[] = $agenda;
                
                // $agenda->telefones = 
            }
            return $agendas;
        }

        public function getOne($id, $usuario_id) {
            $consulta = parent::getConn()->prepare('SELECT id, nome, sobre_nome, email, data_aniversario, observacao, usuario_id FROM Agenda WHERE id = :id AND usuario_id = :usuario_id');
            $consulta->bindParam(':id', $id, PDO::PARAM_INT);
            $consulta->bindParam(':usuario_id', $usuario_id);
            $consulta->execute();
            $row = $consulta->fetch(PDO::FETCH_ASSOC);
        
            if ($row) {
                $agenda = new Agenda();
                $agenda->id = intval($row['id']);
                $agenda->nome = $row['nome'];
                $agenda->sobreNome = $row['sobre_nome'];
                $agenda->dataAniversario = $row['data_aniversario'];
                $agenda->email = $row['email'];
                $agenda->observacao = $row['observacao'];
                $agenda->usuario_id = $row['usuario_id'];
        
                $telefones = $this->telefone_repository->getByUsuario($agenda->id);
                $agenda->telefones = $telefones;
        
                return $agenda;
            }
        
            return null; // Se não houver nenhuma agenda com o ID fornecido, retorna null
        }

        public function save(Agenda $agenda) {
            try {
                parent::getConn()->beginTransaction();
    
                $sql = 'INSERT INTO Agenda (nome, sobre_nome, email, data_aniversario, observacao, usuario_id) VALUES (?, ?, ?, ?, ?, ?)';
                $stmt = parent::getConn()->prepare($sql);
                $stmt->bindValue(1, $agenda->nome);
                $stmt->bindValue(2, $agenda->sobreNome);
                $stmt->bindValue(3, $agenda->email);
                $stmt->bindValue(4, $agenda->dataAniversario);
                $stmt->bindValue(5, $agenda->observacao);
                $stmt->bindValue(6, $agenda->usuario_id);
                $stmt->execute();
    
                $id = intval(parent::getConn()->lastInsertId());

                // Cadastrar os telefones:

    
                parent::getConn()->commit();
    
                return $id;
            } catch (PDOException $e) {
                parent::getConn()->rollBack();
                throw new Exception('Erro ao salvar agenda: ' . $e->getMessage());
            }
        }

        public function update(Agenda $agenda) {
            try {
                $sql = "UPDATE Agenda SET nome = :nome, sobre_nome = :sobreNome, email = :email, data_aniversario = :dataAniversario, observacao = :observacao, usuario_id = :usuario_id WHERE id = :id";
                $stmt = parent::getConn()->prepare($sql);
                $stmt->bindParam(':id', $agenda->id, PDO::PARAM_INT);
                $stmt->bindParam(':nome', $agenda->nome, PDO::PARAM_STR);
                $stmt->bindParam(':sobreNome', $agenda->sobreNome, PDO::PARAM_STR);
                $stmt->bindParam(':email', $agenda->email, PDO::PARAM_STR);
                $stmt->bindParam(':dataAniversario', $agenda->dataAniversario, PDO::PARAM_STR);
                $stmt->bindParam(':observacao', $agenda->observacao, PDO::PARAM_STR);
                $stmt->bindParam(':usuario_id', $agenda->usuario_id, PDO::PARAM_STR);
                $stmt->execute();
                return true;
            } catch(PDOException $e) {
                echo "Erro ao atualizar agenda: " . $e->getMessage();
                return false;
            }
        }

        public function delete($id) {
            $stmt = parent::getConn()->prepare("DELETE FROM `Agenda` WHERE `id` = ?");
            $stmt->bindParam(1, $id, PDO::PARAM_INT);
            return $stmt->execute();
        }
    }