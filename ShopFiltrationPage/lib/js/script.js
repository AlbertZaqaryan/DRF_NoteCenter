//Add filtration panel boxes
function filtrationPanelBoxes(categoryName, res) {

    parametersToAdd = [];

    const filtrationPanel = document.querySelector(".main__filtration");

    document.querySelectorAll(".main__filtration > *:not(.main__filtration__product_name_box, .main__filtration__price_box)").forEach(e => e.remove());
        
    res.forEach(category => {
        
        if(category.name.toLowerCase() == categoryName.toLowerCase()) {

            category.products.forEach(product => {
                        
                const filtered = Object.keys(product).filter(key => key.toLowerCase() != "productname" && key.toLowerCase() != "img" && key.toLowerCase() != "parameters" && typeof product[key] != "number")
                    
                Object.keys(product.parameters[0]).forEach(key => !parametersToAdd.includes(key) ? parametersToAdd.push(key) : false);
                        
                filtered.forEach(param => !parametersToAdd.includes(param) ? parametersToAdd.push(param) : false);
            })
                
        }    
    })

    parametersScope = {
        "details": [],
        "parameters": []
    }

    parametersScopeFunc(categoryName, res);

    parametersToAdd.forEach(key => {

        if(key == "colors") {
            filtrationPanel.innerHTML += 
            `
            <div class="main__filtration__parameters_box" id="${key}">
                <h2>${key}</h2>

                <div class="main__filtration__parameters"></div>
            </div>
            `
        }
        else {
            filtrationPanel.innerHTML += 
            `
            <div class="main__filtration__parameters_box" id="${key}">
                <h2>${key}</h2>

                <div class="main__filtration__parameters"></div>
            </div>
            `
        }
    })

}

let parametersToAdd = [];

let parametersScope = {
    "details": [],
    "parameters": []
}

function parametersScopeFunc(categoryName, res) {

    res.forEach(category => {
        
        if(category.name.toLowerCase() == categoryName.toLowerCase()) {

            category.products.forEach(product => {
                
                Object.keys(product).forEach(key => {
                    
                    if(key.toLowerCase() != "productname" && key.toLowerCase() != "img" && key.toLowerCase() != "parameters" && typeof product[key] != "number") {
                        
                        !parametersScope.details.includes(key.toLowerCase()) ? parametersScope.details.push(key.toLowerCase()) : false;
                    }
                    else if(key.toLowerCase() == "parameters") {
                        
                        Object.keys(product.parameters[0]).forEach(param => {
                            
                            !parametersScope.parameters.includes(param.toLowerCase()) ? parametersScope.parameters.push(param.toLowerCase()) : false;
                        })
                    }
                })
            })
        }
    })
} 

function addCategories() {
    
    const categories = document.querySelector(".modal_menu");
    
    fetch(requestLink).then(res => res.json().then(res => { 
        res.forEach(category => {
            categories.innerHTML += 
            `<button class="modal_menu__btn">${category.name}</button>`
        })

        categoryBtnsFunctional();
    }))
}

function getProductsStaticParameters() {

    let staticProductForm = {
        price : [],
        parameters: {}
    };

    parametersScope.details.forEach(e => staticProductForm[e] = [])
    
    parametersScope.parameters.forEach(e => staticProductForm.parameters[e] = [])

    return staticProductForm;
}

export const requestLink = "http://127.0.0.1:8000/data/categories/";

let currentCategory;

function checkBackBtn() {

    if(localStorage.getItem("backBtn") && localStorage.getItem("backBtn") == "open") {
        
        productLoadingModalShow();
        
        setTimeout(() => {
            menuBtnOnClick(localStorage.getItem("productsStatus"));
        },1500)

        setTimeout(() => {
            productLoadingModalHide();
        },4000)

        localStorage.setItem("backBtn", "close");
    }
}

//Onload
window.onload = () => { addCategories();  checkBackBtn(); sliderFunc(); document.documentElement.scrollTo({top:0, behavior: "smooth"}); }

const
menuBtn = document.querySelector(".header__menu_btn"),
menuModal = document.querySelector(".header__modal_menu");

//Menu opening function
function openMenu() {

    menuBtn.querySelectorAll(".header__menu_btn_open_line").forEach(e => e.style.height = "0px");

    menuBtn.removeEventListener("click", menuBtnFunc);
    
    setTimeout(() => { 

        [[0, "-45"], [1, "45"]].forEach(e => {
            menuBtn.querySelectorAll(".header__menu_btn_close_line")[e[0]].style.transform = `rotate(${e[1]}deg) translateX(0px)`;
        }) 
        
        menuBtn.classList.replace("closed","opened");

        menuModal.style.height = (menuModal.scrollHeight + menuModal.querySelectorAll("button").length * 30) + "px";

        menuBtn.addEventListener("click", menuBtnFunc);
    }, 500) 
}

