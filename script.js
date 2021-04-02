const buscar = document.querySelector('#buscar')
const pelicula = document.querySelector('#pelicula')
const poster = document.querySelector('#poster')
const button_add = document.querySelector('#button_add')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const cart_cant = document.querySelector('#cart_cant')

let state = {
    movieView: {},
    cart: []
}

const eliminarItemState = (item, value) => {
    switch (item) {
        case 'cart':
            state.cart.splice(value, 1)
            updateCart()
            section_cart_ini()
            break;
    }
    localStorage.setItem('state',JSON.stringify(state))
}
const updateCart = () => {
    if (state.cart.length === 0) {
        cart_cant.style.display = 'none'
    } else {
        cart_cant.style.display = 'block'
    }
    cart_cant.textContent = state.cart.length
}
const addItemState = (item, value) => {
    console.log('&&&',value);
    switch (item) {
        case 'movieView':
            state.movieView = value
            title.textContent = state.movieView.Title
            price.textContent = `$ ${state.movieView.Metascore}`
            poster.src = state.movieView.Poster
            break;
        case 'cart':
            state.cart = [...value, ...state.cart]
            updateCart()
            break;
    }
    localStorage.setItem('state',JSON.stringify(state))
}



button_add.addEventListener('click', () => {
    /* state.movieView. */
    if(Object.keys(state.movieView).length>0){
        console.log(state.movieView);
        addItemState('cart', [state.movieView])
    }else{
        alert('Debes seleccionar una pelicula')
    }
})
buscar.addEventListener('click', () => {
    button_add.style.display = 'block'
    let titulo = pelicula.value
    llamarApi(titulo)
})
const llamarApi = async (titulo) => {

    var myHeaders = new Headers();

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://www.omdbapi.com/?t=${titulo}&apikey=e8f70e93`, requestOptions)
        .then(response => response.json())
        .then(result => {
            addItemState('movieView', result)
        })
        .catch(error => console.log('error', error));
}




const section_busqueda = document.querySelector('#section_busqueda')
const section_cart = document.querySelector('#section_cart')
const cart_button = document.querySelector('#cart_button')
const seguir_button = document.querySelector('#seguir_button')
const cart_list_message = document.querySelector('#cart_list_message')
const cart_list_details = document.querySelector('#cart_list_details')
const cart_list = document.querySelector('#cart_list')

cart_button.addEventListener('click', () => {
    section_busqueda.style.display = 'none'
    section_cart.style.display = 'block'
    section_cart_ini()
})
seguir_button.addEventListener('click', () => {
    section_cart.style.display = 'none'
    section_busqueda.style.display = 'block'
})

const section_cart_ini = () => {
    console.log('ini');
    if (state.cart.length === 0) {
        console.log('state 0 ');
        cart_list_details.style.display = 'none'
        cart_list_message.style.display = 'grid'
        return false
    }
    update_cart_list();
    cart_list_message.style.display = 'none'
    cart_list_details.style.display = 'grid'
    return true
}

const llenar_items_cart = () => {
    let total = 0;
    for (const [index, item] of state.cart.entries()) {
        let li = document.createElement('li')
        li.classList.add('row', 'between', 'cart-list-item')
        li.innerHTML = `
        <span >
            <button>-</button>
            ${item.Title}
        </span>
        <span>$${item.Metascore}</span>
        </li>
        `
        let button = li.querySelector('button')
        console.log(button);
        button.addEventListener('click', () => {
            eliminarItemState('cart', index)
            update_cart_list()
            console.log(state);
        })
        cart_list.appendChild(li)
        console.log(li);
        total += parseFloat(item.Metascore);
    }
    if (total > 0) {
        let li = document.createElement('li')
        li.classList.add('row', 'between', 'cart-list-total')
        li.innerHTML = `<span >
    Total: 
    </span>
    <span>$${total}</span>`
        cart_list.appendChild(li)
    }
    console.log(total);
}
const update_cart_list = () => {
    cart_list.innerHTML = ''
    llenar_items_cart()
    console.log(state);
}


const iniciar = ()=>{
    let state_string = localStorage.getItem('state')
console.log(JSON.parse(state_string));
if(state_string){
    button_add.style.display = 'block'
    new_state = JSON.parse(state_string)
    for (const key in new_state) {
        console.log(key,new_state[key]);
        addItemState(key,new_state[key])
    }
}
}


iniciar()