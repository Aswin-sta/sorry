// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import CustomModal from "./CustomModal";
// import sound from "./sound.wav"; // Import the new sound file

// const TypingText = ({ text, onComplete }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const audio = useMemo(() => new Audio(sound), []); // Create an Audio object

//   useEffect(() => {
//     let index = 0;
//     setDisplayedText(text[index]);

//     const typingInterval = setInterval(() => {
//       index++;
//       if (index < text.length) {
//         setDisplayedText((prev) => prev + text[index]);
//         audio.play(); // Play the sound
//       } else {
//         clearInterval(typingInterval);
//          audio.pause(); // Stop the sound
//          audio.currentTime = 0; // Reset the audio playback position
//         if (onComplete) {
//           onComplete();
//         }
//       }
//     }, 100);

//        return () => {
//       clearInterval(typingInterval);
//       audio.pause(); // Stop the sound if the component is unmounted
//       audio.currentTime = 0; // Reset the audio playback position
//     };
//   }, [text, onComplete, audio]);

//   return (
//     <>
//       <p className="line anim-typewriter">{displayedText}</p>
//     </>
//   );
// };

// function HomePage() {
//   const [showSorry, setShowSorry] = useState(false);
//   const [shalayaArray, setShalayaArray] = useState([]);
//   const containerRef = useRef(null);
//   const [textKey, setTextKey] = useState(0);
//   const [showLoader, setShowLoader] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [thanksMessage, setThanksMessage] = useState(false);
//   const audio = useMemo(() => new Audio(sound), []); // Create an Audio object

//   const LIMIT = 50;
//   const navigate = useNavigate(); // Hook for navigation

//   const handleClick = () => {
//     setTimeout(() => {
//       containerRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 0);
//     setShowSorry(true);
//     setTextKey((prevKey) => prevKey + 1);
//   };

//   const handleComplete = () => {
//     setShalayaArray((prevArray) => {
//       if (prevArray.length >= LIMIT) {
//         return prevArray;
//       }

//       const newArray = [...prevArray];
//       newArray.push("Hema enik shlayam alla");

//       if ((newArray.length + 1) % 20 === 0) {
//         newArray.push("Sorry");
//       }

//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth",
//       });

//       return newArray;
//     });

//     if (shalayaArray.length + 1 >= LIMIT) {
//       setShowLoader(true);
//       setTimeout(() => {
//         setShowLoader(false);
//         setShowModal(true);
//       }, 1000);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleYesCallback = () => {
//     setThanksMessage(true);
//     setShowModal(false);
//     setTimeout(() => {
//       containerRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 0);
//   };

//   const handleNo = () => {
//     // No action needed for now
//   };

//   const handleEmojiClick = () => {
//     navigate("/easteregg");
//   };

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     });
//   }, []);

//   const particlesLoaded = (container) => {
//     console.log(container);
//   };

//   const options = useMemo(
//     () => ({
//       background: {
//         color: { value: "#00000" },
//       },
//       fpsLimit: 120,
//       interactivity: {
//         events: {
//           onClick: { enable: true, mode: "push" },
//           onHover: { enable: true, mode: "repulse" },
//         },
//         modes: {
//           push: { quantity: 4 },
//           repulse: { distance: 200, duration: 0.4 },
//         },
//       },
//       particles: {
//         color: { value: "#ffffff" },
//         links: {
//           color: "#ffffff",
//           distance: 150,
//           enable: true,
//           opacity: 0.5,
//           width: 1,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: { default: "bounce" },
//           speed: 6,
//         },
//         number: { density: { enable: true }, value: 80 },
//         opacity: { value: 0.5 },
//         shape: { type: "circle" },
//         size: { value: { min: 1, max: 5 } },
//       },
//       detectRetina: true,
//     }),
//     []
//   );

//   return (
//     <div className="App">
//       <div
//         style={{
//           height: "110vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Particles
//           id="tsparticles"
//           particlesLoaded={particlesLoaded}
//           options={options}
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             zIndex: -99,
//           }}
//         />
//         <h1 style={{ zIndex: 999 }}>Hello Medem</h1>
//         <button
//           className="button-50"
//           onClick={handleClick}
//           style={{ zIndex: 999 }}
//         >
//           Click Me
//         </button>
//       </div>

