var axios = require('axios');
var data = JSON.stringify({
    "collection": "venta",
    "database": "tiendaPOS",
    "dataSource": "Cluster0",
    "document": {
        "serie":"1003",
        "productosVendidos":[],
        "subtotal":50000,
        "fechaVenta":"2020/10/12",
        "impuesto":10000,
        "totalVenta":6000,
        "cliente":"Maicol Arcila",
        "vendedor":"Camilo Garcia"
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-lzbcy/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'ZJugFMSsL9KQByAABUuXD9BPccyCdfavpoGIZRYIMO9gbxA0kbfREAPRVJL32dU0',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
