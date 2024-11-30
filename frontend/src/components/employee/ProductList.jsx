import { Box } from '@mui/material';
import './ProductManager.css'
import ProductCard from './ProductCard';

function ProductList({}){
  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: "https://m.media-amazon.com/images/I/71JqyTBiXrL.jpg",
    name: `Macbook Pro 13" 2019 TouchBar (MUHN2) - ${index + 1}`,
    discount: 8,
    discountPrice: "29.290.000",
    originalPrice: "31.990.000",
  }));

  const handleAddClick = () => {
    //navigate to add page
  }
  return (
    <div className='productList'>
      <div className="headerInProductManager">
        Danh Sách Sản Phẩm
      </div>
      <div className="bodyInProductManager">
        <div className="headerInProductManager">
          Số sản phẩm: {products ? (products.length) : 0}
          <button className='addProductButton' onClick={handleAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox='0 0 24 24' fill="none" id="plus">
                <path fill="#fff" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path>
            </svg>
            <span style={{margin: "0 10px"}}>Tạo sản phẩm mới</span>
          </button>
        </div>
        <Box
          sx={{
          flex: 1,
          padding: "0px 0",
          margin: "10px 50px",
          }}
        >
          <Box
          sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
          }}
          >
          {products.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ProductList;