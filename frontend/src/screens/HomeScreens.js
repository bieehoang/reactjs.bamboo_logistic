import { Link } from 'react-router-dom';
import data from '../data';
function HomeScreen() {
  return (
    <div>
      <main>
        <h1>Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.img} alt={product.name} />
              </Link>
              <div className="product-infor">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <span>
                  <strong>
                    <p>{product.price}</p>
                  </strong>
                </span>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default HomeScreen;
