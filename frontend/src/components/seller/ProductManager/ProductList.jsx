import './ProductManager.css'

function ProductList({ products }){
    return (
        <div className='productList'>
            <div className="headerInProductManager">
                Danh Sách Sản Phẩm
                <button className='addProductButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox='0 0 24 24' fill="none" id="plus">
                    <path fill="#000" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path>
                </svg>
                Tạo sản phẩm mới
                </button>
            </div>
            <div className="bodyInProductManager">
                <div className="headerInProductManager">
                    Số sản phẩm: {products ? (products.length) : 0}
                </div>
                <table className="tableInProductManager">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Còn trong kho</th>
                            <th>Giá bán</th>
                            <th>Lợi nhuận</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ? (
                            products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>{product.price} VND</td>
                                <td>{product.profit} VND</td>
                                <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="edit">
                                    <path fill="#000" d="M17.864 3.6a1 1 0 0 0-1.414 0l-1.414 1.415 4.242 4.242 1.414-1.414a1 1 0 0 0 0-1.414L17.864 3.6zm0 7.072-4.243-4.243-8.9 8.9a1 1 0 0 0-.292.706v2.829a1 1 0 0 0 1 1h2.828a1 1 0 0 0 .707-.293l8.9-8.9z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete">
                                    <path fill="#000" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"></path>
                                    <path fill="#000" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z"></path>
                                </svg>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                              <td colSpan="7" className="empty-row">
                                Trống
                              </td>
                            </tr>
                          )}
                    </tbody>
                </table>
            </div>
        </div>
      );
}

export default ProductList;