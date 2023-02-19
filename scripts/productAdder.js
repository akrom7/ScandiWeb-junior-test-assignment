"use strict"
import {server} from "./server.js";

document.addEventListener(('DOMContentLoaded'), () => {
    let productType = document.getElementById("productType");
    let dvdForm = document.getElementById("dvd");
    let bookForm = document.getElementById("book");
    let fornitureForm = document.getElementById("furniture")
    let productHidden = document.querySelector("input[name='type']");

    let productTypeValue;
    productType.addEventListener('change', () => {
        productTypeValue = productType.value;
        if (productTypeValue === "DVD") {
            productHidden.value = "DVD";
            dvdForm.style.display = "block";
            
            bookForm.style.display = "none";
            bookForm.value = null;
            
            fornitureForm.style.display = "none";
            fornitureForm.value = null;
        } else if (productTypeValue === "Book") {
            productHidden.value = "Book";
            bookForm.style.display = "block";
            
            dvdForm.style.display = "none";
            dvdForm.value = null;
            
            fornitureForm.style.display = "none";
            fornitureForm.value = null;
        } else if (productTypeValue === "Furniture") {
            productHidden.value = "Furniture";

            fornitureForm.style.display = "block";
            
            dvdForm.style.display = "none";
            dvdForm.value = null;
            
            bookForm.style.display = "none";
            bookForm.value = null;
        } else {
            productHidden.value = null;

            fornitureForm.style.display = "none";
            fornitureForm.value = null;
            
            dvdForm.style.display = "none";
            dvdForm.value = null;
            
            bookForm.style.display = "none";
            bookForm.value = null;
        }
    })

    let btnSave = document.querySelector("#btn-save");
    btnSave.addEventListener('click', (e) =>  {
        e.preventDefault();

        let sku = document.getElementById("sku").value;
        let name = document.getElementById("name").value;
        let price = document.getElementById("price").value;


        if (productTypeValue === "DVD") {
            let size = document.getElementById("size").value;

            fetch(server + "?create&id=" + sku + "&name=" + name + "&price=" + price + "&type=0" + "&size=" + size, {
                method: "GET"
            })
            .then((response) => {
                if (response.ok) {
                    console.log(response)
                }
            })
            .then(data => {
                console.log(data)
            })
        } else if (productTypeValue === "Book") {
            let weight = document.getElementById("weight").value;
            
            fetch(server + "?create" + "&id=" + sku + "&name=" + name + "&price=" + price + "&type=1" + "&weight=" + weight, {
                method: "POST"
            })
            .then((response) => {
                if (response.ok) {
                    return response.json;
                }
            })
            .then((data) => {
                console.log(data)
            })  
        } else if (productTypeValue === "Furniture") {
            let height = document.getElementById("height").value;
            let width = document.getElementById("width").value;
            let length = document.getElementById("length").value;
            
            fetch(server + "?create" + "&id=" + sku + "&name=" + name + "&price=" + price + "&type=2" + "&width=" + width + "&height=" + height + "&length=" + length, {
                method: "POST"
            })
            .then((response) => {
                if (response.ok) {
                    return response.json;
                }
            })
            .then((data) => {
                console.log(data)
            })  
        } else {
            // mazgi bittasini tanla
        }
    })
})