# whoStronger

[whoStronger](https://who-stronger.vercel.app) é um site dedicado a super-heróis, onde você pode explorar uma lista com mais de 500 heróis e criar batalhas para saber quem é o mais forte.

## Tecnologias utilizadas
- [React.js](https://react.dev)
- [Next.js](https://nextjs.org/)
- [Material Tailwind](https://www.material-tailwind.com)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Tailwind CSS](https://tailwindcss.com)

## Metodologia de desenvolvimento
- [Atomic Design](atomicdesign.bradfrost.com/chapter-2)

## Dependências para rodar localmente
- [Node.js](https://nodejs.org/en) versão >= 18.17
- Gerenciador de pacotes, por exemplo: [NPM](https://nodejs.org/en), [Yarn](https://yarnpkg.com), [PNPM](https://pnpm.io/pt/)
- Variável de ambiente API_URL no arquivo .env.local, com o valor correspondente à rota da API fornecida pela empresa

## Instalação e execução

1. Clone o repositório.
```bash
git clone https://github.com/pedrop07/whoStronger.git
```

2. Acesse o diretório do projeto.
```bash
cd whoStronger
```

3. Instale as dependências do projeto.
```bash
npm install
```

4. Inicie o projeto em modo de desenvolvimento
```bash
npm run dev
```

6. Abra o site em seu navegador visitando [http://localhost:3000](http://localhost:3000). Ao acessar o site, será possível visualizar todos os heróis, filtrar pelo nome, genero e alinhamento ( bom ou mal ) e escolher 2 heróis para batalhar.

## Regras de negócio
- O vencedor da batalha será aquele com a maior soma de powerstats.
- Se já houver 2 heróis selecionados e mais 1 herói for escolhido, um toast de erro com a mensagem "Dois heróis já foram selecionados para a batalha, remova um deles para escolher outro no lugar" deve aparecer no canto superior direito da tela.
- Deve ser possível remover um herói escolhido para a batalha.
- Ao tentar selecionar o mesmo herói duas vezes, um toast de erro com a mensagem "{nome do herói} já foi selecionado para a batalha" deve aparecer no canto superior direito da tela.
- O filtro de heróis deve aceitar as seguintes categorias:
	- name
	- gender ( Male ou Female )
	- alignment ( good ou bad )
- O botão de "Aplica filtros" e "Limpar filtros" deve ficar desabilitado até algum filtro ser selecionado

## Fluxo da batalha
1. Clique no botão "Batalhar" localizado no card do herói que você deseja ver na batalha. Certifique-se de escolher 2 heróis.

2. No menu lateral, os 2 heróis escolhidos serão exibidos, juntamente com um botão escrito "Iniciar Batalha".

3. Ao clicar no botão "Iniciar Batalha," um modal será aberto na tela, exibindo o resultado da batalha. o vencedor é aquele com a maior soma de powerstats.
