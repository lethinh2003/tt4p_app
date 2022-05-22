import { Box, Button, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateColorTitle from "./CreatePost/CreateColorTitle";
import CreateContent from "./CreatePost/CreateContent";
import CreateTitle from "./CreatePost/CreateTitle";
const CreateNewPost = () => {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [titleErrMessage, setTitleErrMessage] = useState("");
  const [contentErrMessage, setContentErrMessage] = useState("");
  const [backgroundColorTitle, setBackgroundColorTitle] = useState("#abb8c3");

  const [dataContent, setDataContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // form validation rules

  useEffect(() => {
    if (title.length < 5 && isEdit) {
      setTitleErrMessage("Tiêu đề phải có độ dài từ 5 kí tự trở nên");
    } else {
      setTitleErrMessage("");
    }
  }, [title, isEdit]);
  useEffect(() => {
    if (dataContent.length < 5 && isEdit) {
      setContentErrMessage("Nội dung phải có độ dài từ 5 kí tự trở nên");
    } else {
      setContentErrMessage("");
    }
  }, [dataContent, isEdit]);

  const onSubmit = async () => {
    try {
      setIsEdit(true);
      if (dataContent.length < 5 || title.length < 5) {
        return false;
      }
      setIsLoading(true);
      await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/posts/`, {
        title: title,
        content: dataContent,
        color: backgroundColorTitle,
      });

      setIsLoading(false);

      toast.success("Tạo thành công");
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  //form

  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {isLoading && (
          <>
            <Skeleton
              variant="rectangular"
              height={50}
              sx={{ marginTop: "10px" }}
              width={300}
            />
            <Skeleton
              variant="rectangular"
              height={50}
              sx={{ marginTop: "10px" }}
              width={300}
            />
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ marginTop: "10px" }}
              width={300}
            />
          </>
        )}
        {!isLoading && (
          <>
            <CreateTitle
              title={title}
              setTitle={setTitle}
              titleErrMessage={titleErrMessage}
              setTitleErrMessage={setTitleErrMessage}
            />
            <CreateColorTitle
              title={title}
              backgroundColorTitle={backgroundColorTitle}
              setBackgroundColorTitle={setBackgroundColorTitle}
            />
            <CreateContent
              isLoadingUploadImage={isLoadingUploadImage}
              setIsLoadingUploadImage={setIsLoadingUploadImage}
              dataContent={dataContent}
              setDataContent={setDataContent}
              contentErrMessage={contentErrMessage}
            />

            <Button
              sx={{
                pointerEvents: isLoadingUploadImage ? "none" : "visible",
                opacity: isLoadingUploadImage ? "0.7" : "1",
              }}
              onClick={onSubmit}
              variant="outlined"
              type="submit"
            >
              {isLoadingUploadImage ? "Đang tải ảnh..." : "Lưu"}
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
export default memo(CreateNewPost);
