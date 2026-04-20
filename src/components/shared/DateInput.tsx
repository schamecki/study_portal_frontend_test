import { forwardRef, type InputHTMLAttributes } from 'react';

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, className = '', id, placeholder = 'jj/mm/aa', ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="date"
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 text-sm pr-10
              bg-[#F8F9FB] border border-[#F0F0F5] rounded-lg
              text-primary placeholder-[#9CA3AF]
              focus:outline-none focus:ring-2 focus:ring-boaz-blue-light/20 focus:border-boaz-blue-light
              transition-all duration-200
              disabled:bg-gray-50 disabled:text-muted
              ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}
              ${className}
            `}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
