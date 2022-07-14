import React, { useEffect, useState } from 'react';
import "./CharProduct.css";
import Chart from "react-apexcharts";
import { GETShareByProduct } from '../../services/Dashboard';

const CharProduct = () => {

    const [options, setOptions] = useState({});
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    let objOpt = {
        chart: {
            width: 380,
            type: 'pie',
        },
        //labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    const GETCharData = () => {
        GETShareByProduct()
            .then((response) => {
                let data = response.data;
                let arrayToData = groupData(data);
                setData(arrayToData);
                let arrayToLabels = getLabels(data);
                setLabels(arrayToLabels);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    const groupData = (arrayParam) => {
        let arrayTemp = [];
        for (let element of arrayParam) {
            arrayTemp.push(element.presenceShare);
        }
        return arrayTemp;
    }

    const getLabels = (arrayParam) => {
        let arrayTemp = [];
        for (let element of arrayParam) {
            arrayTemp.push(element.name);
        }
        return arrayTemp;
    }

    useEffect(() => {
        GETCharData();
    }, []);

    useEffect(() => {
        setOptions(objOpt)
    }, [labels]);

    return (
        <>
            <div className='title-chart'>Presence Share by Product</div>
            <Chart options={options} series={data} type="pie" height={350} className="content-charts"/>
        </>
    )
}

export default CharProduct;