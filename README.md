# Projeto Final de FSO Unb (Fudamento de Sistemas Opercionais)

## Instalação

### Backend

```C
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

```C
cd frontend

# Download pacotes necessários
npm install
```

Crie e configure o arquivo .env de acordo com exemplo .env.sample

## Como rodar

### Backend

```C
cd backend

python .\manage.py runserver
```

### Frontend

```C
cd frontend

npm run dev
```
