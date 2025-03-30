import { useDispatch, useSelector } from 'react-redux';
import { submitQuery, querySuccess } from '../redux/querySlice';

// Reusable mock data generator (keep consistent with QueryInput)
const generateMockData = (query) => ({
  query,
  type: query.toLowerCase().includes('trend') ? 'line' : 'bar',
  data: Array.from({ length: 6 }, (_, i) => ({
    name: `Q${i + 1}`,
    value: Math.floor(Math.random() * 1000),
  })),
});
 
// Query History
const QueryHistory = () => {
  const { queries } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const handleHistoryClick = (query) => {
    dispatch(submitQuery(query));
    setTimeout(() => {
      dispatch(querySuccess(generateMockData(query)));
    }, 500);
  };

  return (
    <div className="mt-6 bg-gray-200 p-3 md:p-4 rounded-lg h-[500px] md:h-[calc(100vh-200px)] overflow-y-auto">
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">
        Query History
      </h3>
      <ul className="space-y-2">
        {queries.map((query, index) => (
          <li
            key={index}
            onClick={() => handleHistoryClick(query)}
            className="cursor-pointer p-2 text-sm md:text-base hover:bg-gray-100 rounded break-words bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;