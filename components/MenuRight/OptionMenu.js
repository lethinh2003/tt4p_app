import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import NotifyButton from "./NotifyButton";
const OptionMenu = () => {
  return (
    <>
      <Box sx={{}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              width: "150px",
              height: "50px",
              borderRadius: "10px",
              flex: 1,
              display: "flex",
              backgroundColor: (theme) => theme.palette.button.background.first,
              color: (theme) => theme.palette.button.color.first,
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                backgroundColor: (theme) =>
                  theme.palette.button.background.hover,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FiSearch
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Search
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <NotifyButton />
            <Link href="/posts/create">
              <Box
                sx={{
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                  backgroundColor: (theme) =>
                    theme.palette.button.background.first,
                  color: (theme) => theme.palette.button.color.first,
                  borderRadius: "10px",
                  display: "flex",
                  fontSize: "2.5rem",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.button.background.hover,
                  },
                }}
              >
                <VscAdd />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default OptionMenu;
