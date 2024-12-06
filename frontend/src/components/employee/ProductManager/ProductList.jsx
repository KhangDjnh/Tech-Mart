import { Box } from '@mui/material';
import './ProductManager.css'
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productApi } from "../../../../api/productApi";

function ProductList({}){
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await productApi.getProduct();
      setProducts(res.data.data || []);
    } catch (e) {
      console.error('Error fetching product data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const handleAddClick = () => {
    navigate("/employee/product/new");
  }
  return (
    <div>
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
          margin: "10px 25px",
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
              <ProductCard key={product._id} product={product} callback={fetchData} />
          ))}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ProductList;