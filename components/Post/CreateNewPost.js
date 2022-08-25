import { Box, Button, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateColorTitle from "./CreatePost/CreateColorTitle";
import CreateContent from "./CreatePost/CreateContent";
import CreateTitle from "./CreatePost/CreateTitle";
import useWarnIfUnsavedChanges from "../../utils/useWarnIfUnsavedChanges.ts";
import Loading from "../Loading/Loading";

const CreateNewPost = () => {
  const [title, setTitle] = useState("");
  const [titleErrMessage, setTitleErrMessage] = useState("");
  const [contentErrMessage, setContentErrMessage] = useState("");
  const [backgroundColorTitle, setBackgroundColorTitle] = useState("#abb8c3");

  const [dataContent, setDataContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // form validation rules

  useWarnIfUnsavedChanges(isSaved, () => {
    return confirm("Warning! You have unsaved changes.");
  });
  useEffect(() => {
    if (title || dataContent) {
      setIsSaved(true);
    }
  }, [title, dataContent]);
  useEffect(() => {
    if ((title.length < 5 || title.length > 300) && isEdit) {
      setTitleErrMessage("Tiêu đề phải có độ dài từ 5 kí tự đến 300 kí tự");
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
      setTitle("");
      setDataContent("");
      setIsEdit(false);
      toast.success("Tạo thành công");
      setIsSaved(false);
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
      <Loading isLoading={isLoading} />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.latestPost.background.first,
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
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
                  alignSelf: "flex-end",
                  pointerEvents: isLoadingUploadImage ? "none" : "visible",
                  opacity: isLoadingUploadImage ? "0.7" : "1",
                }}
                onClick={onSubmit}
                type="submit"
              >
                {isLoadingUploadImage ? "Đang tải ảnh..." : "Post"}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default memo(CreateNewPost);
