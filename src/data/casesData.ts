import { CCAOccurrence } from '../types';

export const initialCCACases: CCAOccurrence[] = [
  {
    id: 'case-1',
    title: 'Placa Dianteira Encoberta por Lama',
    highway: 'BR-262',
    gantryId: 'Pórtico 03 - BR262 - km 204+460 (Ribas do Rio Pardo/MS)',
    timestamp: '14:28:19 · Faixa 2',
    vehicleType: 'Caminhão Caçamba (3 Eixos)',
    lane: 2,
    speed: '78 km/h',
    tagDetected: false,
    frontPlateOcr: 'B??-?24? (Confiança: 18%)',
    rearPlateOcr: 'BRA-9F24 (Confiança: 98%)',
    detectedAxles: 3,
    suspendedAxles: 0,
    scenarioDescription: 'O veículo passou sob o Pórtico 03 da BR-262 em velocidade regular. A câmera frontal registrou a placa dianteira coberta de barro fresco de estrada vicinal, inviabilizando o OCR automático. No entanto, a câmera traseira registrou a placa perfeitamente nítida padrão Mercosul.',
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
    gantryId: 'Pórtico 05 - MS040 - km 045+360 (Campo Grande/MS)',
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
    scenarioDescription: 'A TAG do caminhão foi lida com sucesso pelo sensor RFID no Pórtico 05. O cadastro nacional da TAG aponta veículo de 6 eixos. Todavia, os sensores de pista e a câmera lateral angular confirmam que o último eixo do semi-reboque está visivelmente erguido e sem contato com o solo.',
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
    gantryId: 'Pórtico 07 - MS338 - km 311+900 (Santa Rita do Pardo/MS)',
    timestamp: '21:05:43 · Faixa 2',
    vehicleType: 'Furgão Ambulância SAMU 192',
    lane: 2,
    speed: '104 km/h',
    tagDetected: false,
    frontPlateOcr: 'SAM-1920 (Confiança: 95%)',
    rearPlateOcr: 'SAM-1920 (Confiança: 96%)',
    detectedAxles: 2,
    suspendedAxles: 0,
    scenarioDescription: 'Uma ambulância de suporte avançado do SAMU passou pelo Pórtico 07 em alta velocidade durante atendimento noturno de urgência. O veículo não possui dispositivo TAG no para-brisa.',
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
    gantryId: 'Pórtico 08 - BR267 - km 024+500 (Bataguassu/MS)',
    timestamp: '16:45:10 · Faixa 1',
    vehicleType: 'Sedan de Passeio',
    lane: 1,
    speed: '96 km/h',
    tagDetected: false,
    frontPlateOcr: 'ABC-8E88 (OCR leu letra E)',
    rearPlateOcr: 'ABC-8F88 (OCR leu letra F)',
    detectedAxles: 2,
    suspendedAxles: 0,
    scenarioDescription: 'O OCR no Pórtico 08 apontou divergência entre a placa dianteira e traseira. Na inspeção com zoom da câmera frontal, o operador nota uma fita adesiva preta colocada intencionalmente na letra "F" para parecer um "E". Na traseira, a placa original está íntegra com a letra "F".',
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
  },
  {
    id: 'case-5',
    title: 'Tritrem Florestal Carregado de Eucalipto (9 Eixos)',
    highway: 'BR-262',
    gantryId: 'Pórtico 01 - BR262 - km 040+450 (Três Lagoas/MS)',
    timestamp: '11:15:32 · Faixa 2',
    vehicleType: 'Composição Florestal Tritrem (9 Eixos)',
    lane: 2,
    speed: '62 km/h',
    tagDetected: true,
    tagId: 'TAG-SEMPARAR-7782103',
    frontPlateOcr: 'CEL-9A74 (Confiança: 99%)',
    rearPlateOcr: 'CEL-9A74 (Confiança: 99%)',
    detectedAxles: 9,
    suspendedAxles: 0,
    scenarioDescription: 'Composição pesada de transporte de toras para fábrica de celulose. Todos os 9 eixos foram confirmados em contato com a pista pelos sensores piezelétricos e volumétricos no Pórtico 01. A TAG está ativa e regular.',
    imageHint: 'Carga de toras de eucalipto amarrada com fitas de segurança, 9 eixos com rodas tocando o solo.',
    options: [
      {
        id: 'opt-5a',
        actionText: 'Aprovar passagem tarifando a categoria comercial correspondente a 9 eixos ativos',
        isCorrect: true,
        feedback: 'Exato! A contagem de eixos físicos coincidiu perfeitamente com a volumetria e a categoria da TAG, liberando faturamento sem retenção.'
      },
      {
        id: 'opt-5b',
        actionText: 'Reter para inspeção presencial na balança rodoviária',
        isCorrect: false,
        feedback: 'Incorreto. Não há divergência nos dados nem indício de irregularidade que justifique reter uma passagem regular com TAG.'
      }
    ]
  },
  {
    id: 'case-6',
    title: 'Motocicleta sem TAG Transitando no Bordo da Pista',
    highway: 'BR-267',
    gantryId: 'Pórtico 10 - BR267 - km 182+000 (Nova Alvorada do Sul/MS)',
    timestamp: '18:50:11 · Faixa 1 (Bordo)',
    vehicleType: 'Motocicleta 160cc',
    lane: 1,
    speed: '74 km/h',
    tagDetected: false,
    frontPlateOcr: 'Não aplicável (Motocicleta não possui placa frontal)',
    rearPlateOcr: 'MOT-3B12 (Confiança: 94%)',
    detectedAxles: 2,
    suspendedAxles: 0,
    scenarioDescription: 'Motocicleta transitou pelo bordo externo da pista sob o Pórtico 10. O sensor de presença disparou o obturador traseiro angular, capturando a placa traseira com boa visibilidade.',
    imageHint: 'Câmera traseira angular registrou a placa da moto no suporte original sem ocultação.',
    options: [
      {
        id: 'opt-6a',
        actionText: 'Validar a placa traseira "MOT-3B12" e abrir prazo de 30 dias para pagamento',
        isCorrect: true,
        feedback: 'Correto! Em motocicletas, a cobrança no pedágio eletrônico é baseada exclusivamente na imagem traseira, já que a legislação brasileira não prevê placa frontal em motos.'
      },
      {
        id: 'opt-6b',
        actionText: 'Invalidar a passagem por ausência de placa dianteira',
        isCorrect: false,
        feedback: 'Incorreto! Motocicletas não possuem placa dianteira por lei (Resolução CONTRAN). O CCA valida unicamente a traseira.'
      }
    ]
  }
];
