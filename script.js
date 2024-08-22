    
// apparution de l'input
function apparutionBtnRecherche(){
    let btnRecherche=document.querySelector("nav .sherch div")
    let input=document.querySelector(".recherche .inputrecherche")
    let texte=document.getElementById("titre")    
        btnRecherche.addEventListener("click",()=>{
            input.classList.toggle("inputActiv")
            texte.classList.toggle("titreActive")
        })
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
}affichefilms()

// reduit la card quand elle est agrandi
function close(){
    let close=document.querySelectorAll(".card .close")
    let cards=document.querySelectorAll(".card")
        close.forEach((element)=>{
                element.addEventListener("click",()=>{
                    cards.forEach((element)=>{
                        element.classList.remove("cardPleinEcran")
                    })
                })
        })
}close()

// affichage en fonction de la taille de la div
function resize(){
    let cards=document.querySelectorAll(".card")
    let close=document.querySelectorAll('.card .close')
    for(let i=0;i<cards.length;i++){
        cards[i].addEventListener("click",()=>{
            const largeur=cards[i].offsetWidth
            if(largeur>250){
                // quand la div prend tout l'ecrant
                close.forEach((element)=>{
                    element.classList.add("closeVisible")
                })
            }
                // quand la dive est petite 
            if(largeur<=250){
                close.forEach((element)=>{
                    element.classList.remove("closeVisible")
                })
            }
        })
    }
} resize()

// gestion du boutton BG
function btnBG(){
    let btnBG=document.querySelector(".btnBG")
    let Menu=document.querySelector(".container .Menu")
        btnBG.addEventListener("click",()=>{
            Menu.classList.toggle("MenuVisible")
        })
}btnBG()

// les films disponible a l'acceuil
// function filmsacceuil(){
//     console.log("elvis")
//     window.addEventListener("load",()=>{
//         const apiKey = '9679335a71a266a04448afcc3f1810a5';
//         const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`;
//         fetch(url)
//                 .then(reponse=>{
//                     if(!reponse.ok){
//                         throw new Error("erreur")
//                     }
//                     return reponse.json()
//                 })
//                 .then(data=>{
//                     console.log(data.results)
//                     Domcreat(data.results)
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                 })
//     })
// } filmsacceuil() 

// fetching de donnee et generation du dome
let categorieContent=document.querySelector(".Menu .categories")
       //    fonction 1
