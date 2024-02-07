import { requestLink, productLoadingModalShow, productLoadingModalHide } from "./script.js";

function colorsSelect() {
    
    document.querySelectorAll(".colors > span").forEach(e => {
        e.style.backgroundColor = e.classList[e.classList.length - 1];
    })
}

window.onload = () => { setTimeout(() => { loadProduct(); }, 300), setTimeout(() => { productLoadingModalHide(); backBtnFunctional(); }, 1000) };

function loadProduct() {
    
    let product = JSON.parse(localStorage.getItem("productInfo"));

    const productPage = document.querySelector(".product_page");

    fetch(requestLink).then(res => res.json().then(res => { 

        let categoryProducts = res.filter(e => e.name.toLowerCase() == product.category.toLowerCase())[0].products;

        categoryProducts.forEach(product => product.parameters = product.parameters[0])

        product = categoryProducts.filter(e => Number(e.id) == Number(product.id))[0];

        let 
        params = "",
        colors = "";

        params += `<span>Product Name: ${product.productName}</span>`; 

        Object.keys(product.parameters).forEach(key => { params += `<span>${key[0].toUpperCase() + key.slice(1)}: ${product.parameters[key]}</span>` })

        Object.keys(product.colors).forEach(key => { colors += ` <span class="product_page__product_Info_params_color ${product.colors[key].name}"></span>` });

        productPage.innerHTML +=
        `
        <div class="product_page__product">
                    
                    <div class="product_page__product_topSide">
                        <div class="product_page__product_params">${params}</div>

                        <div class="product_page__product_Info">
                            <img src="${product.img}" alt="product_img">

                            <div class="product_page__product_Info_params">

                                <div class="col">
                                    <span>Price</span>

                                    <span name="price">${product.price - product.discount} Դ</span>
                                </div>

                                <div class="col">
                                    <span class="colors-status">Colors Available</span>
                                    
                                    <div name="colors" class="colors">${colors}</div>
                                </div>

                                <button>Add To Cart</button>
                            </div>
                        </div>
                    </div>

                    <div class="product_page__product_bottomSide">

                        <h1>About This Product</h1>

                        <p class="product_page__product_bottomSide_info_text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus eaque corrupti praesentium necessitatibus quas, repellendus eligendi ipsum voluptatem magnam dignissimos repellat exercitationem voluptas quibusdam? Ipsum voluptates sed illum veritatis cumque quae ducimus assumenda, enim voluptas exercitationem ad. Hic facere praesentium repellendus fugiat earum distinctio quos expedita excepturi, voluptates nisi adipisci laudantium minus temporibus, soluta, placeat vel amet sapiente asperiores eveniet numquam dolor? Quidem maxime excepturi cupiditate nisi vero laborum! Consequatur, dolorem at. Sunt inventore eveniet dignissimos animi aliquid placeat porro ea atque doloremque consequatur. Doloribus, ipsam ipsum iure ea, facere sed error recusandae, sapiente ut similique ullam dicta maiores!
                        </p>
                    </div>
                </div>
        `
    
        colorsSelect();
    }))
}

function backBtnFunctional() {
    
    const backBtn = document.querySelector(".page__back_btn");

    backBtn.addEventListener("click", ev => {

        productLoadingModalShow();

        localStorage.setItem("backBtn", "open")

        setTimeout(() => {
            window.open("/index.html", "_self")
        },500)
    })
}