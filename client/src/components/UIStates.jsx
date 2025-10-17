const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
    const sizeClasses = {
        small: "w-4 h-4",
        default: "w-8 h-8",
        large: "w-12 h-12"
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className={`${sizeClasses[size]} animate-spin text-blue-600`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
                            0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </div>
            <p className="mt-2 text-sm text-gray-400">{text}</p>
        </div>
    );
};

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 text-red-500 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732
                            4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <p className="text-red-400 mb-4">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Try Again
                </button>
            )}
        </div>
    );
};

const EmptyState = ({ title, description, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 text-gray-400 mb-4">
                {icon || (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 max-w-sm">{description}</p>
        </div>
    );
};

export { LoadingSpinner, ErrorMessage, EmptyState };