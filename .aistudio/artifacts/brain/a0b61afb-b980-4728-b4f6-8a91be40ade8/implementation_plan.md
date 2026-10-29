# Atualização dos Pórticos Free Flow (PFF-01 a PFF-12) e Correção do Cálculo de Rota no Pórtico-12

Este plano detalha a atualização oficial da malha de pedágios Free Flow da concessão Caminhos da Celulose, consolidando os pontos em pista duplicada (**Pórtico-04** e **Pórtico-08**), removendo os registros duplicados (`Pórtico-13` e `Pórtico-14`) e corrigindo a falha geométrica e algorítmica que impedia a contabilização do **Pórtico-12 (BR-267 km 065+750)** nos cálculos de rota.

---

## User Review & Critical Decisions

Com base nas definições alinhadas, a solução seguirá estritamente estas diretrizes:

- **Quilometragem do PFF-11 (MS-040)**: Mantida em **km 123+860** no trecho intermediário de Ribas do Rio Pardo/MS (entre o Pórtico-05 no km 045+360 e o Pórtico-06 no km 216+120).
- **Identificação Principal na Interface**: Mantida a nomenclatura **Pórtico-01 a Pórtico-12** como título principal nos marcadores e listagens, adicionando o código técnico **PFF-01 a PFF-12** como metadado complementar.
- **Unificação de Pista Duplicada (Pórticos 04 e 08)**: Os pórticos **13** e **14** serão removidos como pontos independentes. Os pórticos **04 (BR-262 km 288+300)** e **08 (BR-267 km 021+200)** passarão a indicar que operam com **2 estruturas físicas (Sentido Leste e Sentido Oeste)** na mesma localização quilométrica, cobrando apenas 1 tarifa por sentido trafegado.
- **Sincronização Completa do Portal**: As atualizações serão aplicadas tanto na **Calculadora de Rotas e Tarifas** quanto no **Mapa Esquemático Interativo da Página Inicial**.

---

## 1. Overview & Core Concept

O sistema representa a malha rodoviária concedida (BR-262, BR-267, MS-040 e MS-338) com **12 pontos oficiais de cobrança** (`PFF-01` a `PFF-12`):

| Rodovia | Identificação Principal | Código Técnico | Localização Oficial (KM) | Município / Observação Operacional |
| :--- | :--- | :--- | :--- | :--- |
| **BR-262** | Pórtico-01 | `PFF-01` | `km 040+450` | Três Lagoas/MS |
| **BR-262** | Pórtico-02 | `PFF-02` | `km 109+500` | Água Clara/MS |
| **BR-262** | Pórtico-03 | `PFF-03` | `km 204+460` | Ribas do Rio Pardo/MS |
| **BR-262** | Pórtico-04 | `PFF-04` | `km 288+300` | Campo Grande/MS *(Pista Duplicada — 2 pórticos Leste/Oeste)* |
| **MS-040** | Pórtico-05 | `PFF-05` | `km 045+360` | Campo Grande/MS |
| **MS-040** | Pórtico-06 | `PFF-06` | `km 216+120` | Santa Rita do Pardo/MS |
| **MS-338** | Pórtico-07 | `PFF-07` | `km 311+900` | Santa Rita do Pardo/MS |
| **BR-267** | Pórtico-08 | `PFF-08` | `km 021+200` | Bataguassu/MS *(Pista Duplicada — 2 pórticos Leste/Oeste)* |
| **BR-267** | Pórtico-09 | `PFF-09` | `km 129+100` | Nova Andradina/MS |
| **BR-267** | Pórtico-10 | `PFF-10` | `km 182+000` | Nova Alvorada do Sul/MS |
| **MS-040** | Pórtico-11 | `PFF-11` | `km 123+860` | Ribas do Rio Pardo/MS |
| **BR-267** | Pórtico-12 | `PFF-12` | `km 065+750` | Anaurilândia/MS |

---

## 2. User Experience & Visual Design

- **Clareza nos Pórticos de Pista Duplicada (04 e 08)**:
  - Nos popups do mapa real e nos cartões do Mapa Esquemático da Home, os pórticos **04** e **08** exibirão a nota operacional indicando a presença de **2 estruturas físicas (Leste/Oeste)** devido à pista duplicada, esclarecendo que o motorista paga apenas 1 tarifa correspondente ao sentido em que trafega.
  - A legenda do mapa e os contadores da calculadora serão atualizados para refletir os **12 Pontos de Cobrança Free Flow** (em substituição à contagem anterior de 14 pontos separados).
- **Exibição Padronizada de Quilometragem e Código PFF**:
  - Cada item na lista de pórticos da rota e cada marcador no mapa apresentará o nome principal (`Pórtico-01` a `Pórtico-12`), acompanhado do código técnico (`PFF-01` a `PFF-12`), rodovia e quilometragem formatada (`km XXX+XXX`).

---

## 3. Key Product Decisions & Trade-Offs

