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
function filmsDacceuil(){
    console.log("elvis")
    window.addEventListener("load",()=>{
        const apiKey = '9679335a71a266a04448afcc3f1810a5';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=10`;
        fetch(url)
                .then(reponse=>{
                    if(!reponse.ok){
                        throw new Error("erreur")
                    }
                    return reponse.json()
                })
                .then(data=>{
                    Domcreator(data.results)
                })
                .catch(err=>{
                    console.log(err)
                })
    })
} filmsDacceuil() 


// fonction charger de la creation des card et leur insertion dans le Dom
function Domcreator(donnee){      
    let contenuContent=document.querySelector(".container .contenu")
        contenuContent.innerHTML=""
    for(let i=0;i<donnee.length; i++){
        let urlImage=donnee[i].poster_path                                
        let titre=donnee[i].original_title
        let dateDesortie=donnee[i].release_date.split("-")
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
            // if(urlImage===null){
            //     divImg.style.backgroundImage="url(6621261.jpg)"
            // }
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
        let urlImage=donnee[i].backdrop_path
        let urlImage2=donnee[i].poster_path  
        let grandEcrantActiv=true //pour stoper la repetion quand on click sur un element

        cards[i].addEventListener("click",()=>{
            const largeur=cards[i].offsetWidth
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
                        tr.textContent=donnee[i].title 
                const p1=document.createElement("p")
                        p1.textContent=donnee[i].overview 
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
                const playcontainer=document.createElement("div")
                        playcontainer.classList.add("playcontainer")
                const play1=document.createElement("div")
                        play1.classList.add("play1")
                const play2=document.createElement("div")
                        play2.classList.add("play2")
                const play3=document.createElement("div")
                        play3.classList.add("play3")
                        p5.textContent=`Date de sortie: ${donnee[i].release_date}`
                        p6.textContent=`Nombre de votes: ${donnee[i].vote_count}` 
                        date.appendChild(p5) 
                        date.appendChild(p6) 
                        playcontainer.appendChild(play1)
                        playcontainer.appendChild(play2)
                        playcontainer.appendChild(play3)
                        date.appendChild(playcontainer)      
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
                            type: 'doughnut', // graphique en anneau
                            data: {
                                labels: ["popularity"],
                                datasets: [{
                                    label: 'My Dataset',
                                    data: [donnee[i].popularity,100],
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

                        // la fonction play permet voir la band d'annonce
                        function play(){
                            let btnplays=document.querySelectorAll(".center .autreinfo .date .play1")
                            console.log(btnplays)
                            btnplays.forEach(element=>{
                                element.addEventListener("click",()=>{
                                    let id=donnee[i].id
                                    // alert(id)
                                    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
                                    fetch(url)
                                        .then(reponse=>reponse.json())
                                        .then(data=>{
                                                const trailer=data.results.find(video=>video.type === 'Trailer' && video.site === 'YouTube')

                                                if(trailer){
                                                    const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}?rel=0`;
                                                    console.log(youtubeUrl)
                                                    const video=document.createElement("iframe")
                                                            video.classList.add("video")
                                                            video.setAttribute("allowfullscreen","")
                                                            video.title="elvis"
                                                            video.src=youtubeUrl
                                                    filter.appendChild(video)

                                                    filter.addEventListener("click",()=>{
                                                        console.log("c'est bien moi")
                                                        video.classList.add("closevideo")
                                                        video.parentNode.removeChild(video);
                                                    })
                                                    let close=document.querySelectorAll(".card .close")
                                                        close.forEach((element)=>{
                                                                element.addEventListener("click",()=>{
                                                                    video.classList.add("closevideo")
                                                                    video.parentNode.removeChild(video);
                                                                })
                                                        })
                                                }
                                                    else{throw new error()} 
                                            })
                                        .catch(e=>{
                                            alert("video indisponible")
                                        })
                                        
                                })
                            })
                        }play()
            }
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
}


// fonction charger de la creation de categories et a l'appelle de la fonction domcreator
    let categorieContent=document.querySelector(".Menu .categories")
    const apiKey = '9679335a71a266a04448afcc3f1810a5';
async function fetchData(){
try{
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
            const btnsCategories=document.querySelectorAll(".categories .item")
            for(let i=0; i<btnsCategories.length;i++){
                btnsCategories[i].addEventListener("click", async function(){
                    texte.textContent=genres[i].name 
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
                        const resultat7=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&with_genres=${genres[i].id}&page=7`)
                        const donnee7=await resultat7.json()
                        const Alldonnee=[...donnee.results, ...donnee2.results, ...donnee3.results, ...donnee4.results, ...donnee5.results, ...donnee6.results,...donnee7.results]
                            // fonction qui cree le dom
                        Domcreator(Alldonnee) 
                })
            }
    }
    catch(e){
        console.error(e)
        alert("une erreur a survenue")
    }
}fetchData()

// recherche par nom et par mot clee
function recherche(){
    const input=document.getElementById("barRecherche")
    const btnSubmit=document.getElementById("submit")
    btnSubmit.addEventListener("click",async ()=>{
        try{
            let nomDuFilm=input.value
            let resultat=fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr&query=${encodeURIComponent(nomDuFilm)}&page=1`)
            let resultat2=fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr&query=${encodeURIComponent(nomDuFilm)}&page=2`)
            let reonse= await (await resultat).json()
            let reonse2= await (await resultat2).json()
            let reponseFinal=[...reonse.results,...reonse2.results]
            if(reponseFinal.length==0){
                throw new error()
            }
            console.log(reonse.results)
            Domcreator(reponseFinal) 
        } 
        catch(e){
            console.log(e.message)
            alert(" aucun resultats trouver")
            input.value=""
        }      
        let texte=document.getElementById("titre")
            texte.textContent=input.value
    })

}recherche()
