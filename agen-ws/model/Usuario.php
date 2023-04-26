<?php
    class Usuario {
        public $id;
        public $nome;

        public function __construct($id, $nome) {
            $this->id = intval($id);
            $this->nome = $nome;
        }
    }
