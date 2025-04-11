const main = document.getElementsByTagName("main").item(0); // Obtenemos la etiqueta main de el index
const URLMain = "https://fakestoreapi.com/products/"; //Url de donde se obtienen los productos

function getData(){
    return fetch(URLMain)
        .then(response => response.json())
        .catch(err => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-warning" role="alert">
                    ${err.message}
                </div>`);//Catch de error
        });
}

async function createCards() {
    console.log("llamada createCards..."); //Solo para llamarlo en consola
    try {
        const res = await getData(); //Declaramos a res para que reciba lo que getData arroja
 
        let i = 0;  //bucle que inicia ne 0
                do {
                    const producto = res[i]; //contador que se va a ir recorriendo para acceder a diferentes indices del array
        
                    main.insertAdjacentHTML("beforeend",
                        `<div class="card" style="width: 18rem; display: inline-block; margin: 10px;">
                            <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.title}</h5>
                                <p class="card-text">${producto.description}</p>
                                <a href="#" class="btn btn-primary">Mas información</a>
                            </div>
                        </div>`
                    );
        
                    i++; //le sumo 1 al contador
                } while (i < res.length); //cuando ya no hay productos se detiene el bucle
    } catch(err) {
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-warning" role="alert">
                ${err.message}
            </div>`);
    }
}//createCards

createCards(); //mandamos a llamar la funcion createCards

//Agregar modal ---->Pendiente 