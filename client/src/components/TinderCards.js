import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import MoviesData from "../MovieDataContext";
import "./TinderCard.css";
import { IconButton } from "@material-ui/core";
import Box from "@mui/material/Box";
import { Close, Check, SentimentVerySatisfied, Info } from "@material-ui/icons";
import TinderCard from "react-tinder-card";
import useMediaQuery from "@mui/material/useMediaQuery";

async function acceptMovie(movie) {
  return fetch(`http://localhost:8080/recommendations/${movie.id}/accept`, {
    method: "PUT",
  }).then((response) => response.json());
}
async function rejectMovie(movie) {
  return fetch(`http://localhost:8080/recommendations/${movie.id}/reject`, {
    method: "PUT",
  }).then((response) => response.json());
}
function TinderCards() {
  const desktopMedia = useMediaQuery("(min-width:600px");
  const [showSummary, setShowSummary] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const { database } = useContext(MoviesData);
  const [currentIndex, setCurrentIndex] = useState(database.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const handleShowSumm = (e) => {
    e.preventDefault();
    console.log(showSummary);
    setShowSummary(!showSummary);
  };
  const childRefs = useMemo(
    () =>
      Array(database.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  // Swipe left -> accept , Swipe right -> Reject
  // const swiped = (direction, index, movie) => {
  //   setShowSummary(false)
  //   if (direction === "left") {
  //     acceptMovie(movie);
  //   }
  //   if (direction === "right") {
  //     rejectMovie(movie);
  //   }
  //   updateCurrentIndex(index - 1);
  // };

  // swipe left , right, top -> reject
  const swiped = (direction, index, movie) => {
    if (direction === "down") {
      setShowSummary(false);
      acceptMovie(movie);
      return updateCurrentIndex(index - 1);
    }
    setShowSummary(false);
    rejectMovie(movie);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < database.length) {
      setShowSummary(false);
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  useEffect(() => {
    if (currentIndexRef.current === -1) {
      setShowButtons(false);
    }
  }, [currentIndexRef.current]);

  return (
    <Box
      data-testid="movie-list"

      sx={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          gridColumn: "1",
          gridRow: "1",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            color: "black",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: "5px 0",
            textAlign: "center",
            fontSize: `${desktopMedia ? "3em" : "1.25em"}`,
            height: "1.25em",
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            width: `${desktopMedia ? "800px" : "600px"}`,
            padding: "20px",
            maxWidth: "85vw",
            height: "35vh",
            borderRadius: "20px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid white",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: `${desktopMedia ? "3em" : "2em"}`,
          }}
        >
          {/* you can check your preferences by clicking on the icon in the upper left corner, have a nice session! */}
          <Box>that's all for now</Box>
          <SentimentVerySatisfied
            style={{ fontSize: "5rem ", color: "yellowgreen" }}
          />
        </Box>
      </Box>

      {database.map((movie, index) => (
        <TinderCard
          id={`swipe-card-${index}`}
          className="swipe"
          ref={childRefs[index]}
          key={index}
          onSwipe={(dir) => swiped(dir, index, movie)}
          onCardLeftScreen={() => outOfFrame(movie.name, index)}
          // preventSwipe={["up", "down"]}
        >
          <Box
          data-testid="movie-title"
            sx={{
              color: "black",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: `${desktopMedia ? "3em" : "1.25em"}`,
              height: "1.25em",
            }}
          >
            {movie.name} ({movie.ratings}/10)
          </Box>
          <Box
            data-testid="movie"
            sx={{
              position: "relative",
              width: `${desktopMedia ? "800px" : "600px"}`,
              padding: "20px",
              maxWidth: "85vw",
              height: "35vh",
              borderRadius: "20px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid white",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundImage: `url(${movie.url}) `,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "start",
              }}
            >
              <IconButton
                style={{
                  position: "relative",
                  top: "-25px",
                  left: "-25px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                onTouchStart={(e) => handleShowSumm(e)}
                onClick={(e) => handleShowSumm(e)}
              >
                <Info
                  style={{
                    color: "black",
                    fontSize: `${desktopMedia ? "3rem" : "2rem"}`,
                  }}
                />
              </IconButton>
            </Box>
            {showSummary ? (
              <Box
                sx={{
                  color: "white",
                  borderRadius: "10px",
                  padding: "5px",
                  backgroundColor: "#00000091",
                  fontSize: `${desktopMedia ? "1rem" : "0.75rem"}`,
                }}
              >
                {movie.summary}
              </Box>
            ) : (
              ""
            )}
          </Box>
        </TinderCard>
      ))}
      {showButtons ? (
        <Box
          sx={{
            position: "relative",
            top: "100%",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "15vw",
            cursor: "pointer",
            height: "2rem",
          }}
        >
          <IconButton
            style={{ color: "#76e2b3" }}
            // onClick={() => swipe("left")}
            onClick={() => swipe("down")}
          >
            <Check fontSize="large" />
            Accept
          </IconButton>
          <IconButton
          data-testid="reject-btn"
            style={{ color: "#ec5e6f" }}
            onClick={() => swipe("right")}
          >
            Reject
            <Close fontSize="large" />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
}

export default TinderCards;
