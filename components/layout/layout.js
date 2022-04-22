import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, MenuItem, MenuList } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Layout.module.css";

export default function Layout({ Component, props }) {
  const [openMenu, setopenMenu] = useState(false);
  const [openProfileOptions, setopenProfileOptions] = useState(false);
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
        <Grid
          container
          item
          xs={1}
          className={styles.menuIcon}
          alignItems="center"
        >
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setopenMenu(!openMenu)}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid container item xs={3} justifyContent={"right"}>
          <Grid className={styles.searchField}>
            <Grid>
              <div className={styles.searchIcon}>
                <FontAwesomeIcon icon={faSearch} />
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
          onClick={() => setopenProfileOptions(!openProfileOptions)}
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
      <Grid
        container
        className={styles.sidebarContainer}
        width={openMenu ? "10%" : "3%"}
      >
        {openMenu && (
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
        )}
      </Grid>
      {openProfileOptions && (
        <Grid container className={styles.profileOptions}>
          <MenuList className={styles.profileOptionsList}>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Grid>
      )}
      <Grid
        item
        className={styles.routingOutlet}
        width={openMenu ? "89%" : "96%"}
      >
        <Component {...props} />
      </Grid>
    </Grid>
  );
  // }
}
