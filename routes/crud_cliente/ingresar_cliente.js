var axios = require('axios');
var data = JSON.stringify({
    "collection": "cliente",
    "database": "tiendaPOS",
    "dataSource": "Cluster0",
    "document": {
        "cedula":"1007348950",
        "nombre":"Maicol Arcila",
        "tel":"3006567975",
        "ubicacion": { center: [51.505, -0.09],  zoom: 13},
        "totalComprado":150000,
        "historialCompras":["camiseta","buso"]
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