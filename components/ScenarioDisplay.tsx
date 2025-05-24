
import React from 'react';
import { Scenario, DecisionPoint, Choice as ChoiceType } from '../types';
import { UI_TEXTS } from '../constants/uiTexts';
import { Button } from './common/Button';
import { LightbulbIcon, InfoIcon } from './icons';

interface ScenarioDisplayProps {
  scenario: Scenario;
  decisionPoint: DecisionPoint;
  onChoiceSelected: (choice: ChoiceType) => void;
  onOpenAdvisor: () => void;
  score: number;
}

export const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({
  scenario,
  decisionPoint,
  onChoiceSelected,
  onOpenAdvisor,
  score,
}) => {
  const blockColors = ['bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500'];

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-3xl mx-auto animate-fadeIn">
      <header className="mb-6 pb-4 border-b border-slate-700">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-sky-400">{scenario.title}</h2>
            <div className="text-lg font-semibold text-slate-300">{UI_TEXTS.score}: <span className="text-amber-400">{score}</span></div>
        </div>
        { scenario.decisionPoints.length > 1 && (
            <p className="text-sm text-slate-400 mt-1">{UI_TEXTS.decision} {scenario.decisionPoints.indexOf(decisionPoint) + 1} de {scenario.decisionPoints.length}</p>
        )}
      </header>
      
      <div className="mb-6">
        {decisionPoint.imageUrl && (
          <img src={decisionPoint.imageUrl} alt="Contexto del escenario" className="rounded-lg mb-4 w-full h-64 object-cover" />
        )}
        <p className="text-slate-300 text-lg leading-relaxed mb-2 whitespace-pre-line">{decisionPoint.question}</p>
      </div>

      <div className="space-y-3 mb-8">
        {decisionPoint.choices.map((choice, index) => (
          <Button
            key={choice.id}
            onClick={() => onChoiceSelected(choice)}
            variant="secondary"
            className={`w-full text-left justify-start !py-3 !px-4 hover:!bg-sky-700 hover:border-sky-600 border-2 border-slate-600 transition-all duration-200 group`}
          >
            <span className={`mr-3 w-6 h-6 rounded-sm flex items-center justify-center text-white text-sm font-bold ${blockColors[index % blockColors.length]}`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 group-hover:text-white">{choice.text}</span>
          </Button>
        ))}
      </div>
      
      <footer className="pt-6 border-t border-slate-700 space-y-4">
        <div className="flex items-center text-sm text-slate-400 bg-slate-700/50 p-3 rounded-md">
          <InfoIcon className="w-5 h-5 mr-2 text-sky-500 shrink-0" />
          <span><strong>{UI_TEXTS.keyConcept}:</strong> {decisionPoint.keyConcept} {decisionPoint.referencePage && `(${UI_TEXTS.reference} ${decisionPoint.referencePage})`}</span>
        </div>
        <Button onClick={onOpenAdvisor} variant="ghost" className="w-full" leftIcon={<LightbulbIcon className="w-5 h-5" />}>
          {UI_TEXTS.consultAdvisor}
        </Button>
      </footer>
    </div>
  );
};
