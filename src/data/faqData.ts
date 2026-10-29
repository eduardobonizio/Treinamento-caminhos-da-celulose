export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  friendlyTip?: string;
  highlights?: string[];
}

export interface FAQCategory {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  questions: FAQQuestion[];
}

export interface OfficialGantryTariff {
  highway: string;
  pffCode: string;
  code: string;
  km: string;
  city: string;
  baseFee: number;
  note?: string;
}

export const OFFICIAL_GANTRIES_FAQ: OfficialGantryTariff[] = [
  {
    highway: 'BR-262',
    pffCode: 'PFF-01',
    code: 'Pórtico 01',
    km: '040+450',
    city: 'Três Lagoas/MS',
    baseFee: 13.70
  },
  {
    highway: 'BR-262',
    pffCode: 'PFF-02',
    code: 'Pórtico 02',
    km: '109+500',
    city: 'Água Clara/MS',
    baseFee: 16.00
  },
  {
    highway: 'BR-262',
    pffCode: 'PFF-03',
    code: 'Pórtico 03',
    km: '204+460',
    city: 'Ribas do Rio Pardo/MS',
    baseFee: 18.00
  },
  {
    highway: 'BR-262',
    pffCode: 'PFF-04',
    code: 'Pórtico 04',
    km: '288+300',
    city: 'Campo Grande/MS',
    baseFee: 14.90,
    note: 'Pista duplicada: 2 pórticos físicos instalados para leitura por sentido'
  },
  {
    highway: 'MS-040',
    pffCode: 'PFF-05',
    code: 'Pórtico 05',
    km: '045+360',
    city: 'Campo Grande/MS',
    baseFee: 14.90
  },
  {
    highway: 'MS-040',
    pffCode: 'PFF-06',
    code: 'Pórtico 06',
    km: '216+120',
    city: 'Santa Rita do Pardo/MS',
    baseFee: 5.60
  },
  {
    highway: 'MS-338',
    pffCode: 'PFF-07',
    code: 'Pórtico 07',
    km: '311+900',
    city: 'Santa Rita do Pardo/MS',
    baseFee: 5.60
  },
  {
    highway: 'BR-267',
    pffCode: 'PFF-08',
    code: 'Pórtico 08',
    km: '021+200',
    city: 'Bataguassu/MS',
    baseFee: 10.90,
    note: 'Pista duplicada: 2 pórticos físicos instalados para leitura por sentido'
  },
  {
    highway: 'BR-267',
    pffCode: 'PFF-09',
    code: 'Pórtico 09',
    km: '129+100',
    city: 'Nova Andradina/MS',
    baseFee: 17.80
  },
  {
    highway: 'BR-267',
    pffCode: 'PFF-10',
    code: 'Pórtico 10',
    km: '182+000',
    city: 'Nova Alvorada do Sul/MS',
    baseFee: 13.10
  },
  {
    highway: 'MS-040',
    pffCode: 'PFF-11',
    code: 'Pórtico 11',
    km: '123+860',
    city: 'Ribas do Rio Pardo/MS',
    baseFee: 16.20
  },
  {
    highway: 'BR-267',
    pffCode: 'PFF-12',
    code: 'Pórtico 12',
    km: '065+750',
    city: 'Anaurilândia/MS',
    baseFee: 12.30
  }
];

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'sobre-pedagio-eletronico',
    order: 1,
    title: '1. Sobre o Pedágio Eletrônico',
    shortTitle: 'O que é o Sistema',
    description: 'Entenda como funciona o pedágio 100% digital, sem cabines e sem cancelas na Rota da Celulose.',
    questions: [
      {
        id: 'q1-1',
        question: 'O que é o pedágio eletrônico?',
        answer: 'É um modelo moderno de cobrança de pedágio totalmente digital, sem cabines físicas e sem cancelas. Em vez de parar em filas ou reduzir a velocidade bruscamente, o motorista passa livremente por pórticos instalados sobre a rodovia, equipados com câmeras, sensores e antenas inteligentes que registram a passagem do veículo de maneira automática.',
        friendlyTip: 'Pense no pórtico como uma praça de pedágio invisível: você passa em velocidade normal da rodovia e paga depois pelos canais oficiais ou direto na sua TAG.'
      },
      {
        id: 'q1-2',
        question: '“Sem cancela” significa que a rodovia é gratuita ou sem cobrança?',
        answer: 'Não. O pagamento do pedágio continua existindo e é estritamente obrigatório por lei. A grande mudança é que o processo se torna digital: você não precisa mais carregar dinheiro trocado, nem enfrentar filas ou esperar cancelas abrirem. A tarifa permanece devida e vinculada ao veículo após a passagem.',
        highlights: ['A cobrança continua obrigatória', 'Não há cancelas físicas', 'O pagamento é feito digitalmente ou via TAG']
      },
      {
        id: 'q1-3',
        question: 'Quem administra o pedágio eletrônico da Rota da Celulose?',
        answer: 'O sistema de pedágio eletrônico das rodovias do lote é gerenciado pela Concessionária Caminhos da Celulose, sob regulamentação e fiscalização da AGEMS (Agência Estadual de Regulação de Serviços Públicos de Mato Grosso do Sul).'
      },
      {
        id: 'q1-4',
        question: 'Quando começa a cobrança do pedágio eletrônico?',
        answer: 'A cobrança das tarifas está prevista para iniciar a partir de janeiro de 2027, após a conclusão do ciclo obrigatório de 12 meses de obras iniciais de restauração do pavimento, sinalização e implantação da infraestrutura tecnológica pela concessionária. Datas exatas serão divulgadas previamente pelos canais oficiais.',
        friendlyTip: 'Durante o período de obras e testes iniciais, os pórticos podem operar em modo educativo e de validação técnica, sem cobrança financeira aos motoristas.'
      },
      {
        id: 'q1-5',
        question: 'Como o pedágio eletrônico funciona na prática ao passar?',
        answer: 'Ao passar sob a estrutura metálica do pórtico, os sensores identificam seu veículo em frações de segundo. Se você possui uma TAG ativa colada no para-brisa, a cobrança é enviada à sua operadora e debitada na fatura. Se você não tem TAG, as câmeras de alta definição capturam as placas (dianteira e traseira) e disponibilizam a tarifa para pagamento em até 30 dias.'
      },
      {
        id: 'q1-6',
        question: 'Onde o pedágio eletrônico está disponível no Mato Grosso do Sul?',
        answer: 'A malha concedida da Rota da Celulose contempla 870,3 km de rodovias estaduais e federais em MS: BR-262, BR-267, MS-040 e MS-338, interligando Campo Grande, Ribas do Rio Pardo, Água Clara, Três Lagoas, Santa Rita do Pardo, Bataguassu, Nova Andradina e Nova Alvorada do Sul.'
      },
      {
        id: 'q1-7',
        question: 'Preciso parar ou reduzir a velocidade ao cruzar o pórtico?',
        answer: 'Não! Não é necessário frear nem desacelerar. O veículo deve simplesmente manter a velocidade regulamentada para aquele trecho da rodovia. Lembre-se: pedágio eletrônico permite fluxo livre, mas os limites máximos de velocidade da via continuam valendo integralmente para a segurança de todos.'
      },
      {
        id: 'q1-8',
        question: 'O pedágio eletrônico cobra por quilômetro percorrido?',
        answer: 'Não. A cobrança é feita pontualmente a cada pórtico que o veículo efetivamente atravessa. Cada um dos 12 pontos de cobrança possui um valor fixo homologado pela AGEMS correspondente ao trecho de cobertura daquela região.'
      }
    ]
  },
  {
    id: 'tecnologia-porticos',
    order: 2,
    title: '2. Tecnologia dos Pórticos',
    shortTitle: 'Sensores e Câmeras',
    description: 'Conheça a tecnologia de ponta que permite identificar veículos de dia ou de noite em qualquer velocidade permitida.',
    questions: [
      {
        id: 'q2-1',
        question: 'Como o pórtico identifica o veículo?',
        answer: 'Os pórticos operam 24 horas por dia, faça sol ou faça chuva. Eles possuem três tecnologias integradas:\n1. Antenas RFID: Fazem a comunicação instantânea com a TAG do veículo;\n2. Câmeras OCR de Alta Definição: Capturam imagens nítidas das placas dianteira e traseira com iluminação infravermelha noturna;\n3. Sensores a Laser e Perfiladores 3D: Escaneiam a altura, largura, comprimento e contam a quantidade de eixos no solo e eixos suspensos.',
        friendlyTip: 'Mesmo à noite ou sob chuva forte, as câmeras infravermelhas garantem leitura precisa sem utilizar flashes que ofusquem a visão do condutor.'
      },
      {
        id: 'q2-2',
        question: 'Para que servem os dados coletados nos pórticos?',
        answer: 'Além de viabilizar a cobrança justa e precisa, as informações de fluxo geradas pelos sensores ajudam no monitoramento inteligente da rodovia: identificação rápida de acidentes, envio ágil de guinchos e ambulâncias do SAU, controle de cargas especiais e planejamento contínuo de melhorias na malha viária.'
      }
    ]
  },
  {
    id: 'vantagens-pedagio-eletronico',
    order: 3,
    title: '3. Vantagens do Pedágio Eletrônico',
    shortTitle: 'Benefícios na Viagem',
    description: 'Mais segurança, menor tempo de viagem, economia de combustível e fim definitivo das filas de pedágio.',
    questions: [
      {
        id: 'q3-1',
        question: 'Quais são os principais benefícios para os motoristas e transportadores?',
        answer: 'O pedágio eletrônico transforma positivamente a experiência na estrada:\n• Fim das Filas: Acaba o congestionamento e o afunilamento típico das praças tradicionais;\n• Viagem mais Rápida: Você não perde minutos preciosos parando, pagando e arrancando;\n• Economia de Combustível: Evita o ciclo de frenagem e reaceleração, que consome muito combustível (especialmente em caminhões carregados de celulose e grãos);\n• Menos Desgaste Mecânico: Reduz o consumo de pastilhas de freio, embreagem e pneus;\n• Menos Emissões de Poluentes: Menor queima de combustível significa menos emissão de CO₂ no meio ambiente;\n• Mais Segurança Viária: Elimina o risco de colisões traseiras provocadas por filas repentinas na pista.',
        highlights: ['Sem gargalos de praças', 'Economia real de combustível', 'Mais segurança e conforto']
      }
    ]
  },
  {
    id: 'pagamento-prazos',
    order: 4,
    title: '4. Formas de Pagamento e Prazos',
    shortTitle: 'Como Pagar e Prazos',
    description: 'Como funciona o pagamento com e sem TAG, prazos legais de até 30 dias e opções disponíveis.',
    questions: [
      {
        id: 'q4-1',
        question: 'Como funciona o pagamento para quem tem TAG no para-brisa?',
        answer: 'É 100% automático e prático. A antena do pórtico faz a leitura da TAG na passagem, valida o veículo e envia a cobrança direto para a sua operadora contratada (Sem Parar, Veloe, ConectCar, Move Mais ou Greenpass). O valor entra no seu extrato ou débito habitual, e você ainda aproveita os descontos exclusivos.',
        friendlyTip: 'Com a TAG, você não precisa se preocupar com prazos de pagamento ou entrar em sites após a viagem.'
      },
      {
        id: 'q4-2',
        question: 'Como funciona o pagamento para quem NÃO tem TAG?',
        answer: 'Quando o veículo passa sem TAG, o pórtico registra a imagem da placa e abre um registro no sistema da concessionária. O proprietário do veículo ou o motorista deve acessar o site oficial ou aplicativo da concessionária, digitar a placa do veículo e realizar o pagamento dentro do prazo legal.',
        highlights: ['Identificação automática pela placa', 'Consulta via site ou aplicativo oficial', 'Prazo de 30 dias para quitar']
      },
      {
        id: 'q4-3',
        question: 'Quais são as formas de pagamento disponíveis para quem não usa TAG?',
        answer: 'Você pode pagar de forma rápida e segura utilizando:\n• PIX: Pagamento instantâneo via QR Code gerado no site ou app oficial;\n• Cartão de Crédito: Pagamento online direto na plataforma da concessionária;\n• Totens de Autoatendimento: Disponíveis nas bases do Serviço de Atendimento ao Usuário (SAU) ao longo das rodovias concedidas.',
        friendlyTip: 'Evite intermediários não autorizados. Use sempre o site oficial da Concessionária Caminhos da Celulose.'
      },
      {
        id: 'q4-4',
        question: 'Qual é o prazo para pagar a passagem do pedágio eletrônico?',
        answer: 'O usuário dispõe do prazo de 30 (trinta) dias corridos, contados a partir da data de confirmação do processamento do registro de passagem pelo sistema junto ao órgão competente. Esse prazo ampliado foi garantido pela legislação federal de trânsito para dar total tranquilidade ao cidadão.',
        highlights: ['30 dias corridos de prazo', 'Regulamentado pelo CTB', 'Tempo suficiente para consultar e pagar com calma']
      },
      {
        id: 'q4-5',
        question: 'O que acontece se eu não pagar dentro do prazo de 30 dias?',
        answer: 'O não pagamento da tarifa dentro dos 30 dias corridos é considerado infração grave de trânsito pelo Artigo 209-A do Código de Trânsito Brasileiro (CTB - Evasão de Pedágio). A penalidade inclui multa no valor de R$ 195,23 e 5 pontos na Carteira Nacional de Habilitação (CNH). Além disso, o valor original do pedágio continua em aberto e precisará ser pago normalmente.',
        friendlyTip: 'A multa de R$ 195,23 é aplicada pelo órgão de trânsito competente, não pela concessionária. Por isso, vale muito a pena instalar uma TAG ou quitar a tarifa logo após a viagem.'
      },
      {
        id: 'q4-6',
        question: 'Quem passa sem TAG tem direito a descontos na tarifa?',
        answer: 'Não. Os descontos tarifários (como o Desconto Básico de Tarifa de 5% e o Desconto de Usuário Frequente) são exclusivos para veículos que utilizam TAG homologada e ativa.'
      },
      {
        id: 'q4-7',
        question: 'Onde posso consultar minhas passagens e débitos?',
        answer: 'Você pode consultar a qualquer momento digitando a placa do veículo no portal oficial da Concessionária Caminhos da Celulose ou pelo aplicativo oficial da concessionária. Quem tem TAG pode acompanhar diretamente pelo aplicativo da sua operadora.'
      }
    ]
  },
  {
    id: 'tags-operadoras',
    order: 5,
    title: '5. TAG Eletrônica e Operadoras',
    shortTitle: 'Tudo Sobre a TAG',
    description: 'Saiba se a TAG é obrigatória, quais operadoras são aceitas e o que fazer em caso de troca de veículo.',
    questions: [
      {
        id: 'q5-1',
        question: 'É obrigatório instalar uma TAG no veículo?',
        answer: 'Não é obrigatório, mas é altamente recomendado! Você é livre para trafegar sem TAG, contanto que se lembre de acessar o site da concessionária em até 30 dias para quitar as tarifas pela placa. No entanto, usar uma TAG garante descontos automáticos, evita preocupações com prazos e impede o risco de multas por esquecimento.'
      },
      {
        id: 'q5-2',
        question: 'Quais operadoras de TAG são aceitas na Rota da Celulose?',
        answer: 'São aceitas todas as principais operadoras homologadas no Brasil:\n• Sem Parar\n• Veloe\n• ConectCar\n• Move Mais\n• Greenpass (e parceiros bancários como C6 Bank, Itaú, Porto Seguro, Inter, Mercado Pago, etc.).',
        friendlyTip: 'Se você já possui uma dessas TAGs ativas colada no para-brisa para estacionamentos ou outros pedágios, ela já funciona automaticamente na Rota da Celulose.'
      },
      {
        id: 'q5-3',
        question: 'Já tenho uma TAG ativa no meu carro. Ela vale na Rota da Celulose?',
        answer: 'Sim! As antenas dos pórticos seguem o padrão nacional do Sistema Nacional de Identificação Automática de Veículos (Siniav). Contanto que sua TAG esteja ativa, com saldo ou cartão válido, ela funcionará normalmente.'
      },
      {
        id: 'q5-4',
        question: 'O que acontece se minha TAG estiver bloqueada ou sem saldo no momento da passagem?',
        answer: 'Se a antena não conseguir validar a cobrança na operadora por motivo de bloqueio ou inadimplência, as câmeras do pórtico capturam a placa do carro e geram uma cobrança avulsa pela placa (sem os descontos da TAG). Nesse caso, você precisará pagar pelo site da concessionária em até 30 dias.'
      },
      {
        id: 'q5-5',
        question: 'Troquei de veículo ou troquei de para-brisa. Preciso atualizar minha TAG?',
        answer: 'Sim, com certeza. A TAG é intransferível e fica vinculada no sistema à placa e categoria específica do seu veículo. Se você colar a TAG em outro carro sem atualizar o cadastro na operadora, o sistema detectará divergência e a passagem poderá ser cobrada avulsamente ou gerar notificações de irregularidade.'
      }
    ]
  },
  {
    id: 'passagens-cobrancas',
    order: 6,
    title: '6. Passagens, Consultas e Cobranças',
    shortTitle: 'Dúvidas em Cobranças',
    description: 'Como agir caso não reconheça uma passagem, divergências de leitura ou problemas no comprovante.',
    questions: [
      {
        id: 'q6-1',
        question: 'Como faço para contestar uma passagem que não reconheço?',
        answer: 'Caso apareça no sistema uma passagem em data ou horário em que o veículo não trafegava pela rodovia (por exemplo, suspeita de placa clonada ou erro de digitação), acesse a Central de Relacionamento no site oficial da concessionária, anexe fotos do veículo e documentos comprobatórios para abertura de análise técnica.'
      },
      {
        id: 'q6-2',
        question: 'Minha TAG estava instalada e em dia, mas apareceu cobrança avulsa na placa. O que fazer?',
        answer: 'Isso pode ocorrer caso a TAG esteja mal posicionada no para-brisa (longe do espelho retrovisor ou em área com película metálica que bloqueie o sinal). Para evitar multa de trânsito, realize o pagamento da passagem dentro do prazo de 30 dias e entre em contato com sua operadora de TAG para verificar a leitura daquele trecho.'
      },
      {
        id: 'q6-3',
        question: 'Realizei o pagamento via Pix ou Cartão, mas a cobrança continua aparecendo como pendente.',
        answer: 'Geralmente a conciliação bancária do Pix é instantânea, mas em alguns casos pode levar até 2 horas para refletir em todos os servidores. Se após 24 horas a cobrança continuar em aberto, envie o comprovante de pagamento à Central de Atendimento da concessionária para baixa manual.'
      }
    ]
  },
  {
    id: 'multas-ctb',
    order: 7,
    title: '7. Multas e Consequências do Não Pagamento',
    shortTitle: 'Multas e CTB 209-A',
    description: 'Entenda os detalhes legais sobre a infração de evasão de pedágio e por que a concessionária não aplica multas diretamente.',
    questions: [
      {
        id: 'q7-1',
        question: 'Qual é a penalidade legal para quem não paga o pedágio eletrônico?',
        answer: 'De acordo com o Artigo 209-A do Código de Trânsito Brasileiro (CTB), deixar de efetuar o pagamento da tarifa de pedágio eletrônico no prazo regulamentar constitui infração grave, sujeita a:\n• Multa no valor de R$ 195,23;\n• 5 (cinco) pontos no prontuário da CNH do proprietário do veículo;\n• Aplicação da penalidade por CADA passagem não quitada;\n• Manutenção da dívida original da tarifa de pedágio com juros e atualização monetária.',
        highlights: ['Infração Grave', 'R$ 195,23 + 5 pontos na CNH', 'A dívida do pedágio continua devida']
      },
      {
        id: 'q7-2',
        question: 'Se eu pagar a tarifa após o prazo de 30 dias, a multa de trânsito é cancelada?',
        answer: 'Não. A cobrança do pedágio e o processo administrativo de trânsito são procedimentos separados. A autuação é lavrada pelo órgão de fiscalização de trânsito (como a Polícia Rodoviária Federal ou órgão estadual conveniado) e homologada pela autoridade de trânsito. A concessionária não tem poder para cancelar multas geradas por atraso.'
      },
      {
        id: 'q7-3',
        question: 'A multa de trânsito pode ser muito maior que o valor do pedágio?',
        answer: 'Sim, substancialmente maior! Enquanto a passagem por um pórtico custa entre R$ 5,15 e R$ 18,00 para carros de passeio, a multa de trânsito é de R$ 195,23 para cada pórtico não quitado no prazo, além dos pontos na carteira. Por isso, manter uma TAG ativa ou pagar dentro dos 30 dias é a melhor forma de economizar.'
      }
    ]
  },
  {
    id: 'isencoes-legais',
    order: 8,
    title: '8. Isenções Legais',
    shortTitle: 'Veículos Isentos',
    description: 'Quem tem direito à tarifa zero conforme o contrato de concessão e a regulamentação estadual.',
    questions: [
      {
        id: 'q8-1',
        question: 'Quais tipos de veículos têm direito à isenção de pedágio?',
        answer: 'Possuem isenção tarifária homologada pelo contrato de concessão da Rota da Celulose:\n• Motocicletas, motonetas, ciclomotores e triciclos (tarifa zero contratual);\n• Veículos oficiais a serviço da União, Estados e Municípios devidamente caracterizados;\n• Veículos operacionais da Polícia Rodoviária Federal (PRF) e Polícia Militar Rodoviária (PMR);\n• Ambulâncias e veículos de resgate médico em serviço de emergência;\n• Veículos do Corpo de Bombeiros Militar em operação.',
        highlights: ['Motos têm tarifa zero', 'Viaturas policiais e bombeiros', 'Ambulâncias em socorro']
      },
      {
        id: 'q8-2',
        question: 'Veículos isentos precisam parar no pórtico ou fazer cadastro?',
        answer: 'Não precisam parar de forma alguma. Motocicletas têm identificação automática pela geometria e placa. Veículos oficiais e de socorro devem seguir as diretrizes cadastrais estabelecidas pela AGEMS e pela concessionária para liberação automática no sistema.'
      }
    ]
  },
  {
    id: 'descontos-tarifarios',
    order: 9,
    title: '9. Descontos na Tarifa (DBT e DUF)',
    shortTitle: 'Descontos com TAG',
    description: 'Aproveite o Desconto Básico de Tarifa (5%) e o Desconto de Usuário Frequente progressivo para veículos leves.',
    questions: [
      {
        id: 'q9-1',
        question: 'Quem tem direito a descontos no pedágio eletrônico?',
        answer: 'Todos os motoristas que realizarem o tráfego com TAG ativa instalada no veículo têm direito aos benefícios tarifários previstos no edital de concessão. Quem trafega sem TAG não usufrui de nenhum desconto.'
      },
      {
        id: 'q9-2',
        question: 'O que é o DBT (Desconto Básico de Tarifa)?',
        answer: 'O DBT concede 5% de desconto automático sobre o valor da tarifa em todas as passagens realizadas com TAG, independentemente da categoria do veículo (leves, utilitários, ônibus e caminhões). O desconto é aplicado no momento da apuração do débito.',
        friendlyTip: 'Em uma viagem de ida e volta que cruze vários pórticos, o desconto de 5% representa economia real no final do mês.'
      },
      {
        id: 'q9-3',
        question: 'O que é o DUF (Desconto de Usuário Frequente)?',
        answer: 'O DUF é um benefício progressivo destinado a veículos de passeio (categoria leve com TAG) que trafegam frequentemente pelo mesmo pórtico, no mesmo sentido e dentro do mesmo mês civil. A partir da 2ª passagem no mês, o percentual de desconto vai aumentando progressivamente a cada nova passagem. Ao virar o mês, a contagem reinicia.',
        friendlyTip: 'Excelente para quem mora em uma cidade e trabalha em outra, como quem faz o trajeto diário entre Campo Grande e Ribas do Rio Pardo.'
      },
      {
        id: 'q9-4',
        question: 'Caminhões e ônibus têm direito ao Desconto de Usuário Frequente (DUF)?',
        answer: 'Não. Por determinação do marco regulatório da concessão, o DUF aplica-se exclusivamente a veículos leves. Os veículos comerciais pesados (ônibus e caminhões) têm direito garantido ao Desconto Básico de Tarifa (DBT de 5%) quando utilizam TAG.'
      }
    ]
  },
  {
    id: 'seguranca-golpes',
    order: 10,
    title: '10. Segurança e Prevenção contra Golpes',
    shortTitle: 'Evite Golpes e Fraudes',
    description: 'Dicas indispensáveis para pagar seu pedágio com segurança e não cair em sites ou cobranças falsas.',
    questions: [
      {
        id: 'q10-1',
        question: 'Como posso me proteger de golpes pela internet?',
        answer: 'Criminosos costumam criar anúncios fraudulentos em redes sociais ou enviar mensagens falsas fingindo ser da concessionária. Para sua total segurança:\n1. Acesse exclusivamente o site oficial ou o aplicativo oficial da Concessionária Caminhos da Celulose;\n2. Ao pagar com Pix, confira sempre a tela de confirmação no banco: o favorecido deve ser obrigatoriamente a Concessionária Caminhos da Celulose (nunca nome de pessoa física ou empresas estranhas);\n3. Desconfie de SMS, e-mails ou mensagens de WhatsApp cobrando "pedágio atrasado" com links desconhecidos pedindo pagamento urgente.',
        highlights: ['Confira o destinatário do Pix', 'Não clique em links de SMS duvidosos', 'Use apenas o site e app oficial']
      },
      {
        id: 'q10-2',
        question: 'A concessionária envia mensagem no meu WhatsApp cobrando pedágio?',
        answer: 'Não! A concessionária não realiza cobranças ativas solicitando transferências para chaves Pix pessoais por WhatsApp ou telefone. A iniciativa de consultar os débitos deve ser sempre do motorista nos canais oficiais.'
      }
    ]
  },
  {
    id: 'dicas-especiais-frotas',
    order: 11,
    title: '11. Dicas para Frotas, Veículos Alugados e Estrangeiros',
    shortTitle: 'Casos Especiais',
    description: 'Orientações práticas para empresas de transporte, carros de locadoras, carretas vazias e placas estrangeiras.',
    questions: [
      {
        id: 'q11-1',
        question: 'Como pagar o pedágio se o veículo for ALUGADO de locadora?',
        answer: 'Se você estiver dirigindo um carro alugado (Localiza, Movida, Unidas, etc.):\n• Verifique com a locadora se o carro já possui TAG habilitada: a maioria das locadoras já possui TAG e cobrará as passagens diretamente no fechamento do contrato de locação;\n• Se o carro alugado NÃO tiver TAG: você pode consultar a placa do veículo no site oficial da concessionária após passar pelo pórtico e efetuar o pagamento via Pix ou Cartão antes de devolver o carro, evitando que a locadora cobre taxa administrativa de gestão de infração.',
        friendlyTip: 'Guarde sempre o comprovante de pagamento caso precise apresentar à locadora na devolução do veículo.'
      },
      {
        id: 'q11-2',
        question: 'Como funciona a cobrança de EIXO SUSPENSO em caminhões e carretas vazias?',
        answer: 'De acordo com a Lei Federal nº 13.103/2015 (Lei dos Caminhoneiros) e regulamentos da ANTT/AGEMS, caminhões que trafegam comprovadamente vazios com eixos erguidos (suspensos) não pagam tarifa sobre os eixos que não tocam o solo.\nOs pórticos da Rota da Celulose contam com sensores a laser 3D e perfiladores ópticos de alta precisão que detectam se as rodas estão efetivamente suspensas no momento exato da passagem.',
        highlights: ['Sensores 3D detectam o eixo no ar', 'Caminhão vazio não paga eixo suspenso', 'Conforme a Lei 13.103/2015']
      },
      {
        id: 'q11-3',
        question: 'Como funciona para veículos com placa estrangeira (Mercosul - Paraguai, Bolívia, etc.)?',
        answer: 'Veículos com placas de outros países (como caminhões e turistas vindos da fronteira com o Paraguai ou Bolívia pelo corredor bioceânico) são identificados pelas câmeras nos pórticos. O pagamento pode ser feito pelo site da concessionária informando o padrão da placa Mercosul e quitando via cartão de crédito internacional ou nos totens de autoatendimento das bases do SAU ao longo da rodovia.'
      },
      {
        id: 'q11-4',
        question: 'Qual é o cuidado necessário com a placa do veículo?',
        answer: 'A placa dianteira e traseira deve estar sempre limpa, desobstruída e em bom estado de conservação. Trafegar com placa encoberta por barro, suporte de bicicleta ou com caracteres ilegíveis é infração gravíssima de trânsito (Art. 230 do CTB), sujeita a multa de R$ 293,47 e retenção do veículo.'
      }
    ]
  },
  {
    id: 'tabela-porticos-tarifas',
    order: 12,
    title: '12. Tabela Oficial de Pórticos e Tarifas',
    shortTitle: 'Localização e Tarifas',
    description: 'Consulte a localização exata por rodovia, quilômetro e valor da tarifa base dos 12 pórticos da concessão.',
    questions: [
      {
        id: 'q12-1',
        question: 'Onde estão instalados os 12 pontos de cobrança e qual o valor da tarifa base?',
        answer: 'A malha concedida possui 12 pontos de cobrança (totalizando 14 pórticos físicos instalados, pois os pontos 04 e 08 contam com 2 estruturas devido a pistas duplicadas). Os valores da tarifa base (categoria 1 - automóveis de passeio) homologados pelo contrato de concessão estão detalhados na tabela abaixo.',
        friendlyTip: 'As tarifas são individuais por pórtico. Para simular itinerários completos com cálculo automático para seu tipo de veículo e descontos de TAG, utilize nossa Calculadora de Pedágio.'
      }
    ]
  }
];
