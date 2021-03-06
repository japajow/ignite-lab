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

## Configurando e acessando as Urls

https://app.graphcms.com/bde443fd156c44d1a8d096a67f26ea53/master/settings/api-access#root

Copiamos a URL Content API
https://api-sa-east-1.graphcms.com/v2/cl4o87jp717vc01z20w4v30a8/master

> Configuramos as permissões de acesso

Create permission > Read > Teacher > Stages only published

## Conectando o react com o graphql cms

Usamos a ferramenta chamada Apolo
instalando

npm i @apollo/client graphql

Criamos uma pasta dentro de src/lib

dentro de lib/apollo.ts

```tsx
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4o87jp717vc01z20w4v30a8/master",
  cache: new InMemoryCache(), // por padrao ele vai usr o cache se ja existir
});
```

> Com apollo instalado e configurado vamos fazer a requisição

Podemos usar o useEffect()
seria uma forma de usar ,porem nao vamos usar desta forma o exemplo seria como abaixo

```tsx
// criamos uma variável const
const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

// usamos o useEffect usando o client criado no apollo.ts
useEffect(() => {
  client
    .query({
      query: GET_LESSONS_QUERY,
    })
    .then((res) => {
      console.log(res.data);
    });
}, []);
```

## forma que vamos usar a requisição

vamos usar o useQuery;

```tsx
const { data } = useQuery(GET_LESSONS_QUERY);
```

se usarmos assim vai dar erro , temos que englobar com ApolloProvider nosso root
no main.tsx

```tsx
// import { ApolloProvider } from "@apollo/client";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
import { client } from "./lib/apollo";

// import "./styles/global.css";
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
<ApolloProvider client={client}>
  // passando o client // <App />
</ApolloProvider>;
//   </React.StrictMode>
// );
```

Agora no App.tsx usamos configuramos o JSX

```tsx
import { gql, useQuery } from "@apollo/client";

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

interface Lesson {
  id: string;
  title: string;
}

function App() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

  return (
    <ul>
      {data?.lessons.map((lesson) => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

## Criando componentes

src/components/Header.tsx Sidebar.tsx Video.tsx Lesson.tsx

// Colocamos em cada arquivo os códigos abaixo

```tsx
export function Header() {
  return <h1>Header</h1>;
}

export function Lesson() {
  return <h1>Lesson</h1>;
}

export function Sidebar() {
  return <h1>Sidebar</h1>;
}

export function Video() {
  return <h1>Video</h1>;
}
```

Criamos a pasta src/pages/Event.tsx

```tsx
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function Event() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}
```

Incluímos o Event no nosso App.tsx

App.tsx

```tsx
import { Event } from "./pages/Event";

function App() {
  return (
    <div>
      <Event />
    </div>
  );
}

