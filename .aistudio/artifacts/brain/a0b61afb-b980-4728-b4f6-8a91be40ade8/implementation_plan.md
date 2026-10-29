# FAQ — Pedágio Eletrônico (Caminhos da Celulose)

Criação de uma página dedicada e interativa de Perguntas Frequentes (FAQ) sobre o Pedágio Eletrônico da Concessionária Caminhos da Celulose, substituindo totalmente o termo estrangeiro "Free Flow" por "Pedágio Eletrônico", com linguagem clara e amigável para todos os motoristas, busca em tempo real, categorização por tópicos, expansão em acordeão e integração direta no menu principal de navegação.

## Decisões Críticas e Preferências Confirmadas

> [!IMPORTANT]
> As decisões de escopo e arquitetura foram alinhadas e confirmadas na Fase 1:
>
> 1. **Sincronização dos Pórticos (Item 12)**: A tabela de pórticos e tarifas do FAQ será 100% sincronizada com os **12 pórticos oficiais** já padronizados no sistema (PFF-01 a PFF-12, KMs atualizados, tarifas base homologadas e a nota explicativa de pista duplicada com 2 estruturas físicas nos pórticos 04 e 08).
> 2. **Navegação Dedicada com Busca & Categorias**: O FAQ terá sua própria aba na barra de navegação superior (`'faq'`), equipada com campo de pesquisa em tempo real, badges de categoria para filtragem rápida e controle de abrir/fechar todas as perguntas.
> 3. **Temas Complementares Enriquecidos**: O conteúdo original fornecido pelo usuário foi revisado e expandido com linguagem didática, eliminando termos herméticos e adicionando casos práticos cruciais: veículos alugados (locadoras), eixos suspensos em caminhões e carretas vazias (isenção pelo CTB 13.103/2015), veículos com placa estrangeira/Mercosul, e canais de atendimento presencial nos Serviços de Atendimento ao Usuário (SAUs).
> 4. **Terminologia Rigorosa**: O termo "Free Flow" é estritamente substituído por **"Pedágio Eletrônico"** em todas as perguntas, respostas e textos da interface.

---

## 1. Visão Geral e Conceito do Produto

- **O que faz**: Oferece uma central de autoatendimento e conhecimento em linguagem simples para motoristas de veículos de passeio, motociclistas, caminhoneiros autônomos, frotistas e turistas sobre o funcionamento do pedágio 100% digital e sem cancelas da Rota da Celulose (MS).
- **Público-Alvo**: Motoristas habituais e ocasionais que trafegam pelas rodovias BR-262, BR-267, MS-040 e MS-338, muitos dos quais nunca tiveram contato prévio com pedágio eletrônico sem cabines.
- **Valor Agregado**: Previne autuações por evasão de pedágio (multa CTB 209-A de R$ 195,23), combate golpes de falsos links Pix, esclarece prazos (30 dias) e benefícios de descontos com TAG (5% DBT e progressivo DUF para veículos leves).

---

## 2. Experiência do Usuário e Design Visual

### Fluxos de Navegação e Interação

1. **Acesso Fácil no Navbar**: Novo item **"Dúvidas / FAQ"** na barra de navegação superior (desktop e mobile).
2. **Hero de Boas-Vindas Didático**: Banner no padrão visual da concessionária (`#1A2B49` e `#46973A`), com introdução explicativa e barra de busca instantânea ("Ex: Como pagar com Pix, prazo de 30 dias, multa, caminhão com eixo suspenso...").
3. **Filtros Rápidos por Tema (Segmented Pills)**:
   - *Todos os Tópicos*
   - *1. O que é e Como Funciona*
   - *2. Tecnologia dos Pórticos*
   - *3. Vantagens na Rodovia*
   - *4. Formas de Pagamento & Prazos*
   - *5. Uso da TAG & Operadoras*
   - *6. Dúvidas sobre Cobranças*
   - *7. Multas e Não Pagamento (CTB 209-A)*
   - *8. Isenções Legais*
   - *9. Descontos para Motoristas (DBT & DUF)*
   - *10. Alerta de Segurança e Golpes*
   - *11. Orientações para Frotas & Locadoras*
   - *12. Tabela Oficial de Pórticos e Tarifas*
4. **Cards em Acordeão Acessível**: Cada pergunta expande de forma suave com resposta detalhada, destaques visuais em caixas informativas e termos explicados sem jargões.
5. **Ações Rápidas de Apoio**: Botão no topo do FAQ com link direto para a **Calculadora de Pedágio**, permitindo simular rotas reais em 1 clique.

### Identidade Visual & Diretrizes Frontend

- **Paleta de Cores Oficial**:
  - `60% Neutros`: Fundo `#F8FAFC`, cartões `#FFFFFF` com bordas sutis `border-slate-200`.
  - `30% Superfície Institucional`: Azul Marinho Profundo `#1A2B49` nos títulos e estados ativos de destaque.
  - `10% Acentos Verdes Concessionária`: Verde Florestal `#46973A` para ícones funcionais, links ativos e confirmações.
