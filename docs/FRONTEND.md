### Requisitos
            Sistema Operacional: Windows 10/11
            Node >= v21.1.0

### Configurando, Instalando e Executando o Servidor:

Instalação:  
```bash
cd frontend
npm install
```
Configurando: 
    1 - Crie o arquivo .env.local na raiz do diretório frontend (onde se encontra outros arquivos de configuração como package.json, next.config, etc)
    2 - Defina o endereço da API do DJANGO:
       ```DJANGO_API='http://localhost:8000'```
       
Execução:
```bash
cd frontend
npm run dev
```

Pronto! Acesse o servidor em http://localhost:3000.