export default App;
```

## Transformando o SVG em JSX

Site : https://svg2jsx.com

DE SVG >>>>
<svg width="237" height="34" viewBox="0 0 237 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.00165599 3.11163C-0.0106824 2.77356 0.0460742 2.43795 0.166991 2.12456C0.287907 1.81116 0.470515 1.52985 0.702477 1.29542C1.24043 0.826559 1.91658 0.572388 2.61493 0.572388C3.31328 0.572388 3.98943 0.829026 4.52738 1.29542C4.75687 1.53478 4.93948 1.81857 5.06287 2.13196C5.18625 2.44536 5.25041 2.78096 5.25041 3.1215C5.25041 3.46204 5.18625 3.79764 5.06287 4.11104C4.93948 4.42443 4.75687 4.70822 4.52738 4.94758C3.99189 5.41644 3.31822 5.67061 2.61986 5.67061C1.92151 5.67061 1.24783 5.41397 0.712348 4.94758C0.480386 4.71069 0.29531 4.42443 0.174394 4.10857C0.0534772 3.79024 -0.00574704 3.45217 0.00165599 3.11163ZM4.96169 26.2585H0.273101V7.86191H4.96169V26.2585Z" fill="white"/>
<path d="M8.01177 16.9727C8.01177 14.1201 8.69779 11.8276 10.0673 10.0903C10.7089 9.2464 11.548 8.57025 12.5104 8.1162C13.4727 7.66215 14.5314 7.44499 15.5949 7.48447C16.5031 7.43759 17.4112 7.60292 18.2452 7.96567C19.0793 8.32842 19.8147 8.88118 20.3971 9.5746L20.5969 7.82255H25.135V25.7724C25.172 27.2654 24.7821 28.7361 24.0147 30.0193C23.262 31.2235 22.1664 32.181 20.8684 32.7708C19.3754 33.4272 17.7566 33.748 16.1255 33.711C14.7485 33.711 13.3864 33.4321 12.118 32.8991C10.9681 32.4623 9.95137 31.7344 9.17158 30.7892L11.3802 27.7688C11.9378 28.4252 12.6337 28.9508 13.4185 29.3111C14.2032 29.6714 15.0595 29.854 15.9232 29.849C17.0583 29.9132 18.1737 29.5332 19.0275 28.7904C19.41 28.3931 19.7061 27.9243 19.8961 27.4085C20.0861 26.8928 20.1651 26.3449 20.1305 25.7971V24.8026C19.563 25.4418 18.8622 25.9452 18.0725 26.2808C17.2853 26.6164 16.4315 26.7719 15.5752 26.7373C14.5215 26.7644 13.4752 26.5424 12.5252 26.0858C11.5751 25.6293 10.7509 24.9556 10.1167 24.1191C8.72 22.367 8.03151 20.0302 8.03151 17.1775V16.9678H8.00684L8.01177 16.9727ZM13.0088 17.328C12.9323 18.7198 13.2901 20.1017 14.0354 21.2837C14.3389 21.7403 14.7559 22.1153 15.2445 22.367C15.7356 22.6187 16.281 22.7446 16.8337 22.7273C17.4852 22.7717 18.1342 22.6385 18.7116 22.3374C19.2891 22.0388 19.7727 21.5873 20.1083 21.032V13.207C19.7826 12.6543 19.3063 12.2002 18.7338 11.9016C18.1613 11.603 17.5173 11.4673 16.8732 11.5117C16.313 11.4945 15.7603 11.6203 15.2643 11.8769C14.7683 12.1336 14.3488 12.5136 14.0452 12.98C13.3568 13.9547 13.0088 15.3983 13.0088 17.328Z" fill="white"/>
<path d="M33.0981 7.83265L33.256 10.0289C33.8877 9.20468 34.6996 8.54334 35.6274 8.10163C36.5553 7.65992 37.5744 7.44523 38.5985 7.48224C40.5677 7.48224 42.036 8.07942 42.9885 9.27131C43.941 10.4657 44.4444 12.2078 44.4741 14.5645V26.814H39.5116V14.6829C39.5856 13.8415 39.3388 13.0024 38.828 12.3386C38.5146 12.0697 38.1519 11.8673 37.7595 11.7415C37.3671 11.6156 36.9575 11.5712 36.5479 11.6107C35.9112 11.586 35.2795 11.7415 34.7267 12.0647C34.174 12.3855 33.7174 12.8593 33.4139 13.4318V26.8017H28.4514V7.84499L33.0981 7.83265Z" fill="white"/>
<path d="M47.5118 3.11153C47.4994 2.77346 47.5636 2.43786 47.6968 2.12446C47.8301 1.81107 48.03 1.52975 48.2866 1.29285C48.8813 0.826463 49.6315 0.569824 50.4039 0.569824C51.1763 0.569824 51.924 0.826463 52.5211 1.29285C53.0295 1.77899 53.3133 2.43539 53.3133 3.11894C53.3133 3.80248 53.0295 4.45889 52.5211 4.94502C51.9289 5.41141 51.1812 5.66805 50.4113 5.66805C49.6414 5.66805 48.8936 5.41141 48.3014 4.94502C48.0448 4.70812 47.8424 4.42187 47.7067 4.10601C47.571 3.79015 47.5068 3.45207 47.5167 3.11153H47.5118ZM52.9949 26.2608H47.8153V7.86182H52.9949V26.2584V26.2608Z" fill="white"/>
<path d="M62.4537 3.33377V7.94586H65.5605V11.6227H62.4537V21.0048C62.4043 21.5354 62.545 22.0684 62.8485 22.5002C63.0509 22.6779 63.2853 22.8087 63.5395 22.8877C63.7936 22.9642 64.0601 22.9864 64.3217 22.9493C64.798 22.9518 65.2718 22.9148 65.7431 22.8358V26.6385C64.7906 26.9396 63.7986 27.0901 62.8041 27.0876C59.4061 27.0876 57.6763 25.3134 57.6146 21.7673V11.6449H54.9717V7.96807H57.6146V3.35598H62.4562V3.3313L62.4537 3.33377Z" fill="white"/>
<path d="M76.4874 27.0804C75.2486 27.1273 74.0123 26.9274 72.85 26.4906C71.6902 26.0538 70.6291 25.3875 69.7284 24.5313C67.9887 22.831 67.1225 20.5731 67.1225 17.7328V17.2393C67.088 15.4823 67.4655 13.7426 68.2207 12.1583C68.8993 10.7246 69.9801 9.52037 71.3324 8.6937C72.7192 7.86949 74.3084 7.44999 75.9223 7.47466C78.4985 7.47466 80.5418 8.289 82.0199 9.9226C83.4981 11.5562 84.2458 13.8635 84.2458 16.8518V18.9074H72.2356C72.3466 20.045 72.8698 21.1012 73.7088 21.8785C74.5675 22.6311 75.6804 23.0284 76.8205 22.989C77.6916 23.0284 78.5627 22.8557 79.3524 22.488C80.1445 22.1203 80.8354 21.5651 81.3684 20.8742L83.8435 23.6552C83.0637 24.7509 82.0026 25.617 80.7737 26.1624C79.4313 26.7867 77.968 27.1001 76.4874 27.0779V27.0804ZM75.8927 11.5661C75.4386 11.5488 74.987 11.6302 74.5675 11.8054C74.148 11.9806 73.7729 12.2422 73.4645 12.5778C72.7883 13.4094 72.3762 14.4236 72.2775 15.4897H79.2833V15.085C79.3227 14.1325 78.9995 13.1972 78.3752 12.4766C78.0519 12.1633 77.6669 11.9214 77.245 11.766C76.823 11.6105 76.3739 11.5414 75.9248 11.5685H75.8951L75.8927 11.5661Z" fill="white"/>
<path d="M97.7711 26.2587H92.8135V0.00012207H97.7711V26.2587Z" fill="white"/>
<path d="M112.209 26.2587C111.982 25.8146 111.817 25.2618 111.713 24.6005C110.517 25.933 108.962 26.6017 107.047 26.6017C105.236 26.6017 103.733 26.0786 102.543 25.0298C101.352 23.9811 100.757 22.6584 100.757 21.0643C100.757 19.1049 101.482 17.5997 102.936 16.5509C104.389 15.5021 106.489 14.9716 109.236 14.9617H111.509V13.9006C111.509 13.0468 111.289 12.3608 110.85 11.85C110.41 11.3367 109.719 11.08 108.772 11.08C107.94 11.08 107.286 11.2799 106.815 11.6797C106.341 12.0795 106.107 12.6248 106.107 13.3207H101.166C101.166 12.2497 101.497 11.2577 102.158 10.3471C102.82 9.43657 103.755 8.72095 104.962 8.20273C106.168 7.68452 107.526 7.42542 109.031 7.42542C111.311 7.42542 113.12 7.99792 114.46 9.14292C115.8 10.2879 116.469 11.8993 116.469 13.9722V21.9897C116.481 23.7442 116.725 25.0718 117.204 25.9725V26.2637H112.212L112.209 26.2587ZM108.123 22.8237C108.851 22.8237 109.525 22.6609 110.139 22.3376C110.753 22.0119 111.21 21.5776 111.506 21.0297V17.8489H109.66C107.188 17.8489 105.87 18.7027 105.712 20.4128L105.695 20.704C105.695 21.3184 105.912 21.8268 106.344 22.2266C106.778 22.6263 107.37 22.8262 108.123 22.8262V22.8237Z" fill="white"/>
<path d="M136.58 17.1827C136.58 20.1464 135.948 22.4561 134.682 24.1144C133.417 25.7727 131.65 26.6018 129.382 26.6018C127.376 26.6018 125.774 25.8319 124.577 24.2945L124.355 26.2613H119.911V0.000244141H124.851V9.41937C125.991 8.08683 127.489 7.41809 129.347 7.41809C131.603 7.41809 133.372 8.24723 134.655 9.90551C135.938 11.5638 136.578 13.8982 136.578 16.9063V17.1802L136.58 17.1827ZM131.64 16.8249C131.64 14.9568 131.344 13.5922 130.751 12.731C130.159 11.8698 129.276 11.4404 128.101 11.4404C126.529 11.4404 125.446 12.0845 124.854 13.3726V20.672C125.458 21.97 126.551 22.6215 128.136 22.6215C129.72 22.6215 130.779 21.8343 131.282 20.2624C131.521 19.5097 131.64 18.3647 131.64 16.8249Z" fill="white"/>
<path d="M164.51 17.501H162.227V22.0317H160.179V10.251H164.322C165.682 10.251 166.73 10.557 167.471 11.1665C168.211 11.776 168.579 12.6594 168.579 13.8143C168.579 14.6015 168.389 15.2628 168.009 15.7934C167.629 16.3264 167.098 16.7336 166.419 17.0198L169.065 21.9256V22.0317H166.871L164.507 17.501H164.51ZM162.227 15.8501H164.332C165.023 15.8501 165.561 15.6749 165.951 15.327C166.341 14.979 166.533 14.5028 166.533 13.8982C166.533 13.2936 166.353 12.7779 165.995 12.4324C165.637 12.0869 165.102 11.9093 164.389 11.8994H162.227V15.8477V15.8501Z" fill="#C4C4CC"/>
<path d="M179.066 16.7731H174.227V20.3981H179.883V22.0317H172.179V10.251H179.827V11.9019H174.227V15.1543H179.066V16.7731Z" fill="#C4C4CC"/>
<path d="M189.803 19.2901H185.238L184.283 22.0341H182.156L186.608 10.251H188.444L192.903 22.0341H190.766L189.803 19.2901ZM185.813 17.6392H189.228L187.521 12.7507L185.813 17.6392Z" fill="#C4C4CC"/>
<path d="M204.716 18.1967C204.597 19.4528 204.133 20.4349 203.324 21.1382C202.514 21.8415 201.439 22.1944 200.096 22.1944C199.158 22.1944 198.332 21.9723 197.616 21.5256C196.901 21.0814 196.35 20.4472 195.96 19.628C195.573 18.8087 195.371 17.8562 195.353 16.7704V15.6698C195.353 14.5594 195.551 13.5797 195.943 12.7333C196.335 11.8869 196.903 11.2329 197.638 10.7739C198.374 10.3149 199.225 10.0854 200.192 10.0854C201.493 10.0854 202.539 10.4383 203.331 11.1416C204.123 11.8449 204.585 12.8418 204.716 14.1324H202.677C202.581 13.286 202.334 12.674 201.937 12.299C201.54 11.9239 200.96 11.7363 200.192 11.7363C199.302 11.7363 198.618 12.0621 198.142 12.7135C197.663 13.365 197.421 14.3175 197.409 15.576V16.6199C197.409 17.8932 197.636 18.8655 198.092 19.5367C198.549 20.2054 199.215 20.541 200.096 20.541C200.901 20.541 201.505 20.3609 201.91 19.9981C202.315 19.6354 202.571 19.0357 202.68 18.1942H204.718L204.716 18.1967Z" fill="#C4C4CC"/>
<path d="M216.481 11.9019H212.807V22.0341H210.776V11.9019H207.134V10.251H216.481V11.9019Z" fill="#C4C4CC"/>
<path d="M222.759 10.251H224.798V18.5128C224.798 19.6405 224.445 20.5363 223.741 21.2001C223.038 21.8639 222.108 22.1945 220.953 22.1945C219.724 22.1945 218.774 21.8836 218.105 21.2642C217.436 20.6448 217.101 19.7812 217.101 18.6756H219.139C219.139 19.3024 219.295 19.7713 219.606 20.0871C219.916 20.403 220.366 20.5609 220.953 20.5609C221.503 20.5609 221.942 20.3783 222.268 20.0156C222.594 19.6504 222.757 19.1494 222.757 18.5054V10.251H222.759Z" fill="#C4C4CC"/>
<path d="M234.952 18.9988C234.952 18.4806 234.769 18.0808 234.407 17.802C234.044 17.5231 233.385 17.2393 232.435 16.9531C231.485 16.6668 230.73 16.3485 230.17 15.9981C229.096 15.3244 228.558 14.4434 228.558 13.3601C228.558 12.4101 228.946 11.6278 229.721 11.0134C230.495 10.3989 231.5 10.0905 232.736 10.0905C233.555 10.0905 234.286 10.241 234.93 10.5445C235.571 10.8456 236.077 11.2774 236.443 11.8351C236.81 12.3928 236.993 13.0122 236.993 13.6933H234.955C234.955 13.0788 234.762 12.5976 234.377 12.2497C233.992 11.9017 233.439 11.7265 232.721 11.7265C232.053 11.7265 231.532 11.8697 231.164 12.1559C230.794 12.4422 230.609 12.8419 230.609 13.3527C230.609 13.7846 230.809 14.1449 231.209 14.4336C231.608 14.7223 232.265 15.0036 233.183 15.275C234.101 15.5465 234.836 15.8574 235.391 16.2054C235.947 16.5533 236.354 16.9531 236.613 17.4022C236.872 17.8538 237 18.3794 237 18.984C237 19.9661 236.625 20.7459 235.873 21.3258C235.12 21.9057 234.098 22.1969 232.81 22.1969C231.956 22.1969 231.174 22.039 230.458 21.7231C229.743 21.4072 229.188 20.9729 228.79 20.4152C228.393 19.86 228.196 19.211 228.196 18.4732H230.244C230.244 19.1419 230.466 19.6601 230.908 20.0278C231.349 20.3955 231.983 20.5781 232.81 20.5781C233.523 20.5781 234.056 20.435 234.417 20.1462C234.774 19.8575 234.955 19.475 234.955 19.0012L234.952 18.9988Z" fill="#C4C4CC"/>
<path d="M150.271 33.1458H145.313V0.569946H150.271V33.1458Z" fill="#00B37E"/>
</svg>

PARA >>>>

```tsx
export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="237"
      height="34"
      fill="none"
      viewBox="0 0 237 34"
    >
      <path
        fill="#fff"
        d="M.002 3.112a2.49 2.49 0 01.165-.987c.12-.314.304-.595.535-.83A2.906 2.906 0 012.615.572c.698 0 1.374.257 1.912.723.23.24.412.524.536.837a2.701 2.701 0 010 1.979 2.568 2.568 0 01-.536.837 2.889 2.889 0 01-1.907.723 2.901 2.901 0 01-1.908-.723 2.458 2.458 0 01-.538-.84 2.645 2.645 0 01-.172-.996zm4.96 23.146H.273V7.862h4.689v18.397zM8.012 16.973c0-2.853.686-5.145 2.055-6.883a6.653 6.653 0 015.528-2.606 5.869 5.869 0 014.802 2.09l.2-1.751h4.538v17.95a7.891 7.891 0 01-1.12 4.246 7.243 7.243 0 01-3.147 2.752 11.155 11.155 0 01-4.742.94c-1.378 0-2.74-.279-4.008-.812a7.08 7.08 0 01-2.946-2.11l2.208-3.02a5.905 5.905 0 004.543 2.08 4.356 4.356 0 003.104-1.059 3.938 3.938 0 001.103-2.993v-.994a5.775 5.775 0 01-4.555 1.935 6.647 6.647 0 01-3.05-.652 6.615 6.615 0 01-2.408-1.967c-1.397-1.752-2.085-4.089-2.085-6.942v-.21h-.025l.005.006zm4.997.355a6.723 6.723 0 001.026 3.956 3.233 3.233 0 002.799 1.443c.651.045 1.3-.088 1.878-.39a3.52 3.52 0 001.396-1.305v-7.825a3.448 3.448 0 00-1.374-1.305 3.504 3.504 0 00-1.86-.39 3.28 3.28 0 00-1.61.365 3.22 3.22 0 00-1.219 1.103c-.688.975-1.036 2.418-1.036 4.348zM33.098 7.833l.158 2.196a6.527 6.527 0 012.371-1.927 6.38 6.38 0 012.971-.62c1.97 0 3.438.597 4.39 1.79.953 1.194 1.456 2.936 1.486 5.293v12.249h-4.962V14.683a3.367 3.367 0 00-.684-2.344 3.086 3.086 0 00-1.069-.598 3.008 3.008 0 00-1.211-.13 3.349 3.349 0 00-1.821.454c-.553.32-1.01.794-1.313 1.367v13.37H28.45V7.845l4.647-.012zM47.512 3.112a2.304 2.304 0 01.185-.988 2.42 2.42 0 01.59-.831A3.439 3.439 0 0150.404.57c.772 0 1.52.256 2.117.723.508.486.792 1.142.792 1.826 0 .683-.284 1.34-.792 1.826a3.417 3.417 0 01-2.11.723c-.77 0-1.517-.257-2.11-.723a2.47 2.47 0 01-.594-.839 2.342 2.342 0 01-.19-.994h-.005zm5.483 23.149h-5.18V7.86h5.18v18.4zM62.454 3.334v4.612h3.107v3.677h-3.107v9.382c-.05.53.091 1.063.395 1.495a1.824 1.824 0 001.473.45c.476.002.95-.035 1.421-.114v3.803a9.672 9.672 0 01-2.939.449c-3.398 0-5.128-1.775-5.19-5.32V11.644h-2.642V7.968h2.643V3.356h4.841v-.025l-.002.003zM76.487 27.08a9.277 9.277 0 01-6.759-2.55c-1.74-1.699-2.605-3.957-2.605-6.797v-.494a11.295 11.295 0 011.098-5.08 8.141 8.141 0 013.111-3.465 8.72 8.72 0 014.59-1.22c2.577 0 4.62.815 6.098 2.449 1.478 1.633 2.226 3.94 2.226 6.929v2.055h-12.01a4.665 4.665 0 001.473 2.971 4.487 4.487 0 003.111 1.111 5.426 5.426 0 004.548-2.115l2.476 2.781a7.506 7.506 0 01-3.07 2.507 9.81 9.81 0 01-4.287.916v.002zm-.594-15.514a3.127 3.127 0 00-2.428 1.012 5.405 5.405 0 00-1.188 2.912h7.006v-.405a3.749 3.749 0 00-.908-2.608 3.252 3.252 0 00-2.45-.908h-.03l-.002-.003zM97.771 26.259h-4.957V0h4.957V26.26zM112.209 26.259c-.227-.444-.392-.997-.496-1.659-1.196 1.333-2.751 2.002-4.666 2.002-1.811 0-3.314-.523-4.504-1.572-1.191-1.049-1.786-2.372-1.786-3.966 0-1.96.725-3.464 2.179-4.513 1.453-1.049 3.553-1.58 6.3-1.59h2.273v-1.06c0-.854-.22-1.54-.659-2.051-.44-.513-1.131-.77-2.078-.77-.832 0-1.486.2-1.957.6-.474.4-.708.945-.708 1.64h-4.941c0-1.07.331-2.062.992-2.973.662-.91 1.597-1.626 2.804-2.144 1.206-.518 2.564-.778 4.069-.778 2.28 0 4.089.573 5.429 1.718 1.34 1.145 2.009 2.756 2.009 4.83v8.017c.012 1.754.256 3.082.735 3.983v.29h-4.992l-.003-.004zm-4.086-3.435c.728 0 1.402-.163 2.016-.486.614-.326 1.071-.76 1.367-1.308v-3.181h-1.846c-2.472 0-3.79.854-3.948 2.564l-.017.291c0 .614.217 1.123.649 1.523.434.4 1.026.6 1.779.6v-.003zM136.58 17.183c0 2.963-.632 5.273-1.898 6.931-1.265 1.659-3.032 2.488-5.3 2.488-2.006 0-3.608-.77-4.805-2.308l-.222 1.967h-4.444V.001h4.94v9.418c1.14-1.332 2.638-2 4.496-2 2.256 0 4.025.828 5.308 2.487 1.283 1.658 1.923 3.992 1.923 7v.274l.002.003zm-4.94-.358c0-1.868-.296-3.233-.889-4.094-.592-.861-1.475-1.29-2.65-1.29-1.572 0-2.655.643-3.247 1.932v7.299c.604 1.298 1.697 1.95 3.282 1.95 1.584 0 2.643-.788 3.146-2.36.239-.752.358-1.897.358-3.437z"
      ></path>
      <path
        fill="#C4C4CC"
        d="M164.51 17.501h-2.283v4.53h-2.048v-11.78h4.143c1.36 0 2.408.306 3.149.915.74.61 1.108 1.493 1.108 2.648 0 .787-.19 1.449-.57 1.98-.38.532-.911.94-1.59 1.226l2.646 4.906v.106h-2.194l-2.364-4.531h.003zm-2.283-1.65h2.105c.691 0 1.229-.176 1.619-.524.39-.348.582-.824.582-1.429 0-.604-.18-1.12-.538-1.466-.358-.345-.893-.523-1.606-.533h-2.162V15.85zM179.066 16.773h-4.839v3.625h5.656v1.634h-7.704V10.25h7.648v1.65h-5.6v3.253h4.839v1.62zM189.803 19.29h-4.565l-.955 2.744h-2.127l4.452-11.783h1.836l4.459 11.783h-2.137l-.963-2.744zm-3.99-1.65h3.415l-1.707-4.89-1.708 4.89zM204.716 18.197c-.119 1.256-.583 2.238-1.392 2.941-.81.703-1.885 1.056-3.228 1.056-.938 0-1.764-.222-2.48-.668-.715-.445-1.266-1.079-1.656-1.898-.387-.82-.589-1.772-.607-2.858v-1.1c0-1.11.198-2.09.59-2.937.392-.846.96-1.5 1.695-1.96.736-.458 1.587-.688 2.554-.688 1.301 0 2.347.353 3.139 1.057.792.703 1.254 1.7 1.385 2.99h-2.039c-.096-.846-.343-1.458-.74-1.833-.397-.375-.977-.563-1.745-.563-.89 0-1.574.326-2.05.977-.479.652-.721 1.605-.733 2.863v1.044c0 1.273.227 2.245.683 2.917.457.668 1.123 1.004 2.004 1.004.805 0 1.409-.18 1.814-.543.405-.363.661-.962.77-1.804h2.038l-.002.003zM216.481 11.902h-3.674v10.132h-2.031V11.902h-3.642V10.25h9.347v1.65zM222.759 10.251h2.039v8.262c0 1.127-.353 2.023-1.057 2.687-.703.664-1.633.995-2.788.995-1.229 0-2.179-.311-2.848-.93-.669-.62-1.004-1.484-1.004-2.59h2.038c0 .627.156 1.096.467 1.412.31.316.76.474 1.347.474.55 0 .989-.183 1.315-.545.326-.366.489-.867.489-1.51V10.25h.002zM234.952 18.999c0-.518-.183-.918-.545-1.197-.363-.279-1.022-.563-1.972-.849-.95-.286-1.705-.604-2.265-.955-1.074-.674-1.612-1.555-1.612-2.638 0-.95.388-1.732 1.163-2.347.774-.614 1.779-.922 3.015-.922.819 0 1.55.15 2.194.454a3.597 3.597 0 011.513 1.29c.367.558.55 1.177.55 1.858h-2.038c0-.614-.193-1.095-.578-1.443-.385-.348-.938-.524-1.656-.524-.668 0-1.189.144-1.557.43-.37.286-.555.686-.555 1.197 0 .432.2.792.6 1.08.399.29 1.056.57 1.974.842.918.271 1.653.582 2.208.93.556.348.963.748 1.222 1.197.259.452.387.977.387 1.582 0 .982-.375 1.762-1.127 2.342-.753.58-1.775.87-3.063.87a5.755 5.755 0 01-2.352-.473c-.715-.316-1.27-.75-1.668-1.308-.397-.555-.594-1.204-.594-1.942h2.048c0 .669.222 1.187.664 1.555.441.367 1.075.55 1.902.55.713 0 1.246-.143 1.607-.432.357-.288.538-.671.538-1.145l-.003-.002z"
      ></path>
      <path fill="#00B37E" d="M150.271 33.146h-4.958V.57h4.958v32.576z"></path>
    </svg>
  );
}
```

Apos transformando o SVG em JSX criamos no src/components/Logo.tsx

Logo.tsx e colamos o JSX acima nele

Header.tsx importamos a Logo.tsx criado

```tsx
import { Logo } from "./Logo";

