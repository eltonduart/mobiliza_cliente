import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { fetchMunicipios } from "../../services/municipioService";
import { fetchDistrito } from "../../services/distritoService";
import logo from "../../assets/logoC.png";
import * as yup from "yup";

import {
  createPessoa,
  findPessoaCPF,
  updatePessoa,
} from "../../services/pessoaService";
import { parseISO, format } from "date-fns";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const validationSchema = yup.object({
  nome: yup
    .string()
    .required("Nome requerido")
    .typeError("O nome completo deve ser preenchido."),
  apelido: yup
    .string()
    .required("Apelido requerido")
    .typeError("O apelido deve ser preenchido."),
  endereco: yup
    .string()
    .required("Endereço requerido")
    .typeError("O endereço deve ser preenchido."),
  telefone: yup
    .string()
    .required("Telefone requerido")
    .typeError("O telefone deve ser preenchido."),
  dta_nascimento: yup
    .string()
    .required("Data de Nascimento requerido")
    .typeError("A data de nascimento deve ser preenchido."),
  mae: yup
    .string()
    .required("Mãe requerido")
    .typeError("O nome da mãe deve ser preenchido."),
  cpf: yup
    /*  username: Yup.string().test('checkEmailUnique', 'This email is already registered.', value =>
      fetch(`is-email-unique/${email}`).then(async res => {
          const { isEmailUnique } = await res.json()
    
          return isEmailUnique
      }),
    ),*/
    .string()
    .required("CPF requerido")
    .test(
      "checkCPFUnique",
      "Este CPF já está registrado",
      async (value: any) => {
        if (!value) return Promise.resolve(true);
        const resp = await findPessoaCPF(value);
        return !resp?.id;
      }
    )
    .typeError("O número do CPF deve ser preenchido."),
  tipo_usuario: yup
    .string()
    .required("Tipo Usuário requerido")
    .typeError("O tipo de usuário deve ser preenchido."),
  status: yup
    .string()
    .required("Status requerido")
    .typeError("O status deve ser preenchido."),
  municipio_id: yup
    .string()
    .required("Município requerido")
    .typeError("O município deve ser selecionado."),
  distrito_id: yup
    .string()
    .required("Distrito requerido")
    .typeError("O distrito deve ser selecionado."),
  bairro: yup
    .string()
    .required("Bairro requerido")
    .typeError("O bairro deve ser preenchido."),
});

interface FormPessoaProps {
  data: any;
  onSaveSuccess: (data: any) => void;
  onSaveError: (error: any) => void;
  onBack: () => void;
}

