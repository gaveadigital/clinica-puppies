# Clínica Puppies — Next.js

Landing convertida do HTML original para Next.js 14 (App Router), pronta para Vercel.

## Rodar local

```bash
cd clinica-puppies
npm install
npm run dev
```

## Vercel (subdomínio)

1. Suba a pasta `clinica-puppies` no GitHub.
2. New Project no Vercel → selecione o repo.
3. Framework: Next.js (detecta sozinho).
4. Deploy.
5. Settings → Domains → adicione o subdomínio (ex.: `puppies.seudominio.com`).

## Logos locais

As imagens de conteúdo apontam para `https://projetos.gaveadigital.com/clinica-puppies/img/`.  
Se `logo.png` / `logo-full.png` não existirem nesse host, coloque os arquivos em `public/` e troque as URLs em `components/HomeClient.tsx`.
