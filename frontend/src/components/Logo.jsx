import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <img
          src="/logo.png" 
          alt="Logo"
          style={{
            height: "46px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
