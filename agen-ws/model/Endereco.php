<?php
    class Endereco {
        public $id;
        public $logradouro;
        public $numero;
        public $complemento;
        public $bairro;
        public $cidade;
        public $estado;
        public $cep;
        public $agenda_id;

        public function __construct($id, $logradouro, $numero, $complemento, $bairro, $cidade, $estado, $cep, $agenda_id) {
            $this->id = $id;
            $this->logradouro = $logradouro;
            $this->numero = $numero;
            $this->complemento = $complemento;
            $this->bairro = $bairro;
            $this->cidade = $cidade;
            $this->estado = $estado;
            $this->cep = $cep;
            $this->agenda_id = $agenda_id;
        }
    }
