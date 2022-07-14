import clientAxios from "../config/ClientAxios";

export const GETPriceEvolutionChart = async () => {
    return await clientAxios.get('/api/price-evolution-chart/');
};

export const GETShareByProduct = async () => {
    return await clientAxios.get('/api/presence-share-chart/');
};

export const GETProducts = async () => {
    return await clientAxios.get('/api/beer-products/');
};