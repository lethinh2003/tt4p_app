import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
const ItemSex = ({ isSelected, onClick, item }) => {
  const ButtonOptionWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.buttonOption,
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    position: "relative",

    "&:hover": {
      backgroundColor: theme.palette.background.buttonOptionHover,
      opacity: 0.8,
    },
    "&.active": {
      border: "2px solid",
    },
  }));
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  return (
    <ButtonOptionWrapper
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <Image src={item.img} width={40} height={40} />
      {isSelected && <motion.div className="outline" layout />}
    </ButtonOptionWrapper>
  );
};
export default ItemSex;
