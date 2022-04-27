import { Backdrop, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

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
            <Image
              src={"https://i.imgur.com/VdhhRt3.gif"}
              alt="Loading cute"
              width={200}
              height={150}
            />
            <LoadingContent>Loading...</LoadingContent>
          </BoxLoading>
        </Backdrop>
      )}
    </>
  );
};
export default Loading;
