interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

export const Stepper = ({ steps, currentStep, orientation = 'horizontal' }: StepperProps) => {
  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex items-start gap-3">
              {/* Circle + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                    transition-colors duration-300
                    ${isCompleted ? 'bg-boaz-blue-light text-white' : ''}
                    ${isActive ? 'border-3 border-boaz-blue-light text-boaz-blue-light bg-white' : ''}
                    ${!isCompleted && !isActive ? 'border-2 border-gray-300 text-muted bg-white' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${isCompleted ? 'bg-boaz-blue-light' : 'bg-gray-300'}`} />
                )}
              </div>

              {/* Text */}
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
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-colors duration-300
                  ${isCompleted ? 'bg-boaz-blue-light text-white' : ''}
                  ${isActive ? 'border-3 border-boaz-blue-light text-boaz-blue-light bg-white' : ''}
                  ${!isCompleted && !isActive ? 'border-2 border-gray-300 text-muted bg-white' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>

              {/* Label */}
              <p className={`text-xs mt-2 font-medium text-center ${isActive ? 'text-boaz-blue-light' : isCompleted ? 'text-primary' : 'text-muted'}`}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-muted text-center">{step.description}</p>
              )}
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-20px] ${isCompleted ? 'bg-boaz-blue-light' : 'bg-gray-300'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