async function fetchData(){
try{
        const apiKey = '9679335a71a266a04448afcc3f1810a5';
        const url1 = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
        const resultat=await fetch(url1)
        const donnee=await resultat.json()
        const genres=donnee.genres
        const icns=["icons8-action-96.png",
                    "icons8-boussole-50.png",
                    "icons8-animation-50 (1).png",
                    "icons8-comédie-50.png",
                    "icons8-piratage-informatique-50.png",
                    "icons8-documentaire-50.png",
                    "icons8-drame-50.png",
                    "icons8-famille-homme-femme-50.png",
                    "icons8-fantaisie-50.png",
                    "icons8-historique-des-commandes-50.png",
                    "icons8-pennywise-50.png",
                    "icons8-musique-50.png",
                    "icons8-troisième-oeil-symbole-50.png",
                    "icons8-rendez-vous-galant-homme-femme-50.png",
                    "icons8-robot-3-50.png","icons8-télévision-50.png",
                    "icons8-thriller-50.png",
                    "icons8-réfugié-de-guerre-50.png",
                    "icons8-occidental-50.png",
                    ]
        for(let i=0;i<genres.length;i++){
            let dive=document.createElement("div")
                dive.classList.add("item")
                dive.textContent=genres[i].name
            let icons=document.createElement("img") 
                icons.src=`icon/${icns[i]}` 
                dive.appendChild(icons)  
            categorieContent.appendChild(dive)   
        }
          // affichage des films
        let texte=document.getElementById("titre") 
           // fontion 2
        function affichage(){
            const btnsCategories=document.querySelectorAll(".categories .item")
            for(let i=0; i<btnsCategories.length;i++){
                btnsCategories[i].addEventListener("click", async function(){
                    texte.textContent=genres[i].name 
                    // fonction pour pouvoir afficher plusieur pages a la fois
                            // foction 3
                    async function pages(){
                        const resultat=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=1`)
                        const donnee=await resultat.json()
                        const resultat2=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=2`)
                        const donnee2=await resultat2.json()
                        const resultat3=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=3`)
                        const donnee3=await resultat3.json()
                        const resultat4=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=4`)
                        const donnee4=await resultat4.json()
                        const resultat5=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=5`)
                        const donnee5=await resultat5.json()
                        const resultat6=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=6`)
                        const donnee6=await resultat6.json()
                        const Alldonnee=[...donnee.results, ...donnee2.results, ...donnee3.results, ...donnee4.results, ...donnee5.results, ...donnee6.results]
                            // fonction 4
                function Domcreat(Alldonnee){      
                            let contenuContent=document.querySelector(".container .contenu")
                                contenuContent.innerHTML=""
                            for(let i=0;i<Alldonnee.length; i++){
                                let urlImage=Alldonnee[i].poster_path                                
                                let titre=Alldonnee[i].original_title
                                let dateDesortie=Alldonnee[i].release_date.split("-")
                                let dateActuelle=new Date()
                                const tsparmoi=2592000000
                                let timestempActuelEnMoi=dateActuelle.getTime()/tsparmoi
                                let timestempSortiDuFilme=new Date(`${dateDesortie[0]}-${dateDesortie[1]}`).getTime()/tsparmoi
                                let differenceDeMoi=timestempActuelEnMoi-timestempSortiDuFilme
                                            // la card
                                const div=document.createElement("div")
                                    div.classList.add("card")
                                            // btn close
                                const close=document.createElement("div")
                                    close.classList.add("close")
                                const span1=document.createElement("span")    
                                const span2=document.createElement("span")
                                    close.appendChild(span1) 
                                    close.appendChild(span2) 
                                div.appendChild(close)  
                                            // autre contenu
                                const divImg=document.createElement("div")   
                                    divImg.classList.add("imgdiv")
                                    divImg.classList.add("petiEcrantOnly")
                                    divImg.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${urlImage})`
                        
                                            // indicatif de nouveauter
                                    if(differenceDeMoi<=7){
                                        const news=document.createElement("div") 
                                        news.textContent="NEW" 
                                        news.classList.add("new")
                                        news.classList.add("petiEcrantOnly")
                                        divImg.appendChild(news) 
                                    } 
                                        div.appendChild(divImg)
                                          // titre
                                const divtitr = document.createElement("div") 
                                    divtitr.classList.add("titre")
                                    divtitr.classList.add("petiEcrantOnly")
                                const para=document.createElement("p")
                                    divtitr.appendChild(para)
                                    para.textContent=titre
                                    div.appendChild(divtitr)
                                    contenuContent.appendChild(div)
                            }
                            affichefilms();close();resize()
                            
                            // gestion de laffichage en fonction de ta taille de notre card
                            let cards=document.querySelectorAll(".card")
                            let aCacher=document.querySelectorAll(".petiEcrantOnly")                 
                            for(let i=0;i<cards.length;i++){
                                let urlImage=Alldonnee[i].backdrop_path
                                let urlImage2=Alldonnee[i].poster_path  
                                let grandEcrantActiv=true //pour stoper la repetion quand on click sur un element
                                cards[i].addEventListener("click",()=>{
                                    const largeur=cards[i].offsetWidth
                                    // ###################################################################################################################################
                                     // quand la div prend tout l'ecrant
                                    if(largeur>250 && grandEcrantActiv){
                                        aCacher.forEach(element=>element.classList.add("invisible"))
                                        cards[i].style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${urlImage})`
                                                    // l'effet flou
                                        const filter=document.createElement("div")
                                                filter.classList.add("filter")
                                                filter.classList.add("grandEcrantOnly")
                                                    // container du center
                                        const center=document.createElement("div")
                                                center.classList.add("center")
                                                center.classList.add("grandEcrantOnly")
                                                filter.appendChild(center)  
                                        const imtext=document.createElement("div")
                                                imtext.classList.add("imtext")  
                                        const im=document.createElement("div")
                                                im.classList.add("im")
                                        const image=document.createElement("div")
                                                image.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${urlImage2})`
                                                im.appendChild(image)        
                                        const text=document.createElement("div") 
                                                text.classList.add("text") 
                                        const tr=document.createElement("h2")
                                                tr.textContent=Alldonnee[i].title 
                                        const p1=document.createElement("p")
                                                p1.textContent=Alldonnee[i].overview 
                                                text.appendChild(tr)   
                                                text.appendChild(p1)                                              
                                        const autreIfo=document.createElement("div")
                                                autreIfo.classList.add("autreinfo")
                                        const canva=document.createElement("div") 
                                                canva.classList.add("canva")
                                        const date=document.createElement("div") 
                                                date.classList.add("date")
                                        const p5=document.createElement("p")
                                        const p6=document.createElement("p")
                                                p5.textContent=`Date de sortie: ${Alldonnee[i].release_date}`
                                                p6.textContent=`Nombre de votes: ${Alldonnee[i].vote_count}` 
                                                date.appendChild(p5) 
                                                date.appendChild(p6)       
                                        const canvas=document.createElement("canvas")
                                        canva.appendChild(canvas)   
                                                autreIfo.appendChild(canva)
                                                autreIfo.appendChild(date)   
                                                im.classList.add("image")
                                                imtext.appendChild(im)
                                                imtext.appendChild(text)
                                                center.appendChild(imtext)
                                                center.appendChild(autreIfo)
                                                text.classList.add("text")
                                                cards[i].appendChild(filter)
                                                       // popularity
                                                canvas.classList.add("myRingChart")
                                                const ctx = canvas.getContext('2d');
                                                const myRingChart = new Chart(ctx, {
                                                    type: 'doughnut', // Utilisez 'doughnut' pour un graphique en anneau
                                                    data: {
                                                        labels: ["popularity"],
                                                        datasets: [{
                                                            label: 'My Dataset',
                                                            data: [Alldonnee[i].popularity,100],
                                                            backgroundColor: [
                                                                ' rgb(255, 0, 111)',
                                                                'rgba(54, 162, 235, 0.2)'
                                                            ],
                                                            borderColor: [
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)'
                                                            ],
                                                            borderWidth: 1
                                                        }]
                                                    },
                                                    options: {
                                                        cutout: '60%', // Détermine la taille de l'anneau
                                                        plugins: {
                                                            legend: {
                                                                position: 'bottom',
                                                            },
                                                            tooltip: {
                                                                callbacks: {
                                                                    label: function(tooltipItem) {
                                                                        return tooltipItem.label + ': ' + tooltipItem.raw;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                });    
                                                grandEcrantActiv=false     
                                    }
                                      // ###################################################################################################################################
                                        // quand la dive est petite 
                                        let elementAcacher=document.querySelectorAll(".grandEcrantOnly")
                                    if(largeur<=250){
                                            grandEcrantActiv=true
                                            cards[i].style.backgroundImage=""
                                            aCacher.forEach(element=>element.classList.remove("invisible"))
                                            elementAcacher.forEach(element=>element.classList.add("invisible"))
                                    }
                                })
                            }
                        }Domcreat(Alldonnee) 
                    }pages()
                })
            }
        }affichage()
    }
    catch(e){
        console.error(e)
    }
}fetchData()
