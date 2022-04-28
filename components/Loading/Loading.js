import { Backdrop, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Puff } from "react-loading-icons";

const Loading = ({ isLoading }) => {
  const BoxLoading = styled(Box)({
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "700",
    opacity: "0.7",
  });

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 9999,
          }}
          open={isLoading}
        >
          <BoxLoading>
            <Puff fill="#06bcee" stroke="#1aaed7" />
            <LoadingContent>Loading...</LoadingContent>
          </BoxLoading>
        </Backdrop>
      )}
    </>
  );
};
export default Loading;
