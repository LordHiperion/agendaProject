<?php
    class Usuario {
        public $id;
        public $nome;

        // public function __construct($id, $nome) {
        //     $this->id = intval($id);
        //     $this->nome = $nome;
        // }

        public static function fromJson($json) {
            $obj = json_decode($json, true);
            $usuario = new Usuario();
            $usuario->id = isset($obj['id']) ? $obj['id'] : null;;
            $usuario->nome = isset($obj['nome']) ? $obj['nome'] : null;;
            return $usuario;
        }
    }
