import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          
          backgroundImage:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Instaglam
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
