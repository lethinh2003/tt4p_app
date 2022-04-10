import { useRouter } from "next/router";
import Link from "next/link";

import { MdUpload, MdFeaturedPlayList } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaMicrophone, FaStore } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const Sidebar = () => {
  const router = useRouter();
  const ItemWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.sidebar.default,
    alignItems: "center",
    zIndex: 97,
    width: "90px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    transform: "translateX(0)",

    "& .ms-sidebar__wrapper": {
      padding: "0 5px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    "& .ms-navbar": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",

      "&__item": {
        transition: "all 0.2s linear",
        width: "80px",
        height: "80px",
        fontWeight: "bold",
        cursor: "pointer",
        color: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        opacity: 0.85,
        "&--icon": {
          fontSize: "37px",
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  }));
  return (
    <>
      <ItemWrapper className="ms-sidebar">
        <div className="ms-sidebar__wrapper">
          <div className="ms-navbar">
            <div className="ms-navbar__item">
              <Link href="/">
                <img
                  src="https://i.imgur.com/U0BdIic.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Link>
            </div>

            <Link href="/">
              <div className="ms-navbar__item">
                <span className="ms-navbar__item--icon">
                  <i className="fa fa-home" aria-hidden="true"></i>
                </span>
                {/* <span className="ms-navbar__item--title">Home</span> */}
              </div>
            </Link>

            <Link href={`/artists`}>
              <div className="ms-navbar__item">
                <span className="ms-navbar__item--icon">
                  <FaMicrophone />
                </span>
                {/* <span className="ms-navbar__item--title">Artists</span> */}
              </div>
            </Link>
            <Link href={`/musics`}>
              <div className="ms-navbar__item">
                <span className="ms-navbar__item--icon">
                  <GiLoveSong />
                </span>
                {/* <span className="ms-navbar__item--title">Songs</span> */}
              </div>
            </Link>
          </div>
        </div>
      </ItemWrapper>
    </>
  );
};
export default Sidebar;