//Change Category

function categoryNameHide() { document.querySelector(".header__category_name").style.transform = "translateY(-150px)"; }

function categoryNameShow() { document.querySelector(".header__category_name").style.transform = "translateY(0px)"; }

const 
modalLoading = document.querySelector(".modal_loading"),
rotatingCircle = document.getElementById("filterLoading");

//Show Loading Modal
function loadingModalShow() { 
    
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    document.body.style.overflow = "hidden";

    modalLoading.style.visibility="visible"; 
    
    modalLoading.style.opacity = "100%"; 

    rotatingCircle.style.animationName = "loading";
};

//Hide Loading Modal
function loadingModalHide() { 

    document.body.style.overflow = "auto";
    
    modalLoading.style.opacity = "0%"; 
    
    modalLoading.style.visibility="hidden"; 
    
    rotatingCircle.style.animationName = "none"
};

//Delete All Products
const deleteProducts = () => document.querySelectorAll(".products > *:not(.modal_loading)").forEach(e => e.remove());

//Menu closing function
function closeMenu() { 

    menuBtn.removeEventListener("click", menuBtnFunc);

    [[0, "-45", "-150"], [1, "45", "150"]].forEach(e => {

        menuBtn.querySelectorAll(".header__menu_btn_close_line")[e[0]].style.transform = `rotate(${e[1]}deg) translateX(${e[2]}px)`;
    }) 
    
    setTimeout(() => { 

        menuBtn.querySelectorAll(".header__menu_btn_open_line").forEach(e => e.style.height = "10px"); 

        menuModal.style.height = "0px";

        menuBtn.classList.replace("opened","closed");

        menuBtn.addEventListener("click", menuBtnFunc);
    }, 500)
}

//Menu exploiting function
function menuBtnFunc(ev) {
    
    //Opening menu
    if(menuBtn.classList.contains("closed")) {
   
        openMenu();
    }

    //Closing Menu
    else {
        
        closeMenu();
    }
}

menuBtn ? menuBtn.addEventListener('click', menuBtnFunc) : false;

let minPrice, maxPrice;

//Filtration panel open function
function openFiltrationPanel() { document.querySelector(".main__filtration").style.transform = "translateX(0px)"; }

//Filtration panel close function
function closeFiltrationPanel() { document.querySelector(".main__filtration").style.transform = "translateX(-100%)"; }

//Inputs Animation

function filtrationInputsAnimation() {

    [...document.querySelectorAll(".inp > input")].map((e, i) => {
        e.addEventListener("focusin", ev => {
            document.documentElement.style.setProperty(`--priceInpWidth${i+1}`, "100%");
        })
        e.addEventListener("focusout", ev => {
            document.documentElement.style.setProperty(`--priceInpWidth${i+1}`, "0%");
        })
    })

    const productNameInp = document.getElementById("productNameInp");

    productNameInp.addEventListener('focusin', ev => { 

        document.querySelector(".prodname_animation").style.transform = "rotateX(0deg)";
        ev.target.style.color = "white";
    });

    productNameInp.addEventListener('focusout', ev => { 

        document.querySelector(".prodname_animation").style.transform = "rotateX(90deg)";
        ev.target.style.color = "black";
    });
}

//Products page opening function
const products = document.querySelector(".main__products");

function openProducts() {

    if(products.classList.contains("closed")) {

        products.style.height = products.scrollHeight + "px";

        setTimeout(() => { products.style.overflowY = "auto" }, 1000)

        products.classList.replace("closed", "opened");

        backBtnShow();
    }
}

//Products page closing function
function closeProducts() {

    if(products.classList.contains("opened")) {

        products.style.height = "0%";

        products.classList.replace("opened", "closed");

        backBtnHide();
    }
}

