import { BigHead } from "@bigheads/core";
import { Box, Typography } from "@mui/material";
import { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _avatarChange } from "../../../redux/actions/_avatarChange";
import { UPDATE_AVATAR_USER } from "../../../redux/actions/constants";
const LipColor = ({ avatarSVG, sx, item }) => {
  const dispatch = useDispatch();
  const avatarChange = useSelector((state) => state._avatarChange);

  const handClickChange = (item) => {
    dispatch(
      _avatarChange({
        type: UPDATE_AVATAR_USER,
        data: { lipColor: item },
      })
    );
  };
  return (
    <>
      <Box
        onClick={() => handClickChange(item)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              ...sx,
              width: sx && sx.width ? sx.width : "50px",
              height: sx && sx.height ? sx.height : "50px",
              cursor: "pointer",

              borderRadius: "10px",
              position: "relative",
              overflow: "hidden",
              border:
                avatarChange.lipColor === item
                  ? "3px solid #419fe8"
                  : "2px solid #23303a",
              boxShadow: "0px 3px 15px 0px #e1e1e1",
              maxWidth: "200px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: sx ? sx.width : "50px",
              }}
            >
              <BigHead {...avatarChange} lipColor={item} />
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          {typeof item === "string" ? item : JSON.stringify(item)}
        </Typography>
      </Box>
    </>
  );
};
export default memo(LipColor);
