const buscar = document.querySelector('#buscar')
const pelicula = document.querySelector('#pelicula')
const poster = document.querySelector('#poster')



buscar.addEventListener('click',()=>{
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

    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=e8f70e93`, requestOptions)
        .then(response => response.json())
        .then(result => {
            /* console.log(result.poster);
            console.log(poster); */
            console.log(typeof result);
            poster.src = result.Poster
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

