
# Projeto de FSO

*Disciplina: Fundamentos de Sistema Operacional (UnB)*

O Projeto tem como objetivo automatizar o processo de escolha de trilhas e matrículas para os alunos do ensino médio de um centro de ensino, considerando as restrições de vagas e turnos.

## Autores

- [Felipe Rocha - 170050084](https://github.com/felipenrocha)
- [ Maylla Krislainy - 190043873](https://github.com/maydMoon)
- [Mateus Valerio - 190035161](https://github.com/zeroCass)
       
      
## Documentação

Dentro da pasta docs do repositório, você encontrará os slides correspondentes a cada sprint de entrega, o diagrama ER, o diagrama de casos de uso e o diagrama de classes. Além de mais informações sobre a instalação e requisitos do projeto.
É essencial consultar as documentações do [front](https://github.com/zeroCass/unb-fso-project/blob/main/docs/FRONTEND.md) e do [backend](https://github.com/zeroCass/unb-fso-project/blob/main/docs/BACKEND.md).

### Figma
Abaixo encontra-se o link da prototipação no Figma das interfaces do projeto:

[![Figma](https://img.shields.io/badge/Figma-696969?style=for-the-badge&logo=figma&logoColor=figma)](https://www.figma.com/design/2OjQVrDtwqiOjIl23i0s80/FSO-Project?node-id=0-1&t=XmIpIHWNanxcVzIW-1)

## Funcionalidades Principais:

- **Cadastro de Alunos:** Os Admins cadastram os alunos com seus CPFs para que eles possam acessar o sistema.
- **Escolha de Trilha:** O sistema apresenta as trilhas disponíveis com base nas vagas e turnos, permitindo que o aluno faça sua escolha.
- **Gerenciamento de Vagas:** O sistema controla as vagas disponíveis em cada turma e trilha, evitando overbooking.
- **Relatórios:** O administrador pode consultar um relatório completo das matrículas.
  
## Instalação
A instalação do projeto se dvide em Back e Frontend.

### Backend
```bash
  cd backend
```
Faça o download pacotes necessários

```bash
pip install -r requirements.txt
```
Faça as migrations

```bash
py manage.py makemigrations
```
```bash
py manage.py migrate
```

Popule o banco de dados com dados iniciais (*backend/api/fixtures diretório*)

```bash
py manage.py loaddata turmas.json
```
```bash
py manage.py loaddata usuarios.json
```
*(Opcional)* Crie um superuser

```bash
py manage.py createsuperuser
..<input a username, email, and password>
```

### Frontend
```bash
  cd frontend
```
Download pacotes necessários

```bash
    npm install
```
- Crie e configure o arquivo .env de acordo com exemplo: .env.sample 

- Crie o arquivo .env.local na raiz do diretório frontend _(onde se encontra outros arquivos de configuração como package.json, next.config, etc)_

- Defina o endereço da API do DJANGO: 

```bash
    DJANGO_API='http://localhost:8000'
```
## Rodando localmente
Apos ter clonado o projeto e instalado as dependências, inicie o servidor respectivamente: 

### Backend

```bash
  cd backend
```
```bash
  python .\manage.py runserver
```

### Frontend

```bash
    cd frontend
```
```bash
    npm run dev
```

