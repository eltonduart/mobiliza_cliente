import React, { useState, useEffect } from 'react';
import { fetchPessoa } from '../../services/pessoaService';
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

export default function MunicipioTotal() {
    const [rows, setRows] = useState<any>([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchPessoa({ nome: '' }).then((resp) => {
            const rowUpdated = groupBy(resp.data, (r) => r.municipio?.nome);
            const parsedData = Object.keys(rowUpdated).map((key: string) => {
                return { municipio: key, quantidade: rowUpdated[key].length }
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
                            <TableCell>Municipio</TableCell>
                            <TableCell>Quantidade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row: any) => {
                            console.log(row);
                            return <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.municipio}
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
