
// this content for product-details.html only

// start Classes
class ProductList {
    constructor() {
        this.products=Array();
    }
    addNewProduct(product) {
        this.products.push(product);
    }
    allProducts() {
        return this.products;
    }
}
class Product {
    constructor(id, name, price, mainPhoto, hoverPhoto, category, trend, discount, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.mainPhoto = mainPhoto;
        this.hoverPhoto = hoverPhoto;
        this.trend = trend;
        this.discount = discount;
        this.description = description;
    }
}
class Category  {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class ShoppingCart {
    constructor(items, totalPrice) {
        this.totalPrice = totalPrice;
        this.items = items;
    }
    addNewProduct(product) {
        this.items.push(product);
    }
    addPrice(price){
        this.totalPrice+=price;
    }
    removeProduct(id) {}
}
// end Classes
var  app='http://localhost/iti/projects/v2/front-end';
var cart = new ShoppingCart([], 0);
var categories;

function getCurrentProduct(){
    var id = window.location.href.split('?')[1].split('=')[1];
    id = parseInt(id);
    var currentCategory = '';
    $.getJSON(app+"/data/products.json", function(data) {
        $.each(data, function(key, product) {
            let currentProduct= new Product(product.id, product.name, product.price, product.mainPhoto, product.hoverPhoto, product.category_id, product.trend, product.discount, product.description);
            if (id === currentProduct.id) {
                currentCategory = getCategoryById(currentProduct.category);
                currentProduct.category = currentCategory.id;
                $('#product-name').html(currentProduct.name);
                $('#product-price').html('Price :'+currentProduct.price+' $');
                $('#product-id').html(currentProduct.id);
                $('#product-description').html(currentProduct.description);
                return false;
            }
        });
    });

}
var products;
function setProducts(listOfProducts) {
    products = listOfProducts;
}

function setCategories(items) {
    categories = items;
}
function getAllCategories(){
    $.getJSON(app+"/data/categories.json", function(data) {
        let categoryList=document.getElementById('put-categories-here');
        $.each(data, function(key, category) {
            let item = new Category(category.id, category.name);
            categoryList.appendChild(createCategoryDom(item));
        });
        setCategories(data);
    });
}
getAllCategories();
function getCategoryById(id) {
    var cat = 0;
    categories.forEach(category => {
        if (id === category.id) {
            cat = category;
            return;
        }
    });
    if (cat === 0) {
        alert('Category Not Found');
        return;
    }
    return cat;
}
function createProductDom(information) {
    let containerDiv = document.createElement('div');
    containerDiv.className = 'col-md-3 col-sm-6';
    let productGridDiv = document.createElement('div');
    productGridDiv.className = 'product-grid';
    let productImageDiv = document.createElement('div');
    productImageDiv.className = 'product-image';
    let productImageAnchor = document.createElement('a');
    productImageAnchor.href = '#';
    let mainPhoto = document.createElement('img');
    mainPhoto.src = app+'/images/'+information.mainPhoto;
    mainPhoto.className = 'pic-1';
    let hoverPhoto = document.createElement('img');
    hoverPhoto.src = app+'/images/'+information.hoverPhoto;
    hoverPhoto.className = 'pic-2';
    productImageAnchor.appendChild(mainPhoto);
    productImageAnchor.appendChild(hoverPhoto);
    productImageDiv.appendChild(productImageAnchor);
    let categorySpan = document.createElement('span');
    categorySpan.className = 'product-trend-label';
    categorySpan.innerHTML = getCategoryById(information.category).name;
    let discountSpan = document.createElement('span');
    discountSpan.className = 'product-discount-label';
    discountSpan.innerHTML = '-'+information.discount+'%';
    productImageDiv.appendChild(categorySpan);
    productImageDiv.appendChild(discountSpan);
    let socialNav = document.createElement('ul');
    socialNav.className = 'social';
    let icons = ['shopping-cart', 'heart', 'random', 'search'];
    let data = ['Add to Cart', 'Wishlist', 'Compare', 'Quick View'];
    let counter;
    for (counter=0;counter<icons.length;counter++){
        let li = document.createElement('li');
        let a=document.createElement('a');
        if (counter===0){
            // a.href='#';
            a.setAttribute('product_id',information.id);
            a.addEventListener('click',fire,false);
        }else{
            a.href='#';
        }

        a.setAttribute('data-tip',data[counter]);
        let i=document.createElement('i');
        i.className='fa fa-'+icons[counter];
        i.setAttribute('product_id',information.id);
        a.append(i);
        li.append(a);
        socialNav.append(li);
    }
    productImageDiv.appendChild(socialNav);

    let productInfo = document.createElement('div');
    productInfo.className = 'product-content';
    let productName = document.createElement('h3');
    productName.className = 'title';
    let productLink=document.createElement('a');
    productLink.href=app+'/product-details.html?id='+information.id;
    // productLink.href=app+'/pages/product-details.html?id='+information.id;
    productLink.innerHTML=information.name;
    productName.appendChild(productLink);

    let productPrice = document.createElement('div');
    productPrice.className = 'price discount';
    let productDiscount=document.createElement('span');
    productDiscount.innerHTML='$ '+information.price;
    productPrice.appendChild(productDiscount);
    let theTotalPrice=information.price-(information.price*information.discount)/100;
    productPrice.appendChild(document.createTextNode('$ '+theTotalPrice));

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    productGridDiv.appendChild(productImageDiv);
    productGridDiv.appendChild(productInfo);

    containerDiv.appendChild(productGridDiv);

    return containerDiv;
}
function createCategoryDom(informatoin){
    let link=document.createElement('a');
    link.className='dropdown-item hvr-underline-from-right hover-color';
    link.href='#';
    link.innerHTML=informatoin.name;
    return link;
}
function createCartDom(information){

    let container=document.createElement('li');
    let item=document.createElement('span');
    item.className='item';
    let itemLeft=document.createElement('span');
    itemLeft.className='item-left';
    let image=document.createElement('img');
    image.height=50;
    image.width=50;
    image.src=app+'/images/'+information.photo;
    let itemInfo=document.createElement('span');
    itemInfo.className='item-info';
    let name=document.createElement('span');
    name.innerHTML=information.name;
    let price=document.createElement('span');
    price.innerHTML=information.price;
    let itemRight=document.createElement('span');
    itemRight.className='item-right';
    let remove=document.createElement('button');
    remove.className='badge badge-xs btn-danger pull-right';
    remove.innerHTML=`<i class="fa fa-times"></i>`;
    itemRight.appendChild(remove);
    itemInfo.appendChild(name);
    itemInfo.appendChild(price);
    itemLeft.appendChild(image);
    itemLeft.appendChild(itemInfo);
    item.appendChild(itemLeft);
    item.appendChild(itemRight);
    container.appendChild(item);
    return container;

}
function addToCart(product) {
    var flag = true;
    if (cart.items.length === 0) {
        // add direct
        let tmp = {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "photo": product.mainPhoto,
            "qty": 1,
        };
        cart.items.push(tmp);
        cart.addPrice(product.price);
        // cart.addNewProduct(tmp);
    } else {
        // check if this product is already exist
        for (let index = 0; index < cart.items.length; index++) {
            if (cart.items[index].id === product.id) {
                flag=false;
                let tmp = {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "photo": product.mainPhoto,
                    "qty": cart.items[index].qty + 1,
                };
                cart.items[index] = tmp;
                cart.addPrice(product.price);
                // cart.addNewProduct(tmp);
            }
        }
        if (flag===true){
            let tmp = {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "photo": product.mainPhoto,
                "qty": 1,
            };
            cart.items.push(tmp);
            cart.addPrice(product.price);
            // cart.addNewProduct(tmp);
        }
    }
    let index;
    let father=document.getElementById('put-you-products-here');
    let totalCounter=document.getElementById('total-products');
    father.innerHTML='';
    totalCounter.innerHTML='';
    let qty=0;
    for(index=0;index<cart.items.length;index++){

        qty+=cart.items[index].qty;
        father.appendChild(createCartDom(cart.items[index]));
        totalCounter.innerHTML=qty;
    }
    $('.toast').toast('show');}
function fire(object){
    let productId=parseInt(object.target.getAttribute('product_id'));
    let product=0;
    let i;
    for (i=0;i<products.length;i++){
        if (productId===products[i].id){
            product=products[i];
            break;
        }
    }
    if (product===0){
        alert('Product Not Found');
    } else{
        addToCart(product);
    }
    return false;
}
function getRelatedProducts(){

    var father = document.getElementById('put-related-products-here');
    $.getJSON(app+"/data/products.json", function(data) {
        var list = new ProductList();
        var counter=0;
        $.each(data, function(key, product) {
            let item = new Product(product.id, product.name, product.price, product.mainPhoto, product.hoverPhoto, product.category_id, product.trend, product.discount, product.description);
            if(item.trend && counter<8){
                father.appendChild(createProductDom(item));
                counter++;
                list.addNewProduct(item);
            }});
        setProducts(list.allProducts());
    });

}
getRelatedProducts();
getCurrentProduct();


//Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//Quantity