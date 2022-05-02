import { Typography, Box } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>© {new Date().getFullYear()} TroChuyen4Phuong</Typography>
      </Box>
    </>
  );
};
export default Footer;
