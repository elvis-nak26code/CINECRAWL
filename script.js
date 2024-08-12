// apparution de l'input
function apparutionBtnRecherche(){
    let btnRecherche=document.querySelector("nav .sherch div")
    let input=document.querySelector(".recherche .inputrecherche")
    let texte=document.getElementById("titre")    
        btnRecherche.addEventListener("click",()=>{
            input.classList.toggle("inputActiv")
            texte.classList.toggle("titreActive")
        })
console.log(input)
}apparutionBtnRecherche()

// agrandi la card au click pour mermetre de voir les informations sur les films
function affichefilms(){
    let cards=document.querySelectorAll(".card")
    let active=false
        cards.forEach((element)=>{
            element.addEventListener("click",()=>{
                if(!active){
                    element.classList.add("cardPleinEcran")
                }
                    active = active === true ? false : true;
            })
        })
    console.log(cards)
}affichefilms()

// reduit la card quand elle est agrandi
function close(){
    let close=document.querySelectorAll(".card .close")
    let cards=document.querySelectorAll(".card")
    console.log(close)
        close.forEach((element)=>{
                element.addEventListener("click",()=>{
                    cards.forEach((element)=>{
                        element.classList.remove("cardPleinEcran")
                    })
                })
        })
}close()

// apparution et disparution du bouton close 
function close2(){
    let close=document.querySelectorAll('.card .close')
    let cards=document.querySelectorAll(".card")
        cards.forEach((element)=>{
            element.addEventListener("click",()=>{
                close.forEach((element)=>{
                    element.classList.toggle("closeVisible")
                    console.log(element)
                })
            })
        })
} close2()

// gestion du boutton BG
function btnBG(){
    let btnBG=document.querySelector(".btnBG")
    let Menu=document.querySelector(".container .Menu")
        btnBG.addEventListener("click",()=>{
            Menu.classList.toggle("MenuVisible")
        })
    console.log(Menu)
}btnBG()

// fetching de donnee et generation du dome
let categorieContent=document.querySelector(".Menu .categories")
async function fetchData(){
    const apiKey = '9679335a71a266a04448afcc3f1810a5';
    const url1 = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    try{
        const resultat=await fetch(url1)
        const donnee=await resultat.json()
        const genres=donnee.genres
        for(let i=0;i<genres.length;i++){
            let dive=document.createElement("div")
                dive.classList.add("item")
                dive.textContent=genres[i].name
            categorieContent.appendChild(dive)   
        }
          // affichage des films
let contenuContent=document.querySelector(".container .contenu")
let texte=document.getElementById("titre") 
console.log(contenuContent)
        function affichage(){
            const btnsCategories=document.querySelectorAll(".categories .item")
            for(let i=0; i<btnsCategories.length;i++){
                btnsCategories[i].addEventListener("click", async function(){
                    contenuContent.innerHTML="" 
                    texte.textContent=genres[i].name
                    // fonction pour pouvoir afficher plusieur pages a la fois
                    async function pages(page){
                        const resultat=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=${page}`)
                        const donnee=await resultat.json()
                            for(let i=0;i<donnee.results.length; i++){
                                let urlImage=donnee.results[i].backdrop_path
                                // console.log(donnee)
                                const div=document.createElement("div")
                                    div.classList.add("card")
                                    div.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${urlImage})`
                                const close=document.createElement("div")
                                    close.classList.add("close")
                                div.appendChild(close)   
                                contenuContent.appendChild(div)
                            }
                            affichefilms()
                            close()
                            close2()
                    }pages(1)
                    // ; pages(2);pages(3);pages(4);pages(5);pages(6); pages(7);pages(8);
                })
            }
        }affichage()
    }
    catch(e){
        console.error(e)
    }
}fetchData()
