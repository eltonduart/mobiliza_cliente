import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import { SignInCredentials } from "../../dtos/SignInCredentials";
import { navigate } from "@reach/router";
import { CircularProgress } from "@material-ui/core";
import logo from '../../assets/logoC.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="textSecondary" href="www.index.com.br">
        Index - Tecnologia e Gestão
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  images: {
    display: 'flex',
    width: '100%',
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Entre com um email válido")
    .required("Email requerido"),
  password: yup
    .string()
    .min(5, "A senha deve conter no mínimo 5 caracteres")
    .required("Senha requerida"),
});

const SignIn = () => {
  const classes = useStyles();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "admin@email.com",
      password: "admin",
    },
    validationSchema: validationSchema,
    onSubmit: async (data: SignInCredentials): Promise<void> => {
      try {
        debugger;
        setLoading(true);
        await signIn({ email: data.email, password: data.password });
        navigate("/");
      } catch (error) { }
      setLoading(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} width={300} />
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Me lembre"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading && <CircularProgress />}
            Logar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Não possuo conta? Criar"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container >
  );
};

export default SignIn;
