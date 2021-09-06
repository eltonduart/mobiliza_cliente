import React, { FC, ReactElement, useState, useEffect } from "react";
import { fetchPessoa, removePessoa } from '../services/pessoaService';
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/logoC.png';
import { useSnackbar } from 'notistack';


// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";
import { useMemo } from "react";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<any>([]);

  const total = useMemo(() => {
    return rows.length;
  }, [rows])

  const mobilizadores = useMemo(() => {
    return rows.filter((row: any) => row.tipo_usuario == 3).length;
  }, [rows])

  const eleitores = useMemo(() => {
    return rows.filter((row: any) => row.tipo_usuario == 4).length;
  }, [rows])

  const coordenadores = useMemo(() => {
    return rows.filter((row: any) => row.tipo_usuario == 2).length;
  }, [rows])

  const administradores = useMemo(() => {
    return rows.filter((row: any) => row.tipo_usuario == 1).length;
  }, [rows])

  useEffect(() => {
    fetchPessoa({ nome: '' }).then((resp) => setRows(resp.data)).catch((error) => {
      enqueueSnackbar(error.message, {
        variant: 'error', transitionDuration: {
          exit: 500,
        }
      });
    });
  }, [enqueueSnackbar]);
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_HOME} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total
              </Typography>
              <Typography variant="h5" component="h2">
                {total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Eleitores
              </Typography>
              <Typography variant="h5" component="h2">
                {eleitores}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Mobilizadores
              </Typography>
              <Typography variant="h5" component="h2">
                {mobilizadores}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Coordenadores
              </Typography>
              <Typography variant="h5" component="h2">
                {coordenadores}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Administradores
              </Typography>
              <Typography variant="h5" component="h2">
                {administradores}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
