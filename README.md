# agendaProject
## FRONT-END
Front-End utilizando Angular versionamento 14.

Sistema de Login utilzamos o Google Autentication para poder ter um controle melhor do gerenciamento de credenciais.

O projeto consiste em uma plataforma de agenda de contatos de simples manuseio apresentando a proposta de CRUD onde o usuário pode criar contatos, alterar e deletar de uma forma simples e prática.

---
## BACK-END
### API end-points:
token tem que vir no `HEADER` no `Authorization` com o formato do OAuth 2.0, sendo: Bearer `{TOKEN}`


{endereco}: https://whertz.com.br/agenda_projeto
|     Ação           | Método | Requer token | Endereço                                        |
|--------------------|--------|--------------|-------------------------------------------------|
| Login              | `POST` | `SIM`        | {endereco}/login.php                            |
| Logout             | `POST` | `SIM`        | {endereco}/logout.php                           |
| Agenda GetAll      | `GET`  | `SIM`        | {endereco}/agenda_controller.php                |
| Agenda GetOne      | `GET`  | `SIM`        | {endereco}/agenda_controller.php?id_agenda={id} |
| Agenda Cadastro    | `POST` | `SIM`        | {endereco}/agenda_controller.php                |
| Agenda Atualização | `PUT`  | `SIM`        | {endereco}/agenda_controller.php?id={id}        |

<br/>

Requisição para salvar uma agenda, pode passar o `id` e o `usuario_id`, eu vou sobrescrever o valor;

`sobrenome`, `email`, `dataAniversario` e `observacao` são opcionais;
```JSON 
{
    // "id": 1,
    "nome": "Welley",
    "sobreNome": "Coutinho Mendes",
    "email": "weslley@email.com",
    "dataAniversario": "1995-07-12",
    "observacao": "Observação sobre o contato",
    // "usuario_id": "111014720031877874936",
    "telefones": [
        {
            "id": 1,
            "numero": "21988887777",
            "agenda_id": 1
        },
        {
            "id": 2,
            "numero": "21912341234",
            "agenda_id": 1
        }
    ]
}
```

## Postman: 
Arquivo para importar no postman: `Agenda API.postman_collection.json` 