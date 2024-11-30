import ProductList from '../../components/seller/ProductManager/ProductList';
import SellerSidebar from '../../components/seller/SellerSidebar';
import './SellerSideApp.css'

const products = [
  {
  name: "Product 1",
  stock: 10,
  price: "500,000",
  profit: "450,000",
  },
  {
  name: "Product 2",
  stock: 5,
  price: "300,000",
  profit: "270,000",
  },
];

function SellerApp() {
  return (
    <div className='sellerPage'>
      <div className='header'>

      </div>
      <div className='main'>
        <div className='sidebar'>
          <SellerSidebar/>
        </div>
        <div className='content'>
          {/*Routes*/}
          <ProductList products={products}/>

        </div>
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}

export default SellerApp;