export function Header() {
  return <Logo />;
}
```

## Colocando Css e estruturando

No Header.tsx

```tsx
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="w-full py-5">
      <Logo />
    </header>
  );
}
```

> Colocando as cores e fonte do nosso projeto no tailwind.config.ts
> Incluindo as cores

```js
colors: {
green: {
300: '#00B37E',
500: '#00875F',
700: '#015F43',
},
blue: {
500: '#81D8F7',
},
orange: {
500: '#FBA94C',
},
red: {
500: '#F75A68',
},
gray: {
100: '#E1E1E6',
200: '#C4C4CC',
300: '#8D8D99',
500: '#323238',
600: '#29292E',
700: '#121214',
900: '#09090A'
}
},
```

Includindo a fonte Roboto

```jsx
  fontFamily: {
        sans: "Roboto, sans-serif",
      },
```

> No global.css mudamos a cor de fundo globalmente

```css
body {
  @apply bg-gray-900 text-gray-100;
}
```

> Incluindo Css no Event.tsx

```tsx
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  return (
    <div className="flex justify-center items-center">
      <Header />
      <main>
        <Video />
        <Sidebar />
      </main>
    </div>
  );
}
```

> Dentro do Video.tsx colocamos o css

```tsx
export function Video() {
  return (
    <div className="flex-1">
      <Video />
    </div>
  );
}
```

> No Sidebar.tsx colocamos o Css e as tags

```tsx
export function Sidebar() {
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600"></aside>
  );
}
```

No Event.tsx colocamos um hackizinho para que o side bar pegue toda a tela

```tsx
export function Event() {
  return (
    // colocamos flex flex-col e min-h-screen para ocupar toda a tela
    <div className="flex flex-col min-h-screen">
      <Header />
      // colocamos flex-1
      <main className="flex flex-1">
        <Video />
        <Sidebar />
      </main>
    </div>
  );
}
```

> Incluindo o titulo no sidebar

```tsx
<span className="text-2xl font-bold pb-6 mb-6 border-b border-gray-500 block">
  Cronograma das aulas
