import React, { useState, useEffect } from 'react';
import { fetchDistrito, removeDistrito } from '../../services/distritoService';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Form from './form';
import { useSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { id } from 'date-fns/locale';
import { useCallback } from 'react';
import { fetchOcorrencia, removeOcorrencia } from '../../services/ocorrenciaService';
import { useLocation } from '@reach/router';
const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    filter: {
        marginBottom: 10
    },

});

export default function DataTable() {
    const [rows, setRows] = useState<any[]>([]);
    const [rowsFiltered, setRowsFiltered] = useState<any[]>([]);
    const classes = useStyles();
    const [view, setView] = useState<'EDIT' | 'CREATE' | 'LIST'>('LIST');
    const [row, setRow] = useState<any>();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState<string>();
    const location = useLocation();


    useEffect(() => {
        setRowsFiltered(() => {
            const filteredData = rows.filter((r) => (r.descricao as string).toUpperCase().includes(filter?.toUpperCase() || ''));
            return filteredData;
        })
    }, [filter, rows])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = useCallback(
        () => {
            removeOcorrencia(row.id).then(() => {
                setRows((oldState: any
                ) => oldState.filter((r: any) => r.id !== row.id))
                setOpen(false);
            });
        },
        [row],
    );

    const iconClasses = makeStyles(() => {
        return {
            successIcon: {
                color: '#001A5F',
            },
            errorIcon: {
                color: '#c21f0d',
            },
        }
    })();

    useEffect(() => {
        fetchOcorrencia('', { pessoa_id: (location.state as any).pessoa_id }).then((respD) => setRows(respD.data)).catch((error) => {
            enqueueSnackbar(error.message, {
                variant: 'error', transitionDuration: {
                    exit: 500,
                }
            });
        });
    }, [enqueueSnackbar]);

    if (view === 'LIST')
        return (
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Exclusão de registro"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deseja realmente excluir este registro?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Não
                        </Button>
                        <Button onClick={handleDelete} color="primary" autoFocus>
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.filter}
                        name="search"
                        variant="outlined"
                        fullWidth
                        id="Pesquisar"
                        label="Pesquisar"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </Grid>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Previsão</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsFiltered?.map((row: any) => {
                                console.log(row);
                                return <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.descricao}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(row.dta_previsao)}
                                    </TableCell>
                                    <TableCell align="right">

                                        <IconButton aria-label="edit" className={iconClasses.successIcon} onClick={() => {
                                            setRow(row);
                                            setView('EDIT');
                                        }}>
                                            <EditIcon />
                                        </IconButton>


                                        <IconButton aria-label="delete" color="inherit" className={iconClasses.errorIcon} onClick={() => {
                                            setRow(row);
                                            setOpen(true);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            }

                            )}
                        </TableBody>
                    </Table>
                    <TableCell align="right">
                        <Button variant="contained" color="primary" aria-label="edit" onClick={() => {
                            setRow({
                                descricao: null,
                                dta_previsao: null,
                                concluida: null,
                            });
                            setView('CREATE');
                        }}>
                            Novo Cadastro
                        </Button>
                    </TableCell>
                </TableContainer>
            </>
        );
    if (view === 'EDIT') {
        return <Form data={row} onSaveSuccess={(data) => {
            enqueueSnackbar('Ocorrencia alterada com sucesso', {
                variant: 'success', transitionDuration: {
                    exit: 500,
                }
            });
            setRows((oldRows: any) => {
                console.log({ oldRows });
                return oldRows.map((row: any) => {
                    if (row.id === data.id) {
                        return data;
                    }
                    return row
                })
            })
            setView('LIST');
        }} onBack={() => setView('LIST')}
            onSaveError={(error) => {
                enqueueSnackbar(error.message, {
                    variant: 'error', transitionDuration: {
                        exit: 500,
                    }
                })
            }
            }
        />
    }

    if (view === 'CREATE') {
        return <Form data={row} onSaveSuccess={(data) => {
            enqueueSnackbar('Ocorrencia inserida com sucesso', {
                variant: 'success', transitionDuration: {
                    exit: 500,
                }
            });
            setRows((oldRows: any) => {
                return [...oldRows, data];
            });
            setView('LIST');
        }}
            onSaveError={(error) => {
                enqueueSnackbar(error.message, {
                    variant: 'error', transitionDuration: {
                        exit: 500,
                    }
                })
            }
            }
            onBack={() => setView('LIST')} />
    }

    return <></>;
}
