<?php
require_once 'shared/headers_set.php';
require_once 'google-api-php-client--PHP5.6/vendor/autoload.php';
require_once 'repository/usuario-repository.php';
require_once 'repository/agenda-repository.php';
require_once 'repository/telefone-repository.php';
require_once 'model/Usuario.php';
require_once 'model/Agenda.php';
include_once 'model/Telefone.php';

// TODO: deixar esse método num outro arquivo que compartilha para todos os outros
function json_encode_unicode($data) {
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}
// $usuario_repository = new UsuarioRepository();
$agenda_repository = new AgendaRepository();
$telefone_repository = new TelefoneRepository();
$method = $_SERVER['REQUEST_METHOD'];

require_once 'auth/auth.php';

switch ($method) {
    case 'POST':
        $body = file_get_contents("php://input");
        $input = json_decode($body, TRUE);
        // var_dump($body);

        $agenda = new Agenda();
        $agenda->id = null;
        $agenda->nome = isset($input['nome']) ? $input['nome'] : null;
        $agenda->sobreNome = isset($input['sobreNome']) ? $input['sobreNome'] : null;
        $agenda->email = isset($input['email']) ? $input['email'] : null;
        $agenda->dataAniversario = isset($input['dataAniversario']) ? $input['dataAniversario'] : null;
        $agenda->observacao = isset($input['observacao']) ? $input['observacao'] : null;
        $agenda->usuario_id = $user_id;

        $telefones = [];
        $telefones_req = isset($input['telefones']) ? $input['telefones'] : [];
        foreach ($telefones_req as $telefone_req){
            $telefone_obj = new Telefone();
            $telefone_obj->numero = isset($telefone_req['numero']) ? $telefone_req['numero'] : null;
            $telefones[] = $telefone_obj;
            // var_dump($telefones);
        }
        $agenda->telefones = $telefones;
        $agenda->id = $agenda_repository->save($agenda);
        foreach ($agenda->telefones as $telefone_to_cadastro){
            $telefone_repository->cadastrarTelefone($telefone_to_cadastro->numero, $agenda->id);
        }

        // var_dump($pessoa);
        $status_code = 201;
        http_response_code($status_code); 
        echo(json_encode_unicode($agenda));
        // var_dump($input);
        // if (isset($_POST)) {
        //     var_dump($_POST);
        // }
        break;
    case 'PUT':
        $body = file_get_contents("php://input");
        $input = json_decode($body, TRUE);
        // var_dump($body);

        if (!isset($_GET['id'])) {
            $status_code = 400;
            http_response_code($status_code);
            $status = new stdClass();

            $status->status = $status_code;
            $status->message = 'Id não informado';

            exit(json_encode_unicode($status));
        }

        $agenda_from_db = $agenda_repository->getOne($_GET['id'], $user_id);
        if ($agenda_from_db == null) {
            $status_code = 404;
            http_response_code($status_code);
            $status = new stdClass();

            $status->status = $status_code;
            $status->message = 'Agenda não encontrada';

            exit(json_encode_unicode($status));
        }


        // $agenda = new Agenda();
        $agenda_from_db->id = $_GET['id'];
        $agenda_from_db->nome = isset($input['nome']) ? $input['nome'] : null;
        $agenda_from_db->sobreNome = isset($input['sobreNome']) ? $input['sobreNome'] : null;
        $agenda_from_db->email = isset($input['email']) ? $input['email'] : null;
        $agenda_from_db->dataAniversario = isset($input['dataAniversario']) ? $input['dataAniversario'] : null;
        $agenda_from_db->observacao = isset($input['observacao']) ? $input['observacao'] : null;
        $agenda_from_db->usuario_id = $user_id;

        $telefones = [];
        $telefones_req = isset($input['telefones']) ? $input['telefones'] : [];
        foreach ($telefones_req as $telefone_req){
            $telefone_obj = new Telefone();
            $telefone_obj->numero = isset($telefone_req['numero']) ? $telefone_req['numero'] : null;
            $telefones[] = $telefone_obj;
            // var_dump($telefones);
        }
        $agenda_from_db->telefones = $telefones;
        $cadastrado_com_sucesso = $agenda_repository->update($agenda_from_db);

        // delete all telefones de agenda
        $telefone_repository->excluirTelefonesPorAgenda($agenda_from_db->id);
        
        // cadastra os novos telefones
        foreach ($agenda_from_db->telefones as $telefone_to_cadastro){
            $telefone_repository->cadastrarTelefone($telefone_to_cadastro->numero, $agenda_from_db->id);
        }

        // var_dump($pessoa);
        echo(json_encode_unicode($agenda_from_db));
        // var_dump($input);
        // if (isset($_POST)) {
        //     var_dump($_POST);
        // }
        break;
    case 'GET':
        $usuario_id = $payload['sub'];
        if (isset($_GET['id_agenda'])) {
            $id = $_GET['id_agenda'];
            
            $retorno_db = $agenda_repository->getOne($id, $usuario_id);
            if ($retorno_db != null) {
                # code...
                echo(json_encode_unicode($retorno_db));
            } else{
                $status_code = 404;
                http_response_code($status_code);
                $status = new stdClass();

                $status->status = $status_code;
                $status->message = 'Não encontrado';

                echo(json_encode_unicode($status));
            }
        } else {
            echo(json_encode_unicode($agenda_repository->getAll($usuario_id)));
        }
        break;
    
    case 'DELETE':

        if (!isset($_GET['id'])) {
            $status_code = 400;
            http_response_code($status_code);
            $status = new stdClass();

            $status->status = $status_code;
            $status->message = 'Id não informado';

            exit(json_encode_unicode($status));
        }

        $agenda_from_db = $agenda_repository->getOne($_GET['id'], $user_id);
        if ($agenda_from_db == null) {
            $status_code = 404;
            http_response_code($status_code);
            $status = new stdClass();

            $status->status = $status_code;
            $status->message = 'Agenda não encontrada';

            exit(json_encode_unicode($status));
        }

        // delete all telefones de agenda
        $telefone_repository->excluirTelefonesPorAgenda($agenda_from_db->id);

        $agenda_repository->delete($agenda_from_db->id);

        $status_code = 200;
        http_response_code($status_code); 
        $status = new stdClass();
    
        $status->status = $status_code;
        echo(json_encode_unicode($status));


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
