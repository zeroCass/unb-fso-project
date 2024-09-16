## Requisitos

- Sistema Operacional: Windows 10/11
- Python >= 3.11.9

## Configurando, Instalando e Executando o Servidor:

Instale as Bibliotecas necessárias:

```bash
  cd backend
  pip install -r requirements.txt
```

Criação e Migrations do Banco de Dados:

```bash
  py manage.py makemigrations
  py manage.py migrate
```

Execute o servidor:

```bash
  py manage.py runserver
```

Pronto! Acesse o servidor em: http://127.0.0.1:8000/

## Acessando o Banco de Dados pelo Shell:

- Acesse o site do SQLite3 https://www.sqlite.org/download.html e faça download do executável.

- Adicione a pasta extraida às variavéis de ambiente (Path)

- Dentro do diretório onde o banco se encontra _(db.sqlite3)_, utilize o comando: `sqlite3 db.sqlite3`

## Documentação da API

A autenticação é feita com o sistema de Tokens do DJANGO Framework.

### Criar Admin

- Para criar um ADMIN utiliza-se o Endpoint _'/api/register/'_ com método POST passando as seguintes informações:

```http
    { "cpf": "12345678910", "nome": "Nome do Admin", "password": "Senha do ADMIN", "role": "ADMIN" }
```

-Caso o registro seja feito com sucesso, a resposta será dessa forma

```http
    { "cpf": "12345678910", "nome": "Nome do Admin", "role": "ADMIN" }
```

Depois de registrado, o usuário ADMIN pode fazer Login com um POST no endpoint _'/api/login/'_. O corpo do POST deve ser formatado da seguinta maneira:

```http
    { "cpf": "numero do cpf", "password": "senha escolhida" }
```

Caso a requisição seja sucedida, o backend retorna uma resposta com um Token da seguinte forma:

```http
    { "token": "878bf2185108b83af8f962e9275dcee9eae53e1e", "role": "ADMIN", "nome": "Felipe" }
```

Esse token deve ser salvo no cache do navegador, pois será utilizado em todas requisições que necessitam de permissões.

### Criar Alunos

- Após a criação do ADMIN, é possível criar Alunos no Endpoint _'/api/aluno/create'_, a requisição POST deve ter o corpo:

```http
    { "cpf": "12345678910", "nome": "Nome do Aluno", "password": "Senha do ALUNO", "role": "ALUNO" }
```

E o Header deve ter:

```http
   "Authorization: Token valor_do_token"
```

é assim que o backend descobre qual usuário está logado a partir do Token.

- O login dos alunos utiliza a mesma URL do login para ADMINS.

### Criar Turmas

- Formato do corpo para criação de turmas _(além do token de ADMIN no header)_:

```http
    { "nome": "A", "turno": "MAT", "trilha": "ENEGRESER" , "capacidadeMaxima": 10, "capacidadeAtual":50, "ano": 1 }
```

### Realizar logout

- Para realizar o Logout (invalidar o token atual) basta realizar uma requisição GET na URL _'/api/logout'_ passando o Token pelo Header.

### Matricula de aluno

- Para um aluno se matricular em uma turma, é necessário, com o token de aluno, realizar um POST na url _'/api/matricula/'_ com o corpo:

```http
   {"turma":turma_id}
```

## Endpoints

Abaixo estão todos Endpoints:

- Métodos que aceitam as URL's, a URL e em seguida os roles que estão permitidos de acessar essas URL's.

| Métodos  | Descrição                  | URL's                  | Permissões                                                           |
| :------- | :------------------------- | :--------------------- | :------------------------------------------------------------------- |
| `POST`   | `Register Admin`           | `/api/register`        | Sem permissões                                                       |
| `GET`    | `GET Current User`         | `/api/user`            | Admin e Alunos com token válido passado pelo Header                  |
| `GET`    | `GET ALL Alunos`           | `/api/aluno/all/`      | Somente ADMIN                                                        |
| `POST`   | `Add Aluno`                | `/api/aluno/create`    | Somente ADMIN                                                        |
| `PUT`    | `Update Aluno`             | `/api/aluno/update/pk` | Admin e Aluno com mesma PK                                           |
| `DELETE` | `Delete Aluno`             | `/api/aluno/delete/pk` | Somente ADMIN                                                        |
| `POST`   | `Matricula Aluno em Turma` | `/api/matricula/`      | Somente alunos                                                       |
| `GET`    | `Get All Turmas`           | `/api/admin/all`       | ADMIN e Alunos                                                       |
| `POST`   | `Add Turma`                | `/api/turma/create`    | Somente ADMIN                                                        |
| `PUT`    | `Update Turma`             | `/api/turma/update/pk` | Somente ADMIN (A ser mudada - funcao matricula realizada por alunos) |
| `DELETE` | `Delete Turma`             | `/api/turma/delete/pk` | Somente ADMIN                                                        |
| `GET`    | `GET TURNOS`               | `/api/turnos`          | Sem permissõesN                                                      |
| `GET`    | `GET TRILHAS`              | `/api/trilhas`         | Sem permissões                                                       |
| `GET`    | `GET NOME DAS TURMAS`      | `/api/nomes_turma`     | Sem permissões                                                       |
| `GET`    | `GET Roles`                | `/api/roles`           | Sem permissões                                                       |
