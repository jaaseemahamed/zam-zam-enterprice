import Recommendations from "../components/Recommendations";
import Forecast from "../components/Forecast";

function ProductPage() {
  const productId = 1; // dynamically get from URL or props

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👟 Product Details</h1>

      {/* Show recommendations */}
      <Recommendations productId={productId} />

      {/* Show forecast */}
      <Forecast />
    </div>
  );
}

export default ProductPage;
