# 🍽️ PratoPronto

**PratoPronto** é uma plataforma colaborativa de receitas culinárias desenvolvida para a disciplina de Programação Web. Com uma interface intuitiva e funcionalidades modernas, permite que os usuários explorem, cadastrem, editem e favoritem receitas — sejam elas criadas por outros usuários ou obtidas por meio de uma API pública.

---

## 📍 Contexto

O projeto nasceu da vontade de criar um espaço digital onde qualquer pessoa pudesse organizar suas receitas e descobrir novas ideias culinárias com facilidade — algo como um “Pinterest de receitas”, mas com funcionalidades voltadas para praticidade, organização e personalização.

---

## 💡 Justificativa

Muitas pessoas compartilham receitas nas redes sociais, mas têm dificuldade para organizá-las e encontrá-las depois. O **PratoPronto** resolve isso criando um caderno de receitas digital e colaborativo, que também estimula a interação entre usuários.

---

## 🎯 Objetivos

### 🎯 Geral
Criar uma aplicação web completa com CRUD de receitas, integração com API externa, autenticação de usuário e gerenciamento de favoritos.

### 🧭 Específicos

- Implementar interface acessível e responsiva
- Criar sistema de login com sessão segura via JWT
- Permitir cadastro, edição e exclusão de receitas do usuário
- Integrar com uma API pública de receitas
- Permitir que o usuário favorite tanto suas receitas quanto externas
- Organizar receitas favoritadas e pessoais em uma mesma aba

---

## 🧪 Tecnologias Utilizadas

### Front-end
- **Next.js**
- **React**
- **Tailwind CSS**
- **Axios**
- **Lucide Icons**
- **React Hot Toast**

### Back-end
- **Node.js**
- **Zod**
- **Bcrypt**
- **JSON Web Token (JOSE)**
- **Cookies HTTP**
- **File System (`fs`)**

---

## 🌐 Funcionalidades do site

- Interface amigável com design planejado no Figma
- Login, cadastro e sessão com token
- Página inicial de boas-vindas
- Página de exploração de receitas da API
- Cadastro de novas receitas com imagem
- Edição e exclusão de receitas
- Favoritar receitas da API e próprias
- Visualização unificada de favoritos e criadas

---

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/cavicf/trabalho_receita.git
git pull origin main
```

2. **Posteriormente crie um arquivo .env dentro da pasta do projeto e copie o seguinte TOKEN nele:**
```bash
TOKEN=f540cf171469d0efe80d6177793c6be06cb60b3bd281e9b358a1dd3fcf23fa40e9d052a90e9c94946796bebd8ec07651c32b5e3886afc51fabf01b3b02cdf880
```

3. **Após a criação, utilizando o terminal Linux ou WSL:**
```bash
npm install
npm run dev
```

4. **Acesse o site em:**
```bash
http://localhost:3000
```

## 👨‍👩‍👧‍👦 Desenvolvedores

- [Camilly Victal Finamor](https://github.com/cavicf)
- [Júlia Vitória Concari Arenhardt](https://github.com/juwwardt)
- [Júlio César de Paiva Filho](https://github.com/juliocpaiva)
- [Luís Gustavo Riso Santos](https://github.com/LuisRiso)

---

## 🧩 Links úteis

- 🎨 [Protótipo no Figma](https://www.figma.com/design/Hg5slbsP4lkuonEZebHUQF/Prato-Pronto?node-id=104-232&t=2KiPIANHIYLl1hrh-1)
- 🌐 [API pública utilizada](https://api-receitas-pi.vercel.app/)