//Get parameters for filtering
function getParameters(arrForAddingParameters) {

    let parametersToAdd = getProductsStaticParameters();

    arrForAddingParameters.forEach(e => {

        Object.keys(parametersToAdd).forEach(key => {

            if(!Object.values(parametersToAdd[key]).includes(e[key])) {

                //First time
                if(parametersToAdd[key] && 
                    parametersToAdd[key].length == 0) {
                        
                    //Property
                    if(typeof(e[key]) != "object" &&
                    Array.isArray(e[key]) == false) {
                        
                        if(key == "price") {

                            parametersToAdd[key].push(e[key] - e["discount"]);
                        }
                        else if(!parametersToAdd[key].includes(e[key])) {
                            parametersToAdd[key].push(e[key]);
                        }
                    }
                    //Object ot Array
                    else {
                        if(Array.isArray(e[key])) {
                            
                            e[key].forEach(prop => {
                                prop = prop.name;

                                if(!Object.values(parametersToAdd[key]).includes(prop)) parametersToAdd[key].push(prop);
                            })
                        }
                        else if(key == "brand" && typeof(e[key]) == "object" &&
                        Array.isArray(e[key]) == false) {

                            Object.keys(e[key]).forEach(secondKey => {
                                if(!parametersToAdd[key].includes(e[key][secondKey])) {
                                    parametersToAdd[key].push(e[key][secondKey])
                                }
                            })
                        }
                    }
                }

                else {
                    //Property
                    if(typeof(e[key]) != "object" &&
                    Array.isArray(e[key]) == false) {
                        
                        if(key == "price") {
                            parametersToAdd[key].push(e[key] - e["discount"]);
                        }
                        else {
                            parametersToAdd[key].push(e[key]);
                        }
                    }
                    //Object ot Array
                    else {
                        if(Array.isArray(e[key])) {
                            e[key].forEach(prop => {

                                prop = prop.name;

                                if(!Object.values(parametersToAdd[key]).includes(prop)) parametersToAdd[key].push(prop);
                            })
                        }
                        else if(typeof(e[key]) == "object") {

                            Object.keys(e[key]).forEach(secondKey => {
                                if(key == "parameters" && typeof(e[key][secondKey]) != "object" &&
                                    Array.isArray(e[key][secondKey]) == false &&
                                    !parametersToAdd[key][secondKey].includes(e[key][secondKey])) {

                                        parametersToAdd.parameters[secondKey].push(e[key][secondKey]);
                                    }
                                    else if(key == "brand") {
                                        Object.keys(e[key]).forEach(secondKey => {
                                            if(!parametersToAdd[key].includes(e[key][secondKey])) {
                                                parametersToAdd[key].push(e[key][secondKey])
                                            }
                                        })
                                    }
                            })
                        }
                    }
                }
            }   
        })
        })

    

    return parametersToAdd;
}

//Add parameters for filtering
function addParameters(parametersToAdd) {

    document.querySelectorAll(".main__filtration__parameters > *").forEach(e => e.remove());

    Object.keys(parametersToAdd).forEach(key => {

        let section = document.querySelector(`#${key} > .main__filtration__parameters`);
        
        if(Array.isArray(parametersToAdd[key]) && section) {
                  
            section = document.querySelector(`#${key} > .main__filtration__parameters`);

            if(key == "colors") {
                parametersToAdd[key].forEach(prop => {
                    if(prop == "white") {
                        section.innerHTML += 
                        `
                        <div class="main__filtration__parameter">
                            <span style="text-transform:capitalize;background-color:${prop};border:1px solid black;" class="color"></span>
                            <input type="checkbox" value="${prop}" data-parameter="${key}">
                        </div>
                        `
                    }
                    else {
                        section.innerHTML += 
                        `
                        <div class="main__filtration__parameter">
                            <span style="text-transform:capitalize;background-color:${prop};" class="color"></span>
                            <input type="checkbox" value="${prop}" data-parameter="${key}">
                        </div>
                        `
                    }
                })
            }
            else {
                parametersToAdd[key].forEach(prop => {
                    section.innerHTML += 
                    `
                    <div class="main__filtration__parameter">
                        <span style="text-transform:capitalize;">${prop}</span>
                        <input type="checkbox" value="${prop}" data-parameter="${key}">
                    </div>
                    `
                })
            }
        }
        else if(typeof parametersToAdd[key] == "object" && key.toLowerCase() != "price") {

            Object.keys(parametersToAdd[key]).forEach(secondKey => {

                if(typeof parametersToAdd[key][secondKey] != "object") {

                    section = document.querySelector(`#${secondKey} > .main__filtration__parameters`);

                    parametersToAdd.parameters[secondKey].forEach(prop => {
                        section.innerHTML += 
                        `
                        <div class="main__filtration__parameter">
                            <span style="text-transform:capitalize;">${prop}</span>
                            <input type="checkbox" value="${prop}" data-parameter="${secondKey}">
                        </div>
                        `
                    })
                }
                else if(typeof parametersToAdd[key][secondKey] == "object") {

                    if(secondKey != "memory" && parametersToAdd[key][secondKey]) {
                        section = document.querySelector(`#${secondKey} > .main__filtration__parameters`);

                        parametersToAdd.parameters[secondKey].forEach(prop => {
                            section.innerHTML += 
                            `
                            <div class="main__filtration__parameter">
                                <span style="text-transform:capitalize;">${prop}</span>
                                <input type="checkbox" value="${prop}" data-parameter="${secondKey}">
                            </div>
                            `
                        })
                    }

                    
                }
            })
        }
    })

    document.querySelectorAll("#minPriceInp,#maxPriceInp").forEach(e => e.max = Math.max(...Object.values(parametersToAdd["price"])));

    document.querySelector("#maxPrice").max = Math.max(...Object.values(parametersToAdd["price"]));
}


