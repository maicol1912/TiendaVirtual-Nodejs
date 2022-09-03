var axios = require('axios');
var data = JSON.stringify({
    "collection": "producto",
    "database": "tiendaPOS",
    "dataSource": "Cluster0",
    "document": {
        "referencia":1092,
        "nombre":"buso",
        "descripcion":"s",
        "precio":30000,
        "stock":13
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