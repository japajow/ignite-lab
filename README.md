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


