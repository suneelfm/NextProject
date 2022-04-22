import { Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../styles/Components.module.css";

export default function OfferSlideShow() {
  const images = [
    "../offers/images1.jpg",
    "../offers/images2.jpg",
    "../offers/images3.jpg",
    "../offers/images4.jpg",
    "../offers/images5.jpg",
    "../offers/images6.jpg",
    "../offers/images7.jpg",
    "../offers/images8.jpg",
  ];

  return (
    <>
      <Carousel
        axis="horizontal"
        autoPlay
        swipeable
        interval={3000}
        infiniteLoop={true}
        showArrows={true}
        showStatus={false}
        width="95vw"
      >
        {images.map((image, index) => (
          <Grid
            key={index}
            item
            xs={12}
            className={styles.offerSlideElement}
            sx={{
              backgroundImage: `url(${image})`,
            }}
          ></Grid>
        ))}
      </Carousel>
    </>
  );
}
