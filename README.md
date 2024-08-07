# Projeto Final de FSO Unb (Fudamento de Sistemas Opercionais)

## Instalação

### Backend

```bash
cd backend

# Download pacotes necessários
pip install -r requirements.txt

# Faça as migrations
py manage.py makemigrations
py manage.py migrate

# (Opcional) Crie um superuser
py manage.py createsuperuser
..<input a username, email, and password>

# (Opcional) Popule o banco de dados com dados iniciais backend/api/fixtures diretório
py manage.py loaddata fixture
```

### Frontend

```bash
cd frontend

# Download pacotes necessários
npm install
```

Crie e configure o arquivo .env de acordo com exemplo .env.sample

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
