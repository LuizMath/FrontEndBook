# 📚 Juridiq Books — Frontend

Interface web do Juridiq Books, construída com **Next.js** e autenticação via **Google OAuth (Auth.js)**.

---

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Git](https://git-scm.com/)
- Uma conta no [Google Cloud Console](https://console.cloud.google.com/) para as credenciais OAuth

---

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/LuizMath/FrontEndBook.git
cd FrontEndBook

# 2. Instale as dependências
npm install
```

---

## ⚙️ Configuração das variáveis de ambiente

Crie o arquivo **`.env.local`** na raiz do projeto (fora da pasta `src`):

```
FrontEndBook/
├── .env.local        ← aqui
├── src/
├── public/
└── ...
```

Cole o conteúdo abaixo e preencha com suas credenciais:

```dotenv
# URL base da API do backend (Fastify)
# Em desenvolvimento, use localhost. Em produção, substitua pela URL real.
NEXT_PUBLIC_API_URL=http://localhost:3333

# Auth.js — chave secreta para assinar os tokens de sessão
# Gere uma nova com: npx auth secret
AUTH_SECRET=sua_chave_secreta_aqui

# Google OAuth — obtenha em: https://console.cloud.google.com/
# URI de redirecionamento autorizado: http://localhost:3000/api/auth/callback/google
AUTH_GOOGLE_ID=seu_google_client_id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=seu_google_client_secret
```

### Como obter as credenciais do Google

1. Acesse [console.cloud.google.com](https://console.cloud.google.com/)
2. Crie um projeto (ou use um existente)
3. Vá em **APIs e Serviços → Tela de permissão → Branding** 
   - Defina o **Nome do app** como `Juridiq Books`
   - Salve
4. Vá em **APIs e Serviços → Credenciais → Criar credencial → ID do cliente OAuth**
   - Tipo: **Aplicativo da Web**
   - Origens JavaScript autorizadas: `http://localhost:3000`
   - URIs de redirecionamento autorizados: `http://localhost:3000/api/auth/callback/google`
5. Copie o **ID do cliente** e o **Segredo do cliente** para o `.env.local`

### Como gerar o AUTH_SECRET

```bash
npx auth secret
```

Copie o valor gerado e cole em `AUTH_SECRET` no `.env.local`.

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---
