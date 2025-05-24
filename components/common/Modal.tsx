
import React from 'react';
import { XIcon } from '../icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  let sizeClasses = '';
  switch (size) {
    case 'sm': sizeClasses = 'max-w-sm'; break;
    case 'md': sizeClasses = 'max-w-md'; break;
    case 'lg': sizeClasses = 'max-w-lg'; break;
    case 'xl': sizeClasses = 'max-w-xl'; break;
    case 'full': sizeClasses = 'max-w-full w-11/12 md:w-3/4 lg:w-2/3'; break;
    default: sizeClasses = 'max-w-md';
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className={`bg-slate-800 rounded-xl shadow-2xl ${sizeClasses} w-full flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold text-sky-400">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 transition-colors p-1 rounded-full hover:bg-slate-700"
            aria-label="Cerrar modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 md:p-6 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
