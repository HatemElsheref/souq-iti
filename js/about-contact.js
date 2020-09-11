class Category  {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
var  app='http://localhost/iti/projects/v2/front-end';
var categories;
function createCategoryDom(informatoin){
    let link=document.createElement('a');
    link.className='dropdown-item hvr-underline-from-right hover-color';
    link.href='#';
    link.innerHTML=informatoin.name;
    return link;
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