# Plano de Implementação Aprovado: Menu e Calculadora de Pedágio por Rota

Este documento registra a arquitetura aprovada para a funcionalidade de **Calculadora de Pedágio por Rota** da Concessionária Caminhos da Celulose, utilizando topologia por **Grafo de Adjacência** e busca determinística em JavaScript puro.

---

## User Review & Critical Decisions

> [!NOTE]
> Aprovada auditoria de estilos e acoplamento em `TabType`.
> **Correção de Arquitetura Aprovada**: O cálculo de rota utiliza um **Grafo de Conexões de Adjacência (BFS / Shortest Path)** mapeando estritamente os segmentos reais entre municípios por corredor rodoviário (BR-262, MS-040, BR-267, MS-338 e MS-395), eliminando qualquer risco de somar pórticos indevidos de rodovias paralelas.

---

## 1. Auditoria Visual e de Arquitetura

### Reutilização Visual e Estilização (100% Paridade)
- **Cores e Identidade Visual**:
  - Azul Marinho Concessionária: `#1A2B49` (`text-[#1A2B49]`, `bg-[#1A2B49]`, `border-[#1A2B49]`)
  - Verde Destaque Concessionária: `#46973A` (`text-[#46973A]`, `bg-[#46973A]`, `border-[#46973A]`)
  - Amarelo Alerta: `text-amber-600`, `bg-amber-50`, `border-amber-200`
  - Fundo Neutro: `bg-slate-50`, `border-slate-200`, `text-slate-800`
- **Tipografia**:
  - Fonte Principal de Interface: `Plus Jakarta Sans`
  - Fonte Numérica e Monetária: `IBM Plex Mono` (`font-mono tabular-nums`)
- **Ícones Reutilizados (Lucide React)**:
  - `Calculator`, `MapPin`, `Navigation`, `ArrowRight`, `RotateCcw`, `CheckCircle2`, `AlertCircle`, `Truck`, `Car`, `Info`, `ArrowLeftRight`

### Ponto Exato de Acoplamento no DOM e Menu
1. **Tipagem (`src/types/index.ts`)**:
   - Extensão do tipo `TabType` para incluir `'calculator'`:
     `export type TabType = 'home' | 'calculator' | 'training' | 'arena' | 'certificates';`
2. **Navegação (`src/components/Navbar.tsx`)**:
   - Acoplamento do novo botão `"Calculadora de Pedágio"` com o ícone `<Calculator className="w-4 h-4" />` entre `"Visão Geral"` e `"Módulos de Estudo"` (no menu desktop `<nav>` e no menu suspenso mobile).
3. **Visão Principal (`src/App.tsx`)**:
   - Renderização condicional da nova tela `<RouteTollCalculator />` quando `currentTab === 'calculator'`.

---

## 2. Modelagem por Grafo da Malha Rodoviária

### Tarifas Oficiais dos 14 Pórticos
| Pórtico | Rodovia | Estaca / Quilometragem | Município | Tarifa Base (Passeio) |
| :--- | :--- | :--- | :--- | :--- |
| **Pórtico-01** | BR-262 | km 040+450 | Três Lagoas / MS | **R$ 13,70** |
| **Pórtico-02** | BR-262 | km 109+500 | Água Clara / MS | **R$ 16,00** |
| **Pórtico-03** | BR-262 | km 204+460 | Ribas do Rio Pardo / MS | **R$ 18,00** |
| **Pórtico-04** | BR-262 | km 288+300 | Campo Grande / MS | **R$ 14,90** |
| **Pórtico-05** | MS-040 | km 045+360 | Campo Grande / MS | **R$ 14,90** |
| **Pórtico-06** | MS-040 | km 216+120 | Santa Rita do Pardo / MS | **R$ 5,60** |
| **Pórtico-07** | MS-338 | km 311+900 | Santa Rita do Pardo / MS | **R$ 5,60** |
| **Pórtico-08** | BR-267 | km 024+500 | Bataguassu / MS | **R$ 10,90** |
| **Pórtico-09** | BR-267 | km 129+100 | Nova Andradina / MS | **R$ 17,80** |
| **Pórtico-10** | BR-267 | km 182+000 | Nova Alvorada do Sul / MS | **R$ 13,10** |
| **Pórtico-11** | MS-040 | km 123+860 | Ribas do Rio Pardo / MS | **R$ 16,20** |
| **Pórtico-12** | BR-267 | km 065+750 | Anaurilândia / MS | **R$ 12,30** |
| **Pórtico-13** | MS-338 | km 150+000 | Camapuã / MS | **R$ 16,20** |
| **Pórtico-14** | MS-395 | km 080+000 | Brasilândia / MS | **R$ 11,30** |

### Topologia de Adjacência por Corredor Rodoviário
- **Corredor BR-262**:
  - `Campo Grande` ⟷ (Pórtico-04) ⟷ `Ribas do Rio Pardo` ⟷ (Pórtico-03, Pórtico-02) ⟷ `Água Clara` ⟷ (Pórtico-01) ⟷ `Três Lagoas`
- **Corredor MS-040**:
  - `Campo Grande` ⟷ (Pórtico-05, Pórtico-11) ⟷ `Ribas do Rio Pardo` ⟷ (Pórtico-06) ⟷ `Santa Rita do Pardo`
- **Corredor MS-338**:
  - `Camapuã` ⟷ (Pórtico-13) ⟷ `Ribas do Rio Pardo` ⟷ (Pórtico-07) ⟷ `Santa Rita do Pardo`
- **Corredor BR-267**:
  - `Nova Alvorada do Sul` ⟷ (Pórtico-10) ⟷ `Nova Andradina` ⟷ (Pórtico-09) ⟷ `Anaurilândia` ⟷ (Pórtico-12, Pórtico-08) ⟷ `Bataguassu`
- **Corredor MS-395**:
  - `Bataguassu` ⟷ (Pórtico-14) ⟷ `Brasilândia` ⟷ `Três Lagoas`

---

## 3. Estratégia de Implementação & Componentes

1. `src/types/index.ts`: Adicionar `'calculator'` no enum `TabType`.
2. `src/components/Navbar.tsx`: Adicionar botão de navegação da Calculadora de Pedágio no desktop e mobile.
3. `src/components/RouteTollCalculator.tsx`:
   - Grafo de adjacência de cidades com pórticos por segmento.
   - Algoritmo BFS para determinação do caminho geográfico e dos pórticos interceptados.
   - Autocomplete sem acentos e sensibilidade de caixa.
   - Botão "Inverter Origem/Destino" (`ArrowLeftRight`).
   - Categoria padrão: "Automóvel / Passeio (Tarifa Base 1x)" com seletores para motos e comerciais por eixo.
   - Detalhamento do resultado: caminho percorrido, lista ordenada de pórticos com fotos/localizações e valor total formatado em `IBM Plex Mono`.
4. `src/App.tsx`: Acoplar estado da aba e renderizar o componente quando selecionado.
