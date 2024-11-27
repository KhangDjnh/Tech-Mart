import React from "react";
import Box from "@mui/material/Box";
import Appbar from "../../components/Navbar";
import Slide from "../../components/Slide";

function CustomerHome() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: "0 120px", // Áp dụng margin hai bên
      }}
    >
      {/* AppBar */}
      <Box
        sx={{
          height: "60px", // AppBar cố định chiều cao 60px
          backgroundColor: "#3498db",
        }}
      >
        <Appbar />
      </Box>

      {/* Slider */}
      <Box
        sx={{
          height: "200px", // Chiều cao cố định cho Slide
          backgroundColor: "#2ecc71", // Màu xanh như hình minh họa
        }}
      >
        <Slide />
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          padding: "20px 0", // Thêm padding dọc để tách biệt content
          backgroundColor: "#f4f4f4",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {/* Danh sách các thẻ card */}
          {[...Array(30)].map((_, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>Card {index + 1}</p>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#2ecc71",
          padding: "10px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h3>Footer</h3>
      </Box>
    </Box>
  );
}

export default CustomerHome;
