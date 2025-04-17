import ProductCard from "./components/ProductCard";
import { productData } from "./constants/product";

const App = () => {
  return <ProductCard product={productData[0]} />;
};

export default App;
