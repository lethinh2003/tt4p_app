import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CreateContent = ({
  dataContent,
  setDataContent,
  isLoadingUploadImage,
  setIsLoadingUploadImage,
  contentErrMessage,
  setContentErrMessage,
}) => {
  const { data: session, status } = useSession();

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  //
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            setIsLoadingUploadImage(true);

            fetch(`${process.env.ENDPOINT_SERVER}/api/v1/posts/upload-file`, {
              method: "post",
              body: body,
              headers: { Authorization: `Bearer ${session.user.access_token}` },
            })
              .then((res) => res.json())
              .then((res) => {
                setIsLoadingUploadImage(false);
                resolve({
                  default: res.data,
                });
              })
              .catch((err) => {
                if (err.message) {
                  setIsLoadingUploadImage(false);
                  toast.error(err.message);
                }

                reject(err);
              });
          });
        });
      },
    };
  };
  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  console.log("render content");
  return (
    <>
      {!editorLoaded && <div>Editor loading</div>}
      {editorLoaded && (
        <Box
          sx={{
            width: "100%",
            color: "black",

            fontSize: "1.5rem",
          }}
        >
          <LabelInput>Nội dung</LabelInput>
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                  },
                  {
                    model: "heading3",
                    view: "h3",
                    title: "Heading 3",
                    class: "ck-heading_heading3",
                  },
                  {
                    model: "heading4",
                    view: "h4",
                    title: "Heading 4",
                    class: "ck-heading_heading4",
                  },
                  {
                    model: "heading5",
                    view: "h5",
                    title: "Heading 5",
                    class: "ck-heading_heading5",
                  },
                  {
                    model: "heading6",
                    view: "h6",
                    title: "Heading 6",
                    class: "ck-heading_heading6",
                  },
                ],
              },
            }}
            editor={ClassicEditor}
            data={dataContent}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDataContent(data);
              localStorage.setItem("content-post", data);
            }}
          />
          <ErrorContent>
            {contentErrMessage ? contentErrMessage : null}
          </ErrorContent>
        </Box>
      )}
    </>
  );
};
export default memo(CreateContent);
