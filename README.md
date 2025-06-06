# Mesa Fácil - Reservas Online 🍽️

Sistema de reservas online para restaurantes, pensado para facilitar o gerenciamento de mesas, horários e atendimento ao cliente de forma prática e eficiente.

## 🚀 Visão Geral

**Mesa Fácil** é uma plataforma SaaS que permite que restaurantes:
- Gerenciem reservas de mesas com facilidade.
- Organizem horários de atendimento.
- Evitem overbooking com controle de disponibilidade em tempo real.
- Ofereçam aos clientes uma experiência simples para agendar mesas online.

> Ideal para pequenos e médios restaurantes que desejam modernizar seu atendimento sem complicações.

## 🛠️ Funcionalidades (MVP)

- [x] Cadastro e login de restaurantes.
- [x] Painel administrativo para gerenciamento de mesas e horários.
- [x] Página pública para clientes fazerem reservas.
- [x] Confirmação automática e manual de reservas.
- [x] Gerenciamento de cardápio online
- [x] Gestão de pedidos e comandas por mesa
- [x] Notificações por e-mail (ou WhatsApp) para novas reservas.

## 🔧 Tecnologias Utilizadas

- **Next.js** – Frontend e backend fullstack com API routes.
- **Supabase** – Backend como serviço (auth, banco de dados PostgreSQL, storage e edge functions).
- **Tailwind CSS** – Estilização moderna e responsiva.
- **Shadcn/ui** – Componentes acessíveis e customizáveis.
- **TypeScript** – Tipagem estática e segurança.
- **Vercel** – Deploy e hospedagem.

## 📦 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/almeida-137/mesa-facil-reservas-online.git

# Acesse o diretório
cd mesa-facil-reservas-online

# Instale as dependências
npm install

# Execute o projeto
npm run dev