export default function FormPessoa({
  data,
  onSaveSuccess,
  onBack,
  onSaveError,
}: FormPessoaProps) {
  const classes = useStyles();
  const [municipios, setMunicipios] = useState<any>();
  const [distritos, setDistritos] = useState<any>();
  const [filteredDistritos, setfilteredDistritos] = useState<any>();
  const [selectedMunicipio, setselectedMunicipio] = useState(data.municipio_id);
  const [selectedTipoU, setselectedTipoU] = useState(Number(data.tipo_usuario));
  const formik = useFormik({
    initialValues: { ...data },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: validationSchema,

    onSubmit: async (data: any): Promise<void> => {
      delete data.owner_user_id;
      delete data.created_at;
      delete data.updated_at;
      delete data.municipio;
      if (data.id) {
        updatePessoa({ ...data })
          .then((resp) => onSaveSuccess(resp.data))
          .catch((error) => onSaveError(error));
      } else {
        createPessoa({ ...data })
          .then((resp) => onSaveSuccess(resp.data))
          .catch((error) => onSaveError(error));
      }
    },
  });

  useEffect(() => {
    fetchMunicipios("", { nome: "" }).then((resp) => setMunicipios(resp.data));
    fetchDistrito("", { nome: "" }).then((respD) => setDistritos(respD.data));
  }, []);

  useEffect(() => {
    if (selectedMunicipio) {
      const newdistritos: any = distritos?.filter(
        (distrito: any) => distrito.municipio_id === selectedMunicipio
      );
      console.log({ newdistritos, distritos });
      setfilteredDistritos(newdistritos);
    }
  }, [distritos, selectedMunicipio]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.images}>
          <Typography component="h1" variant="h5">
            Pessoa
          </Typography>
          <img src={logo} width={100} alt="Mobiliza" />
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
                id="cpf"
                label="CPF"
                name="cpf"
                autoFocus
                value={formik.values.cpf}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.cpf)}
                helperText={formik.errors.cpf}
                onBlur={() => formik.validateField("cpf")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="fname"
                  name="nome"
                  variant="outlined"
                  required
                  fullWidth
                  id="nome"
                  label="Nome completo"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  error={formik.touched.nome && Boolean(formik.errors.nome)}
                  helperText={formik.touched.nome && formik.errors.nome}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="apelido"
                variant="outlined"
                required
                fullWidth
                id="apelido"
                label="Apelido"
                value={formik.values.apelido}
                onChange={formik.handleChange}
                error={formik.touched.apelido && Boolean(formik.errors.apelido)}
                helperText={formik.touched.apelido && formik.errors.apelido}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="titulo"
                label="Título de Eleitor"
                name="titulo"
                value={formik.values.tiulo}
                onChange={formik.handleChange}
                error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                helperText={formik.touched.titulo && formik.errors.titulo}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zona_eleitoral"
                label="Zona Eleitoral"
                name="zona_eleitoral"
                value={formik.values.zona_eleitoral}
                onChange={formik.handleChange}
                error={
                  formik.touched.zona_eleitoral &&
                  Boolean(formik.errors.zona_eleitoral)
                }
                helperText={
                  formik.touched.zona_eleitoral && formik.errors.zona_eleitoral
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="secao_eleitoral"
                label="Seção Eleitoral"
                name="secao_eleitoral"
                value={formik.values.secao_eleitoral}
                onChange={formik.handleChange}
                error={
                  formik.touched.secao_eleitoral &&
                  Boolean(formik.errors.secao_eleitoral)
                }
                helperText={
                  formik.touched.secao_eleitoral &&
                  formik.errors.secao_eleitoral
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mae"
                label="Mãe"
                name="mae"
                value={formik.values.mae}
                onChange={formik.handleChange}
                error={formik.touched.mae && Boolean(formik.errors.mae)}
                helperText={formik.touched.mae && formik.errors.mae}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="dta_nascimento"
                label="Data de Nascimento"
                fullWidth
                required
                type="date"
                name="dta_nascimento"
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  formik.values?.dta_nascimento &&
                  format(parseISO(formik.values.dta_nascimento), "yyyy-MM-dd")
                }
                onChange={formik.handleChange}
                error={
                  formik.touched.dta_nascimento &&
                  Boolean(formik.errors.dta_nascimento)
                }
                helperText={
                  formik.touched.dta_nascimento && formik.errors.dta_nascimento
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="fendereco"
                  name="endereco"
                  variant="outlined"
                  required
                  fullWidth
                  id="endereco"
                  label="Endereço/Nº"
                  value={formik.values.endereco}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endereco && Boolean(formik.errors.endereco)
                  }
                  helperText={formik.touched.endereco && formik.errors.endereco}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="fbairro"
                  name="bairro"
                  variant="outlined"
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro/Comunidade"
                  value={formik.values.bairro}
                  onChange={formik.handleChange}
                  error={formik.touched.bairro && Boolean(formik.errors.bairro)}
                  helperText={formik.touched.bairro && formik.errors.bairro}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Município
                </InputLabel>
                <Select
                  native
                  required
                  label={!formik.values.municipio_id && "Município"}
                  fullWidth
                  value={formik.values.municipio_id}
                  onChange={(value) => {
                    formik.handleChange(value);
                    setselectedMunicipio(Number(value.target.value));
                  }}
                  name="municipio_id"
                  inputProps={{
                    name: "municipio_id",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {municipios?.map((municipio: any) => {
                    return (
                      <option value={municipio.id}>{municipio.nome}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Distrito
                </InputLabel>
                <Select
                  native
                  required
                  label={!formik.values.distrito_id && "Distrito"}
                  fullWidth
                  value={formik.values.distrito_id}
                  onChange={formik.handleChange}
                  name="distrito_id"
                  inputProps={{
                    name: "distrito_id",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {filteredDistritos?.map((distrito: any) => {
                    return <option value={distrito.id}>{distrito.nome}</option>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="ftelefone"
                name="telefone"
                variant="outlined"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                value={formik.values.telefone}
                onChange={formik.handleChange}
                error={
                  formik.touched.telefone && Boolean(formik.errors.telefone)
                }
                helperText={formik.touched.telefone && formik.errors.telefone}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fwhats"
                name="whatsapp"
                variant="outlined"
                fullWidth
                id="whatsapp"
                label="Whatsapp"
                value={formik.values.whatsapp}
                onChange={formik.handleChange}
                error={
                  formik.touched.whatsapp && Boolean(formik.errors.whatsapp)
                }
                helperText={formik.touched.whatsapp && formik.errors.whatsapp}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fface"
                name="facebook"
                variant="outlined"
                fullWidth
                id="facebook"
                label="Facebook"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
                helperText={formik.touched.facebook && formik.errors.facebook}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="finstagran"
                  name="instagran"
                  variant="outlined"
                  fullWidth
                  id="intagran"
                  label="Instagran"
                  value={formik.values.instagran}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.instagran && Boolean(formik.errors.instagran)
                  }
                  helperText={
                    formik.touched.instagran && formik.errors.instagran
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Tipo de Usuário
                </InputLabel>
                <Select
                  native
                  label="Tipo de Usuário"
                  required
                  fullWidth
                  value={formik.values.tipo_usuario}
                  onChange={(value) => {
                    formik.handleChange(value);
                    setselectedTipoU(Number(value.target.value));
                  }}
                  inputProps={{
                    name: "tipo_usuario",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>Administrador</option>
                  <option value={2}>Coordenador</option>
                  <option value={3}>Mobilizador</option>
                  <option value={4}>Eleitor</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Status
                </InputLabel>
                <Select
                  native
                  label="Status"
                  required
                  fullWidth
                  value={formik.values.status}
                  onChange={(value) => {
                    formik.handleChange(value);
                    setselectedTipoU(Number(value.target.value));
                  }}
                  inputProps={{
                    name: "status",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>Político</option>
                  <option value={2}>Não Político</option>
                </Select>
              </FormControl>
            </Grid>
            {[1, 2].includes(selectedTipoU) && (
              <Grid item xs={12} sm={12}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </FormControl>
              </Grid>
            )}
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
