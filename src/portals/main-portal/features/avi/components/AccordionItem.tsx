// Reusable Accordion Component for Steps 4 & 5
const AccordionItem = ({
                           title,
                           description,
                           isActive,
                           onClick
                       }: {
    title: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <div
        className={`
      mb-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
      ${isActive
            ? 'border-boaz-blue-light bg-white shadow-lg shadow-blue-50'
            : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}
    `}
        onClick={onClick}
    >
        <div className="flex items-center justify-between p-5 md:p-6">
            <div className="flex items-center gap-4">
                {isActive && <div className="w-1 h-6 bg-boaz-blue-light rounded-full" />}
                <span className={`text-lg font-semibold ${isActive ? 'text-boaz-blue-light' : 'text-gray-700'}`}>
          {title}
        </span>
            </div>
            <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-boaz-blue-light' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>

        <div
            className={`
        transition-all duration-300 ease-in-out
        ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
      `}
        >
            <div className="px-6 pb-6 text-blue-500 italic text-sm leading-relaxed">
                {description}
            </div>
        </div>
    </div>
)

export default AccordionItem