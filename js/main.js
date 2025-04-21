const prod = document.getElementById("prod");
const ulMenu = document.getElementById("ulMenu");
const main = document.querySelector("main.container");
const URLMain = "https://fakestoreapi.com/products/";

function getData(cat) {
    const options={"method":"GET"}
    fetch(URLMain+cat, options)
        .then((response) => {
            console.log(response)
            response.json().then((res) => {
                // console.log(res.length);//20
                // console.log(res[0].title);
                createCards(res)
            })
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                 ${err.message}
            </div>`);
        })
}//getData

async function getCategories() {
    try {
        const response = await fetch(URLMain + "categories/");
        const categories = await response.json();

        categories.forEach(cat => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.className = "dropdown-item";
            a.href = "#";
            a.textContent = cat;
            a.addEventListener("click", () => getData(`category/${cat}`));
            li.appendChild(a);
            ulMenu.appendChild(li);
        });

    } catch(err) {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                 ${err.message}
            </div>`);
        }
}//getCategories

document.addEventListener("DOMContentLoaded", () => {
    getCategories();
    getData("");

    const btnCat = document.getElementById("btn-cat");
    btnCat.addEventListener("click", () => getData(""));
});

function createCards(prods) {
    prod.innerHTML="";
    prods.forEach((objetoIndividual, i) =>
    {
        prod.insertAdjacentHTML("beforeend",
        `
        <div class="card" style="width: 18rem" >
               <img src="${prods[i].image}" class="card-img-top" alt="${prods[i].title}">
           <div class="card-body">
             <h5 class="card-title">${prods[i].title}</h5>
             <p class="card-text">${prods[i].description}</p>
             <a href="#" class="btn btn-primary" id=${i}>Go somewhere</a>
           </div>
         </div>`);
    });
};

//Agregar modal ---->Pendiente 


