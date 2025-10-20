
import React, { useState, useCallback } from 'react';
import { Product, AISuggestion, AISuggestionType } from '../../types';
import { getAIsuggestions, saveAISuggestionsForProduct } from '../../services/geminiService';
import Card from '../Card';
import { PromotionIcon, OrderIcon, WasteIcon, ShortageIcon, AIIcon } from '../icons';

const suggestionIcons: { [key in AISuggestionType]: React.ReactNode } = {
    [AISuggestionType.PROMOTION]: <PromotionIcon />,
    [AISuggestionType.ORDER]: <OrderIcon />,
    [AISuggestionType.WASTE]: <WasteIcon />,
    [AISuggestionType.SHORTAGE]: <ShortageIcon />,
};

const suggestionColors: { [key in AISuggestionType]: string } = {
    [AISuggestionType.PROMOTION]: 'border-blue-500',
    [AISuggestionType.ORDER]: 'border-purple-500',
    [AISuggestionType.WASTE]: 'border-red-500',
    [AISuggestionType.SHORTAGE]: 'border-yellow-500',
};

const AISuggestionsView: React.FC<{ products: Product[] }> = ({ products }) => {
    const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchSuggestions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getAIsuggestions(products);
            setSuggestions(result);
            // Persist AI suggestions for a target product (earliest expiration)
            const target = [...products].sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())[0];
            if (target && result.length > 0) {
                await saveAISuggestionsForProduct(target.id, result);
            }
        } catch (err) {
            setError('Failed to fetch AI suggestions. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [products]);

    return (
        <div className="space-y-6">
            <Card title="AI-Powered Recommendations">
                <div className="flex flex-col items-center text-center p-4">
                    <div className="text-supeco-yellow mb-4"><AIIcon /></div>
                    <h2 className="text-xl font-bold mb-2">Unlock Smart Insights</h2>
                    <p className="text-gray-400 mb-6 max-w-2xl">
                        Leverage the power of AI to analyze your current stock data. Get actionable recommendations on promotions, order adjustments, waste reduction, and potential shortages to optimize store performance.
                    </p>
                    <button
                        onClick={handleFetchSuggestions}
                        disabled={isLoading}
                        className="bg-supeco-yellow text-supeco-gray font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 focus:outline-none focus:shadow-outline transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing Data...
                            </>
                        ) : 'Generate Recommendations'}
                    </button>
                </div>
            </Card>

            {error && (
                <div className="bg-red-900 border border-status-red text-red-200 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            {suggestions.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suggestions.map((suggestion, index) => (
                         <div key={index} className={`bg-supeco-dark p-5 rounded-lg border-l-4 ${suggestionColors[suggestion.type]}`}>
                            <div className="flex items-center space-x-3 mb-2">
                                <span className={`text-white p-2 rounded-full bg-supeco-light-gray`}>{suggestionIcons[suggestion.type]}</span>
                                <h4 className="font-bold text-lg text-white">{suggestion.title}</h4>
                            </div>
                            <p className="text-gray-300 ml-11">{suggestion.recommendation}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AISuggestionsView;