//Get checked parameters function
function getCheckedParameters() {

    let checkedElementsArr = { parameters: {} };
    
    let isVoid = true;  

    document.querySelectorAll("#productNameInp, .main__filtration__parameters_box > .main__filtration__parameters > .main__filtration__parameter > input").forEach(e => {

        e.addEventListener('change', ev => {
            
            if(ev.target.id == "productNameInp" && ev.target.value.length != 0) {

                checkedElementsArr.productName = ev.target.value.toLowerCase();
            }
            else if(ev.target.id == "productNameInp" && ev.target.value.length == 0) {
            
                delete checkedElementsArr.productName;
            }
            else if(ev.target.checked == true) {

                if(parametersScope["details"].includes(ev.target.dataset.parameter)) {

                    if(!checkedElementsArr[ev.target.dataset.parameter]) checkedElementsArr[ev.target.dataset.parameter] = [];
                    
                    checkedElementsArr[ev.target.dataset.parameter].push(ev.target.value);
                }
                else {
                    
                    if(!checkedElementsArr.parameters[ev.target.dataset.parameter]) checkedElementsArr.parameters[ev.target.dataset.parameter] = [];

                    checkedElementsArr.parameters[ev.target.dataset.parameter].push(ev.target.value);
                }
            }
            else {

                if(checkedElementsArr[ev.target.dataset.parameter]) {

                    if(checkedElementsArr[ev.target.dataset.parameter].length != 0) {

                        checkedElementsArr[ev.target.dataset.parameter].splice(checkedElementsArr[ev.target.dataset.parameter].indexOf(ev.target.value), 1);
                    }
                    if(checkedElementsArr[ev.target.dataset.parameter].length == 0) {

                        delete checkedElementsArr[ev.target.dataset.parameter];
                    }
                }
                else {
                    if(checkedElementsArr.parameters[ev.target.dataset.parameter].length != 0) {

                        checkedElementsArr.parameters[ev.target.dataset.parameter].splice(checkedElementsArr.parameters[ev.target.dataset.parameter].indexOf(ev.target.value), 1);
                    }
                    if(checkedElementsArr.parameters[ev.target.dataset.parameter].length == 0) {

                        delete checkedElementsArr.parameters[ev.target.dataset.parameter];
                    }
                }
            }

            for(let key of Object.keys(checkedElementsArr)) {

                if(Object.values(checkedElementsArr[key]).length == 0 && key != "parameters") {

                    isVoid = true;
                }
                else if(Object.values(checkedElementsArr[key]).length != 0 && key != "parameters") {

                    isVoid = false;
                    break;
                }
                else {
                    for(let secondKey of Object.keys(checkedElementsArr[key])) {

                        if(Object.values(checkedElementsArr[key][secondKey]).length == 0) {

                            isVoid = true;
                        }
                        else if(Object.values(checkedElementsArr[key][secondKey]).length != 0) {

                            isVoid = false;
                            break;
                        }
                    }
                }
            }
        });
        
    })  

    function searchBtnOnclickFunc(ev) {

        minPrice = Number(minPrice);maxPrice = Number(maxPrice);
    
        if(minPrice == 0 && maxPrice == 0) {
    
            delete checkedElementsArr["minPrice"];
            delete checkedElementsArr["maxPrice"];
            
            isVoid = true;
        }
        else if(minPrice && maxPrice && minPrice != 0 && maxPrice != 0) {
                
            checkedElementsArr["minPrice"] = minPrice;
                
            checkedElementsArr["maxPrice"] = maxPrice;
            
            isVoid = false;
        }
        else if(minPrice && minPrice != 0 && !maxPrice) {
                
            checkedElementsArr["minPrice"] = minPrice;
    
            checkedElementsArr["maxPrice"] = maxInput.max;
    
            isVoid = false;
        }
        else if(maxPrice && maxPrice != 0 && !minPrice) {
                
            checkedElementsArr["minPrice"] = 0;
                
            checkedElementsArr["maxPrice"] = maxPrice;
    
            isVoid = false;
        }
    
        if(!isVoid) {

            loadingModalShow();

            setTimeout(() => filtering(checkedElementsArr),400);

            setTimeout(() => loadingModalHide(),1200)
        }
        else {
            filtering(false);
        }

        productOpen();
    }

    function searchBtnOnKeyupFunc(ev) {
    
        if(ev.keyCode == 13 && ev.key == "Enter" || ev.key == "enter") {
            searchBtnOnclickFunc();
        }
    }
    
    const searchBtn = document.getElementById("SearchBtn");

    productNameInp.addEventListener('focusin', ev => { 

        document.addEventListener("keyup", searchBtnOnKeyupFunc);      
    });

    productNameInp.addEventListener('focusout', ev => { 

        document.removeEventListener("keyup", searchBtnOnKeyupFunc);    
    })
    
    searchBtn.addEventListener("click", searchBtnOnclickFunc)  
}

