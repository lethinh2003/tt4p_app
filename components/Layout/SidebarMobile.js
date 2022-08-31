import { Box, useScrollTrigger, Slide, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, memo } from "react";
import { VscListSelection } from "react-icons/vsc";
import { motion } from "framer-motion";
import AccountMobile from "../Sidebar/AccountMobile";
import PropTypes from "prop-types";
import Link from "next/link";
import NotifyButton from "../MenuRight/NotifyButton";
function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const SidebarMobile = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 60,
  });

  const SizebarMobileItem = styled(Box)(({ theme }) => ({
    fontSize: "3rem",
    fontWeight: "bold",
    borderRadius: "5px",
    // border: `1px solid ${theme.palette.border.dialog}`,
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }));

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: { xs: "0px 5px", md: "0px 20px" },

            display: { xs: "block", md: "block", lg: "none" },
            backgroundColor: (theme) =>
              theme.palette.sidebar.background.default,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.border.dialog}`,
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            <SizebarMobileItem>
              <Link href="/">
                <img
                  src="https://i.imgur.com/A0OAtU5.png"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "50px",
                  }}
                />
              </Link>
            </SizebarMobileItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <SizebarMobileItem>
                <NotifyButton />
              </SizebarMobileItem>

              <SizebarMobileItem>
                <AccountMobile />
              </SizebarMobileItem>
            </Box>
          </Box>
        </AppBar>
      </ElevationScroll>
    </>
  );
};
export default memo(SidebarMobile);
