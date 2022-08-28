import { Box } from "@mui/material";
import Account from "./Settings/Account";
import System from "./Settings/System";
const Settings = ({ account }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          overflowX: "auto",
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          backgroundColor: (theme) => theme.palette.latestPost.background.first,
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <System />
        <Account account={account} />
      </Box>
    </>
  );
};
export default Settings;