</span>
```

Ficaria por momento assim a Sidebar.tsx

```tsx
export function Sidebar() {
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="text-2xl font-bold pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>
    </aside>
  );
}
```

> Formatando webkit o texto global

global.css

```css
body {
  @apply bg-gray-900 text-gray-100;
  -webkit-font-smoothing: antialiased;
}
```

## Continuando a implementar a estrutura do Sidebar.tsx no component Lesson.tsx

```tsx
<div className="flex flex-col gap-8">
  <Lesson />
  <Lesson />
  <Lesson />
  <Lesson />
  <Lesson />
  <Lesson />
</div>
```

Sidebar.tsx ficaria assim

```tsx
import { Lesson } from "./Lesson";

export function Sidebar() {
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="text-2xl font-bold pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        <Lesson />
        <Lesson />
        <Lesson />
        <Lesson />
        <Lesson />
        <Lesson />
      </div>
    </aside>
  );
}
```

> Incluindo a estrutura do Lesson.tsx

```tsx
export function Lesson() {
  return (
    <a href="#">
      <span>Domingo • 20 de junho • 19h00</span>

      <div>
        <header>
          <span>Conteúdo liberado</span>
          <span>AO VIVO</span>
        </header>

        <strong>Abertura do evento Ignite labs</strong>
      </div>
    </a>
  );
}
```

> Estilizando o Lesson.tsx

```tsx
export function Lesson() {
  return (
    <a href="#">
      <span className="text-gray-300">Domingo • 20 de junho • 19h00</span>

      <div className="rounded border border-gray-500 p-4 mt-2 ">
        <header className="flex items-center justify-between">
          <span className="text-sm text-blue-500 font-medium">
            Conteúdo liberado
          </span>
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
            AO VIVO
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">
          Abertura do evento Ignite labs
        </strong>
      </div>
    </a>
  );
}
```

> Incluindo o Ícones no nosso projeto

SIte : https://phosphoricons.com/

npm i phosphor-react

Lesson.tsx

```tsx
import { CheckCircle } from "phosphor-react";

