<?php
    require_once 'google-api-php-client--PHP5.6/vendor/autoload.php';
    require_once 'repository/token_invalido-repository.php';
    require_once 'model/Usuario.php';
    require_once 'auth/auth.php';
    

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");

    function json_encode_unicode($data) {
        return json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    // $payload
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $token_invalido_repository = new TokenInvalidoRepository();
        
            $token_invalido = $token_invalido_repository->exists($token);
        
            // var_dump($token_invalido);
        
            $token_invalido_repository->cadastrarTokenExpirado($token);
            break;
        default:
            $status_code = 400;
            http_response_code($status_code);
            $status = new stdClass();
        
            $status->status = $status_code;
            $status->message = 'Método não suportado';

            echo(json_encode_unicode($status));
            break;
    }
