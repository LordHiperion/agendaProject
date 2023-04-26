<?php
require_once 'repository/usuario-repository.php';
require_once 'repository/agenda-repository.php';
require_once 'model/Usuario.php';
require_once 'model/Agenda.php';
header('Content-Type: application/json; charset=utf-8');
/* Connect to a MySQL database using driver invocation */

// $dbh = new DatabaseConnection();
$usuario_repository = new UsuarioRepository();
$agenda_repository = new AgendaRepository();
// $sql = 'show tables';
// $sql = 'select * from Usuario';
// foreach ($usuario_repository->getAll() as $row) {
//     // var_dump($row);
//     // var_dump($row['id']);
//     // var_dump($row['nome']);
//     // echo('<br>');
//     // echo('<br>');
//     $usuario = new Usuario($row['id'], $row['nome']);
//     $usuarios = [
//         $usuario,
//         $usuario,
//     ];
//     // var_dump($usuarios);
//     $json_obj = json_encode($usuarios);
//     // $json_obj = get_object_vars($usuario);
//     echo($json_obj);
//     // echo('<br>');
//     // echo('<br>');
//     // var_dump(new Usuario($row['id'], $row['nome']));
// }
// $agendas = [];
// foreach ($agenda_repository->getAll() as $row) {
    //     $agenda = new Agenda();
    
    //     $agenda->id = $row['id'];
    //     $agenda->sobre_nome = $row['sobre_nome'];
    //     $agenda->email = $row['email'];
    //     $agenda->observacao = $row['observacao'];
    //     $agenda->usuario_id = $row['usuario_id'];
    
    //     $agendas[] = $agenda;
    //     // $usuario = new Usuario($row['id'], $row['nome']);
    //     // $usuarios = [
        //     //     $usuario,
        //     //     $usuario,
//     // ];
//     // $json_obj = json_encode($usuarios);
//     // $json_obj = get_object_vars($usuario);
//     // echo($json_obj);
//     // echo('<br>');
//     // echo('<br>');
//     // var_dump(new Usuario($row['id'], $row['nome']));
// }

// echo(json_encode($agendas));
echo(json_encode($agenda_repository->getAll()));