// Incluímos o ícone
<span className="text-sm text-blue-500 font-medium flex items-center gap-2">
  <CheckCircle size={20} />
  Conteúdo liberado
</span>;
```

> Ficaria assim completo

```tsx
import { CheckCircle } from "phosphor-react";

export function Lesson() {
  return (
    <a href="#">
      <span className="text-gray-300">Domingo • 20 de junho • 19h00</span>

      <div className="rounded border border-gray-500 p-4 mt-2 ">
        <header className="flex items-center justify-between">
          <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
            <CheckCircle size={20} />
            Conteúdo liberado
          </span>
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
            AO VIVO
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">
          Abertura do evento Ignite labs
        </strong>
      </div>
    </a>
  );
}
```

## Criando as Props no Lesson.tsx

Lesson.tsx

criando os dados com a interface LessonProps

```tsx
interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}
```

Incluindo as props no JSX do Lesson

```tsx
import { CheckCircle, Lock } from "phosphor-react";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const isLessonAvailable = false;
  return (
    <a href="#">
      <span className="text-gray-300">{props.availableAt.toString()}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 ">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )}
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
            {props.type === "live" ? "AO VIVO" : "AULA PRATICA"}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">{props.title}</strong>
      </div>
    </a>
  );
}
```

Agora no Sidebar.tsx os Lesson temos que incluir as propriedades(props)

Sidebar.tsx

```tsx
<div className="flex flex-col gap-8">
  <Lesson
    title="Abertura do evento Ignite labs"
    slug="aula-1"
    availableAt={new Date()}
    type="class"
  />
