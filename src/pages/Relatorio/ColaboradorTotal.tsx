import React, { useState, useEffect } from 'react';
import { fetchColaborador, fetchPessoa } from '../../services/pessoaService';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { resolveTipoUsuario } from '../../helpers/resolveTipoUsuario';
import { groupBy } from 'lodash';
const useStyles = makeStyles({
    table: {
        minWidth: 650
    },

});

export default function ColaboradorTotal() {
    const [rows, setRows] = useState<any>([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchColaborador().then((resp) => {
            const rowUpdated = groupBy(resp.data, (r: any) => r.pessoa_user_nome);
            console.log({ rowUpdated })
            const parsedData = Object.keys(rowUpdated).map((key: string) => {
                console.log({ key })
                return { pessoa_user_nome: key, quantidade: rowUpdated[key].length }
            });
            console.log({ parsedData });
            return setRows(parsedData);
        }).catch((error) => {
            enqueueSnackbar(error.message, {
                variant: 'error', transitionDuration: {
                    exit: 500,
                }
            });
        });
    }, [enqueueSnackbar]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Colaborador</TableCell>
                            <TableCell>Quantidade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row: any) => {
                            console.log(row);
                            return <TableRow key={row.pessoa_user_nome}>
                                <TableCell component="th" scope="row">
                                    {row.pessoa_user_nome}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.quantidade}
                                </TableCell>
                            </TableRow>
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
