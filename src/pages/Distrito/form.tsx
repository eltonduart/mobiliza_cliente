import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { People } from "@material-ui/icons";
import { useFormik } from "formik";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from "@material-ui/core/Box";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchMunicipios } from '../../services/municipioService';
import logo from '../../assets/logoC.png';
import Link from "@material-ui/core/Link";
import * as yup from "yup";

import {
  createDistrito,
  updateDistrito,
} from '../../services/distritoService';
import { parseISO, format } from 'date-fns';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  images: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

const validationSchema = yup.object({
  nome: yup
    .string()
    .required("Nome requerido"),
  municipio_id: yup
    .string()
    .required("Município requerido"),
});

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

interface FormDistritoProps {
  data: any
  onSaveSuccess: (data: any) => void;
  onSaveError: (error: any) => void;
  onBack: () => void;
}



export default function FormDistrito({ data, onSaveSuccess, onBack, onSaveError }: FormDistritoProps) {
  const classes = useStyles();
  const [municipios, setMunicipios] = useState<any>();
  const formik = useFormik({
    initialValues: { ...data },
    enableReinitialize: true,
    onSubmit: async (data: any): Promise<void> => {
      delete data.municipio;
      if (data.id) {
        updateDistrito({ ...data }).then((resp) => onSaveSuccess(resp.data)).catch((error) => onSaveError(error));
      } else {
        createDistrito({ ...data }).then((resp) => onSaveSuccess(resp.data)).catch((error) => onSaveError(error));

      }
    },
  });

  useEffect(() => {
    fetchMunicipios('', { nome: '' }).then((resp) => setMunicipios(resp.data));
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.images}>
          <Typography component="h1" variant="h5">
            Distrito
          </Typography>
          <img src={logo} width={100} />
        </div>

        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Distrito"
                name="nome"
                autoFocus
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Município</InputLabel>
                <Select
                  native
                  required
                  label={!formik.values.municipio_id && 'Município'}
                  fullWidth
                  value={formik.values.municipio_id}
                  onChange={formik.handleChange}
                  name='municipio_id'
                  inputProps={{
                    name: 'municipio_id',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {municipios?.map((municipio: any) => {
                    return <option value={municipio.id}>{municipio.nome}</option>
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Salvar
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Voltar
          </Button>
        </form>
      </div>

    </Container>
  );
}
