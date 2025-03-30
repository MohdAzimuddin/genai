import { BarChart, LineChart, XAxis, YAxis, Tooltip, Bar, Line, ResponsiveContainer } from 'recharts';

const ChartDisplay = ({ data }) => {
    if (!data) return null;

    const ChartType = data.type === 'line' ? LineChart : BarChart;
    const ChartElement = data.type === 'line' ? Line : Bar;
   
    return (
      <div className="h-64 md:h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
        <ChartType data={data.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ChartElement
            dataKey="value"
            fill="#3B82F6"
            stroke="#3B82F6"
          />
        </ChartType>
        </ResponsiveContainer>
        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Visualizing: {data.query}
        </p>
      </div>
    );
  };


  export default ChartDisplay;