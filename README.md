## Projeto ignite lab com Diego

instalando o vite
npm create vite@latest

react
react-ts
cd .\event-platform\
npm install

npm run dev

## instalando as ferramentas do projeto

npm i tailwindcss postcss autoprefixer -D

npx tailwindcss init -p

> Configurando o tailwindcss

```jsx
DE;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

PARA;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"], // todos os tsx sao os arquivos que vai ter a estilização
  theme: {
    extend: {},
  },
  plugins: [],
};
```

> Criando arquivo estilo
> styles/global.css

colocamos a configuracao do tailwindcss

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Instalando algumas extensão no Visual Studio Code

GraphQl
Tailwind Css
Post Css

> Importando o arquivo global.css no main.tsx

import "./styles/global.css";

> Agora no App.tsx conseguimos usar as classes do tailwindcss

> Estilizando o nosso body global

**styles/global.css**

```css
body {
  @apply bg-zinc-900 text-zinc-100;
}
```

## Configurando o GraphCMS

// CMS - Content Management System

// Headless CMS : Painel de Admin (apenas o ADM) os dados sao fornecidos através de um API REST ou8 GRAPHQL

// React que consome essa API do CMS

// No GraphQl temos duas condições query e mutation

//Query - buscar dados
//Mutation - criar , alterar ou deletar dados

buscar todas as aulas usamos query

```tsx
  query MyQuery{
    lessons {
      id
      slug
      title
    }
  }
```

## Conectando o projeto front-end com o GraphQL CMS