- **Tipografia**: Hierarquia balanceada com numerais tabulares nas tabelas de tarifas e prazos, e formatação amigável para leitura longa.

---

## 3. Decisões de Produto e Estrutura de Conteúdo Enriquecida

### Conteúdo Validado e Aprimorado (Sem "Free Flow", Apenas "Pedágio Eletrônico")

1. **Sobre o Pedágio Eletrônico**: O que é, conceito de pórtico no lugar de cabine, por que sem cancela NÃO é sem pedágio, quem administra (Consórcio Caminhos da Celulose) e cronograma previsto (início a partir de janeiro de 2027 após obras iniciais).
2. **Tecnologia dos Pórticos**: Câmeras de alta definição, leitura de TAGs, sensores volumétricos 3D e contagem automatizada de eixos.
3. **Vantagens**: Sem filas, economia de combustível, menor desgaste de freios e pneus, segurança e redução de emissões de CO₂.
4. **Formas de Pagamento**: Passo a passo com TAG (débito automático) e sem TAG (Pix e cartão de crédito pelo site/app oficial ou totens nos Serviços de Atendimento ao Usuário - SAUs).
5. **Prazo de Pagamento**: Destaque explicativo para os **30 dias corridos** estabelecidos pela legislação federal, evitando autuação de trânsito.
6. **TAGs Habilitadas**: Sem Parar, Veloe, ConectCar, Move Mais e Greenpass; orientações caso a TAG esteja bloqueada ou o veículo seja trocado.
7. **Penalidades por Não Pagamento**: Artigo 209-A do CTB (infração grave, R$ 195,23 + 5 pontos na CNH), esclarecendo que a multa não anula a tarifa devida.
8. **Isenções**: Veículos oficiais em serviço, viaturas de emergência, bombeiros, ambulâncias e motocicletas/ciclomotores conforme regras contratuais.
9. **Descontos**: Desconto Básico de Tarifa (DBT - 5% para veículos com TAG) e Desconto de Usuário Frequente (DUF - progressivo no mês para veículos leves).
10. **Prevenção contra Golpes**: Como checar o beneficiário oficial do Pix, alerta contra cobranças por SMS/WhatsApp duvidosos.
11. **Casos Especiais Adicionados**:
    - *Veículos Alugados*: Como motoristas de locadoras podem pagar sem gerar taxas extras.
    - *Eixos Suspensos*: Como caminhões vazios comprovam eixo erguido via manifesto/leitura de peso e sensores sem pagar eixo fantasma.
    - *Placas Estrangeiras / Mercosul*: Como turistas e caminhões paraguaios/bolivianos pagam pelo portal.
12. **Tabela Homologada dos 12 Pórticos**: Exibição clara de PFF-01 a PFF-12 com rodovia, quilômetro oficial, município e tarifa base.

---

## 4. Arquitetura Técnica e Implementação

### Diagrama de Componentes e Fluxo de Estado

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│   (Gerencia currentTab: 'home' | 'calculator' |        │
│    'training' | 'arena' | 'certificates' | 'faq')      │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       ┌────────▼───────┐       ┌────────▼────────┐
       │   Navbar.tsx   │       │   FAQPage.tsx   │
       │ (Link 'Dúvidas │       │  (Nova Página)  │
       │   / FAQ')      │       └────────┬────────┘
       └────────────────┘                │
                                ┌────────▼──────────────────┐
                                │   src/data/faqData.ts     │
                                │ (12 categorias validadas, │
                                │  termos amigáveis, dados  │
                                │  dos 12 pórticos oficiais)│
                                └───────────────────────────┘
```

### Arquivos Envolvidos

1. `/src/types/index.ts`: Adicionar `'faq'` na união `TabType`.
2. `/src/data/faqData.ts`: Novo arquivo com a base estruturada e revisada de todas as perguntas, respostas, categorias e tabela de pórticos.
3. `/src/components/FAQPage.tsx`: Novo componente com hero de busca, filtro por categorias, acordeão animado, caixas de alerta didáticas e tabela dos 12 pórticos.
4. `/src/components/Navbar.tsx`: Adicionar botão de navegação "Dúvidas / FAQ" com ícone de ajuda/informação.
5. `/src/App.tsx`: Renderizar `<FAQPage />` quando `currentTab === 'faq'`.

---

## 5. Plano de Verificação

1. **Verificação de Compilação**: Executar `compile_applet` para garantir ausência de erros de tipagem em TypeScript.
2. **Revisão de Conteúdo**:
   - Garantir que NENHUMA ocorrência de "Free Flow" permaneça no texto voltado ao usuário (todas convertidas para "Pedágio Eletrônico").
   - Confirmar que os 12 pórticos oficiais (PFF-01 a PFF-12) coincidem exatamente com a base da calculadora.
   - Validar funcionamento da busca por termos como "Pix", "30 dias", "alugado", "eixo suspenso", "estrangeiro" e "multa".
3. **Sincronização de Build**: Executar `npm run build && cp -r dist/* docs/` para atualizar o ambiente estático.
