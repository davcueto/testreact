import React, { useEffect, useState } from 'react';
import "./CharPrice.css";
import Chart from "react-apexcharts";
import { GETPriceEvolutionChart } from '../../services/Dashboard';

const CharPrice = () => {
    
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState({});
    const [data, setData] = useState([]);

    let objOpt = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            tooltipHoverFormatter: function (val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            /*categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
            ],*/
            categories: categories
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val + " (mins)"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val + " per session"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                }
            ]
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    }

    const GETCharData = () => {
        GETPriceEvolutionChart()
            .then((response) => {
                let data = response.data;
                let arrayToData = groupData(data);
                setData(arrayToData);
                let arrayToCategories = getDaysOfMonth(data);
                setCategories(arrayToCategories);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    const groupData = (arrayParam) => {
        let array_1 = [];
        let obj = arrayParam.reduce((rv, x) => {
            (rv[x['sku']] = rv[x['sku']] || []).push(x);
            return rv;
        }, {});
        for (let key in obj) {
            let objIn = {};
            let dataInArray = [];
            objIn.name = obj[key][0].name;
            for (let element of obj[key]) {
                dataInArray.push(element.price);
            }
            objIn.data = dataInArray;
            array_1.push(objIn);
        }
        return array_1;
    }

    const getDaysOfMonth = (arrayParam) => {
        let arrayTemp = [];
        const date = new Date(arrayParam[0].dateExtraction);
        const month = date.toLocaleString('default', { month: 'long' });
        const maxDate = new Date(
            Math.max(
                ...arrayParam.map(element => {
                    return new Date(element.dateExtraction);
                }),
            ),
        );
        const minDate = new Date(
            Math.min(
                ...arrayParam.map(element => {
                    return new Date(element.dateExtraction);
                }),
            ),
        );
        for (let i = minDate.getDate(); i <= maxDate.getDate(); i++) {
            arrayTemp.push(`${i < 10 ? '0' + i : i} ${month.substring(0, 3)}`)
        }
        return arrayTemp;
    }

    useEffect(() => {
        GETCharData();
    }, []);

    useEffect(() => {
        setOptions(objOpt)
    }, [categories]);

    return (
        <>
            <div className='title-chart'>Price Evolution</div>
            <Chart options={options} series={data} type="line" height={350} className="content-charts"/>
        </>
    )
}

export default CharPrice;