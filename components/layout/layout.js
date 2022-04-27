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
import SessionOut from "../../pages/sessionout";
import styles from "../../styles/Layout.module.css";

export default function Layout({ Component, pageProps }) {
  const [openMenu, setopenMenu] = useState(false);
  const [openProfileOptions, setopenProfileOptions] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
    console.log(session);
    if (session === null) {
      router.push("/auth/login");
    }
  }, [session]);

  if (status === "unauthenticated") {
    if (router.pathname === "/sessionout") {
      return <SessionOut />;
    } else if (router.pathname === "/auth/login") {
      return <Login />;
    }
  } else if (status === "authenticated") {
    return (
      <Grid container className={styles.mainBody}>
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
                style={{ cursor: "pointer" }}
              />
            </Grid>
            <Grid item xs={1} md={5} ml="4vw"></Grid>
            <Grid container item xs={5} md={3} justifyContent={"right"}>
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
              justifyContent={"center"}
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
              xs={3}
              md={1}
              justifyContent={"right"}
              alignItems="center"
              sx={{ fontSize: "calc(10px + 1.5vmin)" }}
            >
              <label
                htmlFor="account"
                onClick={() => setopenProfileOptions(!openProfileOptions)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon id="account" icon={faUser} />
                <span
                  style={{
                    marginLeft: "0.3vw",
                    fontSize: "calc(10px + 1.5vmin)",
                  }}
                >
                  Account
                </span>
              </label>
            </Grid>
          </Grid>
          <Grid
            container
            className={styles.sidebarContainer}
            width={openMenu ? "15%" : "5%"}
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
                </MenuList>
              </Grid>
            )}
          </Grid>
        </>
        {openProfileOptions && (
          <Grid item className={styles.profileOptions}>
            <MenuList className={styles.profileOptionsList}>
              <MenuItem>Profile</MenuItem>
              <MenuItem
                onClick={() => signOut({ redirect: "/auth/login" })}
                sx={{ position: "relative" }}
              >
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
          width={openMenu ? "84%" : "94%"}
        >
          <Component {...pageProps} />
        </Grid>
      </Grid>
    );
  }
}
