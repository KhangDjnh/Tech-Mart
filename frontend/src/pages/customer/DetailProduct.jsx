import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock dữ liệu sản phẩm
    setTimeout(() => {
      const mockProduct = {
        id: id,
        name: 'MacBook Pro 13" 2020 (MXK32 | MXK62)',
        model: "MXK32 / MXK62",
        warranty: "12 tháng",
        mainFeatures: [
          "Màn hình Retina IPS True Tone 13.3\"",
          "RAM 8GB 2133MHz LPDDR3 onboard",
          "SSD 256GB/512GB (có thể nâng cấp lên 1TB/2TB)",
          "Chip xử lý Intel Core i5 1.4GHz",
          "Card đồ họa Intel Iris Plus Graphics 645",
          "2 cổng Thunderbolt 3 (USB-C)",
          "Kết nối không dây Wi-Fi 5 (802.11ac), Bluetooth 5.0",
          "Bàn phím Magic Keyboard theo cơ chế cắt kéo",
          "Touch Bar, Touch ID, macOS Catalina",
        ],
        discountPrice: "33.590.000",
        originalPrice: "35.990.000",
        promotion: [
          "Giao hàng miễn phí HN-HCM",
          "Trả góp lãi suất 0%, miễn phí quẹt thẻ",
        ],
        image:
          "https://th.bing.com/th/id/OIP.qML3ckP1zRXNiwDuwRiNAgHaHa?rs=1&pid=ImgDetMain",
      };
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <p>Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8" style={{margin : "0px 150px"}}>
        <div className="flex flex-col md:flex-row gap-8" style={{margin : "20px 0px"}}>
          {/* Ảnh sản phẩm */}
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Thông tin sản phẩm */}
          <div className="w-full md:w-1/2" style={{margin : "0px 60px"}}>
            <h1 className="text-3xl font-bold mb-4" style={{margin : "20px 0px", font : "100"}}>{product.name}</h1>
            <div className="border-t border-gray-300 mt-2 mb-4"></div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Model:</span> {product.model}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Bảo hành:</span> {product.warranty}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              {product.mainFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="flex items-center mb-2">
              <p className="text-3xl font-bold text-blue-600 mr-4">
                {product.discountPrice}đ
              </p>
              <p className="text-gray-500 line-through">{product.originalPrice}đ</p>
            </div>
            <p className="text-red-500 font-semibold mb-6">Khuyến mãi hấp dẫn</p>
            {/* Nút thao tác */}
            <div className="flex space-x-4">
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full shadow">
                Mua ngay
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full flex items-center gap-2 shadow">
                <AddShoppingCart />
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        {/* Khuyến mãi */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Khuyến mãi</h2>
          <ul className="list-disc list-inside text-gray-700">
            {product.promotion.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailProduct;
