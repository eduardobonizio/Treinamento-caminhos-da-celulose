import { CCAOccurrence } from '../types';

export const initialCCACases: CCAOccurrence[] = [
  {
    id: 'case-1',
    title: 'Placa Dianteira Encoberta por Lama',
    highway: 'BR-262',
    gantryId: 'Pórtico 04 · Km 142 (Ribas do Rio Pardo)',
    timestamp: '14:28:19 · Faixa 2',
    vehicleType: 'Caminhão Caçamba (3 Eixos)',
    lane: 2,
    speed: '78 km/h',
    tagDetected: false,
    frontPlateOcr: 'B??-?24? (Confiança: 18%)',
    rearPlateOcr: 'BRA-9F24 (Confiança: 98%)',
    detectedAxles: 3,
    suspendedAxles: 0,
    scenarioDescription: 'O veículo passou sob o pórtico da BR-262 em velocidade regular. A câmera frontal registrou a placa dianteira coberta de barro fresco de estrada vicinal, inviabilizando o OCR automático. No entanto, a câmera traseira registrou a placa perfeitamente nítida padrão Mercosul.',
    imageHint: 'Câmera traseira mostra com nitidez a tarjeta azul e os caracteres "BRA-9F24". Não há divergência visual de modelo.',
    options: [
      {
        id: 'opt-1a',
        actionText: 'Confirmar placa "BRA-9F24" com base no OCR traseiro e liberar cobrança',
        isCorrect: true,
        feedback: 'Correto! O Procedimento Operacional Padrão (POP) do CCA orienta validar a passagem pela placa traseira quando esta apresentar índice de confiança alto e imagem nítida sem adulteração.'
      },
      {
        id: 'opt-1b',
        actionText: 'Rejeitar a passagem e registrar como evasão imediata no sistema da AGEMS',
        isCorrect: false,
        feedback: 'Incorreto. A evasão só é tipificada após 30 dias de inadimplência, e a placa traseira está perfeitamente legível para cobrança regular.'
      },
      {
        id: 'opt-1c',
        actionText: 'Descartar o registro e excluir o evento do banco de dados',
        isCorrect: false,
        feedback: 'Incorreto. Nunca se descarta um evento de passagem com imagem traseira válida, pois acarretaria perda de receita da concessionária.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Caminhão com Eixo Traseiro Suspenso no Asfalto',
    highway: 'MS-040',
    gantryId: 'Pórtico 01 · Km 24 (Campo Grande / Santa Rita)',
    timestamp: '09:12:04 · Faixa 1',
    vehicleType: 'Carreta Baú (6 Eixos Cadastrados na TAG)',
    lane: 1,
    speed: '82 km/h',
    tagDetected: true,
    tagId: 'TAG-VELOE-9844120',
    frontPlateOcr: 'MSL-5C10 (Confiança: 99%)',
    rearPlateOcr: 'MSL-5C10 (Confiança: 99%)',
    detectedAxles: 5,
    suspendedAxles: 1,
    scenarioDescription: 'A TAG do caminhão foi lida com sucesso pelo sensor RFID. O cadastro nacional da TAG aponta veículo de 6 eixos. Todavia, os sensores de pista e a câmera lateral angular confirmam que o último eixo do semi-reboque está visivelmente erguido e sem contato com o solo.',
    imageHint: 'A imagem lateral em alta resolução mostra o vão livre de 15 cm entre o pneu do 6º eixo e o asfalto.',
    options: [
      {
        id: 'opt-2a',
        actionText: 'Cobrar tarifa integral de 6 eixos porque a TAG é cadastrada com 6 eixos',
        isCorrect: false,
        feedback: 'Incorreto. Conforme a Lei nº 13.103 e regulamentação da AGEMS, eixos comprovadamente suspensos em veículos com peso compatível têm direito à isenção tarifária proporcional.'
      },
      {
        id: 'opt-2b',
        actionText: 'Aplicar dedução de 1 eixo suspenso e faturar a tarifa de 5 eixos ativos',
        isCorrect: true,
        feedback: 'Excelente! O operador do CCA deve certificar a imagem lateral e aplicar a dedução do eixo suspenso na conciliação da TAG, garantindo cobrança justa.'
      },
      {
        id: 'opt-2c',
        actionText: 'Bloquear a TAG do motorista por inconsistência cadastral',
        isCorrect: false,
        feedback: 'Incorreto. É perfeitamente legal transitar com eixo erguido quando o caminhão está vazio ou respeitando o peso por eixo regulamentar.'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Ambulância do SAMU em Código de Emergência sem TAG',
    highway: 'MS-338',
    gantryId: 'Pórtico 09 · Km 56 (Ribas do Rio Pardo / Camapuã)',
    timestamp: '21:05:43 · Faixa 2',
    vehicleType: 'Furgão Ambulância SAMU 192',
    lane: 2,
    speed: '104 km/h',
    tagDetected: false,
    frontPlateOcr: 'SAM-1920 (Confiança: 95%)',
    rearPlateOcr: 'SAM-1920 (Confiança: 96%)',
    detectedAxles: 2,
    suspendedAxles: 0,
    scenarioDescription: 'Uma ambulância de suporte avançado do SAMU passou pelo pórtico em alta velocidade durante atendimento noturno de urgência. O veículo não possui dispositivo TAG no para-brisa.',
    imageHint: 'Giroflex luminoso ativo na imagem, com plotagem oficial "SAMU 192" e brasão estadual visíveis.',
    options: [
      {
        id: 'opt-3a',
        actionText: 'Lançar a cobrança avulsa para a placa e aguardar os 30 dias de prazo',
        isCorrect: false,
        feedback: 'Incorreto. Ambulâncias e veículos de socorro em serviço oficial possuem isenção tarifária legal e não devem ser cobrados nem autuados por evasão.'
      },
      {
        id: 'opt-3b',
        actionText: 'Classificar o evento como "Isenção Institucional - Veículo de Emergência"',
        isCorrect: true,
        feedback: 'Perfeito! O POP do CCA prevê a baixa imediata como isenção legal mediante comprovação visual da viatura de urgência/emergência a serviço.'
      },
      {
        id: 'opt-3c',
        actionText: 'Acionar a Polícia Rodoviária para abordagem do veículo',
        isCorrect: false,
        feedback: 'Incorreto. A ambulância está em socorro à vida, respaldada pelo CTB com livre passagem garantida.'
      }
    ]
  },
  {
    id: 'case-4',
    title: 'Veículo com Placa Mercosul com Fita Adesiva Adulterando Letra',
    highway: 'BR-267',
    gantryId: 'Pórtico 07 · Km 210 (Bataguassu)',
    timestamp: '16:45:10 · Faixa 1',
    vehicleType: 'Sedan de Passeio',
    lane: 1,
    speed: '96 km/h',
    tagDetected: false,
    frontPlateOcr: 'ABC-8E88 (OCR leu letra E)',
    rearPlateOcr: 'ABC-8F88 (OCR leu letra F)',
    detectedAxles: 2,
    suspendedAxles: 0,
    scenarioDescription: 'O OCR apontou divergência entre a placa dianteira e traseira. Na inspeção com zoom da câmera frontal, o operador nota uma fita adesiva preta colocada intencionalmente na letra "F" para parecer um "E". Na traseira, a placa original está íntegra com a letra "F".',
    imageHint: 'Zoom frontal revela contorno irregular de fita isolante alterando o caractere.',
    options: [
      {
        id: 'opt-4a',
        actionText: 'Validar a placa correta "ABC-8F88" e encaminhar alerta para auditoria e fiscalização',
        isCorrect: true,
        feedback: 'Muito bem! O operador garante o lançamento na placa real e sinaliza a ocorrência de adulteração de sinal identificador veicular (crime do Art. 311 do Código Penal).'
      },
      {
        id: 'opt-4b',
        actionText: 'Cadastrar na placa com a fita "ABC-8E88" pois foi o primeiro registro',
        isCorrect: false,
        feedback: 'Incorreto! Cobrar na placa adulterada prejudicaria um terceiro inocente que possui a placa com a letra E.'
      },
      {
        id: 'opt-4c',
        actionText: 'Ignorar a passagem e não fazer nada',
        isCorrect: false,
        feedback: 'Incorreto. O CCA tem papel fundamental na segurança viária e integridade das informações.'
      }
    ]
  }
];
