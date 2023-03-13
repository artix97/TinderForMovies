import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

function Header({ backButton }) {
  const desktopMedia = useMediaQuery("(min-width:600px");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #f9f9f9",
      }}
    >
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: `${desktopMedia ? "3rem" : "1.25em"}`,
        }}
      >
        Tinder for Movies
      </Box>
    </Box>
  );
}

export default Header;
