import { Button, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Login.module.css";
import componentStyles from "../../styles/Components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

export default function SessionOut() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassowrd, setshowPassowrd] = useState(false);
  const [error, setError] = useState("");

  const button = useRef();
  const router = useRouter();

  useEffect(() => {
    button.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push("/auth/login");
  };
  return (
    <Grid container className={styles.loginBody} sx={{ zIndex: "1202" }}>
      <form onSubmit={handleSubmit} style={{ color: "white" }}>
        <Grid item textAlign={"center"}>
          <FontAwesomeIcon
            icon={faHourglassEnd}
            style={{ fontSize: "calc(20px + 10vmin)" }}
          />
        </Grid>
        <Grid item textAlign={"center"}>
          <h1>Your session has been expired.</h1>
        </Grid>
        <Grid item textAlign={"center"}>
          <h2>Please login again.</h2>
        </Grid>

        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
          mt={"calc(5px + 2vmin)"}
        >
          <Button
            ref={button}
            type="submit"
            className={styles.inputField}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
