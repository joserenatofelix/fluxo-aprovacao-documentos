# Fluxo de Aprovação de Documentos

Este é um projeto de backend para gerenciar o fluxo de aprovação de documentos. Ele fornece APIs para registro de usuários, login, upload de documentos, e gerenciamento de senhas.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM para PostgreSQL)
- Multer (para upload de arquivos)
- Nodemailer (para envio de emails)
- bcrypt (para hashing de senhas)
- dotenv (para gerenciamento de variáveis de ambiente)

## Configuração do Projeto

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e configurado

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/fluxo-aprovacao-documentos.git
   cd fluxo-aprovacao-documentos/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   PORT=5000
   DB_NAME=nome_do_banco
   DB_USER=usuario_do_banco
   DB_PASSWORD=senha_do_banco
   DB_HOST=localhost
   EMAIL_HOST=smtp.exemplo.com
   EMAIL_USER=seu_email@exemplo.com
   EMAIL_PASS=sua_senha
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

## Endpoints da API

### Registro de Usuário

- **URL:** `/register`
- **Método:** `POST`
- **Descrição:** Registra um novo usuário.
- **Corpo da Requisição:**
  ```json
  {
    "fullName": "Nome Completo",
    "username": "nomeusuario",
    "password": "senha",
    "email": "email@exemplo.com",
    "cpf": "12345678900",
    "role": "papel"
  }
  ```

### Login de Usuário

- **URL:** `/login`
- **Método:** `POST`
- **Descrição:** Realiza o login de um usuário.
- **Corpo da Requisição:**
  ```json
  {
    "username": "nomeusuario",
    "password": "senha"
  }
  ```

### Upload de Documento

- **URL:** `/upload/:area`
- **Método:** `POST`
- **Descrição:** Faz o upload de um documento.
- **Parâmetros de URL:** `area` - Área do documento.
- **Corpo da Requisição:** Arquivo a ser enviado.

### Listar Documentos

- **URL:** `/documents`
- **Método:** `GET`
- **Descrição:** Lista todos os documentos de uma área específica.
- **Parâmetros de Query:** `area` - Área dos documentos.

### Assinar Documento

- **URL:** `/documents/:id/sign`
- **Método:** `POST`
- **Descrição:** Assina um documento.
- **Parâmetros de URL:** `id` - ID do documento.

### Redefinir Senha

- **URL:** `/reset-password`
- **Método:** `POST`
- **Descrição:** Solicita a redefinição de senha.
- **Corpo da Requisição:**
  ```json
  {
    "email": "email@exemplo.com"
  }
  ```

### Confirmar Redefinição de Senha

- **URL:** `/reset-password/confirm`
- **Método:** `POST`
- **Descrição:** Confirma a redefinição de senha com um token.
- **Corpo da Requisição:**
  ```json
  {
    "token": "token_de_redefinicao",
    "newPassword": "nova_senha"
  }
  ```

### Alterar Senha

- **URL:** `/change-password`
- **Método:** `POST`
- **Descrição:** Altera a senha do usuário.
- **Corpo da Requisição:**
  ```json
  {
    "username": "nomeusuario",
    "passwordReceived": "senha_atual",
    "newPassword": "nova_senha"
  }
  ```

### Verificação de Saúde

- **URL:** `/health`
- **Método:** `GET`
- **Descrição:** Verifica a saúde do servidor.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.