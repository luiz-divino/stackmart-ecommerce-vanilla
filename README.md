# 🛒 Shopsmart - Simulador de Compras com DummyJSON API

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Acessibilidade](https://img.shields.io/badge/Acessibilidade-WCAG-success?style=for-the-badge&logo=w3c&logoColor=white)

## 📖 Descrição do Projeto

O **Shopsmart** é uma aplicação front-end desenvolvida como parte da avaliação da disciplina de **Desenvolvimento Web** do curso de Engenharia de Software do **IBMEC-RJ**. 

O projeto consiste em um simulador de e-commerce completo e responsivo, construído inteiramente com **HTML, CSS e JavaScript puro (Vanilla)**. O grande foco desta aplicação está em demonstrar a capacidade de manipular o DOM de forma eficiente, consumir APIs REST externas e, acima de tudo, aplicar conceitos sólidos de UX, acessibilidade e estruturação semântica. 

A aplicação consome os dados em tempo real a partir da API pública do [DummyJSON](https://dummyjson.com/products).

## 🚀 Demonstração

 Deploy da aplicação no github pages: [Shopsmart](https://luiz-divino.github.io/shopsmart-ecommerce-vanilla/)

 O projeto está disponível para execução local. As instruções para rodar o projeto em sua máquina encontram-se na seção [Como Executar](#-como-executar-o-projeto).

## ✨ Funcionalidades

O projeto conta com um fluxo de compras detalhado que engloba de ponta a ponta a jornada do usuário:

- **Catálogo Dinâmico e Responsivo**: Listagem completa dos produtos vindos da API, adaptando-se perfeitamente de telas de smartphones a monitores amplos.
- **Sistema de Buscas e Filtros**:
  - Barra de pesquisa com filtro em tempo real por título e descrição.
  - Botões de categoria gerados dinamicamente com base nos produtos retornados.
- **Cartão de Produto com Animação 3D (Flip)**: Possibilidade de "virar" o card do produto para visualizar as avaliações (reviews) dos clientes na parte traseira.
- **Fluxo de Carrinho de Compras**:
  - Adição de produtos ao carrinho com persistência dos dados no `localStorage`.
  - Controle e atualização da quantidade de itens (+ e -) e remoção automática de itens com quantidade zerada.
  - Indicador numérico (badge) atualizado no cabeçalho.
  - Somatório em tempo real do valor total do pedido.
- **Checkout Seguro (Simulado)**: Finalização de compra validada (impede checkout com carrinho vazio) culminando em um Modal interativo com feedback de sucesso.
- **Tratamento de Estados**: Feedback visual de carregamento (Spinner) durante requisições e telas de estado vazio (empty states) customizadas.

## 💻 Tecnologias Utilizadas

- **HTML5**: Estruturação baseada fortemente em tags semânticas.
- **CSS3**: Layouts flexíveis com Flexbox e Grid, variáveis de escopo (`:root`), animações complexas (`transform-style: preserve-3d`) e abordagem Mobile-First.
- **JavaScript (ES6+)**: Manipulação direta e eficiente do DOM, requisições assíncronas com `fetch/async/await` e métodos funcionais de array (`map`, `filter`, `reduce`).
- **DummyJSON API**: Fornecimento de mocks de produtos e categorias para popular a aplicação.

## 📐 Boas Práticas e Qualidade de Código

Este projeto foi construído priorizando diretrizes de código limpo e padrões de qualidade exigidos pelo mercado:

- **HTML Semântico**: Uso rigoroso de tags estruturais (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) facilitando o entendimento da estrutura da página para motores de busca e desenvolvedores.
- **Acessibilidade (A11y)**:
  - Navegação operável por teclado.
  - Inclusão da classe utilitária `.sr-only` (Screen Reader Only).
  - Utilização ativa de atributos ARIA (`aria-label`, `aria-hidden`, `aria-controls`, `aria-expanded`) em componentes de interatividade (como menu mobile, botões de exclusão e modais).
  - Uso dos atributos `alt` em imagens e estratégias de carregamento adequadas (`loading="lazy"` e `loading="eager"`).
- **Folhas de Estilo Modulares**: O CSS aplica padrões lógicos e de reaproveitamento, concentrando a paleta de cores, tipografia e espaçamentos em variáveis CSS, o que garante escalabilidade para futuros modos de alto-contraste ou _dark mode_.
- **Lógica e Estado JavaScript**: Código organizado através de funções puras e de responsabilidade única. O estado do carrinho de compras é inteiramente desacoplado das chamadas de API, mantido no `localStorage`, evitando perdas de informação quando a página é recarregada.

## 🛠 Como Executar o Projeto

1. Clone este repositório para a sua máquina:
   ```bash
   git clone <link-do-repositorio>
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd ap2
   ```
3. Abra a aplicação:
   - Você pode simplesmente dar um duplo-clique no arquivo `index.html` para abri-lo no seu navegador.
   - Ou, para uma experiência melhor, utilize uma extensão de servidor local no VSCode, como o **Live Server**.

## 📂 Estrutura de Arquivos

A árvore atual do projeto reflete o escopo de entrega base para um MVP robusto.

```text
├── css/
│   └── style.css          # Estilizações globais, componentes e responsividade
├── image/
│   ├── hero-fundo.webp    # Imagem de destaque
│   └── logo.webp          # Logo do site
├── js/
│   └── script.js          # Lógica central (API, Carrinho, Modal, Filtros)
├── index.html             # Página inicial
├── gallery.html           # Página do catálogo de produtos e busca
└── cart.html              # Página do fluxo de checkout do carrinho
```

## 🗺 Próximos Passos (Roadmap)

Embora o projeto entregue todos os requisitos funcionais previstos, ele está sendo preparado para evoluções arquiteturais:

- **Refatoração da Arquitetura**: Migrar o JavaScript atual (`script.js`) para arquivos modulares (ex: `cartService.js`, `api.js`, `uiElements.js`) utilizando `import/export` ES6.
- **Componentização CSS**: Quebrar o `style.css` em fragmentos menores para componentes isolados.
- **Framework Moderno**: Estudar a migração do código Vanilla atual para **React** ou **Vue.js**, reaproveitando a lógica de estado.

## 👤 Autor

Desenvolvido por Luiz Fernando Divino, um estudante de Engenharia de Software no **IBMEC-RJ**. Este projeto faz parte do meu portfólio acadêmico e profissional, demonstrando minha evolução técnica e atenção aos detalhes que formam uma ótima experiência web.

- **LinkedIn:** [Aqui](https://www.linkedin.com/in/luizsdivino)
- **GitHub:** [Aqui](https://github.com/luiz-divino)

## 📄 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT). Sinta-se livre para utilizá-lo para seus estudos!
