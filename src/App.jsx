import { useSelector } from 'react-redux';
import QueryInput from './components/Input';
import ChartDisplay from './components/Display';
import QueryHistory from './components/History';

function App() {
  const { results, isLoading, error } = useSelector((state) => state.query);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center">
          Gen AI Analytics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <QueryInput />
            
            {isLoading && (
              <div className="text-center py-4 text-gray-500 text-sm md:text-base">
                Processing your query...
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-sm md:text-base mb-4">
                {error}
              </div>
            )}
            
            {results && <ChartDisplay data={results} />}
          </div>

          {/* Query History Sidebar */}
          <div className="md:col-span-1">
            <QueryHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;