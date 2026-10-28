# Portal de Capacitação Free Flow & CCA — Concessionária Caminhos da Celulose

> **Resumo Executivo**: Desenvolvimento de um portal de treinamento moderno, dinâmico e interativo para os operadores e equipes do Centro de Controle de Arrecadação (CCA) da Concessionária Caminhos da Celulose. O site aborda os conceitos, normas e procedimentos do pedágio 100% automático (Free Flow na Rota da Celulose: BR-262, BR-267, MS-040, MS-338, MS-395), contando com módulos de estudo passo a passo, jogo da memória com descarte de pares, simulador de ocorrências operacionais em tempo real, quiz avaliativo com cronômetro, badges de proficiência e certificados locais salvos no navegador, totalmente pronto para deploy gratuito no **GitHub Pages**.

---

### Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> - **Estilo Visual**: Moderno e corporativo, preparado para receber a logo oficial e capturas do site da concessionária, utilizando paleta inspirada no setor de celulose e infraestrutura rodoviária (Verde Celulose `#0D5C3A`, Azul Operacional `#0284C7`, Ardósia Asfáltica `#0F172A` e Âmbar de Alerta `#D97706`).
> - **Modalidades de Treino Interativo**: Quiz avaliativo cronometrado, Jogo da Memória de termos técnicos (com desaparecimento de pares corretos) e Simulador de Ocorrências do CCA (tomada de decisão operacional baseada em POP).
> - **Progresso e Avaliações**: Trilha flexível com progresso em porcentagem, emissão de certificados digitais no nome do operador, badges de proficiência e persistência em `localStorage` (sem necessidade de backend ou login).
> - **Hospedagem & Expansão**: 100% estático via Vite com base path relativo (`./`) para execução perfeita no GitHub Pages sem erros de roteamento 404, além de arquitetura de dados modular que permite à equipe adicionar novos conteúdos, módulos e perguntas com extrema facilidade.

---

## 1. Visão Geral & Conceito

### O que o Portal Faz
O portal capacita novos operadores e atualiza a equipe do CCA sobre as particularidades do pedágio Free Flow implantado pela Caminhos da Celulose em Mato Grosso do Sul (14 pórticos distribuídos em 12 pontos estratégicos). O sistema elimina as praças físicas tradicionais e substitui cancelas por pórticos de leitura automática de TAG RFID e OCR de placas, exigindo do operador do CCA novas competências de auditoria de imagens, classificação de eixos suspensos, verificação de isenções e combate à evasão de pedágio (conforme Art. 209-A do CTB e regulamentação da AGEMS).

### Público-Alvo
- Operadores e auditores do CCA (Centro de Controle de Arrecadação).
- Fiscais de tráfego, operadores de CCO e equipes de atendimento ao usuário da Caminhos da Celulose.

### Valor Principal
Transformar manuais técnicos densos e procedimentos operacionais (POPs) em uma experiência gamificada, ágil e visualmente estimulante, permitindo que a equipe treine situações reais de pórtico e meça sua retenção sem atrito tecnológico ou custo de infraestrutura.

---

## 2. Experiência do Usuário & Design Visual

### Jornada do Operador
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            TOPO CORPORATIVO                                │
│ [Caminhos da Celulose · CCA]   Início  ·  Capacitação  ·  Avaliações & Jogos │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────┐             ┌───────────────┐             ┌───────────────┐
│    INÍCIO     │             │  CAPACITAÇÃO  │             │ ARENA / JOGOS │
│ • Panorama da │             │ • Módulo 1    │             │ • Jogo da     │
│   Concessão   │             │   Pórticos &  │             │   Memória     │
│ • Free Flow:  │             │   Sensores    │             │ • Simulador   │
│   Como Funciona│            │ • Módulo 2    │             │   de Casos CCA│
│ • Mapa dos    │             │   Rotina CCA  │             │ • Quiz        │
│   14 Pórticos │             │ • Módulo 3    │             │   Avaliativo  │
│ • Prazos &    │             │   TAGs & Pix  │             │ • Certificado │
│   Regras      │             │ • Módulo 4    │             │   & Badges    │
│               │             │   Evasão/POP  │             │               │
└───────────────┘             └───────────────┘             └───────────────┘
```

### Identidade Visual & Diretrizes (Anti-AI Slop)
- **Paleta 60-30-10**:
  - **60% Fundo Neutro**: Fundo límpido e arejado (`#F8FAFC` no modo claro, com opção de modo escuro técnico `#0B1320` para operadores de turno noturno).
  - **30% Estrutura & Superfícies**: Painéis brancos/ardósia com bordas ultrafinas (`border-slate-200 / border-slate-800`), sem acúmulo excessivo de sombras ou bordas coloridas artificiais.
  - **10% Acentos Semânticos**:
    - **Verde Celulose (`#0D5C3A` / `#16A34A`)**: Ações primárias, conclusões e respostas corretas.
    - **Azul Operacional (`#0284C7`)**: Foco em dados do CCA, sensores e tecnologia RFID.
    - **Âmbar Rodoviário (`#D97706`)**: Avisos de atenção e prazos de pagamento (30 dias).
