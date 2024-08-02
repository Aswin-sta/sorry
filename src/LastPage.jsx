// LastPage.jsx
import { useRef, useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LastPage.css"; // Import the CSS file for animations

function LastPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (!isAudioPlaying && audioRef.current) {
      audioRef.current
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

  useEffect(() => {
    const handleMouseMove = () => {
      handlePlayAudio();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isAudioPlaying]);

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
        className="moving-text" // Corrected class name
        variant="text"
        onClick={handlePlayAudio}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="h1">{isAudioPlaying ? " 😬 " : "😂"}</Typography>{" "}
        {/* Corrected Typography variant */}
      </Button>

      <audio ref={audioRef} src="src/VID_bla.mp3" />
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
