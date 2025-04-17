import SwipeDeck from "./components/SwipeDeck";
import { productData } from "./constants/product";

const App = () => {
  return <SwipeDeck products={productData} />;
};

export default App;