</div>
```

> Buscando as aulas no GraphCMS

Site : https://app.graphcms.com/bde443fd156c44d1a8d096a67f26ea53/master/graphiql

Criamos o gql

```gql
query {
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    slug
    title
    lessonType
    availableAt
  }
}

Agora que criamos incluímos ele na nossa variável
const GET_LESSON_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      slug
      title
      lessonType
      availableAt
    }
  }
`;
```

> Com a gql criada chamamos o hook useQuery

```tsx
const { data } = useQuery(GET_LESSON_QUERY);
```

> Inserindo os dados que pegamos pela API graphCMS no JSX Sidebar.tsx

Sidebar.tsx

Primeiro criamos a interface
como ela e um objeto de array criamos a interface desta forma abaixo

```tsx
interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    type: "live" | "class";
  }[];
}
```

> Agora que criamos a interface inserimos ele genericamente

```tsx
const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSON_QUERY);
```

> Inserimos os dados na Lesson

```tsx
 <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
             <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
```

> Precisamos converter a date string para uma data

Para isso vamos incluir uma biblioteca chamada date-fns
npm i date-fns

importamos e usamos a funcao do date-fns
import { isPast} from 'date-fns'

usamos ele no isLessonAvailable = isPast()

Lesson.tsx

```tsx
import { isPast } from "date-fns";
const isLessonAvailable = isPast(props.availableAt);
```

> Criando uma noa aula no CMS

> Formatando a Data

usamos o format do date-fns

Lesson.tsx
documentação do date-fns
https://date-fns.org/v1.29.0/docs/format

```tsx
const availableDateFormat = format(
  props.availableAt,
  "EEEE' • 'd' de 'MMMM' • 'k'h'mm"
);
```

> Agora com a data formatada passamos de ENG para PT-BR

```tsx
import ptBR from "date-fns/locale/pt-BR";
const availableDateFormat = format(
  props.availableAt,
  "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
  {
    locale: ptBR,
  }
);
```

## Estruturando o componente Video

> Criando a estrutura do video

```tsx
<div className="bg-black flex justify-center">
  <div className="h-full w-full max-w-[1100px] mx-h-[60vh] aspect-video"></div>
</div>
```

> Criando a estrutura do Teacher

```jsx
<div className="p-8 max-w-[1100px] mx-auto">
  <div className="flex items-start gap-16 ">
    <div className="flex-1">
      <h1 className="text-2xl font-bold ">Aula 01 - abertura do ignite lab</h1>
      <p className="mt-4 text-gray-200 leading-relaxed">
        Nessa aula vamos dar início ao projeto criando a estrutura base da
        aplicação utilizando ReactJS, Vite e TailwindCSS. Vamos também realizar
        o setup do nosso projeto no GraphCMS criando as entidades da aplicação e
        integrando a API GraphQL gerada pela plataforma no nosso front-end
        utilizando Apollo Client.
      </p>
      <div className="flex items-center gap-4 mt-6 ">
        <img
          className="h-16 w-16 rounded-full border-2 border-blue-500"
          src="https://github.com/japajow.png"
          alt=""
        />
        <div className="leading-relaxed">
          <strong className="font-bold text-2xl block">Bruno Kiyomi</strong>
          <span className="text-gray-200 text-sm block">CTO @Grupo HAMA</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <a
        href="#"
        className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
      >
        <DiscordLogo size={24} />
        Comunidade do Discord
      </a>
      <a
        href="#"
        className="p-4 text-sm border-blue-500 border text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
      >
        <Lightning size={24} />
        Acesse o desafio
      </a>
    </div>
  </div>
  <div className="gap-8 mt-20 grid grid-cols-2">
    {/* Wallpaper 1 */}
    <a
      href="#"
      className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
    >
      <div className="bg-green-700 h-full p-6 flex items-center">
        <FileArrowDown size={40} />
      </div>
      <div className="py-6 leading-relaxed">
        <strong className="text-2xl">Material complementar</strong>
        <p className="text-sm mt-2 text-gray-200">
          Acesse o material complementar para acelerar o seu desenvolvimento
        </p>
      </div>
      <div className="h-full p-6 flex items-center">
        <CaretRight size={24} />
      </div>
    </a>
    {/* Wallpaper2 */}
    <a
      href="#"
      className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
    >
      <div className="bg-green-700 h-full p-6 flex items-center">
        <FileArrowDown size={40} />
      </div>
      <div className="py-6 leading-relaxed">
        <strong className="text-2xl">Wallpapers exclusivos</strong>
        <p className="text-sm mt-2 text-gray-200">
          Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
        </p>
      </div>
      <div className="h-full p-6 flex items-center">
        <CaretRight size={24} />
      </div>
    </a>
  </div>
</div>
```

> Video.tsx ficaria assim completo

```tsx
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";

export function Video() {
  return (
    <div className="flex-1">
      {/* Video */}
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] mx-h-[60vh] aspect-video"></div>
      </div>
      {/* Teacher */}
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16 ">
          <div className="flex-1">
            <h1 className="text-2xl font-bold ">
              Aula 01 - abertura do ignite lab
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              Nessa aula vamos dar início ao projeto criando a estrutura base da
              aplicação utilizando ReactJS, Vite e TailwindCSS. Vamos também
              realizar o setup do nosso projeto no GraphCMS criando as entidades
              da aplicação e integrando a API GraphQL gerada pela plataforma no
              nosso front-end utilizando Apollo Client.
            </p>
            <div className="flex items-center gap-4 mt-6 ">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src="https://github.com/japajow.png"
                alt=""
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  Bruno Kiyomi
                </strong>
                <span className="text-gray-200 text-sm block">
                  CTO @Grupo HAMA
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href="#"
              className="p-4 text-sm border-blue-500 border text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          {/* Wallpaper 1 */}
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm mt-2 text-gray-200">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          {/* Wallpaper2 */}
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm mt-2 text-gray-200">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
```

## Colocando a biblioteca player

vimejs

Site : https://vimejs.com

