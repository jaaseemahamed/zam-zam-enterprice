import { useEffect, useState } from "react";

interface ForecastData {
  ds: string;   // date
  yhat: number; // predicted demand
}

const Forecast: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/forecast")
      .then((res) => res.json())
      .then((data: ForecastData[]) => {
        setForecast(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">📈 Demand Forecast</h2>

      {loading ? (
        <p>Loading forecast...</p>
      ) : (
        <ul className="space-y-2">
          {forecast.map((item, idx) => (
            <li
              key={idx}
              className="p-3 border rounded-lg shadow-sm flex justify-between"
            >
              <span>{new Date(item.ds).toLocaleDateString()}</span>
              <span className="font-semibold text-green-600">
                {Math.round(item.yhat)} pairs
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forecast;