//Products filtering function
function filtering(checkedParams) {

    let filteredProducts = [];
    
    fetch(requestLink).then(res => res.json().then(res => { 
        
        let categoryProducts;
                    
        for(let e of res) { 
            if(e.name.toLowerCase() == currentCategory && res) {
                categoryProducts = e.products;
                break;
            } 
            else categoryProducts = false;
        }
       
        if(checkedParams && Object.keys(checkedParams).length > 1 && categoryProducts ||
        checkedParams && Object.keys(checkedParams).length > 1 && Object.keys(checkedParams.parameters).length > 0 && categoryProducts ||
        checkedParams && Object.keys(checkedParams).length == 1 && Object.keys(checkedParams.parameters).length > 0 && categoryProducts) {      

            for(let product of categoryProducts) {

                let isEqual = [];
                
                for(let key of Object.keys(checkedParams)) {

                    if(key.toLowerCase() != "parameters") {

                        if(typeof product[key] == "object" && key == "brand") {
                            
                            for(let secondKey of Object.keys(product[key])) {

                                if(checkedParams[key].includes(product[key][secondKey])) {
                                    isEqual.push(true);
                                    continue;
                                }
                            }
                            continue;
                        }
                        
                        else if(typeof product[key] == "object" && key == "colors") {
  
                            for(let elem of checkedParams[key]) {

                                let colors = [];

                                product[key].forEach(color => colors.push(color.name));

                                if(colors.includes(elem)) {
                                    isEqual.push(true);
                                    break;
                                }
                            }
                            continue;
                        }

                        else if(typeof checkedParams[key] == "string") {

                            if(typeof product[key] == "string" && product[key].toLowerCase().includes(checkedParams[key].toLowerCase())) {

                                isEqual.push(true);
                                continue;
                            }
                        }

                        else if(Array.isArray(checkedParams[key]) && !Array.isArray(product[key])) {

                            if(checkedParams[key].includes(product[key])) {
                                isEqual.push(true);
                                continue;
                            }
                        }

                        else if(Array.isArray(checkedParams[key]) && Array.isArray(product[key])) {
                            
                            for(let elem of checkedParams[key]) {

                                if(product[key].includes(elem)) {
                                    isEqual.push(true);
                                    break;
                                }
                            }
                            continue;
                        }

                        else if(Object.keys(checkedParams).includes("maxPrice") && Object.keys(checkedParams).includes("minPrice") ||
                        Object.keys(checkedParams).includes("maxPrice") || Object.keys(checkedParams).includes("minPrice")) {

                            if(Number(product.price - product.discount) <= Number(checkedParams["maxPrice"]) && 
                            Number(product.price - product.discount) > Number(checkedParams["minPrice"])) {
                                
                                isEqual.push(true);
                                continue;
                            }
                        }
                       
                    }
                    else if(key.toLowerCase() == "parameters" && checkedParams[key] && Object.keys(checkedParams[key]).length && 
                    Object.keys(checkedParams[key]).length != 0) {

                        for(let parameter of Object.keys(checkedParams[key])) {

                            if(typeof checkedParams[key][parameter] == "string") {
    
                                if(typeof product[key][0][parameter] == "string" && product[key][0][parameter].toLowerCase().includes(checkedParams[key][parameter].toLowerCase())) {
    
                                    isEqual.push(true);
                                    continue;
                                }
                            }
                            
                            else if(Array.isArray(checkedParams[key][parameter]) && !Array.isArray(product[key][parameter])) {
    
                                if(checkedParams[key][parameter].includes(product[key][0][parameter])) {
                                    isEqual.push(true);
                                    continue;
                                }
                            }
    
                            else if(Array.isArray(checkedParams[key][parameter]) && Array.isArray(product[key][0][parameter])) {
    
                                for(let elem of checkedParams[key][parameter]) {
    
                                    if(product[key][0].includes(elem)) {
                                        isEqual.push(true);
                                        break;
                                    }
                                }
                                continue;
                            }
    
                            else if(Object.keys(checkedParams).includes("maxPrice") && Object.keys(checkedParams).includes("minPrice") ||
                            Object.keys(checkedParams).includes("maxPrice") || Object.keys(checkedParams).includes("minPrice")) {

                                if(Number(product.price - product.discount) <= Number(checkedParams["maxPrice"]) && 
                                Number(product.price - product.discount) > Number(checkedParams["minPrice"])) {
                                    
                                    isEqual.push(true);
                                    continue;
                                }
                            }
                        }
                    }
                }

                if(isEqual.length == ((Object.keys(checkedParams).length - 1) + Object.keys(checkedParams.parameters).length) && isEqual.includes(true)) {

                    filteredProducts.push(product)
                }
                else {
                    // console.log("false");
                }
            }

            deleteProducts();
            
            appendProducts(filteredProducts);
        }
        else if(categoryProducts) {

            deleteProducts();
       
            appendProducts(categoryProducts);
        }
    }))
}

