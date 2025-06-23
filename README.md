#  GameLog

O **GameLog** é uma aplicação web que permite a jogadores organizar sua jornada gamer de forma prática e personalizada. Através de uma interface intuitiva, é possível favoritar jogos, montar seu backlog e explorar novos títulos com informações detalhadas — tudo isso com tradução automática para português brasileiro.

---

##  Sumário

1. [ Visão Geral](#-visão-geral)  
2. [ Objetivos](#-objetivos)  
3. [ Funcionalidades](#-funcionalidades)  
4. [ Público-Alvo](#-público-alvo)  
5. [ Tecnologias Utilizadas](#-tecnologias-utilizadas)  
6. [ Estrutura de Pastas](#-estrutura-de-pastas)  
7. [ Desafios Técnicos](#-desafios-técnicos)  
8. [ Diferenciais](#-diferenciais)  
9. [ Próximos Passos](#-próximos-passos)  
10. [ Autor](#-autor)

---

## 🔍 Visão Geral

- **Nome do projeto**: GameLog  
- **Tipo**: Single Page Application (SPA)  
- **Objetivo**: Organizar jogos favoritos, backlog e progresso de forma intuitiva  
- **APIs utilizadas**: [RAWG API](https://rawg.io/apidocs) e [LibreTranslate](https://libretranslate.com)  
- **Status**: MVP funcional concluído

---

## 🎯 Objetivos

- Criar uma aplicação prática, responsiva e modular em React  
- Consumir dados de uma API externa em tempo real  
- Traduzir conteúdos em inglês automaticamente para PT-BR  
- Persistir dados por usuário sem banco de dados (via `localStorage`)  
- Estimular o uso de boas práticas de projeto e documentação

---

## ✨ Funcionalidades

- 🗂️ Organização de jogos em backlog e favoritos  
- 🔍 Busca por títulos via RAWG API  
- 🌐 Tradução automática de descrições  
- 📄 Página de detalhes com capa, plataformas, gêneros e texto traduzido  
- 🔐 Armazenamento persistente com base no usuário autenticado  
- 🧾 Página “Sobre” com propósito e stack utilizada

---

## 🧑‍🤝‍🧑 Público-Alvo

- Gamers que desejam manter controle sobre sua jornada  
- Desenvolvedores em busca de projetos bem estruturados  
- Recrutadores interessados em portfólio real de frontend

---

## ⚙️ Tecnologias Utilizadas

- React.js  
- React Router DOM  
- Firebase Authentication  
- Context API + Hooks  
- REST APIs externas (RAWG + LibreTranslate)  
- Framer Motion  
- LocalStorage  
- CSS Customizado  
- React Icons  

---

## 📁 Estrutura de Pastas

src/ 
    ├── assets/ 
    ├── components/ 
    ├── contexts/ 
    ├── pages/ 
    ├── services/ 
    ├── styles/
    └── utils/ 

---

## 🧠 Desafios Técnicos

- Gerenciar tradução automática com fallback quando a API estiver indisponível  
- Organizar estado por usuário com `localStorage`  
- Criar uma UX fluida e adaptada a dispositivos mobile  
- Lidar com limitações e erros de API externas

---

## 🚀 Diferenciais

- Tradução automática sem backend próprio  
- Persistência personalizada por usuário  
- Menu mobile com animações suaves (framer-motion)  
- Código modular e pronto para novas features

---

## 🛣️ Próximos Passos

- 🔐 Login com Google  
- 📝 Reviews por usuário logado  
- 🏆 Sistema de conquistas e progresso  
- 🌐 Deploy com domínio próprio e monitoramento (Analytics)

---

## 👨‍💻 Autor

Desenvolvido por **Michael Aguiar**  
Frontend Developer | Apaixonado por games e boas interfaces

📧 Email: aguiarmichael20@outlook.com  
🔗 LinkedIn: [linkedin.com/in/aguiarmichael20](https://www.linkedin.com/in/aguiarmichael20)

---
