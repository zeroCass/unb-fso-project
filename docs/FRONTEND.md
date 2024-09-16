## Requisitos

- Sistema Operacional: Windows 10/11
- Node >= v21.1.0

## Configurando, Instalando e Executando o Servidor:

Instale as Bibliotecas necessárias:

```bash
  cd frontend
  npm install
```

- Crie o arquivo .env.local na raiz do diretório frontend **(onde se encontra outros arquivos de configuração como package.json, next.config, etc)**

- Defina o endereço da API do DJANGO:

```html
DJANGO_API='http://localhost:8000'
```

Execute o servidor:

```bash
    cd frontend
    npm run dev
```

Pronto! Acesse o servidor em http://localhost:3000.
