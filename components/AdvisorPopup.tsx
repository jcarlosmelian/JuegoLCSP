
import React, { useState, useCallback } from 'react';
import { UI_TEXTS } from '../constants/uiTexts';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { LightbulbIcon } from './icons';

interface AdvisorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAskGemini: (question: string) => Promise<void>;
  advisorResponse: string;
  isLoading: boolean;
  initialQuestion?: string;
}

export const AdvisorPopup: React.FC<AdvisorPopupProps> = ({ 
    isOpen, 
    onClose, 
    onAskGemini, 
    advisorResponse, 
    isLoading,
    initialQuestion = '' 
}) => {
  const [question, setQuestion] = useState(initialQuestion);

  const handleAsk = useCallback(async () => {
    if (question.trim() && !isLoading) {
      await onAskGemini(question);
    }
  }, [question, isLoading, onAskGemini]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={UI_TEXTS.advisorPopupTitle} size="lg">
        <textarea
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:ring-sky-500 focus:border-sky-500 resize-none"
            rows={4}
            placeholder={UI_TEXTS.advisorPlaceholder}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
        />
        <Button 
            onClick={handleAsk} 
            disabled={isLoading || !question.trim()} 
            className="w-full mt-3"
            leftIcon={<LightbulbIcon className="w-5 h-5" />}
        >
            {isLoading ? UI_TEXTS.loadingAdvisor : UI_TEXTS.askAdvisor}
        </Button>
        
        {advisorResponse && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-md max-h-60 overflow-y-auto">
                <h5 className="font-semibold text-sky-400 mb-2">Respuesta del Experto:</h5>
                <p className="text-slate-300 whitespace-pre-line">{advisorResponse}</p>
            </div>
        )}
    </Modal>
  );
};
