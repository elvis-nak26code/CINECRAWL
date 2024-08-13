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
                    async function pages(){
                        const resultat=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=1`)
                        const donnee=await resultat.json()
                        const resultat2=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=2`)
                        const donnee2=await resultat2.json()
                        const resultat3=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=3`)
                        const donnee3=await resultat3.json()
                        const resultat4=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=4`)
                        const donnee4=await resultat4.json()
                        const resultat5=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=5`)
                        const donnee5=await resultat5.json()
                        const resultat6=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genres[i].id}&page=6`)
                        const donnee6=await resultat6.json()
                        const Alldonnee=[...donnee.results, ...donnee2.results, ...donnee3.results, ...donnee4.results, ...donnee5.results, ...donnee6.results]

                            for(let i=0;i<Alldonnee.length; i++){
                                let urlImage=Alldonnee[i].backdrop_path
                                // console.log(donnee)
                                const div=document.createElement("div")
                                    div.classList.add("card")
                                    div.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${urlImage})`
                                const close=document.createElement("div")
                                    close.classList.add("close")
                                const span1=document.createElement("span")    
                                const span2=document.createElement("span") 
                                    close.appendChild(span1) 
                                    close.appendChild(span2) 
                                div.appendChild(close)   
                                contenuContent.appendChild(div)
                            }
                            affichefilms()
                            close()
                            close2()
                    }pages()
                })
            }
        }affichage()
    }
    catch(e){
        console.error(e)
    }
}fetchData()
