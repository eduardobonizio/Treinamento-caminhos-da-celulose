import { TrainingModule } from '../types';

export const initialModules: TrainingModule[] = [
  {
    id: 'mod-1',
    order: 1,
    title: 'Fundamentos do Free Flow & Arquitetura do Pórtico',
    description: 'Entenda como funciona o pedágio automático sem cancelas na Caminhos da Celulose e a tecnologia instalada nos 14 pórticos da malha rodoviária.',
    estimatedMinutes: 12,
    category: 'Tecnologia',
    sections: [
      {
        id: 'sec-1-1',
        title: 'O que é o Sistema Free Flow?',
        subtitle: 'Eliminação de praças de pedágio físicas e fluxo 100% contínuo',
        content: [
          'O Free Flow (Fluxo Livre) é o modelo eletrônico de pedágio que extingue completamente as barreiras físicas, cabines de cobrança e cancelas na rodovia.',
          'Na malha da Concessionária Caminhos da Celulose (Rota da Celulose - cerca de 870 km abrangendo BR-262, BR-267, MS-040, MS-338 e MS-395), os veículos transitam na velocidade regulamentar da via sem necessidade de redução brusca de velocidade ou parada.',
          'Isso reduz emissões de CO2, previne acidentes por engavetamento nas praças convencionais, diminui o desgaste dos freios dos caminhões bitrem e otimiza o escoamento logístico da celulose e grãos de Mato Grosso do Sul.'
        ],
        keyPoints: [
          '870,3 km de malha concedida na Rota da Celulose',
          '14 pórticos distribuídos em 12 pontos estratégicos de cobrança',
          'Velocidade contínua da via (até 100-110 km/h) sem parada ou afunilamento de pista'
        ],
        checklist: [
          'Compreendi a diferença entre praça convencional de pedágio e pórtico Free Flow',
          'Identifiquei as rodovias sob gestão da Caminhos da Celulose (BR-262, BR-267, MS-040, MS-338, MS-395)'
        ]
      },
      {
        id: 'sec-1-2',
        title: 'Anatomia e Sensores do Pórtico Aéreo',
        subtitle: 'Como o veículo é identificado em milésimos de segundo',
        content: [
          'Cada pórtico da Caminhos da Celulose é uma estrutura metálica aérea de alta rigidez equipada com um conjunto redundante de sensores de ponta.',
          '1. Antenas DSRC / RFID (915 MHz): Capturam instantaneamente o sinal emitido pelo chip da TAG colada no para-brisa do veículo assim que ele entra na zona de leitura.',
          '2. Câmeras OCR de Alta Resolução (Optical Character Recognition): Conjunto de câmeras frontais e traseiras sincronizadas com iluminadores infravermelhos (IR) para fotografar e decodificar a placa do veículo (placas cinza antigas e padrão Mercosul), mesmo sob chuva torrencial ou à noite.',
          '3. Scanners Laser Volumétricos (LiDAR): Cortinas de laser aéreo que medem o perfil tridimensional do veículo (comprimento, altura, largura) para classificação categórica.',
          '4. Sensores de Detecção de Eixos: Módulos aéreos e de pista que contam o número exato de eixos em contato com o solo e identificam eixos suspensos em caminhões e carretas.'
        ],
        keyPoints: [
          'Antenas RFID operam na faixa homologada de 915 MHz',
          'Câmeras duplas (frontal e traseira) garantem leitura mesmo se a placa dianteira estiver danificada',
          'Iluminação infravermelha não ofusca a visão do motorista'
        ],
        warningNote: 'A redundância entre RFID e OCR garante que mesmo que uma TAG falhe ou não exista, a placa seja imediatamente catalogada para a triagem do CCA.'
      }
    ]
  },
  {
    id: 'mod-2',
    order: 2,
    title: 'O Dia a Dia e os Procedimentos do Operador no CCA',
    description: 'Rotinas cruciais do Centro de Controle de Arrecadação: auditoria de imagens, triagem de passagens duvidosas e validação de eixos.',
    estimatedMinutes: 15,
    category: 'Operações CCA',
    sections: [
      {
        id: 'sec-2-1',
        title: 'A Missão do CCA (Centro de Controle de Arrecadação)',
        subtitle: 'O coração da auditoria e garantia da receita da concessionária',
        content: [
          'O CCA é o centro operacional onde todos os registros gerados nos 14 pórticos são consolidados, auditados e processados.',
          'A grande maioria das passagens com TAG ativa é conciliada automaticamente em frações de segundo pelo sistema. No entanto, o papel humano do operador é insubstituível na triagem de eventos de exceção.',
          'Os operadores do CCA analisam lotes de passagens onde o OCR obteve índice de confiança abaixo da margem de segurança (por exemplo, placas sujas de barro, caracteres desgastados, reboques ou eixos erguidos).'
        ],
        keyPoints: [
          'Conciliação automatizada: Passagens 100% legíveis com TAG são debitadas de imediato',
          'Mesa de Triagem Manual: Fila de conferência humana para eventos com OCR duvidoso',
          'SLA de Auditoria: As imagens devem ser validadas dentro da janela operacional regulatória da AGEMS'
        ]
      },
      {
        id: 'sec-2-2',
        title: 'Verificação de Eixo Suspenso & Classificação Veicular',
        subtitle: 'Garantindo a tarifa correta e justa para o transportador',
        content: [
          'Na cobrança rodoviária, caminhões vazios que transitam com eixo suspenso (erguido) têm direito à isenção da tarifa correspondente àquele eixo, conforme a legislação federal (Lei nº 13.103/2015 e resolução ANTT/AGEMS).',
          'O sistema do pórtico captura imagens angulares laterais do rodado do veículo. O operador do CCA deve inspecionar a imagem para confirmar se o pneumático está visivelmente separado do pavimento asfáltico.',
          'Caso o eixo esteja tocando o solo ou apoiado por carga pesada, a cobrança cheia de todos os eixos operacionais deve ser mantida. Se o eixo estiver suspenso, o operador aplica o código de dedução correspondente.'
        ],
        keyPoints: [
          'Eixo suspenso sem contato com o asfalto = Isenção da fração tarifária correspondente',
          'Inspeção por câmeras laterais em alta definição com visão do conjunto de rodagem',
          'Evita cobrança indevida e previne contestações jurídicas e operacionais'
        ],
        checklist: [
          'Sei identificar o afastamento da roda em relação ao solo na câmera lateral',
          'Compreendo a responsabilidade do CCA ao manter ou deduzir o valor por eixo'
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    order: 3,
    title: 'Métodos de Pagamento, TAGs & Prazos da AGEMS',
    description: 'Regras de cobrança com e sem TAG, desconto de usuário frequente e os prazos legais para pagamento da tarifa.',
    estimatedMinutes: 10,
    category: 'Regulatório',
    sections: [
      {
        id: 'sec-3-1',
        title: 'Veículos com TAG vs. Veículos sem TAG',
        subtitle: 'A experiência do usuário e as formas de liquidação da tarifa',
        content: [
          'Usuários com TAG ativa (Sem Parar, ConectCar, Veloe, Taggy, Move Mais, etc.): A tarifa é cobrada automaticamente na fatura da operadora da TAG contratada pelo motorista. Além da comodidade, usuários de veículos de passeio com TAG contam com o DUF (Desconto de Usuário Frequente), que concede reduções progressivas a cada passagem no mesmo mês.',
          'Usuários sem TAG: O pórtico registra a passagem pela placa do veículo. O motorista não é multado imediatamente! Ele tem a responsabilidade de acessar os canais digitais da Caminhos da Celulose (site oficial, aplicativo móvel, WhatsApp oficial ou totens de autoatendimento) e efetuar o pagamento.'
        ],
        keyPoints: [
          'TAG ativa oferece débito automático sem intervenção e descontos DUF progressivos',
          'Sem TAG: Consulta pela placa nos canais oficiais da concessionária',
          'Meios de pagamento aceitos: Pix (aprovação imediata), Cartão de Crédito ou Débito'
        ]
      },
      {
        id: 'sec-3-2',
        title: 'O Prazo Legal de 30 Dias e o Artigo 209-A do CTB',
        subtitle: 'O que a legislação brasileira e a AGEMS determinam',
        content: [
          'Com a modernização do Código de Trânsito Brasileiro e a regulamentação do Conselho Nacional de Trânsito (CONTRAN), o prazo para o usuário sem TAG quitar a tarifa do Free Flow foi estabelecido em até 30 (trinta) dias corridos a contar da data e hora da passagem.',
          'Se o condutor NÃO realizar o pagamento dentro desse prazo de 30 dias, a passagem é caracterizada juridicamente como Evasão de Pedágio.',
          'A concessionária é obrigada a reportar a infração ao órgão fiscalizador de trânsito competente (AGEMS / DETRAN-MS / PRF). A infração prevista no Art. 209-A do CTB é considerada GRAVE, com aplicação de multa no valor de R$ 195,23 e 5 pontos na Carteira Nacional de Habilitação (CNH), além de continuar devendo a tarifa do pedágio à concessionária.'
        ],
        warningNote: 'A multa de R$ 195,23 NÃO quita a tarifa de pedágio. O usuário continua com a dívida aberta junto à concessionária.',
        checklist: [
          'Gravar o prazo limite: 30 dias corridos após a passagem',
          'Saber o artigo do CTB: Art. 209-A (Infração Grave, 5 pontos, multa de R$ 195,23)'
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    order: 4,
    title: 'Exceções, Isenções e Casos Especiais no CCA',
    description: 'Como o operador do CCA trata viaturas oficiais, ambulâncias, placas clonadas, reboques e comboios de celulose.',
    estimatedMinutes: 14,
    category: 'Procedimentos',
    sections: [
      {
        id: 'sec-4-1',
        title: 'Veículos Isentos por Lei',
        subtitle: 'Triagem de viaturas de emergência e forças públicas',
        content: [
          'Pela legislação rodoviária brasileira e contrato de concessão da Caminhos da Celulose, são isentos do pagamento de tarifa:',
          '1. Veículos oficiais da União, Estados e Municípios a serviço da administração pública.',
          '2. Viaturas policiais (Polícia Rodoviária Federal, Polícia Militar, Polícia Civil, Força Nacional).',
          '3. Corpos de Bombeiros e ambulâncias em serviço de urgência e emergência.',
          '4. Veículos da AGEMS em fiscalização na malha rodoviária.',
          'Quando um veículo oficial passa pelo pórtico sem TAG de isenção pré-cadastrada, a passagem cai na fila do CCA. O operador deve inspecionar a identificação visual oficial (plotagem, giroflex, brasão público) e aplicar a baixa pelo código de "Isenção Institucional".'
        ],
        keyPoints: [
          'Isenção requer identificação comprobatória na imagem ou cadastro prévio no banco da AGEMS',
          'Giroflex acionado ou identificação de socorro confirma prioridade',
          'Carros particulares de servidores NÃO possuem isenção automática sem estarem a serviço oficial'
        ]
      },
      {
        id: 'sec-4-2',
        title: 'Comboios de Celulose & Cargas Excedentes',
        subtitle: 'Particularidades do transporte pesado na Rota da Celulose',
        content: [
          'A malha de MS-040, BR-262 e MS-338 recebe intensa circulação de composições de grande porte (como Tritrens e Carretas de 9 eixos transportando madeira de eucalipto para as fábricas de celulose).',
          'Esses veículos possuem comprimento de até 30 metros e altura elevada. O LiDAR do pórtico identifica a volumetria contínua.',
          'O operador deve assegurar que o conjunto cavalo-mecânico + semi-reboques seja registrado como um único evento tarifário correspondente à quantidade exata de eixos (ex: 9 eixos), evitando que o sistema fragmente o comboio em passagens separadas.'
        ],
        checklist: [
          'Sei reconhecer um conjunto bitrem/tritrem na esteira de auditoria do CCA',
          'Conheço o procedimento para consolidar passagens fracionadas erroneamente pelo sensor'
        ]
      }
    ]
  }
];
