import { Box, Button, IconButton, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { FiPlay } from "react-icons/fi";

const CurrentMusicInfo = () => {
  const [playing, setPlaying] = useState(false);

  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const CurrentMusicWrapper = styled(Box)(({ theme }) => ({
    background:
      "linear-gradient(83deg, rgba(249,80,99,1) 0%, rgba(221,11,116,1) 38%)",
    width: "100%",
    gap: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center",
  }));

  const ItemContainer = styled(Box)(({ theme }) => ({
    scrollSnapAlign: "center",
    minWidth: "150px",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",

    "& .box-picture": {
      backgroundColor: "#332d49",
      width: "100%",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        width: "100%",
        height: "100%",

        objectFit: "cover",
      },
    },
    "& .first-title": {
      fontSize: theme.palette.text.fontSize.first,
      fontWeight: 600,
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      color: theme.palette.text.color.first,
    },
    "& .second-title": {
      fontSize: theme.palette.text.fontSize.second,
      fontWeight: 600,
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      color: theme.palette.text.color.second,
    },
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    minWidth: "40px",
    maxWidth: "40px",
    height: "40px",
    backgroundColor: "#786d75",
    color: theme.palette.text.color.first,

    "&:hover": {
      backgroundColor: "#786d75",
    },
    "& svg": {
      fontSize: "20px",
    },
  }));

  const MusicSlider = styled(Slider)(({ theme }) => ({
    color: "#ffffff",
    height: 4,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      display: "none",
      height: 18,
      width: 18,
      backgroundColor: "#fff",

      "&:focus, &:hover, &.Mui-active": {
        display: "block",
      },
    },
  }));

  return (
    <>
      <CurrentMusicWrapper>
        <ReactHowler
          playing={playing}
          src={
            "https://res.cloudinary.com/musics-app-lethinh/video/upload/v1645350333/xhpfzmvlprnwccibphtj.mp3"
          }
          ref={soundRef}
          onLoad={onLoad}
        />
        <Typography
          className="box-title"
          sx={{
            color: (theme) => theme.palette.text.color.first,
            fontWeight: "bold",
          }}
        >
          Now playing
        </Typography>
        <ItemContainer>
          <div className="box-picture">
            <img
              src="https://res.cloudinary.com/musics-app-lethinh/image/upload/v1644316884/nkgzfbzbcvcfovhyonmv.jpg"
              alt="Chat ve khoc"
            />
          </div>
          <a title="Erik" className="first-title">
            Chay ve khoc vs anh
          </a>
          <a title="Erik" className="second-title">
            Erik
          </a>
        </ItemContainer>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <p>{seek}</p>

          <p>{duration.toFixed(2)}</p>
        </Typography>
      </CurrentMusicWrapper>
    </>
  );
};
export default CurrentMusicInfo;
