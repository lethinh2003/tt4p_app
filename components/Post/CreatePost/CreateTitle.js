import { FormControl, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, useEffect } from "react";
const CreateTitle = ({
  title,
  setTitle,
  titleErrMessage,
  setTitleErrMessage,
}) => {
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Tạo bài đăng mới";
    }
  }, [title]);
  console.log("render title");
  return (
    <>
      <FormControl
        variant="standard"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LabelInput>Tiêu đề</LabelInput>

        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          fullWidth
          error={titleErrMessage ? true : false}
          helperText={titleErrMessage ? titleErrMessage : ""}
        />
      </FormControl>
    </>
  );
};
export default memo(CreateTitle);
