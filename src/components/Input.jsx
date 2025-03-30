import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { querySuccess, submitQuery } from '../redux/querySlice';

const QueryInput = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    
    // AI suggestions array
    const [suggestions] = useState([
        "How GrowthGear can make impact in your business?",
        "Show sales trends from last quarter",
        "Compare regional revenue",
        "Display user growth rate",
        "What's our top-selling product?",
        "How many active users do we have?",
        "Break down expenses by category"
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        dispatch(submitQuery(input));
        
        setTimeout(() => {
            dispatch(querySuccess(generateMockData(input)));
        }, 1500);
        
        setInput('');
    };

    const generateMockData = (query) => {
        // Enhanced mock data generator
        const isCompare = query.toLowerCase().includes('compare');
        const isBreakdown = query.toLowerCase().includes('break down');
        
        return {
            query,
            type: query.toLowerCase().includes('trend') ? 'line' : 'bar',
            data: Array.from({ length: isCompare ? 4 : 6 }, (_, i) => ({
                name: isBreakdown ? ['Marketing', 'R&D', 'Operations'][i % 3] : 
                       isCompare ? `Region ${i + 1}` : `Q${i + 1}`,
                value: Math.floor(Math.random() * 1000),
            })),
        };
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 relative">
                <div className="w-full relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your data question..."
                        className="w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    />
                    
                    {/* AI Suggestions Dropdown */}
                    {input && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-10">
                            {suggestions
                                .filter(suggestion => 
                                    suggestion.toLowerCase().includes(input.toLowerCase())
                                )
                                .map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setInput(suggestion);
                                        }}
                                        className="p-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors"
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                
                <button
                    type="submit"
                    className="md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base transition-colors"
                >
                    Ask
                </button>
            </div>
        </form>
    );
};

export default QueryInput;