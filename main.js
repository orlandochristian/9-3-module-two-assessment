
form = document.querySelector("form")
reviewsVisible = document.getElementById("reviews")

let peliculas =[]
let personas = []
let movieqesta = ''


document.getElementById("reset-reviews").addEventListener("click", ()=> {
   for (const li of document.querySelectorAll(".lis")) {
      li.remove();
   } 
   reviewsVisible.style.display = "none"
})


form.addEventListener("submit",(event) => {
    event.preventDefault();
    reviewsVisible.style.display = "inline"

    if (movieqesta === '') { alert('Please select a movie first')}
    else {
    const textInput = event.target.review.value
    form.reset();
    const ul= document.querySelector("ul")
    const li = document.createElement("li")
    li.setAttribute("class","lis")
    li.innerHTML= `<strong>${movieqesta}: </strong>${textInput}` 
    ul.append(li)
    }

})


function fetchFilms() {
    fetch('https://resource-ghibli-api.onrender.com/films')
      .then((res) => { 
        return res.json();
       })
       .then( (films) => {
          peliculas = films
          loadFilms(films)
       }) 
       .catch() 
}

// function fetchPeople() {
//     fetch('https://resource-ghibli-api.onrender.com/?????people aca??????????')
//     .then((res) => { 
//       return res.json();
//      })
//      .then( (people) => {
//         personas = people
//      }) 
//      .catch() 
// }


function loadFilms(films) {
 
  document.getElementById("divtitle").innerHTML = `
  <select id="titles" onchange="loadoneFilm(this.value)">
       <option></option>
       ${films.map( x =>  `<option>${x.title}</option>`).join('')}
  </select>`
  
 



}





function loadoneFilm(peli) {
    
     for (const h3pp of document.querySelectorAll(".borra")  ) {
       h3pp.remove()} 
  
   movieqesta = peli
  
  let pelicula = peliculas.find(x => x.title === peli)
  let detail = document.getElementById("display-info")
  
  const h3 = document.createElement("h3")
  h3.setAttribute("class","borra")
  h3.textContent = "Original Title: " + pelicula.title
  
  const p1 = document.createElement("p")
  p1.setAttribute("class","borra")
  p1.textContent = "Release Date: " + pelicula.release_date

  const p2 = document.createElement("p")
  p2.setAttribute("class","borra")
  p2.textContent = "Description: " + pelicula.description

  detail.append(h3, p1, p2)

  document.getElementById("show-people").addEventListener("click",() => {
    //primero borro lo que ya existe en ol
    for (const li of document.querySelectorAll(".lis2")) {
        li.remove();
     } 
     // llamar a armarOL con el array de people para poner todos los li inside the ol
    //armarOL(pelicula.people ??? tiene q ser el array)
  })


//   form.addEventListener("submit",(event) => {
//     event.preventDefault();
//     reviewsVisible.style.display = "inline"

//     const textInput = event.target.review.value
//     form.reset();
//     const ul= document.querySelector("ul")
//     const li = document.createElement("li")
//     li.setAttribute("class","lis")
//     li.innerHTML= `<strong>${peli}: </strong>${textInput}`  ;
//     ul.append(li)

// })
}

function armarOL (actores) {
    const ol = document.querySelector("ol")
    actores.map((actor) => {
        let bioDetail = personas.find((bio) => bio.id === actor.slice(8))
        const li = document.createElement("li")
        li.setAttribute("class","lis2")
        li.textContent = bioDetail.name
        ol.append(li)
    })

}


















// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 fetchFilms();
//fetchPeople();
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