//       {showSorry && shalayaArray.length >= LIMIT && (
//         <>
//           <h1 className="big-sorry">
//             {thanksMessage ? (
//               <>
//                 അന്ത ഭയം ഇറുക്കണം{" "}
//                 <span onClick={handleEmojiClick} style={{ cursor: "pointer" }}>
//                   😎
//                 </span>
//               </>
//             ) : (
//               "Sorry do..."
//             )}
//           </h1>
//           {showLoader && (
//             <>
//               <div>ഒന്ന് വെയിറ്റ് ചെയ്യണേ ...</div>
//               <span className="loader"></span>
//             </>
//           )}
//           <CustomModal
//             open={showModal}
//             onClose={handleClose}
//             onYesCallback={handleYesCallback}
//             initial={true}
//           />
//         </>
//       )}

//       {showSorry && shalayaArray.length < LIMIT && (
//         <>
//           {shalayaArray.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//           <TypingText
//             key={textKey}
//             text={
//               shalayaArray.length !== 0 && shalayaArray.length % 20 === 0
//                 ? "Sorry"
//                 : "Hema enik shalyam alla..."
//             }
//             onComplete={handleComplete}
//           />
//         </>
//       )}
//       <div ref={containerRef} className="container"></div>
//     </div>
//   );
// }

// export default HomePage;



/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import CustomModal from "./CustomModal";
import sound from "./sound.wav"; // Import the new sound file
import { fsum } from "d3";

const TypingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const audio = useMemo(() => new Audio(sound), []); // Create an Audio object

  useEffect(() => {
    let index = 0;
    setDisplayedText(text[index]);

    const typingInterval = setInterval(() => {
      index++;
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        audio.play(); // Play the sound
      } else {
        clearInterval(typingInterval);
        audio.pause(); // Stop the sound
        audio.currentTime = 0; // Reset the audio playback position
        if (onComplete) {
          onComplete();
        }
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      audio.pause(); // Stop the sound if the component is unmounted
      audio.currentTime = 0; // Reset the audio playback position
    };
  }, [text, onComplete, audio]);

  return (
    <>
      <p className="line anim-typewriter">{displayedText}</p>
    </>
  );
};

function HomePage() {
  const [showSorry, setShowSorry] = useState(false);
  const [shalayaArray, setShalayaArray] = useState([]);
  const containerRef = useRef(null);
  const [textKey, setTextKey] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [thanksMessage, setThanksMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const audio = useMemo(() => new Audio(sound), []); // Create an Audio object

  const LIMIT = 50;
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setShowSorry(true);
      setTextKey((prevKey) => prevKey + 1);
    }, 3000);
  };

  const handleComplete = () => {
    setShalayaArray((prevArray) => {
      if (prevArray.length >= LIMIT) {
        return prevArray;
      }

      const newArray = [...prevArray];
      newArray.push("Hema enik shlayam alla");

      if ((newArray.length + 1) % 20 === 0) {
        newArray.push("Sorry");
      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      return newArray;
    });

    if (shalayaArray.length + 1 >= LIMIT) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setShowModal(true);
      }, 1000);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleYesCallback = () => {
    setThanksMessage(true);
    setShowModal(false);
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleNo = () => {
    // No action needed for now
  };

  const handleEmojiClick = () => {
    navigate("/easteregg");
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: { value: "#00000" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          speed: 6,
        },
        number: { density: { enable: true }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="App">
      <div
        style={{
          height: "110vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -99,
          }}
        />
        <h1 style={{ zIndex: 999 }}>Hello Medem</h1>
        <button
          className="button-50"
          onClick={handleClick}
          style={{ zIndex: 999 }}
        >
          Click Me
        </button>
      </div>

      {showSorry && shalayaArray.length >= LIMIT && (
        <>
          <h1 className="big-sorry">
            {thanksMessage ? (
              <>
                അന്ത ഭയം ഇറുക്കണം{" "}
                <span onClick={handleEmojiClick} style={{ cursor: "pointer" }}>
                  😎
                </span>
              </>
            ) : (
              "Sorry do..."
            )}
          </h1>
          {showLoader && (
            <>
              <div>ഒന്ന് വെയിറ്റ് ചെയ്യണേ ...</div>
              <span className="loader"></span>
            </>
          )}
          <CustomModal
            open={showModal}
            onClose={handleClose}
            onYesCallback={handleYesCallback}
            initial={true}
          />
        </>
      )}
      {showMessage && (
        <h2>"Don't ever dare to think you made problems in my life"</h2>
      )}

      {showSorry && shalayaArray.length < LIMIT && (
        <>
          {shalayaArray.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <TypingText
            key={textKey}
            text={
              shalayaArray.length !== 0 && shalayaArray.length % 20 === 0
                ? "Sorry"
                : "Hema enik shalyam alla..."
            }
            onComplete={handleComplete}
          />
        </>
      )}
      <div ref={containerRef} className="container"></div>
    </div>
  );
}

export default HomePage;

