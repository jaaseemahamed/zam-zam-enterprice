import { useState, useEffect } from "react";

interface Product {
  product_id: number;
  name: string;
  category: string;
  color: string;
  size: number;
  price: number;
}

interface RecommendationsProps {
  productId: number;
}

const Recommendations: React.FC<RecommendationsProps> = ({ productId }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/recommend?product_id=${productId}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">🛒 Similar Products</h2>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <div
              key={item.product_id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500">
                {item.category} - {item.color} (Size {item.size})
              </p>
              <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
