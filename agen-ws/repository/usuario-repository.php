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
    }