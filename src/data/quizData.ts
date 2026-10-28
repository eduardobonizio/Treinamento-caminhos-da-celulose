import { QuizQuestion } from '../types';

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Qual é a principal característica operacional do sistema Free Flow na Concessionária Caminhos da Celulose?',
    options: [
      'Cobrança eletrônica automática por pórticos sem cabines de pedágio ou cancelas físicas',
      'Praças com cancelas automáticas que abrem apenas para veículos com TAG',
      'Cobrança exclusiva através de totens manuais onde o motorista deve parar no acostamento',
      'Isenção total de tarifa para todos os veículos que trafegam na Rota da Celulose'
    ],
    correctIndex: 0,
    explanation: 'O Free Flow elimina cancelas e cabines físicas, realizando a cobrança 100% eletrônica em velocidade contínua da via por meio de pórticos aéreos.',
    category: 'Tecnologia',
    difficulty: 'Fácil'
  },
  {
    id: 'q-2',
    question: 'Qual é o prazo regulamentar que um motorista sem TAG possui para pagar a tarifa do Free Flow antes de cometer infração de trânsito?',
    options: [
      'Até 24 horas após a passagem',
      'Até 7 dias corridos',
      'Até 30 dias corridos a contar da data e hora da passagem',
      'Até o final do ano vigente'
    ],
    correctIndex: 2,
    explanation: 'Conforme a regulamentação do CONTRAN e da AGEMS, o prazo legal para o pagamento da tarifa do Free Flow por veículos sem TAG é de até 30 dias corridos.',
    category: 'Regulatório',
    difficulty: 'Fácil'
  },
  {
    id: 'q-3',
    question: 'Caso o condutor não efetue o pagamento da tarifa no prazo regulamentar de 30 dias, qual infração prevista no CTB é configurada?',
    options: [
      'Art. 181 - Estacionamento proibido (Leve)',
      'Art. 209-A - Evasão de pedágio em sistema de livre passagem (Grave: 5 pontos e multa de R$ 195,23)',
      'Art. 218 - Excesso de velocidade (Média)',
      'Não há previsão de multa, apenas cobrança com juros simples'
    ],
    correctIndex: 1,
    explanation: 'O Art. 209-A do Código de Trânsito Brasileiro tipifica como infração grave a evasão de pedágio em sistemas Free Flow, acarretando multa de R$ 195,23 e 5 pontos na CNH.',
    category: 'Regulatório',
    difficulty: 'Médio'
  },
  {
    id: 'q-4',
    question: 'Qual é a tecnologia e a frequência de rádio utilizada pelas antenas dos pórticos para leitura das TAGs de para-brisa?',
    options: [
      'Bluetooth de 2.4 GHz',
      'Wi-Fi 5 de 5.8 GHz',
      'RFID / DSRC operando na faixa de 915 MHz',
      'NFC de curta distância de 13.56 MHz'
    ],
    correctIndex: 2,
    explanation: 'As antenas de leitura automática de TAG instaladas nos pórticos do Free Flow no Brasil utilizam tecnologia RFID / DSRC na frequência de 915 MHz.',
    category: 'Tecnologia',
    difficulty: 'Médio'
  },
  {
    id: 'q-5',
    question: 'Ao identificar um caminhão com o último eixo suspenso (erguido) e sem tocar o pavimento, qual é o procedimento padrão do operador do CCA?',
    options: [
      'Cobrar a tarifa cheia por todos os eixos, desconsiderando a suspensão',
      'Aplicar a dedução proporcional do eixo suspenso se o veículo estiver de acordo com as normas de peso e regulamento',
      'Bloquear o tráfego do veículo na próxima rodovia',
      'Multar o transportador por transitar com equipamento irregular'
    ],
    correctIndex: 1,
    explanation: 'Conforme a Lei nº 13.103 e regulamentação da AGEMS, eixos comprovadamente suspensos têm direito à isenção da parcela tarifária do rodado suspenso.',
    category: 'Operações CCA',
    difficulty: 'Médio'
  },
  {
    id: 'q-6',
    question: 'Quais rodovias fazem parte do lote concedido à Concessionária Caminhos da Celulose (Rota da Celulose) em Mato Grosso do Sul?',
    options: [
      'Apenas a BR-101 e BR-116',
      'BR-262, BR-267, MS-040, MS-338 e MS-395 (totalizando ~870 km com 14 pórticos)',
      'Apenas vias urbanas de Campo Grande',
      'Trechos exclusivos do estado de São Paulo'
    ],
    correctIndex: 1,
    explanation: 'A Rota da Celulose sob concessão da Caminhos da Celulose integra cerca de 870,3 km formados pela BR-262, BR-267, MS-040, MS-338 e MS-395.',
    category: 'Operações CCA',
    difficulty: 'Fácil'
  },
  {
    id: 'q-7',
    question: 'O que significa o benefício DUF concedido aos usuários com TAG de veículos de passeio?',
    options: [
      'Débito Único Fiscal para transporte de cargas perigosas',
      'Desconto de Usuário Frequente, que concede abatimentos progressivos na tarifa a cada passagem no mês',
      'Declaração de Utilização Financeira para empresas de celulose',
      'Dispositivo Unificado de Freio para caminhões florestais'
    ],
    correctIndex: 1,
    explanation: 'DUF é o Desconto de Usuário Frequente, mecanismo que beneficia motoristas que utilizam a mesma rodovia com frequência ao longo do mês-calendário.',
    category: 'Regulatório',
    difficulty: 'Fácil'
  },
  {
    id: 'q-8',
    question: 'Se a câmera OCR frontal não conseguir ler a placa por conta de sujeira, mas a câmera traseira registrar imagem nítida com alta confiança, como o operador do CCA procede?',
    options: [
      'Valida o evento de passagem com base na imagem da câmera traseira e segue o fluxo de faturamento',
      'Descarta o evento como perda operacional sem cobrar',
      'Envia a placa imediatamente para a Polícia Rodoviária Federal como veículo suspeito',
      'Obriga o condutor a comparecer presencialmente à sede da concessionária'
    ],
    correctIndex: 0,
    explanation: 'A redundância entre câmeras frontal e traseira existe exatamente para mitigar intempéries. Havendo imagem traseira com confiabilidade e sem alteração, valida-se o registro.',
    category: 'Operações CCA',
    difficulty: 'Fácil'
  }
];