- **Tipografia**:
  - Títulos e Destaques: `Plus Jakarta Sans` ou `Outfit`, com peso seminegrito (600/700) e equilíbrio de quebra (`text-wrap: balance`).
  - Textos e Guias: `DM Sans` / `Plus Jakarta Sans` para alta legibilidade e ritmo editorial.
  - Códigos de Placa e Numerais: `IBM Plex Mono` / `font-mono tabular-nums` para alinhamento de placas Mercosul, horas de passagem e pontuações.
- **Disciplina Zero-Pill**: Metadados (tempo estimado de leitura, categoria, quantidade de questões) apresentados de forma limpa com separadores tipográficos sutis (`·`), sem cápsulas coloridas genéricas.

---

## 3. Decisões de Arquitetura & Módulos Interativos

### A. Roteamento e Compatibilidade GitHub Pages
- **Estratégia de Navegação**: Roteador baseado em estado reativo unificado sincronizado com `window.location.hash` (`#/inicio`, `#/capacitacao`, `#/jogos`, `#/certificados`).
- **Zero 404 no GitHub Pages**: O uso de hash routing garante que recarregar a página em qualquer subdomínio (ex: `https://usuario.github.io/treinamento-free-flow/`) funcione instantaneamente sem requisições ao servidor.
- **Base Relativa**: Configuração do `vite.config.ts` com `base: './'`.

### B. Módulos de Estudo (Capacitação CCA)
1. **Módulo 1: O Que é o Free Flow & Anatomia do Pórtico**
   - Sensores aéreos: Câmeras OCR duplas (frontal/traseira), antenas DSRC/RFID (915 MHz), scanners laser volumétricos e iluminadores infravermelhos.
   - Comparativo: Praça com cancela vs. Free Flow contínuo (velocidade máxima da via, sem frenagem brusca).
2. **Módulo 2: O Dia a Dia do Operador de CCA**
   - Papel do CCA: Auditoria de passagens não casadas, validação manual de placas ilegíveis ou sujas, verificação de eixos suspensos e tipologia veicular.
   - SLAs e tempo máximo de análise.
3. **Módulo 3: Métodos de Pagamento, Prazos & Benefícios**
   - Veículos com TAG (débito automático e Desconto de Usuário Frequente - DUF).
   - Veículos sem TAG (leitura por placa e prazo de até 30 dias regulamentado pela AGEMS).
   - Meios de pagamento digitais (App, site, Pix, WhatsApp).
4. **Módulo 4: Evasão de Pedágio e Casos Especiais**
   - Art. 209-A do Código de Trânsito Brasileiro (infração grave, multa e 5 pontos).
   - Isenções legais (veículos oficiais, ambulâncias, viaturas policiais).
   - Tratamento de placas clonadas e veículos com reboque desengatado.

### C. A Arena Interativa de Treinamento
1. **Jogo da Memória Operacional (Pair Matching com Desaparecimento)**
   - 12 a 16 cards embaralhados com termos técnicos do CCA e seus significados reais.
   - Exemplo de pares:
     - `RFID 915 MHz` ↔ `Frequência de comunicação da TAG de para-brisa`
     - `Art. 209-A CTB` ↔ `Infração grave por não pagar o Free Flow em até 30 dias`
     - `Eixo Suspenso` ↔ `Conferência visual de contato com o solo para cobrança justa`
     - `Câmera OCR` ↔ `Reconhecimento automático de placas padrão Mercosul e cinza`
     - `DUF` ↔ `Desconto de Usuário Frequente aplicado para veículos de passeio`
     - `Pórtico Free Flow` ↔ `Estrutura metálica aérea sem cancelas e sem parada do veículo`
   - **Mecânica solicitada**: Quando o jogador vira 2 cartas que formam o par correto, as cartas desaparecem com efeito visual suave, liberando espaço no tabuleiro! Há contador de tentativas e tempo.
