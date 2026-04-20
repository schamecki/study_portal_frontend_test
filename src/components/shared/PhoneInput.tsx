import { useState, useRef, useEffect } from 'react';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

interface CountryOption {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const countries: CountryOption[] = [
  { code: 'CM', dial: '+237', flag: '🇨🇲', name: 'Cameroun' },
  { code: 'FR', dial: '+33',  flag: '🇫🇷', name: 'France' },
  { code: 'US', dial: '+1',   flag: '🇺🇸', name: 'États-Unis' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧', name: 'Royaume-Uni' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪', name: 'Allemagne' },
  { code: 'SN', dial: '+221', flag: '🇸🇳', name: 'Sénégal' },
  { code: 'CI', dial: '+225', flag: '🇨🇮', name: 'Côte d\'Ivoire' },
  { code: 'GA', dial: '+241', flag: '🇬🇦', name: 'Gabon' },
  { code: 'CD', dial: '+243', flag: '🇨🇩', name: 'RD Congo' },
  { code: 'CG', dial: '+242', flag: '🇨🇬', name: 'Congo' },
];

export const PhoneInput = ({
  value = '',
  onChange,
  placeholder = '6XX XXX XXX',
  label,
  error,
  disabled = false,
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" id="phone-input">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>
      )}
      <div className="flex items-center gap-2">
        {/* Country selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
            className={`
              flex items-center gap-1.5 px-3 py-3 text-sm
              bg-[#F8F9FB] border border-[#F0F0F5] rounded-lg
              transition-all duration-200 cursor-pointer
              hover:border-boaz-blue-light/50
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${error ? 'border-error focus:ring-error/20' : 'focus:ring-2 focus:ring-boaz-blue-light/20'}
            `}
          >
            <span className="text-lg leading-none">{selectedCountry.flag}</span>
            <span className="text-primary font-medium whitespace-nowrap">{selectedCountry.dial}</span>
            <svg
              className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-light py-1 z-50 max-h-48 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setDropdownOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm text-left
                    transition-colors duration-150 cursor-pointer
                    ${selectedCountry.code === country.code ? 'bg-boaz-blue-light/10 text-boaz-blue-light' : 'text-primary hover:bg-gray-50'}
                  `}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="font-medium">{country.dial}</span>
                  <span className="text-muted text-xs truncate">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1 px-4 py-3 text-sm
            bg-[#F8F9FB] border border-[#F0F0F5] rounded-lg
            text-primary placeholder-[#9CA3AF]
            focus:outline-none focus:ring-2 focus:ring-boaz-blue-light/20 focus:border-boaz-blue-light
            transition-all duration-200
            disabled:bg-gray-50 disabled:text-muted
            ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}
          `}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};
