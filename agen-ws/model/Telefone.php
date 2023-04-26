<?php
    class Telefone {
        public $id;
        public $numero;
        public $agenda_id;

        public function __construct($id, $numero, $agenda_id) {
            $this->id = $id;
            $this->numero = $numero;
            $this->agenda_id = $agenda_id;
        }
    }
