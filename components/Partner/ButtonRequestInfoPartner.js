import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const ButtonRequestInfoPartner = ({
  handleClickRequestInfoPartner,
  isHideInfo,
  countRequestInfo,
}) => {
  const countTimeRef = useRef(null);
  const [countTimeRequestInfo, setCountTimeRequestInfo] = useState(10);
  const [isClick, setIsClick] = useState(false);
  useEffect(() => {
    if (countTimeRequestInfo < 1 || !isHideInfo) {
      clearInterval(countTimeRef.current);
      setIsClick(false);
      setCountTimeRequestInfo(10);
    }
    if (isClick) {
      countTimeRef.current = setInterval(() => {
        setCountTimeRequestInfo((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countTimeRef.current);
  }, [countTimeRequestInfo, isClick]);
  const handleClickRequestInfo = () => {
    if (!isHideInfo) {
      handleClickRequestInfoPartner();
    } else {
      if (countRequestInfo < 1) {
        handleClickRequestInfoPartner();
      } else {
        setIsClick(true);
        handleClickRequestInfoPartner();
      }
    }
  };

  return (
    <>
      <Button
        sx={{
          opacity: isClick ? "0.7" : "1",
          pointerEvents: isClick ? "none" : "unset",
        }}
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        type="submit"
        onClick={!isClick ? () => handleClickRequestInfo() : null}
      >
        Thông tin đối phương {isClick && countTimeRequestInfo + "s"}
      </Button>
    </>
  );
};
export default ButtonRequestInfoPartner;
