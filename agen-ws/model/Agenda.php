<?php
    class Agenda {
        public $id;
        public $nome;
        public $sobreNome;
        public $email;
        public $dataAniversario;
        public $observacao;
        public $usuario_id;
        public $telefones;

        public function getValidationErrors() {
            $errors = [];
    
            // Validação do campo nome
            if (empty($this->nome) || strlen($this->nome) > 50) {
                $errors[] = "O campo nome é obrigatório e deve ter no máximo 50 caracteres.";
            }
    
            // Validação do campo sobreNome
            if (!empty($this->sobreNome) && strlen($this->sobreNome) > 60) {
                $errors[] = "O campo sobrenome deve ter no máximo 60 caracteres.";
            }
    
            // Validação do campo email
            if (!empty($this->email) && !filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "O campo email não é um email válido.";
            }
    
            // Validação do campo dataAniversario
            if (!empty($this->dataAniversario) && !strtotime($this->dataAniversario)) {
                $errors[] = "O campo data de aniversário não é uma data válida.";
            }
    
            return $errors;
        }
    }
  