
import { GoogleGenAI } from "@google/genai";
import { UI_TEXTS } from '../constants/uiTexts'; // For UI messages

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found (process.env.API_KEY). AI Advisor will not work.");
}

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const getAIAdvice = async (scenarioTitle: string, currentQuestion: string, userQuestion: string): Promise<string> => {
  if (!ai) {
    return UI_TEXTS.advisorUnavailable + " (API Key no configurada).";
  }

  const systemInstruction = `Eres un asistente experto en la Ley de Contratos del Sector Público (LCSP) española, especializado en el Artículo 70 sobre participación previa de licitadores. Estás ayudando a un usuario en un juego educativo.
Principios clave del Art. 70 LCSP:
1.  Garantizar la equidad cuando una empresa que participó en la preparación de un contrato decide licitar.
2.  Obligación del órgano de contratación de tomar medidas para neutralizar ventajas competitivas indebidas.
3.  La exclusión del licitador es siempre el último recurso (ultima ratio).
4.  Se debe dar audiencia al interesado antes de cualquier decisión de exclusión.
5.  Principios generales: integridad, igualdad de trato, transparencia y proporcionalidad.
6.  Incompatibilidad específica (Art. 70.2): la empresa que ejecuta un contrato no puede supervisarlo.
Pasos del protocolo: Detección, Evaluación de riesgo, Medidas correctoras (transparencia, ampliación de plazos, ajustes técnicos), Audiencia, Decisión motivada.
Importancia de la documentación y motivación de todas las decisiones.
Contexto del juego: El usuario se enfrenta a un escenario y debe tomar decisiones. No le des la respuesta directa al juego. Guíale sobre qué principios o aspectos del Art. 70 LCSP debería considerar para tomar una decisión informada. Sé conciso y enfocado en el aprendizaje.`;
  
  const prompt = `
Contexto del escenario del juego: "${scenarioTitle}"
Pregunta actual del escenario: "${currentQuestion}"
Pregunta del usuario: "${userQuestion}"

Considerando el Artículo 70 LCSP y sus principios, ¿qué consejo o puntos clave debería tener en cuenta el usuario para responder a su pregunta en relación con la situación del juego?`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // thinkingConfig: { thinkingBudget: 0 } // For lower latency if needed, but default might be better for quality here
      }
    });
    
    // The response object has a 'text' property for direct access to the string output.
    const textResponse = response.text;
    
    if (!textResponse || textResponse.trim() === "") {
        return "El Asesor IA no pudo generar una respuesta para esta pregunta. Intenta reformularla.";
    }
    return textResponse;

  } catch (error) {
    console.error("Error getting AI advice from Gemini:", error);
    // Check for specific error types if needed, e.g. error.message or inspect error object
    let errorMessage = "Lo siento, he encontrado un error al intentar obtener el consejo. ";
    if (error instanceof Error) {
        errorMessage += `Detalles: ${error.message}`;
    } else {
        errorMessage += "Por favor, inténtalo de nuevo.";
    }
    return errorMessage;
  }
};
