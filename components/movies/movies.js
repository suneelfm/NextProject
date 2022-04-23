import { Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import OfferSlideShow from "../home/offerSlideShow";
import ProductDisplay from "../home/productDisplay";
import styles from "../../styles/Components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function MoviesPage() {
  const movies = [
    { Poster: "../movies/download1.jfif", Title: "2020 B2B" },
    { Poster: "../movies/download2.jfif", Title: "KGF" },
    { Poster: "../movies/download3.jfif", Title: "RRR" },
    { Poster: "../movies/download4.jfif", Title: "Best Friend" },
    { Poster: "../movies/download5.jfif", Title: "2020 B2B" },
    { Poster: "../movies/download6.jfif", Title: "Ulidavaru Kandante" },
    { Poster: "../movies/download7.jfif", Title: "Kalave Mosagar" },
    { Poster: "../movies/download8.jfif", Title: "Ayushmanbhava" },
  ];

  const [isStartHearing, setIsStartHearing] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [result, setresult] = useState([]);
  const [message, setmessage] = useState("");
  let text = "";

  const SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  const microphone = new SpeechRecognition();

  microphone.continuous = true;
  microphone.interimResults = true;
  microphone.lang = "en-US";

  const startHearing = () => {
    setsearchText("");
    text = "";
    setIsStartHearing(true);
    microphone.start();
    microphone.onresult = (event) => {
      const speechToText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(speechToText);
      text = speechToText;
      setsearchText(speechToText);
    };
    setTimeout(() => {
      setIsStartHearing(false);
      microphone.stop();
      getData();
    }, 5000);
  };

  const getData = async () => {
    setresult([]);
    await axios
      .get(`https://www.omdbapi.com/?s=${text || searchText}&apikey=f056e2f7`)
      .then((res) => {
        if (res.data.Response === "True") {
          console.log(res?.data?.Search);
          setresult(res?.data?.Search);
          setmessage("");
          text = "";
        } else {
          console.log(res?.data?.Error);
          setmessage(res?.data?.Error);
        }
      });
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid className={styles.inputGroup} sx={{ width: "50%" }}>
          <input
            type="text"
            placeholder="Search Movies"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
            onBlur={getData}
            onKeyDown={(e) => e.key === "Enter" && getData()}
            className={styles.formControl}
          />
          <Grid className={styles.inputGroupAppend} onClick={startHearing}>
            {isStartHearing ? (
              <span
                className="input-group-text"
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </span>
            ) : (
              <span
                className="input-group-text"
                style={{
                  width: "50px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faMicrophoneSlash} />
                <i className="fas fa-microphone-slash" />
              </span>
            )}
          </Grid>
          <div style={{ height: "calc(5px + 2vmin)", color: "red" }}>
            {message}
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        height={"85%"}
        sx={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <Grid container item height={"25vw"} position={"relative"} top="0.3vw">
          <OfferSlideShow images={movies.map((item) => item.Poster)} />
        </Grid>
        {result.length > 0 ? (
          <ProductDisplay
            products={result}
            listTital="Your Movies Here"
            cardFor={"movies"}
          />
        ) : (
          <>
            <ProductDisplay
              products={movies}
              listTital="Kannada"
              cardFor={"movies"}
            />
            <ProductDisplay
              products={movies}
              listTital="Telugu"
              cardFor={"movies"}
            />
          </>
        )}
      </Grid>
    </>
  );
}
