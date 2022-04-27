import { Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../styles/Components.module.css";

export default function OfferSlideShow({
  images = [
    "todo.png",
    "../movies/download3.jfif",
    "../offers/images1.jpg",
    "../movies/download4.jfif",
    "../offers/images2.jpg",
    "../offers/images3.jpg",
    "../movies/download5.jfif",
    "../offers/images7.jpg",
    "../offers/images8.jpg",
  ],
}) {
  return (
    <Grid width={"100%"}>
      <Carousel
        axis="horizontal"
        autoPlay
        swipeable
        interval={3000}
        infiniteLoop={true}
        showArrows={true}
        showStatus={false}
        width="100%"
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
    </Grid>
  );
}
