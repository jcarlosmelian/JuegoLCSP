
import React, { useState, useCallback, useEffect } from 'react';
import { Scenario, DecisionPoint, Choice, GameState, GameStage, GameLogEntry } from './types';
import { SCENARIOS_DATA } from './constants/scenarios';
import { UI_TEXTS } from './constants/uiTexts';
import { ScenarioDisplay } from './components/ScenarioDisplay';
import { FeedbackPopup } from './components/FeedbackPopup';
import { AdvisorPopup } from './components/AdvisorPopup';
import { getAIAdvice } from './services/geminiService';
import { Button } from './components/common/Button';
import { AcademicCapIcon, ArrowRightIcon, RestartIcon } from './components/icons';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
  const initialGameState: GameState = {
    currentScenarioIndex: 0,
    currentDecisionPointIndex: 0,
    score: 0,
    gameStage: GameStage.Start,
    selectedChoice: null,
    advisorQuestion: '',
    advisorResponse: '',
    isLoadingAdvisor: false,
  };

  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);

  const currentScenario = SCENARIOS_DATA[gameState.currentScenarioIndex];
  const currentDecisionPoint = currentScenario?.decisionPoints[gameState.currentDecisionPointIndex];

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setGameLog([]);
  }, []);
  
  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, gameStage: GameStage.Playing }));
  };

  const logDecision = useCallback((scenario: Scenario, decisionPoint: DecisionPoint, choice: Choice) => {
    const logEntry: GameLogEntry = {
      scenarioTitle: scenario.title,
      decisionPointQuestion: decisionPoint.question,
      chosenOptionText: choice.text,
      isCorrect: choice.isCorrect,
      pointsAwarded: choice.points,
      feedback: choice.feedbackText,
      timestamp: new Date(),
    };
    setGameLog(prevLog => [...prevLog, logEntry]);
  }, []);

  const handleChoiceSelected = useCallback((choice: Choice) => {
    logDecision(currentScenario, currentDecisionPoint!, choice);
    setGameState(prev => ({
      ...prev,
      score: prev.score + choice.points,
      selectedChoice: choice,
      gameStage: GameStage.Feedback,
    }));
  }, [currentScenario, currentDecisionPoint, logDecision]);

  const handleCloseFeedback = useCallback(() => {
    if (!currentScenario || !currentDecisionPoint) return;

    const isLastDecisionPointInScenario = gameState.currentDecisionPointIndex === currentScenario.decisionPoints.length - 1;
    
    if (isLastDecisionPointInScenario) {
      setGameState(prev => ({
        ...prev,
        gameStage: GameStage.ScenarioConclusion,
        selectedChoice: null,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentDecisionPointIndex: prev.currentDecisionPointIndex + 1,
        gameStage: GameStage.Playing,
        selectedChoice: null,
      }));
    }
  }, [currentScenario, currentDecisionPoint, gameState.currentDecisionPointIndex]);

  const handleNextScenario = useCallback(() => {
    const isLastScenario = gameState.currentScenarioIndex === SCENARIOS_DATA.length - 1;
    if (isLastScenario) {
      setGameState(prev => ({ ...prev, gameStage: GameStage.End }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentScenarioIndex: prev.currentScenarioIndex + 1,
        currentDecisionPointIndex: 0,
        gameStage: GameStage.Playing,
      }));
    }
  }, [gameState.currentScenarioIndex]);


  const handleOpenAdvisor = useCallback(() => {
    const defaultQuestion = `En el contexto de "${currentDecisionPoint?.question}", ¿cuáles son las implicaciones del Art. 70 LCSP y qué principios debería considerar?`;
    setGameState(prev => ({ 
        ...prev, 
        gameStage: GameStage.Advisor, 
        advisorResponse: '', // Clear previous response
        advisorQuestion: defaultQuestion 
    }));
  }, [currentDecisionPoint]);

  const handleCloseAdvisor = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStage: GameStage.Playing }));
  }, []);

  const handleAskGemini = useCallback(async (question: string) => {
    if (!currentScenario || !currentDecisionPoint) return;
    setGameState(prev => ({ ...prev, isLoadingAdvisor: true, advisorQuestion: question, advisorResponse: '' }));
    try {
      const advice = await getAIAdvice(currentScenario.title, currentDecisionPoint.question, question);
      setGameState(prev => ({ ...prev, advisorResponse: advice, isLoadingAdvisor: false }));
    } catch (error) {
      console.error(error);
      setGameState(prev => ({ ...prev, advisorResponse: 'Error al contactar al asesor.', isLoadingAdvisor: false }));
    }
  }, [currentScenario, currentDecisionPoint]);
  
  // Add a fade-in effect for new content
  useEffect(() => {
    const mainContent = document.getElementById('main-content-area');
    if (mainContent) {
      mainContent.classList.remove('animate-fadeIn');
      void mainContent.offsetWidth; // Trigger reflow
      mainContent.classList.add('animate-fadeIn');
    }
  }, [gameState.currentScenarioIndex, gameState.currentDecisionPointIndex, gameState.gameStage]);


  const renderContent = () => {
    switch (gameState.gameStage) {
      case GameStage.Start:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center animate-fadeIn">
            <style>{`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="bg-slate-800 p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl">
              <AcademicCapIcon className="w-20 h-20 text-sky-500 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">{UI_TEXTS.welcomeTitle}</h1>
              <p className="text-slate-300 text-lg mb-8">{UI_TEXTS.welcomeMessage}</p>
              <Button onClick={handleStartGame} size="lg" rightIcon={<ArrowRightIcon className="w-6 h-6" />}>
                {UI_TEXTS.startGame}
              </Button>
            </div>
          </div>
        );
      case GameStage.Playing:
        if (!currentScenario || !currentDecisionPoint) return <p>Cargando escenario...</p>;
        return (
          <ScenarioDisplay
            scenario={currentScenario}
            decisionPoint={currentDecisionPoint}
            onChoiceSelected={handleChoiceSelected}
            onOpenAdvisor={handleOpenAdvisor}
            score={gameState.score}
          />
        );
      case GameStage.ScenarioConclusion:
        if (!currentScenario) return null;
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
            <div className="bg-slate-800 p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl animate-fadeIn">
              <h2 className="text-2xl font-bold text-sky-400 mb-4">{UI_TEXTS.scenarioConclusion}: {currentScenario.title}</h2>
              <p className="text-slate-300 mb-6 whitespace-pre-line">{currentScenario.conclusion}</p>
              <p className="text-lg font-semibold text-slate-300 mb-6">{UI_TEXTS.score}: <span className="text-amber-400">{gameState.score}</span></p>
              <Button onClick={handleNextScenario} size="lg" rightIcon={<ArrowRightIcon className="w-5 h-5" />}>
                {gameState.currentScenarioIndex === SCENARIOS_DATA.length - 1 ? "Ver Resultados Finales" : UI_TEXTS.next + " Escenario"}
              </Button>
            </div>
          </div>
        );
      case GameStage.End:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
             <div className="bg-slate-800 p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl animate-fadeIn">
                <AcademicCapIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">{UI_TEXTS.gameEndMessage}</h1>
                <p className="text-slate-300 text-lg mb-4">{UI_TEXTS.finalScore}: <span className="text-amber-400 font-bold text-2xl">{gameState.score}</span></p>
                <p className="text-slate-300 mb-8">{UI_TEXTS.gameEndSummary}</p>
                <Button onClick={resetGame} size="lg" leftIcon={<RestartIcon className="w-6 h-6" />}>
                    {UI_TEXTS.playAgain}
                </Button>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      {gameState.gameStage === GameStage.Playing && currentScenario && (
        <ProgressBar 
            current={gameState.currentScenarioIndex + 1} 
            total={SCENARIOS_DATA.length} 
            label={UI_TEXTS.scenarioProgress.replace('{current}', (gameState.currentScenarioIndex + 1).toString()).replace('{total}', SCENARIOS_DATA.length.toString())}
        />
      )}
      <div id="main-content-area" className="w-full">
        {renderContent()}
      </div>
      
      {gameState.selectedChoice && (
        <FeedbackPopup
          isOpen={gameState.gameStage === GameStage.Feedback}
          choice={gameState.selectedChoice}
          onClose={handleCloseFeedback}
        />
      )}
      <AdvisorPopup
        isOpen={gameState.gameStage === GameStage.Advisor}
        onClose={handleCloseAdvisor}
        onAskGemini={handleAskGemini}
        advisorResponse={gameState.advisorResponse}
        isLoading={gameState.isLoadingAdvisor}
        initialQuestion={gameState.advisorQuestion}
      />
    </div>
  );
};

export default App;
