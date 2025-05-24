
import React from 'react';
import { Choice } from '../types';
import { UI_TEXTS } from '../constants/uiTexts';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { CheckIcon, XIcon, ArrowRightIcon } from './icons';

interface FeedbackPopupProps {
  isOpen: boolean;
  choice: Choice | null;
  onClose: () => void;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, choice, onClose }) => {
  if (!choice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={UI_TEXTS.feedbackPopupTitle}>
        <div className="flex flex-col items-center text-center">
            {choice.isCorrect ? (
                <CheckIcon className="w-16 h-16 text-green-500 mb-4" />
            ) : (
                <XIcon className="w-16 h-16 text-red-500 mb-4" />
            )}
            <h4 className={`text-2xl font-bold mb-2 ${choice.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {choice.feedbackTitle}
            </h4>
            <p className="text-slate-300 mb-2" dangerouslySetInnerHTML={{ __html: choice.feedbackText }} />
            <p className={`font-semibold mb-6 ${choice.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                Puntos: {choice.points > 0 ? `+${choice.points}` : choice.points}
            </p>
            <Button onClick={onClose} rightIcon={<ArrowRightIcon className="w-5 h-5" />}>
                {UI_TEXTS.continue}
            </Button>
        </div>
    </Modal>
  );
};
