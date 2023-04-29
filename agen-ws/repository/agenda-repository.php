<?php
    include_once 'db.php';
    class AgendaRepository extends DatabaseConnection {
        public function __construct() {
            parent::__construct();
        }

        public function getAll() {
            // echo('1');
            $agendas = [];
            $consulta = parent::query('SELECT `id`, `nome`, `sobre_nome`, `email`, `data_aniversario`, `observacao`, `usuario_id` FROM `Agenda`');
            foreach ($consulta as $row) {
                $agenda = new Agenda();

                $agenda->id = $row['id'];
                $agenda->sobre_nome = $row['sobre_nome'];
                $agenda->data_aniversario = $row['data_aniversario'];
                $agenda->email = $row['email'];
                $agenda->observacao = $row['observacao'];
                $agenda->usuario_id = $row['usuario_id'];
            
                $agendas[] = $agenda;
            }
            return $agendas;
        }
    }