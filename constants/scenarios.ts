
import { Scenario } from '../types';

export const SCENARIOS_DATA: Scenario[] = [
  {
    id: 'scenario1',
    title: 'Caso 1: La Consultora Preparadora',
    introduction: 'Una consultora, \"Ingeniería Visionaria S.L.\", ha elaborado las especificaciones técnicas para un nuevo sistema de gestión de tráfico para el Ayuntamiento de Metrópolis. Ahora, el Ayuntamiento licita la implantación de dicho sistema y \"Ingeniería Visionaria S.L.\" quiere presentarse.',
    decisionPoints: [
      {
        id: 's1dp1',
        question: 'Como responsable de contratación, ¿qué es lo primero que debes considerar ante esta situación?',
        keyConcept: 'Detección de participación previa (Art. 70 LCSP)',
        referencePage: 'p. 12-13',
        choices: [
          { id: 's1dp1c1', text: 'Ignorar la participación previa, ya que la consultora tiene derecho a licitar.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'No es la mejor opción. El Art. 70 LCSP obliga a tomar medidas para garantizar que la participación previa no falsee la competencia. Ignorarlo es una mala praxis.', isCorrect: false, points: -10 },
          { id: 's1dp1c2', text: 'Activar el protocolo del Art. 70 LCSP: identificar la participación previa y evaluar el riesgo de ventaja competitiva.', feedbackTitle: UI_TEXTS.correct, feedbackText: '¡Correcto! Es fundamental identificar la participación previa y evaluar si podría conferir una ventaja indebida, activando el protocolo del Art. 70 LCSP.', isCorrect: true, points: 20 },
          { id: 's1dp1c3', text: 'Excluir directamente a la consultora para evitar problemas.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Incorrecto. La exclusión es la última ratio. Primero se deben evaluar los riesgos y considerar medidas correctoras.', isCorrect: false, points: -5 },
        ],
      },
      {
        id: 's1dp2',
        question: 'Has evaluado que \"Ingeniería Visionaria S.L.\" podría tener una ventaja informativa significativa. ¿Qué medida correctora inicial es prioritaria?',
        keyConcept: 'Transparencia y Medidas Correctoras',
        referencePage: 'p. 18-19, 21',
        choices: [
          { id: 's1dp2c1', text: 'Ampliar el plazo de presentación de ofertas unos días.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Si bien ampliar plazos es una medida útil, la transparencia es la primera barrera. Compartir la información es clave.', isCorrect: false, points: 5 },
          { id: 's1dp2c2', text: 'Comunicar a todos los licitadores la información relevante que \"Ingeniería Visionaria S.L.\" aportó en la fase preparatoria (ej. el estudio técnico completo).', feedbackTitle: UI_TEXTS.correct, feedbackText: '¡Excelente! La transparencia reforzada, compartiendo toda la información relevante, es la medida principal para nivelar el campo de juego.', isCorrect: true, points: 20 },
          { id: 's1dp2c3', text: 'No hacer nada y esperar a las alegaciones de la consultora.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'No es proactivo. Debes tomar medidas para mitigar el riesgo identificado antes de la fase de audiencia.', isCorrect: false, points: -10 },
        ],
      },
    ],
    conclusion: 'Gestionar la participación previa es crucial. El primer paso es la detección y evaluación, seguido de medidas correctoras como la transparencia y la ampliación de plazos. La exclusión es siempre el último recurso.',
  },
  {
    id: 'scenario2',
    title: 'Caso 2: Supervisión vs. Ejecución',
    introduction: 'La empresa \"Constructora Robusta S.A.\" ha ganado la licitación para construir un nuevo hospital. Ahora, el Ayuntamiento licita el contrato para la \"supervisión y control de calidad\" de la ejecución de dicha obra. \"Constructora Robusta S.A.\" (o una empresa de su mismo grupo) se presenta a esta segunda licitación.',
    decisionPoints: [
      {
        id: 's2dp1',
        question: '¿Puede \"Constructora Robusta S.A.\" (o su vinculada) ser adjudicataria del contrato de supervisión de la obra que ella misma está ejecutando?',
        keyConcept: 'Incompatibilidad Art. 70.2 LCSP',
        referencePage: 'p. 7, 30-32',
        choices: [
          { id: 's2dp1c1', text: 'Sí, si demuestra que no tiene ventaja competitiva.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Incorrecto. El Art. 70.2 LCSP establece una incompatibilidad absoluta en estos casos, no depende de la ventaja competitiva.', isCorrect: false, points: -10 },
          { id: 's2dp1c2', text: 'No, existe una prohibición legal expresa (Art. 70.2 LCSP) para evitar que quien ejecuta un contrato se fiscalice a sí mismo.', feedbackTitle: UI_TEXTS.correct, feedbackText: '¡Correcto! El Art. 70.2 LCSP impone una incompatibilidad absoluta para estos supuestos, orientada a prevenir fraude y falta de objetividad.', isCorrect: true, points: 20 },
          { id: 's2dp1c3', text: 'Sí, pero se deben aplicar medidas de transparencia adicionales.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Incorrecto. En este caso, las medidas de transparencia no son suficientes; la incompatibilidad es tajante.', isCorrect: false, points: -5 },
        ],
      },
    ],
    conclusion: 'El Artículo 70.2 LCSP es claro: la empresa que ejecuta un contrato (o sus vinculadas) no puede ser adjudicataria del contrato de supervisión o control de aquel. Esta es una medida antifraude preventiva y absoluta.',
  },
   {
    id: 'scenario3',
    title: 'Caso 3: El Dilema de la Exclusión (Caso ENVERS adaptado)',
    introduction: 'La empresa \"Soluciones Globales S.A.\" redactó el proyecto constructivo de una obra compleja y, además, dispone de un estudio de impacto ambiental crucial que no se facilitó al resto de licitadores. Estos tuvieron que elaborarlo desde cero con un plazo ajustado. \"Soluciones Globales S.A.\" se presenta a la licitación de la obra.',
    decisionPoints: [
      {
        id: 's3dp1',
        question: 'Has compartido toda la información posible (excepto datos confidenciales del estudio ambiental que no se pueden revelar por ley) y ampliado plazos. Sin embargo, persiste una ventaja significativa para \"Soluciones Globales S.A.\" por su conocimiento profundo y el estudio ambiental detallado que posee. ¿Qué haces?',
        keyConcept: 'Última Ratio: Exclusión',
        referencePage: 'p. 17, 27-28, 51',
        choices: [
          { id: 's3dp1c1', text: 'Permitir que \"Soluciones Globales S.A.\" participe, ya que se han tomado medidas correctoras.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Incorrecto. Si las medidas no neutralizan la ventaja y la competencia sigue falseada, permitir la participación podría anular el procedimiento (como en el caso ENVERS).', isCorrect: false, points: -15 },
          { id: 's3dp1c2', text: 'Iniciar el trámite de audiencia con \"Soluciones Globales S.A.\", exponiendo que, a pesar de las medidas, persiste una ventaja que podría llevar a su exclusión, y solicitar sus alegaciones.', feedbackTitle: UI_TEXTS.correct, feedbackText: '¡Correcto! Antes de excluir (última ratio), es IMPRESCINDIBLE dar audiencia al interesado para que justifique por qué su participación no falsea la competencia.', isCorrect: true, points: 20 },
          { id: 's3dp1c3', text: 'Pedir a \"Soluciones Globales S.A.\" que voluntariamente retire su oferta.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Aunque podría ser una salida, no es el procedimiento formal. Debes seguir el trámite de audiencia y tomar una decisión motivada.', isCorrect: false, points: 0 },
        ],
      },
      {
        id: 's3dp2',
        question: 'Tras la audiencia, \"Soluciones Globales S.A.\" no logra desvirtuar la ventaja competitiva insalvable. No hay otra forma de garantizar la igualdad. ¿Cuál es la decisión final?',
        keyConcept: 'Decisión Motivada de Exclusión',
        referencePage: 'p. 27-28, 61-62',
        choices: [
          { id: 's3dp2c1', text: 'Excluir a \"Soluciones Globales S.A.\" de la licitación, documentando exhaustivamente la decisión y los motivos por los que otras medidas fueron insuficientes.', feedbackTitle: UI_TEXTS.correct, feedbackText: '¡Correcto! Si la ventaja persiste y no hay otro medio de garantizar la igualdad, la exclusión es la única opción, y debe estar sólidamente motivada.', isCorrect: true, points: 20 },
          { id: 's3dp2c2', text: 'Permitir su participación pero penalizar su oferta en la valoración.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Incorrecto. No se puede alterar la valoración para compensar. Si la competencia está falseada, la solución es la exclusión si no hay otra vía.', isCorrect: false, points: -10 },
          { id: 's3dp2c3', text: 'Cancelar la licitación y empezar de nuevo sin la participación de la empresa.', feedbackTitle: UI_TEXTS.incorrect, feedbackText: 'Cancelar es una medida extrema. El Art. 70 prevé la exclusión del licitador específico si es necesario, permitiendo continuar con los demás.', isCorrect: false, points: -5 },
        ],
      }
    ],
    conclusion: 'La exclusión es una medida grave (última ratio) pero necesaria cuando, tras agotar otras vías (transparencia, plazos, audiencia), persiste una ventaja competitiva indebida que falsea la competencia y no puede neutralizarse. La decisión debe ser siempre motivada y documentada.',
  },
];

// UI Texts import for feedback messages
import { UI_TEXTS } from './uiTexts';
