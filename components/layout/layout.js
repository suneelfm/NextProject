import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Layout.module.css";

export default function Layout({ Component, props }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth/login");
    }
  }, [session]);

  // if (status !== "authenticated") {
  //   return <Component {...props} />;
  // } else {
  return (
    <Grid container className={styles.mainBody}>
      {/* <Grid container className=" headerBar" alignItems={"center"}> */}
      <Grid container className={styles.headerContainer}>
        <Grid container item xs={1} className="logo" alignItems="center">
          {/* <Link to={"nykaahome"}>
            <img src="/nykaalogo.png" alt="" className="nykaaLogoImage" />
          </Link> */}
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid container item xs={3} justifyContent={"right"}>
          <Grid className={styles.searchField}>
            <Grid>
              <div className={styles.searchIcon}>
                <i className="fal fa-search"></i>
              </div>
              <input
                type={"search"}
                className={styles.searchInput}
                placeholder="Search on Nykaa"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={1}
          justifyContent={"right"}
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <i style={{ fontSize: "1.5vw" }} className="fal fa-user-alt" />
          <span style={{ marginLeft: "0.3vw", fontSize: "1vw" }}>Account</span>
        </Grid>
        <Grid
          container
          position={"relative"}
          item
          xs={1}
          justifyContent={"right"}
        >
          <i
            onClick={() => setshowBag(true)}
            className="far fa-shopping-bag kartIcon"
          />
        </Grid>
      </Grid>
      <Grid container className={styles.sidebarContainer}>
        <Grid item xs={12}>
          <Grid>
            {/* <Link to={"nykaacategories"}> */}
            <b className="nykaatabs">Categories</b>
            {/* </Link> */}
          </Grid>
          <Grid>
            {/* <Link to={"nykaabrands"}> */}
            <b className="nykaatabs">Brands</b>
            {/* </Link> */}
          </Grid>
          <Grid>
            {/* <Link to={"nykaafashion"}> */}
            <b className="nykaatabs">Nykaa Fashion</b>
            {/* </Link> */}
          </Grid>
          <Grid>
            {/* <Link to={"beautyadvice"}> */}
            <b className="nykaatabs">Beauty Advice</b>
            {/* </Link> */}
          </Grid>
          <Grid>
            <a href="https://www.nykaa.com/nykaa-network/home">
              <b className="nykaatabs">Nykaa Network</b>
            </a>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={styles.routingOutlet}>
        <Component {...props} />
      </Grid>
    </Grid>
  );
  // }
}
