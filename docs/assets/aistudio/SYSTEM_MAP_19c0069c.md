<!--
DIRETRIZ PERMANENTE DE CONSULTA E ATUALIZAÇÃO:
SEMPRE consulte este arquivo antes de procurar arquivos no projeto.
Ao criar um novo arquivo, alterar a responsabilidade de uma classe ou descobrir um padrão melhor,
ATUALIZE este SYSTEM_MAP.md imediatamente ao final da tarefa.
-->

# SYSTEM MAP — Idle Bones

> **Diretriz Obrigatória:** SEMPRE consulte este arquivo antes de procurar arquivos no projeto. Ao criar um novo arquivo, alterar a responsabilidade de uma classe ou descobrir um padrão melhor, ATUALIZE este `SYSTEM_MAP.md` imediatamente ao final da tarefa.

---

## 1. Mapa de Arquivos e Responsabilidades

### Raiz do App (`app/src/main/java/com/idlebones/game/`)
- [`MainActivity.kt`](file:///app/src/main/java/com/idlebones/game/MainActivity.kt) $\rightarrow$ Ponto de entrada Android, configuração de tema e injeção do ciclo de vida no `GameEngine`.

### Economia e Lojas (`data/economy/`)
- [`ShopSystem.kt`](file:///app/src/main/java/com/idlebones/game/data/economy/ShopSystem.kt) $\rightarrow$ Catálogo de lojas da cidade (Ferreiro, Alquimista), precificação de compra/venda e receitas de forja/crafting.

### Geradores e Dados Globais (`data/generator/`)
- [`DiscoveryManager.kt`](file:///app/src/main/java/com/idlebones/game/data/generator/DiscoveryManager.kt) $\rightarrow$ Sistema de descoberta (Mystery Drops) e repositório central `GameDatabase` (zonas, itens, pets e receitas).
- [`GameDatabaseGenerator.kt`](file:///app/src/main/java/com/idlebones/game/data/generator/GameDatabaseGenerator.kt) $\rightarrow$ Gerador procedural balanceado de zonas (1..20), monstros, drops, curva de XP (RuneScape 1..130) e nomes completos de recursos/equipamentos.

### Modelos de Domínio (`data/models/`)
- [`EquipmentSlot.kt`](file:///app/src/main/java/com/idlebones/game/data/models/EquipmentSlot.kt) $\rightarrow$ Enumeração dos slots de equipamentos do jogador (WEAPON, SHIELD, HELMET, CHEST, LEGS, BOOTS, GLOVES, AMULET, RING_1, RING_2, CAPE, AMMO).
- [`Item.kt`](file:///app/src/main/java/com/idlebones/game/data/models/Item.kt) $\rightarrow$ Modelo de domínio `Item`/`ItemDomain`, multiplicadores de raridade e utilitário `getItemDisplayCategory` para subcategorias de inventário.
- [`ItemCategory.kt`](file:///app/src/main/java/com/idlebones/game/data/models/ItemCategory.kt) $\rightarrow$ Categorias estruturais de itens (SWORDS, HEAVY_ARMOR, LEATHER_ARMOR, CLOTH_ARMOR, RANGED_WEAPONS_AMMO, MAGIC_WEAPONS, SHIELDS_ACCESSORIES, CONSUMABLES, RESOURCES, FOOD, COOKING).
- [`ItemTier.kt`](file:///app/src/main/java/com/idlebones/game/data/models/ItemTier.kt) $\rightarrow$ 10 tiers de progressão (COMMON a GOD) com multiplicadores de poder (1.0x a 26.0x) e cores hexadecimais para badges de UI.
- [`Pet.kt`](file:///app/src/main/java/com/idlebones/game/data/models/Pet.kt) $\rightarrow$ Modelo de dados para os 16 pets raros associados a cada habilidade (chance de drop <= 0.09%).
- [`PlayerStats.kt`](file:///app/src/main/java/com/idlebones/game/data/models/PlayerStats.kt) $\rightarrow$ Modelo de domínio que agrega nível e XP atual para as 16 habilidades do personagem.
- [`SkillRecipe.kt`](file:///app/src/main/java/com/idlebones/game/data/models/SkillRecipe.kt) $\rightarrow$ Modelo de dados para ações, receitas e recursos de profissões (nível requerido, insumos consumidos, item produzido e XP concedida).
- [`SkillType.kt`](file:///app/src/main/java/com/idlebones/game/data/models/SkillType.kt) $\rightarrow$ Enumeração das 16 habilidades do jogo (Combate: Attack, Strength, Defense, Ranged, Magic, Prayer, Agility; Profissões: Mining, Woodcutting, Fishing, Cooking, Smithing, Runecrafting, Fletching, Firemaking, Alchemy).

### Salvamento e Persistência (`data/save/`)
- [`GameState.kt`](file:///app/src/main/java/com/idlebones/game/data/save/GameState.kt) $\rightarrow$ Estado global serializável (`GameState`, `PlayerStatsData`, `ItemData`, `PetData`) totalmente imutável, salvo em JSON.
- [`SaveManager.kt`](file:///app/src/main/java/com/idlebones/game/data/save/SaveManager.kt) $\rightarrow$ Singleton de persistência assíncrona em disco (`savegame.json`), higienização de nomes (`sanitizeItemName`) e mapeador bidirecional `GameStateMapper`.

### Motor do Jogo (`engine/`)
- [`GameEngine.kt`](file:///app/src/main/java/com/idlebones/game/engine/GameEngine.kt) $\rightarrow$ Motor central e StateHolder: loop de ticks (1s), combate em turnos com delay de respawn de 1s, auto-eat, ações ativas de skills/crafting, cálculo de stats totais de batalha, cálculo de progresso offline seguro e emissão de snapshots via `StateFlow<GameState>`.

### Componentes de UI (`ui/components/`)
- [`CommonComponents.kt`](file:///app/src/main/java/com/idlebones/game/ui/components/CommonComponents.kt) $\rightarrow$ Componentes reutilizáveis em Compose (`TierBadge` com truncamento elegante, `ProgressBar` com gradiente/labels e `SectionHeader`).

### Telas de UI (`ui/screens/`)
- [`CharacterScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/CharacterScreen.kt) $\rightarrow$ Tela de perfil do personagem com listagem das 16 habilidades e coleção de pets descobertos/ativos.
- [`CityScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/CityScreen.kt) $\rightarrow$ Tela da cidade com lojas interativas (Ferreiro, Alquimista) e forja de crafting com custos de ouro e insumos.
- [`CombatScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/CombatScreen.kt) $\rightarrow$ Tela principal de batalha: chips com os 4 stats consolidados (Melee, Ranged, Magic, Defense), splash de dano/bloqueio no turno, seleção de mapas e monstros (comuns e chefões), drop rate e controles de auto-eat.
- [`InventoryScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/InventoryScreen.kt) $\rightarrow$ Mochila e equipamentos: grade com 10 slots ativos, botões de auto-equip por classe e grade de itens com barra de chips para filtro das 9 subcategorias.
- [`MainGameScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/MainGameScreen.kt) $\rightarrow$ Estrutura base com `Scaffold` e `NavigationBar` inferior dividida em 5 abas: Combate, Skills, Mochila, Cidade e Personagem.
- [`ProfessionsScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/ProfessionsScreen.kt) $\rightarrow$ Tela de profissões de coleta para acesso rápido e histórico de ações.
- [`SkillsScreen.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/SkillsScreen.kt) $\rightarrow$ Menu de Habilidades: Seção 1 (Habilidades de Combate com cards estáticos e barras de XP) e Seção 2 (Profissões com navegação detalhada para receitas e botões Iniciar/Parar).
- [`SkillUi.kt`](file:///app/src/main/java/com/idlebones/game/ui/screens/SkillUi.kt) $\rightarrow$ Utilitários compartilhados de interface para formatação de nomes em PT-BR, ícones temáticos e cálculo de nível por skill.

### Tema e Estilos (`ui/theme/`)
- [`GameTheme.kt`](file:///app/src/main/java/com/idlebones/game/ui/theme/GameTheme.kt) $\rightarrow$ Configuração global do tema escuro de RPG (`IdleBonesTheme`), tipografia e paleta de cores canônicas (`GameColors`).

---

## 2. Contratos e Convenções de IDs

### Tiers de Progressão (1..10)
| Ordinal | Enum Tier | Material Base | Multiplicador | Cor Hexadecimal |
| :--- | :--- | :--- | :--- | :--- |
| **0** | `COMMON` | Bronze | 1.0x | `#9E9E9E` |
| **1** | `UNCOMMON` | Ferro | 1.5x | `#4CAF50` |
| **2** | `RARE` | Aço | 2.2x | `#2196F3` |
| **3** | `SUPER_RARE` | Mithril | 3.2x | `#9C27B0` |
| **4** | `EPIC` | Adamantio | 4.5x | `#FF9800` |
| **5** | `LEGENDARY` | Rúnico | 6.5x | `#E91E63` |
| **6** | `MYTHIC` | Dragão | 9.0x | `#F44336` |
| **7** | `ANCESTRAL` | Ancestral | 13.0x | `#00BCD4` |
| **8** | `DIVINE` | Divino | 18.5x | `#FFD700` |
| **9** | `GOD` | Celestial | 26.0x | `#E040FB` |

### Padrões e Prefixos de Identificadores (IDs)
- **Zonas e Exploração:** `zone_{1..20}` (representam faixas de nível de 1 a 130).
- **Monstros:** `monster_zone{Z}_common{1..6}` e `monster_zone{Z}_boss`.
- **Recursos Coletáveis por Zona:** `res_ore_tier{1..20}`, `res_wood_tier{1..20}`, `res_fish_tier{1..20}`.
- **Insumos e Matérias-Primas:**
  - Minérios: `res_copper_ore`, `res_iron_ore`, `res_gold_ore`, `res_mithril_ore`, `res_adamantite_ore`, `res_runite_ore`, `res_blank_rune`, `res_coal`.
  - Madeiras: `res_normal_logs`, `res_oak_logs`, `res_willow_logs`, `res_yew_logs`, `res_magic_logs`.
  - Peixes Crus: `raw_shrimp`, `raw_trout`, `raw_salmon`, `raw_lobster`, `raw_shark`.
  - Barras Fundidas: `bar_bronze`, `bar_iron`, `bar_steel`, `bar_gold`, `bar_mithril`, `bar_runite`.
- **Comidas e Consumíveis:**
  - Comidas: `food_bread`, `cooked_shrimp`, `cooked_trout`, `cooked_salmon`, `cooked_lobster`, `cooked_shark`, `food_{1..20}`.
  - Poções: `cons_potion_{1..20}`, `alch_potion_{1..3}`.
- **Equipamentos e Armas:**
  - Armas Melee: `eq_wpn_{TIER}`.
  - Armaduras Melee: `eq_arm_{TIER}_{SLOT}` (`HELMET`, `CHEST`, `LEGS`, `BOOTS`, `GLOVES`, `SHIELD`).
  - Ranged: `eq_ranged_wpn_{TIER}`, `eq_ranged_ammo_{TIER}`, `eq_arm_leather_{TIER}_{SLOT}`.
  - Magic: `eq_magic_wpn_{TIER}`, `eq_magic_ammo_{TIER}`, `rune_{air|fire|water|earth|chaos|death}`, `eq_arm_cloth_{TIER}_{SLOT}`.
  - Acessórios: `eq_acc_amu_{TIER}`, `eq_acc_ring_{TIER}`, `eq_acc_cape_{TIER}`.
- **Receitas de Profissões:**
  - Prefixo por skill: `mine_*`, `wood_*`, `fish_*`, `cook_*`, `smith_*`, `rc_*`, `fletch_*`, `fm_*`, `alch_*`.
- **Pets Exclusivos:** `pet_{skill_name_lowercase}` (ex: `pet_mining`, `pet_strength`).

### Subcategorias Canônicas de Inventário (`getItemDisplayCategory`)
1. `"Armas Melee"` (Espadas, machados e armas corporais)
2. `"Arcos & Ranged"` (Arcos e armas de disparo)
3. `"Cajados & Magic"` (Cajados e varinhas mágicas)
4. `"Escudos & Munições"` (Escudos, flechas e runas mágicas)
5. `"Armaduras"` (Elmos, peitorais, perneiras, botas, luvas e mantos)
6. `"Acessórios"` (Amuletos, anéis e capas)
7. `"Comidas"` (Alimentos preparados para HP e auto-eat)
8. `"Poções"` (Poções de cura e elixires)
9. `"Recursos de Coleta"` (Minérios, troncos, barras, peixes crus e insumos)

---

## 3. Regras Invioláveis do Projeto

1. **Imutabilidade Absoluta do `GameState`:**
   - O estado global é 100% imutável. Qualquer alteração deve produzir uma nova cópia via `.copy()` e ser despachada atomicamente via `_gameState.update { ... }`.
   - NUNCA altere listas (`List`), conjuntos (`Set`) ou mapas (`Map`) in-place. Crie novas coleções (`toMutableList().apply { ... }` ou operadores `+`/`-`).

2. **Reatividade Unidirecional Exclusiva via `StateFlow`:**
   - O `GameEngine` é a única fonte da verdade (`StateFlow<GameState>`).
   - A camada de apresentação (Compose) é estritamente reativa: apenas observa (`collectAsState()`) e despacha intenções do usuário chamando métodos públicos do motor.

3. **Isolamento da Apresentação (UI sem Lógica de Negócio):**
   - Composables nunca devem calcular experiência, aplicar dano, validar requisitos de nível de crafting ou computar bônus de combate.
   - Toda lógica de jogo, regras matemáticas, taxas de drop e validações pertencem ao `GameEngine` e à camada de modelos de domínio.

4. **Proteção e Integridade do Progresso Offline:**
   - O cálculo do tempo offline é feito contra o `lastSaveTimestamp`, limitado a um teto seguro (máximo de 8 a 12 horas).
   - O cálculo offline é executado de forma analítica/agregada em lote (*lump-sum*) dentro do `Dispatchers.Default`, sem disparar loops sequenciais com delays que travariam a UI ou consumiriam a bateria do dispositivo.

5. **Integridade de Nomes e Prevenção de Truncamento:**
   - É estritamente proibido serializar ou expor nomes de itens truncados (como `"Madeira de"`, `"Minério de"`, `"Helmet de"` ou strings terminadas em `" de"`).
   - O `GameStateMapper` higieniza strings tanto na leitura do disco quanto na gravação, garantindo consistência com `DiscoveryManager` e `GameDatabaseGenerator`.
