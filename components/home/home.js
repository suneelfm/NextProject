import { Grid } from "@mui/material";
import OfferSlideShow from "./offerSlideShow";
import ProductDisplay from "./productDisplay";

export default function HomePage() {
  const images = [
    "../images1.jpg",
    "../images2.jpg",
    "../images3.jpg",
    "../images4.jpg",
    "../images5.jpg",
    "../images6.jpg",
    "../images7.jpg",
    "../images8.jpg",
  ];

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

  return (
    <>
      <Grid container item height={"25vw"} position={"relative"} top="0.3vw">
        <OfferSlideShow></OfferSlideShow>
      </Grid>
      <ProductDisplay products={movies} listTital="Movies" cardFor={"movies"} />
      <ProductDisplay
        products={images}
        listTital="TOP BRANDS"
        bottomLabelReqired={true}
      />
    </>
  );
}