2. **Simulador de Ocorrências do CCA (Estudo de Casos Práticos)**
   - Reproduz uma tela de mesa de triagem do CCA.
   - O operador recebe uma ocorrência simulada (com imagem do veículo, leitura do sensor e dados da placa):
     - *Caso 1*: Placa dianteira borrada por lama na BR-262, mas imagem traseira legível. O que fazer?
     - *Caso 2*: Caminhão com 4 eixos cadastrados na TAG, mas transitando com 1 eixo erguido. O que o auditor confirma?
     - *Caso 3*: Ambulância em atendimento emergencial sem TAG cadastrada. Procedimento de isenção.
   - Feedback imediato explicando a fundamentação da norma do POP.
3. **Quiz Avaliativo Cronometrado**
   - Banco de perguntas com tempo configurável (ou modo sem pressa).
   - Explicação detalhada a cada acerto ou erro.
   - Resumo final com pontuação, taxa de acerto e liberação de Badge.
4. **Certificado de Conclusão do CCA**
   - Gera um certificado com o nome do operador, carga horária de treinamento (ex: 4 horas), aproveitamento no teste e data, pronto para impressão ou salvar em PDF.

### D. Facilidade de Manutenção de Conteúdo
- Todo o conteúdo de módulos, perguntas do quiz, pares da memória e casos do simulador é isolado em arquivos de dados estruturados em TypeScript (`src/data/modulesData.ts`, `src/data/quizData.ts`, `src/data/memoryData.ts`, `src/data/casesData.ts`).
- Inclui uma interface de **Gerenciador de Perguntas / Adição Rápida** onde os próprios supervisores do CCA podem cadastrar novas perguntas ou editar cards diretamente pela interface web e exportar o JSON atualizado!

---

## 4. Arquitetura Técnica & Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Aplicação React SPA (Vite)                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│   Views / Telas  │        │  Motor de Jogos  │        │ Estado & Storage │
│ • HomeOverview   │        │ • MemoryMatchGame│        │ • useProgress    │
│ • TrainingModules│        │ • CCACaseSim     │        │ • useStorage     │
│ • QuizView       │        │ • TimedQuiz      │        │ • Certificado Gen│
│ • ContentManager │        │                  │        │                  │
└──────────────────┘        └──────────────────┘        └──────────────────┘
        │                             │                             │
        └─────────────────────────────┼─────────────────────────────┘
                                      ▼
                        ┌───────────────────────────┐
                        │ Navegador (localStorage)  │
                        │ • Notas e Histórico       │
                        │ • Módulos Concluídos      │
                        │ • Badges Conquistados     │
                        │ • Custom Content (Backup) │
                        └───────────────────────────┘
```

### Componentes Principais
- `Navbar`: Cabeçalho corporativo aderente ao Top Bar Contract (Marca com logotipo customizável, links com visual refinado, indicador de progresso geral e botão de ação rápida).
- `FreeFlowInfographic`: Diagrama visual e interativo em SVG demonstrando a passagem de um veículo sob o pórtico do Free Flow e o disparo coordenado de sensores (Antena TAG $\to$ Câmeras OCR $\to$ Laser Classificador $\to$ Nuvem do CCA).
- `MemoryCardGame`: Tabuleiro dinâmico onde os pares corretos desaparecem do grid, com cálculo de eficiência e tempo.
- `CaseSimulator`: Terminal de auditoria do CCA com visual realista de mesa de conferência.
- `CertificateModal`: Emissão de certificado em alta resolução para download/impressão.
- `CustomContentModal`: Ferramenta para os monitores inserirem perguntas e módulos extras sem precisar de programação.

---

## 5. Próximos Passos de Execução
1. Atualizar metadados do projeto (`metadata.json`, `index.html`) com o título oficial da Concessionária Caminhos da Celulose.
2. Gerar imagens temáticas de alta fidelidade para o portal (Pórtico Free Flow na rodovia, Centro de Controle de Operações/CCA e selo de certificação).
3. Construir as bases de dados temáticas (`modulesData`, `quizData`, `memoryData`, `casesData`).
4. Implementar os componentes visuais, o diagrama interativo do pórtico e os três jogos de avaliação.
5. Implementar a persistência em `localStorage` e a geração do certificado com visual oficial.
6. Validar compilação e build sem nenhum erro.
