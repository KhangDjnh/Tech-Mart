import { useParams } from "react-router-dom";
import "../../components/employee/ProductManager.css"
import { useState } from "react";

function ProductDetail(){
  const [images, setImages] = useState([]);
  const { id } = useParams;
  const isNew = !id;
  const FetchProductById = async(id) => {
    if(id){
      const product = await getProductById(id);
      return product;
    }else return;
  }
  const product = FetchProductById(id);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages(files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Do somthing
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
              value={product ? product.images : null}
              onChange={handleImageChange}
            /> <br />
          </div>
          <div className="textSide">
            <label>Tên sản phẩm: </label> <br />
            <input type="text" name="name"
              placeholder="Nhập tên sản phẩm"/> <br />
            <label>Tag: </label> <br />
            <input type="text" name="id_tag"
              placeholder="Nhập tag"/> <br />
            <label>Giá bán: </label> <br />
            <input type="number" name="price" min="1"
              placeholder="Nhập giá (VNĐ)"/> <br />
            <label>Số lượng trong kho: </label> <br />
            <input type="number" name="stock" min="0"
              placeholder="Nhập số lượng"   
            /> <br />
            <label>Mô tả chi tiết: </label> <br />
            <textarea name="description" rows="5"
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