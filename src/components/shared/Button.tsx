import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-boaz-blue-light text-white hover:bg-blue-600 active:bg-blue-700',
  secondary: 'bg-confirm-gray text-white hover:bg-gray-600 active:bg-gray-700',
  outline: 'border-2 border-boaz-blue-light text-boaz-blue-light bg-transparent hover:bg-blue-50',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700',
  success: 'bg-success text-white hover:bg-green-600 active:bg-green-700',
  warning: 'bg-warning text-white hover:bg-amber-600 active:bg-amber-700',
  ghost: 'bg-transparent text-secondary hover:bg-gray-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-3 text-base rounded-xl',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        relative inline-flex items-center justify-center font-semibold
        transition-all duration-200 ease-out cursor-pointer overflow-hidden
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[inherit]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* 
        Le texte devient transparent pendant le chargement mais conserve sa place. 
        Cela empêche le bouton de changer de taille brusquement !
      */}
      <span 
        className={`inline-flex items-center justify-center transition-all duration-300 ${
          loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {children}
      </span>
      
      {/* Spinner centré absolu */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
    </button>
  );
};