### Diagnóstico da Falha no Pórtico-12 (BR-267 km 065+750)
A investigação técnica identificou duas causas combinadas que faziam o **Pórtico-12** ser ignorado quando o usuário traçava rotas na BR-267:
1. **Deslocamento Geográfico da Coordenada do Pórtico-12**:
   - Entre o Pórtico-09 (`lat: -21.7319, lng: -53.3061`) e o Pórtico-08 (`lat: -21.7285, lng: -52.3390`), o traçado real da rodovia **BR-267** corre próximo à latitude **`-21.769°`**.
   - Contudo, o Pórtico-12 estava cadastrado na latitude **`-21.852417°`**, ficando a **mais de 9 km ao sul do eixo real da BR-267** (deslocado em direção ao acesso secundário de Anaurilândia). Como o detector exigia distância máxima de `1.500 m` até a rodovia, nenhum veículo trafegando pela BR-267 passava perto o suficiente do ponto cadastrado.
2. **Cálculo de Distância Apenas por Vértices Discretos (Vertex-Only)**:
   - O algoritmo anterior media a distância apenas até os pontos de curva (`coords[i]`) retornados pelo OSRM. Em retas longas da BR-267 e MS-040, os vértices da polilinha podem ficar espaçados em vários quilômetros, fazendo com que um pórtico situado no meio de uma reta fique distante das duas extremidades do segmento.

### Solução Adotada
- **Reposicionamento Geodésico Preciso**: Atualização das coordenadas do **Pórtico-12** diretamente sobre o eixo oficial da BR-267 no km 065+750 (`lat: -21.7695, lng: -52.7337`) e ajuste do **Pórtico-08** para o novo **km 021+200** em Bataguassu (`lat: -21.7285, lng: -52.3390`).
- **Interseção Ponto-Segmento (Point-to-Segment Projection)**: Substituição da verificação por vértice isolado pelo cálculo da distância ortogonal do pórtico até cada segmento de reta `[A, B]` da polilinha da rota, garantindo 100% de precisão mesmo em trechos retilíneos longos.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   FLUXO DE DETECÇÃO E TARIFAÇÃO DE PÓRTICOS                │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       ▼                                                             ▼
┌─────────────────────────────┐                               ┌─────────────────────────────┐
│   1. Base Oficial Unificada │                               │ 2. Geometria de Rota (OSRM) │
│   - 12 Pórticos (PFF 01-12) │                               │ - Polilinha GeoJSON [A -> B]│
│   - P04 e P08 unificados    │                               │ - Segmentos contínuos       │
│   - Coordenadas no eixo real│                               │   ao longo das rodovias     │
└──────────────┬──────────────┘                               └──────────────┬──────────────┘
               │                                                             │
               └──────────────────────────────┬──────────────────────────────┘
                                              ▼
                       ┌─────────────────────────────────────────────┐
                       │ 3. Motor de Projeção Ortogonal no Segmento  │
                       │ - Calcula distância mínima do Pórtico P     │
                       │   ao segmento de reta AB (Point-to-Segment) │
                       │ - Ordena pela progressão real da viagem     │
                       └──────────────────────┬──────────────────────┘
                                              ▼
                       ┌─────────────────────────────────────────────┐
                       │ 4. Cálculo Tarifário e Sincronização Visual │
                       │ - Contabiliza Pórtico-12 na BR-267          │
                       │ - Exibe selo de Pista Duplicada em P04/P08  │
                       │ - Sincroniza Calculadora e Mapa da Home     │
                       └─────────────────────────────────────────────┘
```

### Escopo de Atualização de Dados e Sincronização
1. **Base de Pórticos da Calculadora**:
   - Remoção definitiva de `p13` e `p14` da base de pórticos e das arestas topológicas (`ROUTE_EDGES`).
   - Atualização do `p08` para `km 021+200` (`declaredKm: 21.200`, `estimatedKm: 21.200`) e ajuste de coordenadas no eixo da BR-267.
   - Correção das coordenadas do `p12` (`km 065+750`) exatamente sobre o traçado da BR-267 (`lat: -21.7695, lng: -52.7337`).
   - Inclusão dos atributos `pffCode` (`PFF-01` a `PFF-12`) e `duplicatedLaneNote` nos pórticos `p04` e `p08`.
   - Ajuste das coordenadas de referência de municípios na BR-267 (como Anaurilândia/Nova Andradina quando selecionados no corredor da BR-267) e implementação da função `pointToSegmentDistanceMeters` para garantir que qualquer rota que percorra o trecho da BR-267 entre Bataguassu, Anaurilândia, Nova Andradina e Nova Casa Verde contabilize o **Pórtico-12**.
2. **Mapa Esquemático Interativo da Home**:
   - Atualização do **Pórtico 08** de `km 024+500` para `km 021+200` (`PFF-08`).
   - Padronização visual dos 12 pórticos com seus códigos `PFF-01` a `PFF-12` e destaque explicativo de pista duplicada para os Pórticos 04 e 08.
3. **Build de Produção**:
   - Validação de compilação TypeScript/Vite e atualização dos artefatos estáticos na pasta `docs/`.
