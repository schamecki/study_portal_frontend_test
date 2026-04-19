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
              w-full px-4 py-2.5 text-sm
              bg-card border border-light rounded-lg
              text-primary placeholder-muted
              focus:outline-none focus:ring-2 focus:ring-boaz-blue-light/30 focus:border-boaz-blue-light
              transition-all duration-200
              disabled:bg-gray-50 disabled:text-muted
              ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
