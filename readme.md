# TCC Banca Fácil

## Visão Geral

Banca Fácil é um sistema desenvolvido para facilitar a gestão de vendas, proporcionando uma experiência eficiente tanto para os usuários quanto para os administradores. Este projeto utiliza uma arquitetura RESTful para comunicação entre o cliente e o servidor, baseada no protocolo HTTP.

## Arquitetura

A arquitetura do sistema é do tipo RESTful, onde a comunicação ocorre via protocolo HTTP, permitindo o envio de mensagens entre o cliente e o servidor.

### Frontend

O frontend foi desenvolvido com as seguintes tecnologias:

- **Next.js 13.4.19:** Framework React para construção de aplicações web modernas.
- **Preact 10.17.1:** Biblioteca JavaScript para construção de interfaces de usuário eficientes.
- **Tailwind CSS 3.3.3:** Framework CSS utilitário para criação de designs escaláveis.
- **Leaflet 1.9.4:** Biblioteca JavaScript interativa para mapas.
- **Recharts 2.9.0:** Biblioteca React para visualização de dados.
- **JavaScript, HTML 5, CSS 3:** Tecnologias fundamentais para o desenvolvimento web.

### Backend

O backend foi desenvolvido em Node.js 18.17.1, utilizando o framework Express versão 4.18.2. Além disso, foram empregadas as seguintes tecnologias:

- **ORM (Object Relational Mapping):** Sequelize versão 6.32.1 para facilitar a interação com o banco de dados.
- **Docker 24.0.5:** Para empacotamento e distribuição da aplicação em contêineres.
- **Axios:** Biblioteca para a integração frontend-backend.

### Autenticação

O processo de autenticação é gerenciado pelo Json Web Token (JWT) versão 9.0.1, proporcionando uma camada de segurança eficaz.

### Banco de Dados

O banco de dados utilizado é o PostgreSQL versão 16, garantindo robustez e confiabilidade para o armazenamento dos dados do sistema.

## Requisitos do Sistema

- **Node.js:** Certifique-se de ter o Node.js instalado em seu ambiente. Você pode baixar a versão mais recente em [nodejs.org](https://nodejs.org/).
  
## Configuração do Ambiente

Para rodar o projeto, siga as instruções abaixo:

1. No diretório "server", execute `npm i` para instalar as dependências do backend.
2. No diretório "front", execute `npm i` para instalar as bibliotecas necessárias para o frontend.
3. Crie um arquivo `.env.local` no diretório "front" contendo `NEXT_PUBLIC_API_URL=http://localhost:5000` para redirecionar para a API.
4. No diretório "server", configure as variáveis de ambiente necessárias para o banco de dados no arquivo "secrets".
5. Após instalar as bibliotecas do server e front e configurar o postgres, execute npm run dev em ambos diretórios.

Agora, você está pronto para iniciar o projeto!
