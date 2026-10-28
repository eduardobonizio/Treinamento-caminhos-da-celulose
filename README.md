# Portal de Capacitação Free Flow & CCA — Caminhos da Celulose

Portal de treinamento corporativo e interativo para a equipe do Centro de Controle de Arrecadação (CCA) da Concessionária Caminhos da Celulose (Rota da Celulose - MS).

## 🚀 Como Publicar no GitHub Pages

Este projeto já está 100% configurado para o **GitHub Pages**:
- Base relativa (`base: './'`) no `vite.config.ts`.
- Roteamento por hash (`#/inicio`, `#/treinamento`, `#/arena`) que não causa erro 404.
- Fluxo automatizado via **GitHub Actions** em `.github/workflows/deploy.yml`.

### Opção 1: Via Interface do GitHub (Recomendado)
1. Crie um repositório no seu GitHub (ex: `treinamento-freeflow`).
2. Conecte o repositório e envie os arquivos (ou use a opção de exportar do AI Studio).
3. No GitHub, vá em **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione:
   - **GitHub Actions** (ele usará o arquivo `.github/workflows/deploy.yml` já incluído para construir e publicar sozinho!).
5. Em cerca de 1 a 2 minutos, o GitHub exibirá o link oficial:
   `https://<seu-usuario>.github.io/<nome-do-repositorio>/`

### Opção 2: Enviando via Linha de Comando (Terminal)
```bash
# 1. Vincule ao seu repositório do GitHub
git remote add origin https://github.com/<SEU_USUARIO>/<SEU_REPOSITORIO>.git

# 2. Envie para o branch principal
git push -u origin main
```
Assim que você der o `push`, o GitHub Actions executará o deploy automaticamente e o site estará no ar!

---

## 🛠️ Tecnologias Utilizadas
- **React 19 & TypeScript**
- **Vite 8** (build estático ultra-rápido)
- **Tailwind CSS v4**
- **Lucide Icons**
- **LocalStorage API** (notas, módulos concluídos, tempo de memória e logo personalizados salvos localmente sem banco de dados externo)
