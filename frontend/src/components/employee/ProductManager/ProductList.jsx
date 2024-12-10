import './ProductManager.css'
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productApi } from "../../../../api/productApi";
import { Button, FormControlLabel, Radio, Box, IconButton, Drawer, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import unidecode from "unidecode";
import { formatCatergory } from '../../../utils/formatCategory';

function ProductList({}){
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const [isBrand, setIsBrand] = useState();
  const [isSale, setIsSale] = useState();
  const [isCategory, setIsCategory] = useState();
  const [isStock, setIsStock] = useState();
  
  const [filterBrand, setFilterBrand] = useState([]);
  const [filterName, setFilterName] = useState([]);
  const [filterSale, setFilterSale] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterStock, setFilterStock] = useState([]);

  const [brandShow, setBrandShow] = useState(true);
  const [stockShow, setstockShow] = useState(true);
  const [saleShow, setSaleShow] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);

  const [brand, setBrand] = useState([]);
  const sale = ['Yes', 'No'];
  const stock = ['Còn hàng', 'Hết hàng'];
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await productApi.getProduct();
      const productsData = res.data.data;
      setProducts(productsData);
      setBrand(productsData?.map(e => (e.brand)).filter((value, index, self) => self.indexOf(value) === index));
      setCategory(productsData?.map(e => (e.category)).flat().filter((value, index, self) => self.indexOf(value) === index) || []);
    } catch (e) {
      console.error('Error fetching product data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProductShow(products);
    setFilterBrand(products);
    setFilterCategory(products);
    setFilterName(products);
    setFilterSale(products);
    setFilterStock(products);
  }, [products]);
  
  function removeAccents(str) {
    return unidecode(str);
  }

  function removeAllState() {
    setIsBrand(null);
    setIsSale(null);
    setIsStock(null);
    setIsCategory(null);

    setFilterBrand(products);
    setFilterStock(products);
    setFilterSale(products);
    setFilterCategory(products);
  }

  function onInputSearch(e) {
    if (e.target.value) {
      const str = removeAccents(e.target.value);
      const arr = products.filter(item => {
        const s = removeAccents(item?.name)?.toLowerCase();
        return s?.includes(str?.toLowerCase().toString());
      });
      setFilterName(arr);
    } else {
      setFilterName(products);
    }
  }

  function searchBrand(e, i) {
    setIsBrand(i);
    setFilterBrand(products.filter(p => {
      return p.brand === e;
    }));
  }

  function searchSale(e, i) {
      setIsSale(i);
      switch (e) {
        case 'Yes':
          setFilterSale(products.filter(p => {
            return p.sale !== '';
          }));
          break;
        case 'No':
          setFilterSale(products.filter(p => {
            return p.sale === '';
          }));
          break;
      }
  }

  function searchStock(e, i) {
    setIsStock(i);
    switch (e) {
      case 'Còn hàng':
        setFilterStock(products.filter(p => {
          return p.stock !== '';
        }));
        break;
      case 'Hết hàng':
        setFilterStock(products.filter(p => {
          return p.stock === 0;
        }));
        break;
    }
  }

  function searchCategory(e, i) {
    setIsCategory(i);
    const filteredProducts = products.filter(p => p.category.includes(e));
    setFilterCategory(filteredProducts);
  }

  function intersection(arrays) {
    return arrays.reduce((acc, cur) => acc.filter(value => cur.includes(value)));
  }

  function generalSearch() {
    setProductShow(intersection([filterName, filterBrand, filterStock, filterCategory, filterSale]));
  }

  useEffect(() => {
    generalSearch();
  }, [filterName, filterBrand, filterStock, filterCategory, filterSale]);

  const drawerContent = (
    <Box sx={{ width: 200 }} role="presentation">
      <div className="font-medium my-4">
        {brandShow && (
          <>
            <h1 className="mb-2">Theo hãng</h1>
            <div className="max-h-[300px] overflow-y-auto">
              {brand?.map((e, i) => (
                <div key={i}>
                  <FormControlLabel
                    value={e}
                    control={<Radio />}
                    label={e}
                    checked={isBrand === i}
                    onChange={() => searchBrand(e, i)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {saleShow && (
          <>
            <h1 className="mb-2">Đang khuyến mãi</h1>
            <div className="max-h-[300px] overflow-y-auto">
              {sale.map((e, i) => (
                <div key={i}>
                  <FormControlLabel
                    value={e}
                    control={<Radio />}
                    label={e}
                    checked={isSale === i}
                    onChange={() => searchSale(e, i)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {stockShow && (
          <>
            <h1 className="mb-2">Số lượng</h1>
            <div className="max-h-[300px] overflow-y-auto">
              {stock.map((e, i) => (
                <div key={i}>
                  <FormControlLabel
                    value={e}
                    control={<Radio />}
                    label={e}
                    checked={isStock === i}
                    onChange={() => searchStock(e, i)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {categoryShow && (
          <>
            <h1 className="mb-2">Loại sản phẩm</h1>
            <div className="max-h-[300px] overflow-y-auto">
              {category?.map((e, i) => (
                <div key={i}> 
                  <FormControlLabel
                    value={e}
                    control={<Radio />}
                    label={formatCatergory(e)}
                    checked={isCategory === i}
                    onChange={() => searchCategory(e, i)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-start">
          <Button variant="outlined" onClick={removeAllState}>
            Bỏ lọc
          </Button>
        </div>
      </div>
    </Box>
  );

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
          Số sản phẩm: {productShow ? (productShow.length) : 0} {productShow.length < products.length ? "với lọc" : ""}
          <button className='addProductButton' onClick={handleAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox='0 0 24 24' fill="none" id="plus">
                <path fill="#fff" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path>
            </svg>
            <span style={{margin: "0 10px"}}>Tạo sản phẩm mới</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[17%,83%] mt-6 ml-4">
        <div className="bg-white w-auto p-4 shadow-md rounded-lg">
          <div className="flex items-center">
            <h1 className='font-bold text-xl max-lg:hidden '>Bộ lọc</h1>
          </div>
          <div className="hidden lg:block">
            {drawerContent}
          </div>
        </div>

        <div className="w-full px-4 py-2">
          <div className="flex items-center relative w-full outline-gray-400 rounded-lg">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="p-4 w-full rounded-lg bg-white shadow-md text-black focus:outline-none"
              onChange={onInputSearch}
            />
            <div className="absolute top-1/2 right-0 hover:cursor-pointer translate-y-[-50%] mr-4">
              <SearchIcon className="text-gray-400 max-sm:hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ml-8">
            {productShow.slice().reverse().map((e, i) => (
              <div key={i} className="mr-1 mb-1">
                <ProductCard product={e} callback={fetchData} />
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;