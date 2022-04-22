import { Card, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/Components.module.css";

export default function ProductDisplay({
  products,
  listTital,
  discount = "Upto 30% Off",
}) {
  return (
    <>
      <Grid container justifyContent={"center"} mt={3} sx={{ fontSize: "2vw" }}>
        {listTital}
      </Grid>
      <Grid container spacing={3}>
        {products.map((image, index) => (
          <Grid key={index} item xs={12} md={6} lg={3} height="250px">
            {/* <Link to={"/nykaa/products"}> */}
            <Card
              className={styles.productCard}
              //   onClick={handleClick}
            >
              <CardMedia
                component="img"
                height="100%"
                image={image}
                alt="Paella dish"
              ></CardMedia>
              <Grid
                zIndex={2}
                position="absolute"
                bottom={0}
                left="0.45vw"
                height="3vw"
                width={"96%"}
                className={styles.productCardBottomContent}
              >
                <Typography sx={{ fontSize: "1vw", color: "red" }}>
                  {discount}
                </Typography>
                <Typography sx={{ fontSize: "0.8vw" }}>
                  On International Bestsellers!
                </Typography>
              </Grid>
            </Card>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
