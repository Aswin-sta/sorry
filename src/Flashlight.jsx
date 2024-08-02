import { useEffect, useState } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Flashlight.css";

function Flashlight() {
  const [isActive, setIsActive] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const randomPosition = () => ({
      top: Math.random() * (window.innerHeight - 100),
      left: Math.random() * (window.innerWidth - 200),
    });

    setPosition(randomPosition());

    const handleMouseMove = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      setIsActive(true);

      const light = document.querySelector(".light");
      if (light) {
        light.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent, #000 10%)`;
      }

      const box = document.querySelector(".password-box");
      if (box) {
        const boxRect = box.getBoundingClientRect();
        if (
          x >= boxRect.left &&
          x <= boxRect.right &&
          y >= boxRect.top &&
          y <= boxRect.bottom
        ) {
          setBoxVisible(true);
        } else {
          setBoxVisible(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setBoxVisible(false);
    };

    const sectionElement = document.querySelector("section");
    sectionElement.addEventListener("mousemove", handleMouseMove);
    sectionElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sectionElement.removeEventListener("mousemove", handleMouseMove);
      sectionElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Replace with actual password check
    if (password === "aaykotte") {
      navigate("/lastpage"); // Redirect to another page on correct password
    } else {
      setHint("Incorrect password. Try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <section>
        <div className={`overlay ${isActive ? "active" : ""}`}>
          <div
            className={`password-box ${boxVisible ? "visible" : "hidden"}`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              position: "absolute",
              padding: 3,
            }}
          >
            <Typography variant="h6">Enter Password</Typography>
            <TextField
              type="password"
              placeholder="Enter your password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              sx={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "10px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="light"></div>
      </section>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={hint}
      />
    </div>
  );
}

export default Flashlight;