> instalamos os pacotes
> npm i @vime/core @vime/react --force

> Adicionamos o player na div

```tsx
//importando a biblioteca
import { Player } from "@vime/react";
<div className="h-full w-full max-w-[1100px] mx-h-[60vh] aspect-video">
  {/* Player */}
  <Player>
    <Youtube videoId="SO4-izct7Mc" />
    <DefaultUi />
  </Player>
</div>;
```

> importamos o tema para p player

```tsx
import "@vime/core/themes/default.css";
```

## Instalando rotas no nosso projeto

importamos o react-router-dom
npm i react-router-dom
criamos componente chamado Router.tsx

```tsx
import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/event" element={<h1>Event</h1>} />
    </Routes>
  );
}
```

Colocamos o Router no App.tsx

```tsx
import { Router } from "./components/Router";
import { Event } from "./pages/Event";

function App() {
  return <Router />;
}

export default App;
```

Agora que estamos usando o react-router-dom precisamos tambem utilizado englobado

modificamos um pouco o main.tsx e o App.tsx

ficando assim

App.tsx

```tsx
import { ApolloProvider } from "@apollo/client";
import { Router } from "./components/Router";
import { client } from "./lib/apollo";
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
```

main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

agora que finalizamos as rotas vamos colocar o Event.tsx na rota

Router.tsx

```tsx
import { Routes, Route } from "react-router-dom";
import { Event } from "../pages/Event";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/event/" element={<Event />} />
      <Route path="/event/lesson/:slug" element={<Event />} />
    </Routes>
  );
}
```

## Colocando na URL devidamente as aulas selecionadas

Sidebar.tsx

Adicionamos o hover nas aulas
className="group"
E usamos o group-hover:border-green-500

```tsx

   <a href="" className="group">
      <span className="text-gray-300">{availableDateFormat}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">

```

No side bar a ancora modificamos para Link do react-router-dom
Passando href para to e colocamos na seguinte forma o caminho

```tsx

 <Link to={`/event/lesson/${props.slug}`} className="group">
```

Vamos no Router.tsx
modificamos o caminho para :slug

```tsx
<Route path="/event/lesson/:slug" element={<Event />} />
```

Agora vamos no Event.tsx
Pegamos o slug com o hook useParams()

```tsx
const { slug } = useParams<{ slug: string }>();
```

Quando tiver o slug colocamos o Video.tsx se nao nada

```tsx
{
  slug ? <Video /> : <div className="flex-1" />;
}
```

Passamos o slug como uma propriedade do Video lessonSlug passando o slug

```tsx
{
  slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />;
}
```

Agora no arquivo Video.tsx criamos uma interface

```tsx
interface VideoProps {
  lessonSlug: string;
}
```

Passando a interface criada como props do Video

```tsx

export function Video(props: VideoProps) {


```

Agora vamos pegar novos dados conforme a slug selecionada com graphCMS

Criamos a query no CMS

```gql
query GetLessonBySlug($slug: String) {
  lesson(where: { slug: $slug }) {
    title
    videoId
    description
    teacher {
      avatarURL
      bio
      name
    }
  }
}
```

Criamos a interface em base da resposta que vamos ter na query

```tsx
interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}
```

criamos a variável que pega a query com hook useQuery() passando a interface criada acima

```tsx
const { data } = useQuery(GET_LESSON_BY_SLUG_QUERY, {
  variables: {
    slug: props.lessonSlug,
  },
});
```

Caso nao tiver nenhum dado ainda ele mostra algo carregando

```tsx
if (!data) {
  return (
    <div className="flex-1">
      <p>Carregando...</p>;
    </div>
  );
}
```

Agora vamos colocar os dados que pegamos em seu devido lugar

```tsx
<Youtube videoId={data.lesson.videoId} />;
{
  data.lesson.title;
}
{
  data.lesson.description;
}
{
  data.lesson.teacher.avatarURL;
}
{
  data.lesson.teacher.name;
}
{
  data.lesson.teacher.bio;
}
```

Ficando completo assim

```tsx
import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";

import { gql, useQuery } from "@apollo/client";

import "@vime/core/themes/default.css";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}
export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    },
  });

  if (!data) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>;
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Video */}
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] mx-h-[60vh] aspect-video">
          {/* Player */}
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      {/* Teacher */}
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16 ">
          <div className="flex-1">
            <h1 className="text-2xl font-bold ">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6 ">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt=""
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href="#"
              className="p-4 text-sm border-blue-500 border text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          {/* Wallpaper 1 */}
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm mt-2 text-gray-200">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          {/* Wallpaper2 */}
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm mt-2 text-gray-200">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
```

## 4 Dia Estruturando a parte Home

Pegando a imagem da home no figma

Criando uma nova pagina pages/Subscribe.tsx

```tsx
export function Subscribe() {
  return <h1>Subscribe</h1>;
}
```

No Router.tsx colocamos o Subscribe criado na rota home

```tsx
<Route path="/" element={<Subscribe />} />
```

## Estruturando a pagina Home

Adicionando a imagem de fundo pelo tailwindcss

tailwind.config.js
adicionamos um objeto com nome blur e colocamos o caminho da imagem

```tsx

 extend: {
      backgroundImage: {
        blur: 'url(/src/images/bluer-bg.png)'
      },
```

> Estilizando e Construindo o Subscribe

```tsx
import { Logo } from "../components/Logo";

export function Subscribe() {
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px] ">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-300 font-bold">
              aplicação completa
            </strong>
            , do zero, com <strong className="text-blue-300 font-bold">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-600 border-gray-500 border rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail"
            />

            <button
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img
        src="/src/images/coldmokup.png"
        alt="cold-mockup"
        className="mt-10"
      />
    </div>
  );
}
```

## Damos a permissão para o GraphCMS criação subscribe

1. Project Setting > Permanent Auth Tokens > Management API colocamos No public > Create Permission >
   Subscribe > selecionamos create > Create

2. Colocamos o Token copiado no lib/apollo.ts

```tsx
 headers: {
    'Authorization': 'Berear AQUI VAI O TOKEN'
  },
```

3. Criamos o arquivo .env.local para que o token nao fique publico nem no github em nada

4 . Adicionamos o gitignore o .env.local

```.env
VITE_API_ACCESS_TOKEN=AQUI VAI O TOKEN
VITE_URL=COLOCAMOS A URL DO CMS AQUI
```

Agora colocamos a variável global do env criada aqui

```tsx
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer  ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
```

## Codificando o formulário Subscribe

Fazendo a parte de receber os dados que foram digitados nos inputs

1 criamos o estado

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

2 . pegamos os dados digitados pelo onChange()

```tsx
 onChange={event => setName(event.target.value) }
 onChange={event => setEmail(event.target.value)}
```

3 . passamos o value={} o name e email de cada input

```tsx
value = { name };
value = { email };
```

