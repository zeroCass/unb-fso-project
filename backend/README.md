
### Acessando o  Banco de Dados pelo Shell:

    1 - Acesse  o site do SQLite3 https://www.sqlite.org/download.html e faça download do executável.
    2 - Adicione a pasta extraida às variavéis de ambiente (Path)
    3 - Dentro do diretório onde o banco se encontra (db.sqlite3), utilize o comando:
         ``
            sqlite3 db.sqlite3
         ``


### API Endpoints:
      'GET ALL Alunos': '/api/aluno/all/',
      'Add Aluno': '/api/aluno/create',
      'Update Aluno': '/api/aluno/update/pk',
      'Delete Aluno': '/api/aluno/delete/pk',

      'Get All admins': '/api/admin/all',
      'Add Admin': '/api/admin/create',
      'Update Admin': '/api/admin/update/pk',
      'Delete Admin': '/api/admin/delete/pk',

      
      'Get All Turmas': '/api/admin/all',
      'Add Turma': '/api/turma/create',
      'Update Turma': '/api/turma/update/pk',
      'Delete Turma': '/api/turma/delete/pk',


      'GET TURNOS' : 'api/turnos',
      'GET TRILHAS' : 'api/trilhas',
      'GET NOME DAS TURMAS' : 'api/nomes_turma',
      'GET Roles' : 'api/roles',






OBS.: Mudar turma pra ter ano e nome, ambos nao sao unicos