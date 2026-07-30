# 💍 WedSnap - Memórias Compartilhadas

O **WedSnap** é uma aplicação web projetada para capturar os momentos mais espontâneos de um casamento através dos olhos dos convidados. O projeto permite que os amigos e familiares façam upload de fotos instantaneamente e participem de uma "caça ao tesouro" fotográfica através de desafios.

## 🚀 Funcionalidades

- 📸 **Upload Instantâneo:** Interface otimizada para dispositivos móveis para tirar e enviar fotos sem necessidade de instalar aplicativos.
- 🏆 **Desafios de Fotos:** Lista dinâmica de missões fotográficas (ex: "Foto com os noivos", "Foto do brinde").
- 🖼️ **Feed em Tempo Real:** Galeria cronológica para que todos acompanhem os cliques do evento.
- ⚡ **Otimização Automática:** Compressão de imagens no cliente para uploads rápidos mesmo em conexões 4G.

## 🛠️ Stack Tecnológica

- **Frontend:** [Next.js](https://nextjs.org/) + [ShadcnUI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Banco de Dados & Storage:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Arquitetura:** Monorepo

## 📂 Estrutura do Projeto

```text
├── api/             # Backend Express (Render)
├── apps/
│   └── web/         # Frontend Next.js (Hostinger)
└── packages/shared/ # Tipagens e esquemas comuns
