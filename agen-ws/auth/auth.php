<?php
require_once 'repository/token_invalido-repository.php';
require_once 'env.php';
$CLIENT_ID = $client_id_google;

$headers = getallheaders(); // Obtém todos os cabeçalhos HTTP

if (isset($headers['Authorization'])) {
  $auth = $headers['Authorization'];

  preg_match('/Bearer\s+(.*)/', $auth, $matches);
  $token = $matches[1];

  $client = new Google_Client(['client_id' => $CLIENT_ID]); // Especifique o CLIENT_ID do aplicativo que acessa o backend

  try {
    $payload = $client->verifyIdToken($token);
    if ($payload) {

        // O token é válido, faça algo com os dados do usuário
        $token_invalido_repository = new TokenInvalidoRepository();
        $token_invalido = $token_invalido_repository->exists($token);
        if($token_invalido) {
            http_response_code(401);
            exit('Token deslogado');
        }
        $user_id = $payload['sub'];

        $usuario_repository = new UsuarioRepository();

        $usario_db = $usuario_repository->getOne($user_id);
        if ($usario_db == null) {
            exit("Usuário não cadastrado");
        }

        $email = $payload['email'];
        $name = $payload['name'];
        
        // Outras ações a serem executadas após a autenticação bem-sucedida
      
    } else {
      // O token não é válido, trate o erro
      http_response_code(401);
      exit("Token inválido");
    }
  } catch (Exception $e) {
    // Ocorreu um erro ao verificar o token
    http_response_code(401);
    exit("Erro na verificação do token: " . $e->getMessage());
  }
} else {
  // O cabeçalho de autorização não está presente, trate o erro
  http_response_code(401);
  exit("Cabeçalho de autorização não encontrado");
}