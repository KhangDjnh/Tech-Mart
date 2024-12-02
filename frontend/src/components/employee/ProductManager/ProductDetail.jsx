
import { useParams } from "react-router-dom";
import "./ProductManager.css"
import { useEffect, useState } from "react";

function ProductDetail(){
  const [images, setImages] = useState([]);
  const param = useParams();
  const [product, setProduct] = useState(null)
  const isNew = !param.id;

  // change this
  useEffect(() => {
    //FetchProductById(id);
  }, [param.id]);
  // const FetchProductById = async(id) => {
  //   if(id){
  //     setProduct(await getProductById(id));
  //   }
  // }

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
    //Do something
  }

  return(
    <div> 
      <div className="headerInProductManager">
        {isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
      </div>
      <div className="bodyInProductManager">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="imageSide">
            <label>Hình ảnh: </label> <br />
            {images.length > 0 && (
              <div style={{marginTop: "5px", marginRight: "30px"}}>
                <ul>
                  {Array.from(images).map((image, index) => (
                    <li key={index}>
                      <img src={image} style={{ width: "100%", height: "auto", border: "1px solid #ccc" }}/> 
                      {image.name} <br /> 
                    </li>
                  ))}
                </ul>
              </div>)}
            <input type="file" name="image"
              accept="image/*" multiple
              onChange={(e) => {handleImageChange(e); handleInputChange(e);}}
            /> <br />
          </div>
          <div className="textSide">
            <label>Tên sản phẩm: </label> <br />
            <input type="text" name="name" onChange={handleInputChange} required
              placeholder="Nhập tên sản phẩm"/> <br />
            <label>Danh mục: </label> <br />
            <select name="id_tag" onChange={handleInputChange} required>
              <option value="" disabled selected>--Chọn danh mục--</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartphone">Smart Phone</option>
              <option value="Television">Television</option>
              <option value="Tablet">Tablet</option>
            </select>
            <br />
            <label>Giá bán: </label> <br />
            <input type="number" name="price" min="1" onChange={handleInputChange} required
              placeholder="Nhập giá (VNĐ)"/> <br />
            <label>Số lượng trong kho: </label> <br />
            <input type="number" name="stock" min="0" onChange={handleInputChange} required
              placeholder="Nhập số lượng"   
            /> <br />
            <label>Mô tả chi tiết: </label> <br />
            <textarea name="description" rows="5" onChange={handleInputChange} required
              placeholder="Nhập thông tin chi tiết"
            /> <br />
            <button type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >{isNew ? "Thêm": "Sửa"}</button>
          </div>
        </form>
        
      </div>
    </div>
    )
}
export default ProductDetail;