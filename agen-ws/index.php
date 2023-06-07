<?php
// require_once 'google-api-php-client--PHP5.6/vendor/autoload.php';
// require_once 'repository/usuario-repository.php';
// require_once 'repository/agenda-repository.php';
// require_once 'repository/telefone-repository.php';
// require_once 'model/Usuario.php';
// require_once 'model/Agenda.php';
// include_once 'model/Telefone.php';
// require_once 'auth/auth.php';
// header('Content-Type: application/json; charset=utf-8');
// header("Access-Control-Allow-Origin: *");
// // TODO: deixar esse método num outro arquivo que compartilha para todos os outros
// function json_encode_unicode($data) {
//     return json_encode($data, JSON_UNESCAPED_UNICODE);
// }
// // $usuario_repository = new UsuarioRepository();
// $agenda_repository = new AgendaRepository();
// $telefone_repository = new TelefoneRepository();

// $CLIENT_ID = "611415641517-7eke6sip127lv6obdiv1mnc17uuaupe0.apps.googleusercontent.com";
// $CLIENT_ID = "CLIENT_ID_GOOGLE";
// $headers = apache_request_headers();
// if (isset($headers['Authorization'])) {
//   $auth = $headers['Authorization'];

//   preg_match('/Bearer\s+(.*)/', $auth, $matches);
//   $token = $matches[1];
//   $client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
//   $payload = $client->verifyIdToken($token);

// }
// if (isset($payload)) {
//   $userid = $payload['sub'];
//   // If request specified a G Suite domain:
//   //$domain = $payload['hd'];
// //    echo('válido');
// //    var_dump($payload);
// // USE O sub COMO IDENTIFICADOR DO USUÁRIO
// //    echo($payload['sub']);
// } else {
//   echo("Invalid ID token");
// }
// $payload['sub']
// echo(json_encode_unicode($payload));

// echo(json_encode_unicode($agenda_repository->getAll()));
