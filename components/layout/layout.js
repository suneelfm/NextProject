import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faSearch,
  faShoppingBag,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, MenuItem, MenuList } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../../pages/auth/login";
import styles from "../../styles/Layout.module.css";

export default function Layout({ Component, props }) {
  const [openMenu, setopenMenu] = useState(false);
  const [openProfileOptions, setopenProfileOptions] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session]);

  if (status === "unauthenticated") {
    return <Login />;
  } else if (status === "authenticated") {
    return (
      <Grid container className={styles.mainBody}>
        {status === "authenticated" && (
          <>
            <Grid container xs={12} className={styles.headerContainer}>
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
              <Grid item xs={5} ml="4vw"></Grid>
              <Grid container item xs={3} justifyContent={"right"}>
                <Grid className={styles.searchField}>
                  <Grid>
                    <div className={styles.searchIcon}>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input
                      type={"search"}
                      className={styles.searchInput}
                      placeholder="Search"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                position={"relative"}
                item
                xs={1}
                justifyContent={"right"}
              >
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  // onClick={() => setshowBag(true)}
                  className={styles.cartIcon}
                />
              </Grid>
              <Grid
                container
                item
                xs={1}
                justifyContent={"right"}
                alignItems="center"
              >
                <label
                  htmlFor="account"
                  onClick={() => setopenProfileOptions(!openProfileOptions)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon id="account" icon={faUser} />
                  <span style={{ marginLeft: "0.3vw", fontSize: "1vw" }}>
                    Account
                  </span>
                </label>
              </Grid>
            </Grid>
            <Grid
              container
              className={styles.sidebarContainer}
              width={openMenu ? "10%" : "3%"}
            >
              {openMenu && (
                <Grid item xs={12}>
                  <MenuList>
                    <Link href={"/home"} passHref>
                      <MenuItem className={styles.menuItems}>
                        <b>Home</b>
                      </MenuItem>
                    </Link>
                    <Link href={"/todo"} passHref>
                      <MenuItem className={styles.menuItems}>
                        <b>Todo</b>
                      </MenuItem>
                    </Link>
                    <Link href={"/shopping"} passHref>
                      <MenuItem className={styles.menuItems}>
                        <b>Shopping</b>
                      </MenuItem>
                    </Link>
                    <Link href={"/movies"} passHref>
                      <MenuItem className={styles.menuItems}>
                        <b>Movies</b>
                      </MenuItem>
                    </Link>
                    <MenuItem className={styles.menuItems}>
                      <a href="https://www.nykaa.com/nykaa-network/home">
                        <b className="nykaatabs">Nykaa Network</b>
                      </a>
                    </MenuItem>
                  </MenuList>
                </Grid>
              )}
            </Grid>
          </>
        )}
        {openProfileOptions && (
          <Grid item className={styles.profileOptions}>
            <MenuList className={styles.profileOptionsList}>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={() => signOut()} sx={{ position: "relative" }}>
                Logout{" "}
                <FontAwesomeIcon
                  style={{ position: "absolute", right: "1vw" }}
                  icon={faSignOut}
                />
              </MenuItem>
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
  }
}
