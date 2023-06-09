<?php
    require_once 'google-api-php-client--PHP5.6/vendor/autoload.php';
    require_once 'repository/usuario-repository.php';
    require_once 'repository/token_invalido-repository.php';
    require_once 'model/Usuario.php';
    // Sempre que fizer um login ele deleta os tokens antigos
    $token_invalido_repository = new TokenInvalidoRepository();
    $token_invalido_repository->deleteTokensExpirados();
    

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");

    function json_encode_unicode($data) {
        return json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            require_once 'auth/auth.php';
            $status_code = 200;
            $usuario_repository = new UsuarioRepository();
            $usuario_existe_no_banco = $usuario_repository->exists($payload['sub']);
            if (!$usuario_existe_no_banco) {
                $cadastrado = $usuario_repository->create($payload['sub'], $payload['name']);
                if ($cadastrado) {
                    $status_code = 201;
                } else {
                    $status_code = 400;
                }
            }
            http_response_code($status_code); 
            $status = new stdClass();
        
            $status->status = $status_code;
            echo(json_encode_unicode($status));
            break;
        // case 'GET':
        //     echo(json_encode_unicode($agenda_repository->getAll()));
        // break;
        
        default:
            $status_code = 400;
            http_response_code($status_code);
            $status = new stdClass();
        
            $status->status = $status_code;
            $status->message = 'Método não suportado';

            echo(json_encode_unicode($status));
            break;
    }
    


