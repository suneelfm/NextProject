import { Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../styles/Components.module.css";

export default function OfferSlideShow({
  images = [
    "../offers/images1.jpg",
    "../offers/images2.jpg",
    "../movies/download3.jfif",
    "../offers/images3.jpg",
    "../movies/download4.jfif",
    "../offers/images7.jpg",
    "../movies/download5.jfif",
    "../offers/images8.jpg",
  ],
}) {
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
