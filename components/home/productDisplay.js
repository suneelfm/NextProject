import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/Components.module.css";

export default function ProductDisplay({
  products,
  listTital,
  discount = "Upto 30% Off",
  bottomLabelReqired,
  cardFor,
}) {
  return (
    <>
      <Grid container justifyContent={"center"} mt={3} sx={{ fontSize: "2vw" }}>
        {listTital}
      </Grid>
      <Grid container spacing={3}>
        {products?.map((image, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            height={cardFor === "movies" ? "300px" : "250px"}
          >
            {/* <Link to={"/nykaa/products"}> */}
            <Card
              className={styles.productCard}
              //   onClick={handleClick}
            >
              <CardMedia
                component="img"
                height={cardFor === "movies" ? "75%" : "100%"}
                image={cardFor === "movies" ? image.Poster : image}
                alt="Paella dish"
              ></CardMedia>
              {bottomLabelReqired && (
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
              )}
              <CardContent>
                <b>{image.Title}</b>
              </CardContent>
            </Card>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
