import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { _postSaved } from "../../../redux/actions/_postSaved";
import {
  ADD_ITEM_POST_SAVED,
  REMOVE_ITEM_POST_SAVED,
} from "../../../redux/actions/constants";
const Save = ({ item, socket }) => {
  const dispatch = useDispatch();
  const dataUserSavedPosts = useSelector((state) => state.savedPosts);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const checkisSaved = (itemID, lists) => {
    const check = lists.find((item) => item._id === itemID);

    if (check) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (checkisSaved(item._id, dataUserSavedPosts)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [dataUserSavedPosts]);

  const handleClickSave = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/saved`,
        {
          postID: item._id,
        }
      );

      setIsLoading(false);
      if (res.data.message === "saved_success") {
        setIsSaved(true);
        toast.info("Saved thành công");
        dispatch(
          _postSaved({
            type: ADD_ITEM_POST_SAVED,
            data: item,
          })
        );
      } else if (res.data.message === "unsaved_success") {
        setIsSaved(false);
        dispatch(
          _postSaved({
            type: REMOVE_ITEM_POST_SAVED,
            data: item._id,
          })
        );
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      <Box
        onClick={() => handleClickSave()}
        sx={{
          opacity: isLoading ? 0.7 : 1,
          pointerEvents: isLoading ? "none" : "visible",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          color: isSaved
            ? "#c43be8"
            : (theme) => theme.palette.text.color.first,
          "&:hover": {
            color: "#c43be8",
            "& .icon": {
              backgroundColor: (theme) =>
                theme.palette.button.background.iconSave,
              color: "#c43be8",
            },
          },
        }}
      >
        <Box
          sx={{
            fontSize: "inherit",
            cursor: "pointer",

            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "1.4rem",
          }}
        >
          <Box
            className="icon"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {isSaved ? (
              <BookmarkIcon
                sx={{
                  color: "#c43be8",
                }}
              />
            ) : (
              <BookmarkBorderIcon />
            )}
          </Box>
          Save
        </Box>
      </Box>
    </>
  );
};
export default React.memo(Save);
