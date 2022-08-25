import {
  FormControl,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, useEffect } from "react";
const CreateTitle = ({
  title,
  setTitle,
  titleErrMessage,
  setTitleErrMessage,
}) => {
  const LabelInput = styled(Typography)(({ theme }) => ({
    fontWeight: "500",
    opacity: "0.7",
    color: theme.palette.text.color.first,
  }));
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Tạo bài đăng mới";
    }
  }, [title]);
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{title.length}/300</InputAdornment>
            ),
          }}
          error={titleErrMessage ? true : false}
          helperText={titleErrMessage ? titleErrMessage : ""}
        />
      </FormControl>
    </>
  );
};
export default memo(CreateTitle);
