
import { useNavigate, useParams } from "react-router-dom";
import "./ProductManager.css"
import { useEffect, useState } from "react";
import { productApi } from "../../../../api/productApi";

function ProductDetail(){
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(null)
  const navigate = useNavigate();
  const param = useParams();
  const isNew = !param.id;

  useEffect(() => {
    const fetchData = async () => {
      if(param.id){
        try {
          const res = await productApi.getProductById(param.id);
          setProduct(res.data.data);
          setImages(res.data.data.images);
        } catch (e) {
          console.error('Error fetching product data:', e);
        }
      }
    };

    fetchData();
  }, [param.id]);

  const createAndEditProduct = async () => {
    const formData = new FormData();
    
    // Add the product details to formData
    formData.append("name", product?.name || "");
    formData.append("brand", product?.brand || "");
    formData.append("category", product?.category || "");
    formData.append("realprice", product?.realprice || "");
    formData.append("discount", product?.discount || "");
    formData.append("stock", product?.stock || "");
    formData.append("description", product?.description || "");
    // formData.append("id_shop", "6748e785cfcb764cadcb1da7");

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      if(isNew){
        const response = await productApi.createProduct(formData);
        console.log("Product created successfully:", response);
      }else{
        const response = await productApi.updateProduct(formData, param.id);
        console.log("Product edited successfully:", response);
      }
      navigate(`/employee/product`);
    } catch (e) {
      if(isNew) console.error("Error creating product:", e);
      else console.error("Error editing product:", e);
    }
  }
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages(files);
  };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createAndEditProduct();
  }

  return(
    <div> 
      <div className="headerInProductManager">
        {isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
      </div>
      <div className="bodyInProductManager">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="leftSide">
            <label>Tên sản phẩm: </label> <br />
            <input type="text" name="name" value={product?.name || ""} onChange={handleInputChange} required
              placeholder="Nhập tên sản phẩm"/> <br />
            <label>Tên thương hiệu: </label> <br />
            <input type="text" name="brand" value={product?.brand || ""} onChange={handleInputChange}
              placeholder="Nhập tên thương hiệu"/> <br />
            <label>Danh mục: </label> <br />
            <select name="category" value={product?.category || ""} onChange={handleInputChange} required>
              <option value="" disabled>--Chọn danh mục--</option>
              <option value='Laptop'>Laptop</option>
              <option value='Smartphone'>Smart Phone</option>
              <option value='Monitor'>Màn hình</option>
            </select> <br />
            <label>Giá bán: </label> <br />
            <input type="number" name="realprice" min="1"
             value={product?.realprice || ""} onChange={handleInputChange} required
              placeholder="Nhập giá (VNĐ)"/> <br />
            <label>Giảm giá: </label> <br />
            <input type="number" name="discount" min="0" max="100"
             value={product?.discount || ""} onChange={handleInputChange}
              placeholder="Số từ 1 đến 100 (%)"/> <br />
            <label>Số lượng trong kho: </label> <br />
            <input type="number" name="stock" min="0" 
             value={product?.stock || ""} onChange={handleInputChange} required
              placeholder="Nhập số lượng"   
            /> <br />
            <button type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >{isNew ? "Thêm": "Sửa"}</button>
          </div>
          <div className="rightSide">
            <label>Hình ảnh: </label> <br />
            {images.length > 0 && (
              <div className="imagesContainer">
                {Array.from(images).map((image) => (
                  <img src={image} className="imageP"/>
                ))}
              </div>)}
            <input type="file" name="images" style={{marginBottom: "10px"}}
              accept="image/*" multiple
              onChange={(e) => {handleImageChange(e);}}
            /> <br />
            <label>Mô tả chi tiết: </label> <br />
            <textarea name="description" rows="5"
              value={product?.description || ""} onChange={handleInputChange}
              placeholder="Nhập thông tin chi tiết"
            /> <br />
          </div>
        </form>
        
      </div>
    </div>
    )
}
export default ProductDetail;