//Append products to products section function
function appendProducts(arrForAddingElements) {

    arrForAddingElements.forEach(e => {
                            
        const element = document.createElement("div");

        element.className = "products__product";

        element.innerHTML = 
        `

        <a class="products__product_image_box" data-id="${e.id}">
            <img src="${e.img}" width="300" height="250" alt="${e.productName}">
        </a>

        <div class="products__product_info-box">
            <span>${e.productName}</span>
            <span>Price is ${e.price} Դ</span>
            <span>Discount is ${e.discount}Դ (${e.price - e.discount})</span>
        </div>
        
        <button>Add To Cart</button>
        
        `

        products.appendChild(element);
        
    })

    productOpen();
}

//Reset btn
function resetBtnFunc() {

    const resetBtn = document.getElementById("ResetBtn");

    function uncheckCheckedInput() {
        const checked = document.querySelectorAll(".main__filtration__parameters_box > .main__filtration__parameters > .main__filtration__parameter > input:checked");

        checked.forEach(e => {
            e.checked = false;
        });
    }

    resetBtn.addEventListener("click", ev => {

        uncheckCheckedInput();

        priceInputsNulling();

        nameInputNulling();

        getCheckedParameters();

        loadingModalShow();

        setTimeout(() => filtering(false), 400);

        setTimeout(() => loadingModalHide(), 1200);
    })
}

function priceInputsNulling() {

    document.querySelectorAll(".main__filtration__price_box_inputs > input").forEach(e => e.value = "");

    document.querySelectorAll(".main__filtration__price_bars > input").forEach(e => e.value = 0);
}

function nameInputNulling() {
    
    document.getElementById("productNameInp").value = "";
}

const showProductsBoxBorder = () => products.style.borderBottom = "2.5px solid black";

const hideProductsBoxBorder = () => products.style.borderBottom = "0px solid black";

//Menu pointer engine and functional
function categoryBtnsFunctional() {

    const menuPointer = document.querySelector(".modal_menu__pointer");

    document.querySelectorAll(".modal_menu > button").forEach(e => {
        
        e.addEventListener("mouseout", ev => {
            menuPointer.style.top = "-55px";    
        })

        function mouseOverFunc(ev) {
            
            let index = [...document.querySelectorAll(".modal_menu > button")].findIndex(e => e == ev.target);
            
            menuPointer.style.top = `${((index) * 100) + 55}px`;
        } 

        e.addEventListener("mouseover", mouseOverFunc);
        
        e.addEventListener("click", ev => { 

            currentCategory = ev.target.innerHTML[0].toUpperCase() + ev.target.innerHTML.slice(1);  
            
            menuBtnOnClick(currentCategory, ev); 
        })
    })
}

