# Projeto Final de FSO Unb (Fundamentos de Sistemas Operacionais)

    Disciplina: Fundamentos de Sistema Operacional
    Alunos: Felipe Rocha - 170050084
            Maylla Krislainy - 190043873
            Mateus Valerio - 190035161

    Obs.: Mais documentação disponível na pasta docs/.

## Instalação

### Backend

```bash
cd backend

# Download pacotes necessários
pip install -r requirements.txt

# Faça as migrations
py manage.py makemigrations
py manage.py migrate

# Popule o banco de dados com dados iniciais backend/api/fixtures diretório
py manage.py loaddata turmas.json
py manage.py loaddata usuarios.json


# (Opcional) Crie um superuser
py manage.py createsuperuser
..<input a username, email, and password>

```

### Frontend

```bash
cd frontend

# Download pacotes necessários
npm install
```

1 - Crie e configure o arquivo .env de acordo com exemplo .env.sample
2 - Crie o arquivo .env.local na raiz do diretório frontend (onde se encontra outros arquivos de configuração como package.json, next.config, etc)
3 - Defina o endereço da API do DJANGO:
`DJANGO_API='http://localhost:8000'`

## Como rodar

### Backend

```bash
cd backend

python .\manage.py runserver
```

### Frontend

```bash
cd frontend

npm run dev
```
