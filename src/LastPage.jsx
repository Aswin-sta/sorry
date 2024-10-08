import { useRef, useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LastPage.css"; // Import the CSS file for animations
import audioFile from "./VID_bla.mp3"; // Import the new audio file

function LastPage() {
  const navigate = useNavigate();
  const audio = useRef(new Audio(audioFile)); // Create an Audio object
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (!isAudioPlaying && audio.current) {
      audio.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  };

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page or another route
  };



  return (
    <Box
      className="last-page"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        className="moving-text"
        variant="text"
        onClick={handlePlayAudio}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="h1">{isAudioPlaying ? " 😬 " : "😂"}</Typography>
      </Button>

      <Button
        className="button-50"
        style={{ zIndex: 999, marginTop: "16px" }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default LastPage;
