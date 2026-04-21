interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  startAt?: number;
  completedSteps?: number[];
}

export const Stepper = ({ 
  steps, 
  currentStep, 
  orientation = 'horizontal', 
  startAt = 1,
  completedSteps = [] 
}: StepperProps) => {
  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const globalStepId = startAt + index;
          const isCompleted = completedSteps.includes(globalStepId) || index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 z-10
                    transition-colors duration-300
                    ${isCompleted 
                      ? 'bg-boaz-blue-light text-white' 
                      : isActive 
                        ? 'border-3 border-boaz-blue-light text-boaz-blue-light bg-white' 
                        : 'border-2 border-gray-300 text-muted bg-white'}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{String(startAt + index).padStart(2, '0')}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${isCompleted ? 'bg-boaz-blue-light' : 'bg-gray-300'}`} />
                )}
              </div>

              <div className="pt-2">
                <p className={`text-sm font-medium ${isActive ? 'text-boaz-blue-light' : isCompleted ? 'text-primary' : 'text-muted'}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal stepper
  return (
    <div className="flex items-start justify-center w-full">
      {steps.map((step, index) => {
        const globalStepId = startAt + index;
        const isCompleted = completedSteps.includes(globalStepId) || index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="relative flex-1">
            {/* Connector Line - Only between circles */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 z-0
                  ${isCompleted ? 'bg-boaz-blue-light' : 'bg-gray-300'}
                `} 
              />
            )}
            
            <div className="relative flex flex-col items-center z-10">
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-colors duration-300
                  ${isCompleted 
                    ? 'bg-boaz-blue-light text-white' 
                    : isActive 
                      ? 'border-3 border-boaz-blue-light text-boaz-blue-light bg-white' 
                      : 'border-2 border-gray-300 text-muted bg-white'}
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{String(startAt + index).padStart(2, '0')}</span>
                )}
              </div>

              {/* Label */}
              <p className={`text-[10px] mt-2 font-bold text-center leading-tight max-w-[110px] ${isActive ? 'text-boaz-blue-light' : isCompleted ? 'text-primary' : 'text-muted'}`}>
                {step.label.toUpperCase()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
