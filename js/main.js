let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let categoryInput = document.getElementById("category");
let descriptionInput = document.getElementById("description");
let msg = document.querySelector(".empty");

let editIndex = null;

let productContainer = [];
 

window.onload = function() {
    updateCounter();
};

if (localStorage.getItem("products") != null) {
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct(productContainer)
}
 
//ADD
function addProduct() {
    if (editIndex === null) {
        
        let product = {
            namee: productNameInput.value,
            price: productPriceInput.value,
            category: categoryInput.value,
            description: descriptionInput.value
        };

        productContainer.push(product);
    } else {
        
        productContainer[editIndex].namee = productNameInput.value;
        productContainer[editIndex].price = productPriceInput.value;
        productContainer[editIndex].category = categoryInput.value;
        productContainer[editIndex].description = descriptionInput.value;

        editIndex = null; 
        document.getElementById("addProduct").innerHTML = 
            '<i class="fa-solid fa-plus"></i> Add Product';
    }

    
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearForm();
    displayProduct(productContainer);
    updateCounter();
}

//CLEAR
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";
}

//DISPLAY
function displayProduct(arr) {
    let products = ``;
    for (let i = 0; i < arr.length; i++) {
        products += `
<div class="col-md-3 mb-3">
            <div class="card shadow-sm h-100 d-flex flex-column justify-content-between">
                <div class="card-body">
                    <h5 class="card-title">${arr[i].namee}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${arr[i].category}</h6>
                    <p class="card-text">${arr[i].description}</p>
                    <span class="badge bg-primary mb-4">$${arr[i].price}</span>

                    
                            <button onclick="editProduct(${i})" class="ebtn btn btn-warning btn-sm ">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                           </button>
                              <button onclick="deleteProduct(${i})" class="dbtn btn btn-danger btn-sm ">
                                 <i class="fa-solid fa-trash"></i> Delete
                                </button>
                
                </div>

                                
            </div>
        </div>
        `;
    }
    document.getElementById("productsList").innerHTML = products;
   if (arr.length === 0) {
        msg.style.display = "block";   
    } else {
        msg.style.display = "none";   
    }
}
  
//DELETE
function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
    updateCounter(); 
}

//SEARCH BY NAME
function searchProduct(term){
     var matchedProduct = [];
     for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].namee.toLowerCase().includes(term.toLowerCase())){
                matchedProduct.push(productContainer[i]);
               
                
        }
     }
     displayProduct(matchedProduct);
}

//SEARCH BY CATEGORY
function filterByCategory(category) {
    if (category === "all") {
        displayProduct(productContainer); 
    } else {
        let filtered = productContainer.filter(p => p.category === category);
        displayProduct(filtered);
    }
}
//EDIT
function editProduct(index) {
    
    productNameInput.value = productContainer[index].namee;
    productPriceInput.value = productContainer[index].price;
    categoryInput.value = productContainer[index].category;
    descriptionInput.value = productContainer[index].description;

    editIndex = index;
    document.getElementById("addProduct").innerHTML = 
        '<i class="fa-solid fa-pen-to-square"></i> Update Product';
}

//COUNTER
function updateCounter() {
    document.getElementById("counter").textContent = productContainer.length;
}


//MODE
document.getElementById("mode").addEventListener("click", function () {
    document.body.classList.toggle("dark");   
    document.body.classList.toggle("light");  

   
    let icon = this.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon"); 
        icon.classList.add("fa-sun");     
    } else {
        icon.classList.remove("fa-sun");  
        icon.classList.add("fa-moon");   
    }
});
