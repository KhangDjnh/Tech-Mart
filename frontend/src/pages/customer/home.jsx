import React from "react";
import Box from "@mui/material/Box";
import Appbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

function CustomerHome() {
  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: "https://m.media-amazon.com/images/I/71JqyTBiXrL.jpg",
    name: `Macbook Pro 13" 2019 TouchBar (MUHN2) - ${index + 1}`,
    discount: 8,
    discountPrice: "29.290.000",
    originalPrice: "31.990.000",
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Appbar />
      <Box sx={{ margin: "0 150px", position: "relative", zIndex: 1 }}>
        <Slide />
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: "40px 0",
          backgroundColor: "#f4f4f4",
          margin: "0 150px",
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
            <Card key={product.id} product={product} />
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CustomerHome;
