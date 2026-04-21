import type { StepConfig } from '../avi.config';
import {useState} from "react";

interface StepCardProps {
  step: StepConfig;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  isLast: boolean;
}

export const StepCard = ({ step, isCompleted, isActive, isLast }: StepCardProps) => {
    const [active, setActive] = useState<boolean>(isActive)
    const handleActiveChange = () => setActive(!active);
  return (
    <div className="flex items-start gap-0" id={`step-card-${step.id}`}>
      {/* Left: Circle + vertical connector line */}
      <div className="flex flex-col items-center shrink-0 mr-3">
        {/* Circle */}
        <div
          className={`
            relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
            transition-all duration-300 shrink-0
            ${isCompleted
              ? 'bg-boaz-blue-light text-white shadow-[0_0_0_3px_rgba(59,130,246,0.2)]'
              : 'bg-white border-[2.5px] border-boaz-blue-light text-boaz-blue-light'
            }
          `}
        >
          {isCompleted ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span>{String(step.id).padStart(2, '0')}</span>
          )}
        </div>

        {/* Vertical connector line */}
        {!isLast && (
          <div
            className={`w-[2px] transition-colors duration-300 ${
              isCompleted ? 'bg-boaz-blue-light' : 'bg-boaz-blue-light/25'
            }`}
            style={{ height: active ? '100%' : '100%', minHeight: active ? '80px' : '28px' }}
          />
        )}
      </div>

      {/* Right: Card content */}
      <div
        className={`
          flex-1 rounded-lg border overflow-hidden transition-all duration-300 mb-2
          ${active
            ? 'border-boaz-blue-light shadow-[0_0_0_1px_rgba(59,130,246,0.3)]'
            : 'border-gray-300'
          }
        `}
      >
        {/* Title bar */}
        <div
          className={`
            flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-200
            ${active ? 'border-b border-gray-200 bg-white' : 'bg-gray-50/50'}
          `}
        >
          <h3
            className={`
              text-sm font-semibold transition-colors duration-200
              ${active ? 'text-boaz-blue-light' : isCompleted ? 'text-gray-600' : 'text-gray-500'}
            `}
          >
            {step.title}
          </h3>

          {/* Dropdown chevron indicator */}
          <div className="bg-gray-200/80 w-7 h-7 rounded flex items-center justify-center shrink-0 ml-3" onClick={handleActiveChange}>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${active ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expandable description (only shows for active step) */}
        <div
          className={`
            overflow-hidden transition-all duration-400 ease-out
            ${active ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-4 py-4 bg-white text-sm text-gray-500 leading-relaxed">
            {step.description}
          </div>
        </div>
      </div>
    </div>
  );
};
