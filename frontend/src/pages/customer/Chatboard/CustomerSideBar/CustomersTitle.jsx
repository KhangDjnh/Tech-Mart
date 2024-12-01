import React from "react";
import { Typography } from "@mui/material";

const CustomersTitle = ({ title }) => {
  return (
    <Typography
        sx={{
            textTransform: "uppercase",
            color: "#8e9297",
            fontSize: "14px",
            marginTop: "10px",
            fontWeight: "bold",
        }}

    >
      {title}
    </Typography>
  );
};

export default CustomersTitle;