4 . criamos o funcao handleSubmit para quando clicar no button submit
passando o FormEvent para isso importamos ele do react

```tsx
import { useState, FormEvent } from "react";
function handleSubmit(e: FormEvent) {
  e.preventDefault();
}
```

5 . passamos na tag form o onSubmit passando a funcao criada

```tsx
onSubmit = { handleSubmit };
```

## Passando os dados recuperados para o API graphCMS

criamos a tabela gql

```gql
const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;
```

2. Usamos o useMutation para criar um subscriber

```tsx
const [createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION);
```

3. passamos a funcao createSubscriber para somente quando der o submit ele funcione
   passando o name e o email

```tsx
createSubscriber({
  variables: {
    name,
    email,
  },
});
```

A funcao handleSubmit ficaria assim

```tsx
function handleSubmit(e: FormEvent) {
  e.preventDefault();
  createSubscriber({
    variables: {
      name,
      email,
    },
  });
}
```

> Dando a permissão de leitura para o Subscriber

1 . Contente API > Create permission > Subscriber > Read > Draft > Create

Como nao tínhamos criado o estado dele como Draft estava dando erro

## Redirecionando o usuário assim que fizer subscriber

1. criamos a variavel navigate usando useNavigate()

```tsx
const navigate = useNavigate();
```

2 . Passamos a funcao handleSubmit virar async
E passamos a rota navigate("/event")

```tsx
async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  await createSubscriber({
    variables: {
      name,
      email,
    },
  });

  navigate("/event");
}
```

> Colocando o loading no botão submit

passamos a segunda opção que temos no useMutation()

```tsx
const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);
```

Agora usamos o loading no button quando for clicado disabled
tambem mudamos o css quando for disabled

```tsx
 <button
    type="submit"
    disabled={loading}
    className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:bg-gray-200 disabled:opacity-50"
  >
```

## Colocando um estado diferente quando a aula e selecionado

1 criamos uma valiavel que pega pela url o parametro dela

```tsx
const { slug } = useParams<{ slug: string }>();
```

Agora que temos o parâmetro slug criamos uma variável booleans

Se o slug do parâmetro dor igual ao props.slug

modificamos a css da aula selecionado

```tsx
const isActiveLesson = slug === props.slug;
```

no css tailwind interpolamos a css assim

```tsx
 className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-600 ${
          isActiveLesson ? "bg-green-500" : ""
        }`}
```

Temos outra forma de modificar o css usando uma lib chamada classNames

npm i classnames

importamos a classnames

```tsx
import classNames from "classnames";
```

Usamos a classNames assim

```css
className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-600",
          { "bg-green-500": isActiveLesson }
        )}
```

modificando tambem o titulo quando selecionado

```tsx
<strong
  className={classNames(" mt-5 block", {
    "text-amber-500": isActiveLesson,
    "text-gray-200": !isActiveLesson,
  })}
>
  {props.title}
</strong>
```

Modificando a classe do conteúdo liberado

```tsx
<span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
    "text-white": isActiveLesson,
    "text-blue-500": !isActiveLesson,
  })}>
```

Modificando o Ao vivo tambem

```tsx
 <span
    className={classNames(
      "text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold",
      {
        "border-white": isActiveLesson,
        "border-green-300": !isActiveLesson,
      }
    )}
  >
```

## 5 dia Instalando GraphQL Code Generation

Graphql code generator ele ajuda como o typescript nos indicando erros ou nao

Site : https://www.graphql-code-generator.com/docs/guides/react#apollo-and-urql

Instalando pacotes

npm install @graphql-codegen/cli

npm i @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo -D

Criando um arquivo de configuração do graphql code gen
codegen.yml

colocamos o seguinte código

```yml
schema: https://api-sa-east-1.graphcms.com/v2/cl4o87jp717vc01z20w4v30a8/master

documents: "./src/graphql**/*.graphql"

generates:
  ./graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-query
    config:
      fetcher: fetch
```

Criamos uma pasta

src/graphql/queries
src/graphql/mutations

dentro de src/graphql/query

```graphql
query GetLessons {
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    slug
    title
    lessonType
    availableAt
  }
}
```

No Sidebar.tsx
apagamos a query gql

No Video.tsx
copiamos a query e apagamos ele e criamos um arquivo
graphql/get-lesson-by-slug-query.graphql

```graphql
query GetLessonBySlug($slug: String) {
  lesson(where: { slug: $slug }) {
    title
    videoId
    description
    teacher {
      avatarURL
      bio
      name
    }
  }
}
```

Vamos na pagina Subscribe.tsx

copiamos o mutation e apagamos ele

criamos na pasta scr/graphql/mutations/create-subscribe-mutation.graphql
e colocamos a nossa mutation

```graphql
mutation CreateSubscriber($name: String!, $email: String!) {
  createSubscriber(data: { name: $name, email: $email }) {
    id
  }
}
```

Apagamos todas interfaces criadas para pegar os dados query e mutation

Agora no codegen.yml colocamos algumas configuracao

```yml
generates:
  ./scr/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      reactApolloVersion: 3
      # fetcher: fetch
      withHooks: true
      withHOC: false
      withComponent: false
```

Ficando completo assim

```yml
schema: https://api-sa-east-1.graphcms.com/v2/cl4o87jp717vc01z20w4v30a8/master

documents: "./src/graphql**/*.graphql"

generates:
  ./scr/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      reactApolloVersion: 3
      # fetcher: fetch
      withHooks: true
      withHOC: false
      withComponent: false
```

Vamos no package.json e incluir o codegen no scripts

```json

 "codegen" : "graphql-codegen"

```

Agora executamos

npm run codegen

Ele vai criar um arquivo no graphql/generated.ts

e usamos agora as funções auto criadas pelo codegen

No Sidebar.tsx

```tsx
const { data } = useGetLessonQuery();
```

No Video.tsx

```tsx
const { data } = useGetLessonBySlugQuery({
  variables: {
    slug: props.lessonSlug,
  },
  fetchPolicy: "no-cache",
});
```

Mudamos um pouco o if

```tsx
if (!data || !data.lesson) {
  return (
    <div className=" flex justify-center items-center flex-1  text-4xl italic text-green-400">
      <p>Carregando...</p>
    </div>
  );
}
```

modificamos a parte do teacher se caso nao houver

```tsx
{
  data.lesson.teacher && (
    <div className="flex items-center gap-4 mt-6 ">
      <img
        className="h-16 w-16 rounded-full border-2 border-blue-500"
        src={data.lesson.teacher.avatarURL}
        alt=""
      />
      <div className="leading-relaxed">
        <strong className="font-bold text-2xl block">
          {data.lesson.teacher.name}
        </strong>
        <span className="text-gray-200 text-sm block">
          {data.lesson.teacher.bio}
        </span>
      </div>
    </div>
  );
}
```
