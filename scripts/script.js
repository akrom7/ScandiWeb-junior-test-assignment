"use strict"
import {server} from "./server.js";

document.addEventListener(('DOMContentLoaded'), () => {
    let selectedProducts = [];

    function showProducts() {
        let productWrapper = document.querySelector(".products");
        fetch(server + "?product", {
            // mode: "no-cors",
            method: "GET"
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            if (data != undefined && data != null) {

                productWrapper.innerHTML = "";
                console.log(data);
                if (data.result != null && data.result != undefined) {
                    data.result.forEach(product => {
                        let code = 
                        `<label class="product form-check-label p-3 border rounded" for="${product.id}">
                            <input class="form-check-input delete-checkbox" type="checkbox" value="" id="${product.id}" />
                    
                            <div class="content">`
                        if (product.id != null) {
                            code += `<span>${product.id}</span>`
                        } 
                        
                        // if (product.type != null) {
                        //     if (product.type == 0) {
                        //         code += `<span>ACME DISC</span>`
                        //     } else if (product.type == 1) {
    
                        //     } else if (product.type == 2)
                        // }
    
                        if (product.name != null) {
                            code += `<span>${product.name}</span>`
                        }
    
                        if (product.price != null) {
                            code += `<span>${product.price}$</span>`
                        }
    
                        if (product.size != null) {
                            code += `<span>Size: ${product.size} MB</span>`
                        } 
    
                        if (product.weight != null) {
                            code += `<span>Weight: ${product.weight} KG</span>`
                        } 
    
                        if (product.width != null && product.height != null && product.length != null) {
                            code += `<span>Dimension: ${product.width} x ${product.height} x ${product.length} </span>`
                        } 
    
                        code += `</div> 
                                </label>`
    
                        productWrapper.innerHTML += code;
    
    
                        let checkedBox = document.querySelectorAll("input.form-check-input");
                        if (checkedBox != undefined && checkedBox != null) {
                            checkedBox.forEach((item) => {
                                item.addEventListener(('click'), ()=> {
                                    if (item.checked) {
                                        // add to list
                                        selectedProducts.push(item.id);
                                    } else {
                                        // remove from list
                                        selectedProducts.forEach((element, index) => {
                                            if (element === item.id) {
                                                selectedProducts.splice(index, index+1);
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
            }
        })
    }
    showProducts();

    let deleteBtn = document.querySelector("#delete-product-btn");
    deleteBtn.addEventListener(('click'), () => {
        console.log("clicked")
        console.log(selectedProducts)
        selectedProducts.forEach(productId => {
            fetch(server + "?del&id=" + productId, {
                method: "POST"
            })
            .then(response => response.json)
            .then((data) => {
                document.getElementById(productId).remove();
                showProducts();
                console.log(data);
            })
        })
    })


    
    
})