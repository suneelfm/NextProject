import { Grid } from "@mui/material";
import OfferSlideShow from "../home/offerSlideShow";
import ProductDisplay from "../home/productDisplay";

export default function ShoppingPage() {
  const offers = [
    "../offers/images1.jpg",
    "../offers/images2.jpg",
    "../offers/images3.jpg",
    "../offers/images4.jpg",
    "../offers/images5.jpg",
    "../offers/images6.jpg",
    "../offers/images7.jpg",
    "../offers/images8.jpg",
  ];
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
        <OfferSlideShow images={offers} />
      </Grid>
      <ProductDisplay
        products={images}
        listTital="Top Brands"
        bottomLabelReqired={true}
      />
      <ProductDisplay
        products={images}
        listTital="TOP BRANDS"
        bottomLabelReqired={true}
      />
    </>
  );
}
