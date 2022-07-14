import React, { useEffect, useState } from 'react';
import "./TableProducts.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { GETProducts } from '../../services/Dashboard';

const TableProducts = () => {

    const [dataTable, setDataTable] = useState([]);

    const GETTableData = () => {
        GETProducts()
            .then((response) => {
                let data = response.data;
                data = data.map((element, index) => {
                    var obj = Object.assign({}, element);
                    obj.backgroud = index % 2 ? true : false;
                    obj.isNegative = element.persistence < 0 ? true : false;
                    return obj;
                });
                console.log(data)
                setDataTable(data);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    useEffect(() => {
        GETTableData();
    }, []);

    return (
        <>
            <div className='title-table'>Comparative Analysis</div>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='content-header-table'>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center" className='label-header-table'>Nombre</TableCell>
                            <TableCell align="center" className='label-header-table'>SKU</TableCell>
                            <TableCell align="center" className='label-header-table'>% Presencia</TableCell>
                            <TableCell align="center" className='label-header-table'>Av. Price</TableCell>
                            <TableCell align="center" className='label-header-table'>Av. Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataTable.map((row, index) => (
                                <TableRow key={index} className={row.backgroud ? 'content-row-backgroud' : ''}>
                                    <TableCell align="center">
                                        <img src={row.productImage} className='content-img'/>
                                    </TableCell>
                                    <TableCell align="center" className='label-rows'>{row.name}</TableCell>
                                    <TableCell align="center" className='label-rows'>{row.sku}</TableCell>
                                    <TableCell align="center" className={row.isNegative ? 'label-presencia-negative' : 'label-presencia-positive'}>{row.persistence}%</TableCell>
                                    <TableCell align="center" className='label-rows'>${row.averagePrice}</TableCell>
                                    <TableCell align="center" className='label-rows'>{row.averagePosition}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableProducts;