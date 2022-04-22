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

  return (
    <>
      <Grid container item height={"25vw"} position={"relative"} top="0.3vw">
        <OfferSlideShow></OfferSlideShow>
      </Grid>
      <ProductDisplay products={images} listTital="TOP BRANDS" />
      <ProductDisplay products={images} listTital="ONLY AT NYKAA" />
    </>
  );
}
