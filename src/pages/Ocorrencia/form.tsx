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
import { fetchDistrito } from '../../services/distritoService';
import logo from '../../assets/logoC.png';
import Link from "@material-ui/core/Link";
import * as yup from "yup";

import {
  createOcorrencia,
  updateOcorrencia,
} from '../../services/ocorrenciaService';
import { parseISO, format } from 'date-fns';
import { useLocation } from "@reach/router";

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
  descricao: yup
    .string()
    .required("Descricao requerida")
    .typeError("A descrição é requerida."),
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

interface FormPessoaProps {
  data: any
  onSaveSuccess: (data: any) => void;
  onSaveError: (error: any) => void;
  onBack: () => void;
}



export default function FormPessoa({ data, onSaveSuccess, onBack, onSaveError }: FormPessoaProps) {
  const classes = useStyles();
  const location = useLocation();


  const formik = useFormik({
    initialValues: { ...data },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: validationSchema,

    onSubmit: async (data: any): Promise<void> => {
      console.log(data);
      delete data.created_at;
      delete data.updated_at;
      if (data.id) {
        updateOcorrencia({ ...data }).then((resp) => onSaveSuccess(resp.data)).catch((error) => onSaveError(error));
      } else {
        createOcorrencia({ ...data, pessoa_id: (location.state as any)?.pessoa_id }).then((resp) => onSaveSuccess(resp.data)).catch((error) => onSaveError(error));
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.images}>
          <Typography component="h1" variant="h5">
            Ocorrencia
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
                id="descricao"
                label="Descrição"
                name="descricao"
                autoFocus
                value={formik.values.descricao}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.descricao)}
                helperText={formik.errors.descricao}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="dta_previsao"
                label="Previsao"
                fullWidth
                required
                type="date"
                name="dta_previsao"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values?.dta_previsao && format(parseISO(formik.values.dta_previsao), 'yyyy-MM-dd')}
                onChange={formik.handleChange}
                error={formik.touched.dta_previsao && Boolean(formik.errors.dta_previsao)}
                helperText={formik.touched.dta_previsao && formik.errors.dta_previsao}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                <Select
                  native
                  label="Status"
                  required
                  fullWidth
                  value={formik.values.concluida}
                  onChange={formik.handleChange}
                  inputProps={{
                    name: 'concluida',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>Concluída</option>
                  <option value={2}>Não Concluída</option>
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
