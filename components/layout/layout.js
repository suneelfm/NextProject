import { Grid } from "@mui/material";
import styles from "../../styles/Layout.module.css";

export default function Layout({ Component, props }) {
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
