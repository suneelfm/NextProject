import { Button, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Login.module.css";
import componentStyles from "../../styles/Components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassowrd, setshowPassowrd] = useState(false);
  const [error, setError] = useState("");

  const username = useRef();
  const router = useRouter();

  useEffect(() => {
    username.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim() === "" && password.trim() === "") {
      setError("Please enter your correct usename and password.");
    } else {
      const res = await signIn("credentials", {
        userName: userName,
        password: password,
        redirect: false,
      });
      if (res.ok) {
        router.push(router.query.callbackUrl || "/home");
      } else {
        setError("Please check your credentials and try again.");
      }
    }
  };
  return (
    <Grid container className={styles.loginBody}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Grid container justifyContent={"center"}>
          <h1>Login</h1>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          className={styles.errorContainer}
        >
          {error}
        </Grid>
        <label className={styles.labels}>Username:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input
            ref={username}
            type={"text"}
            value={userName}
            placeholder="Enter your User Name"
            className={styles.inputField}
            onChange={(e) => setuserName(e.target.value)}
          />
        </Grid>
        <label className={styles.labels}>Password:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <Grid className={styles.passwordField} sx={{ width: "100%" }}>
            <input
              type={showPassowrd ? "text" : "password"}
              value={password}
              placeholder="Enter your Password"
              className={styles.passwordInput}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Grid
              className={styles.passwordFieldAppend}
              onClick={() => setshowPassowrd(!showPassowrd)}
            >
              {showPassowrd ? (
                <span
                  className="input-group-text"
                  style={{
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
              ) : (
                <span
                  className="input-group-text"
                  style={{
                    width: "50px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faEyeSlash} />
                  <i className="fas fa-microphone-slash" />
                </span>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
          mt={"calc(5px + 2vmin)"}
        >
          <Button
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
