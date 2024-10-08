/* eslint-disable react/prop-types */
import { Modal, Box, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import "./buttonStyles.css"; // Import the CSS file
import audioFile from "./ee akalam.mp3"; // Import the audio file

const modalStyle = (depth, initial) => {
  const isLargeScreen = window.innerWidth >= 1024; // Adjust breakpoint as needed

  // Calculate vertical and horizontal offsets based on screen size and depth
  const verticalOffset = initial
    ? 0
    : isLargeScreen
    ? 50 + depth * 20
    : 50 + depth * 10;

  return {
    position: "fixed", // Changed to fixed positioning for better control
    top: `calc(50% - ${verticalOffset}px)`, // Center vertically with offset
    left: `50%`,
    transform: "translate(-50%, -50%)", // Adjust horizontal translation
    bgcolor: "background.paper",
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    p: 4,
    width: "90%", // Adjusted for responsiveness
    maxWidth: 400, // Max width for larger screens
    zIndex: 1000 + depth,
    borderRadius: "10px",
    color: "black",
    margin: 0, // Apply the margin calculated
    maxHeight: "90vh", // Ensure modal does not exceed viewport height
    overflowY: "auto", // Allow scrolling if content overflows
  };
};

const CustomModal = ({
  open,
  onClose,
  depth = 0,
  initial = false,
  onYesCallback,
  onNoCallback,
}) => {
  const [nestedModals, setNestedModals] = useState([]);
  const hasPlayedAudioRef = useRef(false); // Track if audio has been played
  const audioRef = useRef(new Audio(audioFile)); // Create audio reference

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause(); // Pause the audio when the component unmounts
      audio.currentTime = 0; // Reset the audio to the start
    };
  }, []);

  const handleNo = () => {
    if (depth === 0 && !hasPlayedAudioRef.current) {
      hasPlayedAudioRef.current = true;
      audioRef.current.play();
    }
    // Open a new nested modal at a deeper depth
    setNestedModals([...nestedModals, depth + 1]);
  };

  const handleYes = () => {
    audioRef.current.pause(); // Pause the audio
    if (onYesCallback) {
      onYesCallback(); // Call the callback function
    }
    onClose(); // Close the modal
  };

  const handleClose = () => {
    // Do nothing
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle(depth, initial)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Shemicha ?</p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                gap: 1, // Space between buttons
                mt: 2, // Margin top for spacing
                flexWrap: "wrap", // Wrap buttons on smaller screens
              }}
            >
              <Button onClick={handleYes} className="button-50 button-yes">
                Shemichu
              </Button>
              <Button onClick={handleNo} className="button-50 button-no">
                Illale
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {nestedModals.map((modalDepth) => (
        <CustomModal
          key={modalDepth}
          open={open}
          onClose={onClose}
          depth={modalDepth}
          onYesCallback={onYesCallback}
          onNoCallback={onNoCallback}
        />
      ))}
    </>
  );
};

export default CustomModal;
