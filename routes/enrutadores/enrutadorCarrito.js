const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const producto = require('../Models/productoModel');

router.get('/listar',(req,res)=>{
 producto.find()




let carrito = []
let body = document.querySelector(".contenedor-carrito")

function guardarCookie() {
    document.cookie = fetch(`https://fakestoreapi.com/products`)
    .then(datos => datos.json())
    .then(datosJson =>
        llenarTabla(datosJson))
    }
guardarCookie()    

function listarProductos() {
    fetch(`https://fakestoreapi.com/products`)
        .then(datos => datos.json())
        .then(datosJson =>
            llenarTabla(datosJson))
}

function llenarTabla(datosJson){
    console.log(datosJson);
    let divOculto = document.getElementById("contenedores")
    divOculto.style.display="inline-block"
  let div = document.querySelector('#div-principal');
  div.innerHTML = '';
  for (let key of datosJson){
      div.innerHTML += `
      <div id="contenedores" style="width: 18rem;">
            <img class="card-img-top" src="${key.image}" id="image"">
            <div class="card-body">
                <h5 class="card-title">${key.title}</h5><br>
                <h9 id="card-id">${key.id}</h9>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" id="precio">${key.price}$</li>
                <li class="list-group-item">Categoria: ${key.category}</li>
            </ul>
            <div class="card-body">
                <button id="agregar-carrito">Agregar al carrito</button>
            </div>
        </div>
      `
      prepararButton()
    }
}


function buscarProducto() {
    let idProducto = document.getElementById("input-id").value;
    if(idProducto.length>0){
    if(idProducto<=20 && idProducto>0){
    fetch(`https://fakestoreapi.com/products/${idProducto}`)
        .then(dato => dato.json())
        .then(datoJson =>
            pintarProducto(datoJson))
    }
    else{
        alert("no coloco un id valido")
    }
    }
    else{
        alert("no ha colocado ningun id ")
    }

}

function pintarProducto(datoJson){
    let divOculto = document.getElementById("contenedores")
    divOculto.style.display="inline-block"
    let div = document.querySelector('#div-principal');
    div.innerHTML = '';
        div.innerHTML = `
        <div id="contenedores" style="width: 18rem;">
              <img class="card-img-top" src="${datoJson.image}" id="image">
              <div class="card-body">
                  <h5 class="card-title">${datoJson.title}</h5><br>
                  <h9 id="card-id">${datoJson.id}</h9>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item" id="precio">${datoJson.price}$</li>
                  <li class="list-group-item" >Categoria: ${datoJson.category}</li>
              </ul>
              <div class="card-body">
                  <button id="agregar-carrito" onclick="llamarButton()">Agregar al carrito</button>
              </div>
          </div>
        `
        prepararButton()
}


function prepararButton(){
const clickButton = document.querySelectorAll("#agregar-carrito");
clickButton.forEach(btn =>{
    btn.addEventListener('click',agregarCarritoItem)
})
}

function agregarCarritoItem(e){
    const button = e.target;
    const item = button.closest("#contenedores")
    const itemTitle = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector("#precio").textContent;
    const itemImage = item.querySelector(".card-img-top").src;
    const itemId = item.querySelector("#card-id").textContent
    
    const newItem = {
        id:itemId,
        titulo:itemTitle,
        precio:itemPrice,
        imagen:itemImage,
        cantidad:1
    }
    agregarCarrito(newItem)
}

function agregarCarrito(newItem){
    const inputCambiar = body.getElementsByClassName("cantidad-carrito")

    for(let i = 0; i<carrito.length;i++){
        if(carrito[i].id === newItem.id){
           carrito[i].cantidad ++;
           const inputValor = inputCambiar[i]
           inputValor.value++;
           totalCarrito()
           return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito(){
    body.innerHTML= ""
    carrito.map(item=>{
        const contenedorItem = document.createElement("div")
        contenedorItem.classList.add("contenedor-item")
        const content = `
        <div class="contenedor-item">
            <div class="div-image"><img class="image-carrito" src="${item.imagen}"></div>
              <div class="div-title-tamaño-2">
              <h10>${item.titulo}</h10><br>
              <p id="card-id">${item.id}</p>
            </div>
            <div class="div-precio-tamaño">
              <h5 class="precio-carrito">${item.precio}</h5>
            </div>
              <div class="div-input-eliminar"><input class="cantidad-carrito" type="number" min=1 value="${item.cantidad}">
              <button class="button-eliminar">X</button>
            </div>
          </div>
            `
        contenedorItem.innerHTML = content
        body.appendChild(contenedorItem)

        contenedorItem.querySelector(".button-eliminar").addEventListener('click',removeItem)
        contenedorItem.querySelector(".cantidad-carrito").addEventListener("change",sumCantidad)
    })
    totalCarrito()
}

function totalCarrito(){
 let total = 0;
 const itemTotal = document.querySelector("#carritoTotal")
 carrito.forEach((item) =>{
    const precio = Number(item.precio.replace("$",""))
    total = total + precio * item.cantidad
})

itemTotal.innerHTML=total.toFixed(2);
addLocalStorage()
}

function removeItem(event){
  
    const buttonEliminar = event.target;
    const contenedorItem = buttonEliminar.closest(".contenedor-item")
    const id = contenedorItem.querySelector("#card-id").textContent;
    for(let i = 0; i<carrito.length;i++){
        if(carrito[i].id === id){
            carrito.splice(i,1)
        }
    }
    contenedorItem.remove()
    
    refrescarPagina()
    totalCarrito()
}

function sumCantidad(event){
    const suma = event.target
    const itemContenedor = suma.closest(".contenedor-item")
    const id = itemContenedor.querySelector("#card-id").textContent;
    carrito.forEach(item=>{
        if(item.id === id){
        suma.value < 1 ? (suma.value = 1) : suma.value;
        item.cantidad = suma.value
        totalCarrito()
    }    
    })
}
function addLocalStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem("carrito"))
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

function refrescarPagina(){
    location.reload()
}

function abrirModal(){
    const modalOculta = document.querySelector(".cuadro-modal")
    modalOculta.style.display = 'block';
}
function cerrarModal(){
    const modalOculta = document.querySelector(".cuadro-modal")
    modalOculta.style.display = 'none';
}

})


module.exports= router;
