
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ProductManager.css"
import { useEffect, useState } from "react";
import { productApi } from "../../../../api/productApi";
import { Breadcrumbs} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function ProductDetail(){
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const param = useParams();
  const isNew = !param.id;
  
  useEffect(() => {
    try{
      if(localStorage.getItem("token")){
      }else{
        navigate("/login");
      }
    }catch (e){
      console.log(e);
    }
    const fetchData = async () => {
      if(param.id){
        try {
          const res = await productApi.getProductById(param.id);
          const productData = res.data.data;
          setProduct(productData);
          setImagePreviews(productData.images);
          const files = await Promise.all(
            productData.images.map((url, index) =>
              urlToFile(url, `image-${index + 1}`)
            )
          );
          setImageFiles(files);
        } catch (e) {
          console.error('Error fetching product data:', e);
        }
      }
    };

    fetchData();
  }, [param.id]);

  const createAndEditProduct = async () => {
    const formData = new FormData();
    formData.append("name", product?.name || "");
    formData.append("brand", product?.brand || "");
    formData.append("category", product?.category || "");
    formData.append("realprice", product?.realprice || "");
    formData.append("discount", product?.discount || "");
    formData.append("stock", product?.stock || "");
    formData.append("description", product?.description || "");
    // formData.append("id_shop", "6748e785cfcb764cadcb1da7");

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
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
      navigate("/employee/product");
    } catch (e) {
      if(isNew) console.error("Error creating product:", e);
      else console.error("Error editing product:", e);
    }
  }

  const urlToFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      const mimeType = blob.type;
      const extension = mimeType.split('/')[1];
      const correctedFilename = `${filename}.${extension}`;
  
      const file = new File([blob], correctedFilename, { type: mimeType });
      return file;
    } catch (error) {
      console.error("Error converting URL to file:", error);
      throw error;
    }
  };
  const handleImageRemove = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }
  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
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
        <Breadcrumbs maxItems={3} separator={<NavigateNextIcon fontSize="large"/>}
          aria-label="breadcrumb" className="cursor-pointer">
          <Link className="hover:underline" color="inherit" to="/employee/product">
              <div className="items-center">
                  <div style={{fontSize: "25px", fontWeight: "bold", color: "#A6ADC1"}}>
                    Sản phẩm
                  </div>
              </div>
          </Link>
          <div color="text.primary" className="line-clamp-1 w-[300px]"
            style={{fontSize: "25px", fontWeight: "bold", color: "gray"}}
          >
            {isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
          </div>
        </Breadcrumbs>
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
              className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >{isNew ? "Thêm": "Sửa"}</button>
          </div>
          <div className="rightSide">
            <label>Hình ảnh: </label> <br />
            {imagePreviews.length > 0 && (
              <div className="imagesContainer">
                {Array.from(imagePreviews).map((image, index) => (
                  <div className="imageW" key={index}>
                    <img src={image} className="imageP"/>
                    <button type="button" className="deleteImgBtn" onClick={() => handleImageRemove(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete">
                        <path fill="#000" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"></path>
                        <path fill="#000" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>)}
            <input type="file" name="images" style={{marginBottom: "10px"}}
              accept="image/*" multiple
              onChange={(e) => {handleImageAdd(e);}}
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