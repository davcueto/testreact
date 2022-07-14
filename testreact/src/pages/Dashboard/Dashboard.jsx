import React, { useEffect } from 'react';
import "./Dashboard.css";
import logo from "../../assets/logo_1.png";
import { Grid } from '@mui/material';
import CharPrice from '../../components/CharPrice/CharPrice';
import CharProduct from '../../components/CharProduct/CharProduct';
import TableProducts from '../../components/Products/TableProducts';

const Dashboard = () => {

    return (
        <>
            <div className='content-navbar'>
                <img src={logo} />
            </div>
            <div style={{ padding: '0px 28px' }}>
                <div className='title'>General Perfomance Analysis</div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <CharPrice />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <CharProduct />
                    </Grid>
                </Grid>
                <TableProducts />
            </div>
        </>
    )
}

export default Dashboard;