function menuBtnOnClick(...params) {

    const categoryName = document.querySelector(".header__category_name");
    
    if(products.classList.contains("closed")) {
        
        categoryName.innerHTML = params[0];
        
        currentCategory = params[0].toLowerCase();
        
        fetch(requestLink).then(res => res.json().then(res => { 
            
            document.querySelector(".main").style.height = (document.querySelector(".main").scrollHeight + products.scrollHeight) + "px";
            
            closeStartPage();
            
            hideLogo();
            
            hideServiceBtn();
            
            deleteProducts();
            
            filtrationPanelBoxes(categoryName.innerHTML.toLowerCase(), res);
            
            minAndMaxBarsUpdate();
                
                priceInputsNulling();
                
                resetBtnFunc();
                
                let categoryProducts;
                
                for(let e of res) { 
                    if(e.name.toLowerCase() == currentCategory && res) {
                        categoryProducts = e.products;
                        break;
                    } 
                    else categoryProducts = false;
                }
                
                categoryProducts.forEach(product => product.parameters = product.parameters[0])
                
                filtrationInputsAnimation()
                
                appendProducts(categoryProducts);
                
                addParameters(getParameters(categoryProducts));
                
                getCheckedParameters();
            }))
            
            closeMenu();
            
            categoryNameShow();
            
            setTimeout(() => {
                
                showProductsBoxBorder();
                
                openFiltrationPanel();
                
                openProducts();
            }, 1500)
            
            setTimeout(() => hideProductsBoxBorder(), 2500);
        }
        else if(categoryName.innerHTML.toLowerCase() != params[1].target.innerHTML.toLowerCase()) {

            categoryName.innerHTML = params[0];
            
            currentCategory = categoryName.innerHTML.toLowerCase();
            
            showProductsBoxBorder();
            
            closeFiltrationPanel();
            
            closeProducts();
            
            categoryNameHide();
            
            setTimeout(() => {
                
                fetch(requestLink).then(res => res.json().then(res => { 
                    
                    filtrationPanelBoxes(categoryName.innerHTML.toLowerCase(), res);
                    
                    minAndMaxBarsUpdate();
                    
                    deleteProducts();
                    
                    priceInputsNulling();
                    
                    resetBtnFunc();
                    
                    let categoryProducts;
                    
                    for(let e of res) { 
                        if(e.name.toLowerCase() == currentCategory && res) {
                            categoryProducts = e.products;
                            break;
                        } 
                        else categoryProducts = false;
                    }
                    
                    categoryProducts.forEach(product => product.parameters = product.parameters[0])
                    
                    filtrationInputsAnimation()
                    
                    appendProducts(categoryProducts);
                    
                    addParameters(getParameters(categoryProducts));
                    
                    getCheckedParameters();
                }))
            }, 1000)
            
            setTimeout(() => {
                
                openFiltrationPanel();
                
                openProducts();
                
                closeMenu();
                
                categoryNameShow();
            }, 1500)
            
            setTimeout(() => hideProductsBoxBorder(), 3000);
        }
    }

    function minAndMaxBarsUpdate() {
        
        const
        minInput = document.querySelector("#minPrice"),
        maxInput = document.querySelector("#maxPrice");
        
        //Price bars
        document.querySelectorAll(".main__filtration__price_bars > input").forEach(e => {
            
            e.addEventListener("input", ev => {
                
            document.querySelector(`.main__filtration__price_box_inputs > input[name='${e.id}']`).value = ev.target.value;
            
            minInput.max = maxInput.value - 1;

            maxInput.min = minInput.value;

            if(maxInput.value == 0) {

                document.querySelector("#minPriceInp").value = 0; 
                minInput.value = 0;
            }
        
            minPrice = minInput.value; maxPrice = maxInput.value;
        })
    })

    document.querySelectorAll("#minPriceInp, #maxPriceInp").forEach(e => {
        
        e.addEventListener("input", ev => ev.target.id == "minPriceInp" ? minInput.value = ev.target.value : maxInput.value = ev.target.value);
    })
}

//Go back btn
const backBtn = document.querySelector(".header__back_btn");

if(backBtn) {
    backBtn.addEventListener('click', ev => {

        window.scrollTo({ top:0, behavior:"smooth" });

        document.querySelector(".main").style.height = "100vh";

        setTimeout(() => {

            showProductsBoxBorder();

            closeProducts();

            closeFiltrationPanel();

            categoryNameHide();

            setTimeout(() => { backBtnHide(); hideProductsBoxBorder();}, 1000);

            setTimeout(() => { openStartPage(); showLogo(); showServiceBtn(); }, 1600);
        }, 500)
    })
}

