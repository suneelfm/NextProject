import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
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

  if (status !== "authenticated") {
    return <Component {...props} />;
  } else {
    return (
      <Grid container className={styles.mainBody}>
        <Grid container className={styles.headerContainer}>
          dfg
        </Grid>
        <Grid container className={styles.sidebarContainer}>
          dfg
        </Grid>
        <Grid item className={styles.routingOutlet}>
          <Component {...props} />
        </Grid>
      </Grid>
    );
  }
}