function backBtnShow() {

    backBtn.style.transform = "rotate(180deg) translateX(0px)";
}

function backBtnHide() {

    backBtn.style.transform = "rotate(180deg) translateY(150px)";
}


function sliderFunc() {

    let staticWidth = document.querySelector(".slider__current_image").getBoundingClientRect().width;

    const images = document.querySelectorAll(".slider__current_images > *");
    
    let 
    currentImage = 0,
    currentPos = 0;
    
    window.onresize = () => {

        staticWidth = document.querySelector(".slider__current_image").getBoundingClientRect().width;

        currentImage = 0;
        currentPos = 0;

        images.forEach(e => e.style.transform = `translateX(0px)`);
    }

    const toRightBtn = () =>  {

        if(currentImage-1 >= 0) { 
            
            currentImage-=1;

            currentPos = currentImage * staticWidth;

            images.forEach(e => e.style.transform = `translateX(-${currentPos}px)`);
        } 
        else {
            currentImage = images.length - 1;

            currentPos = currentImage * staticWidth;
            
            images.forEach(e => e.style.transform = `translateX(-${currentPos}px)`);
        }  
    };
    
    const toLeftBtn = () => { 

        if(currentImage+1 < images.length) { 
            
            currentImage+=1;

            currentPos = currentImage * staticWidth;
            
            images.forEach(e => e.style.transform = `translateX(-${currentPos}px)`);
        } 
        else {

            currentImage = 0;

            currentPos = currentImage * staticWidth;
            
            images.forEach(e => e.style.transform = `translateX(-${currentPos}px)`);
        }  
    };
    
    let interval = setInterval(toLeftBtn, 4000); 

    backBtn.addEventListener('click', ev => {

        interval = setInterval(toLeftBtn, 4000);
    })
    
    document.getElementById("toLeftBtn").addEventListener('click', ev => { if(interval) { clearInterval(interval); toLeftBtn(); } else toLeftBtn(); });

    document.getElementById("toRightBtn").addEventListener('click', ev => { if(interval) { clearInterval(interval); toRightBtn(); } else toRightBtn(); });
}

//Start page hide and show functions
const 
startPage = document.querySelector(".start_page");

const closeStartPage = () => { startPage.querySelector("h1").style.overflow = "hidden"; startPage.style.height = "0px"; setTimeout(() => { startPage.style.visibility = "hidden" }, 1000) };

const openStartPage = () => { startPage.style.height = "100vh"; startPage.style.visibility = "visible" };

//Logo hide and show functions
const logo = document.querySelector(".header__logo");

const hideLogo = () => { logo.style.transform = "translateY(-200%)";};

const showLogo = () => { logo.style.transform = "translateY(0px)";};

//Service btn hide and show functions
const serviceBtn = document.querySelector(".main__serviceBtn");

const hideServiceBtn = () => { serviceBtn.style.transform = "translateX(-50px) rotate(90deg)";};

const showServiceBtn = () => { serviceBtn.style.transform = "translateX(0px) rotate(90deg)";};

//Product loading modal
const productLoadingModal = document.querySelector(".page__product_loading_modal");

export function productLoadingModalShow() { 
    
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    document.body.style.overflow = "hidden";

    productLoadingModal.style.visibility = "visible"; 
    
    productLoadingModal.style.opacity = "100%"; 

    productLoadingModal.querySelector(".modal_rotating_circle").style.animationName = "loading";
}

export function productLoadingModalHide() { 
    
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    document.body.style.overflow = "auto";

    productLoadingModal.style.visibility = "hidden"; 
    
    productLoadingModal.style.opacity = "0%"; 

    productLoadingModal.querySelector(".modal_rotating_circle").style.animationName = "none";
}

//Product onclick opening functional
function productOpen() {
    
    document.querySelectorAll(".products__product_image_box").forEach(e => {
        
        e.addEventListener('click', ev => {

            const objToSend = {
                id: e.dataset.id, 
                category: currentCategory
            }

            sendProductData(objToSend);
        })
    })
}

function sendProductData(obj) {
    
    localStorage.setItem("productInfo", JSON.stringify(obj));
    
    localStorage.setItem("productsStatus", currentCategory[0].toUpperCase() + currentCategory.slice(1))
    
    productLoadingModalShow();

    setTimeout(() => {
        window.open("/product.html", "_self");
    }, 750)
}