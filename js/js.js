
const texto = document.getElementById("busca")

const mostra = document.getElementById("mostra")

let AnimesPesquisados = []

let animeDiv;


async function PegarUrl() {
    const src = document.getElementById("busca")
    const url = `https://api.jikan.moe/v4/anime?q=${src.value}`;


   
    const response = await fetch(url)
    if (src.value !== "") { 
       if (response.status === 200) {
            const data = await response.json()

            if (data.data.length === 0) {
                console.log("deu erro")
            } else if (!AnimesPesquisados.includes(src.value)) {
                let imagem;
                let titulo;
                let ep;
                let movie = false;
                let year;
                

                const anime = await data.data[0]  
                if (  anime.images?.jpg?.image_url !== null) {
                     imagem =  anime.images.jpg.image_url; 
                    console.log(imagem)
                }else {
                    console.log("imagens invalidadas na api")
                }
                if ( anime.title !== null) {
                     titulo =  anime.title;
                     
                }else {
                    console.log("titulo invalido")
                }
                if (  anime.episodes !== null) {
                     ep =  anime.episodes;
                     if (ep == 1) {
                        movie = true;
                        if (anime.duration != null) {
                            ep = anime.duration;
                        }
                     }
                }else {
                    console.log("numero de episodios nao encontrado")
                }
                if (anime.year !== null) {
                    year = anime.year
                }else{
                    if (anime.aired.prop.from.year != null || anime.aired.prop.from.year != undefined) {
                        year = anime.aired.prop.from.year
                    }else {
                        year = ""
                    }
                }
                
                const textEp = document.createElement("p")
                
                const text = document.createElement("p")
            
                const imagemDoAnime = document.createElement("img")
                imagemDoAnime.src = imagem
                imagemDoAnime.style.width = "100%";
                imagemDoAnime.style.height = "100%";
                imagemDoAnime.style.objectFit = "cover";
                
                
                animeDiv = document.createElement("div")
                animeDiv.id = `${titulo}`
                console.log(animeDiv.id)
            
                
                const DivName = animeDiv.getAttribute(`${src}`)
                animeDiv.appendChild(text)
                mostra.appendChild(animeDiv)
               
                animeDiv.classList.add("class")
               
                animeDiv.appendChild(imagemDoAnime)
                
                text.innerHTML = titulo
                
                animeDiv.appendChild(textEp)
            
                AnimesPesquisados.push(titulo)
                console.log(AnimesPesquisados)
            
                src.value = ""
                
                console.log(document.querySelectorAll(".class").length)
                
                if (year == null) {
                    textEp.innerHTML = `Lançamento: Episódios:${ep}`
                   
                }
                else if (ep == null && movie == false) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios:`
                }
                else if (ep == null && movie == true) {
                     textEp.innerHTML = `Lançamento: ${year}<br>Duração:`
                }
                else if (ep == null && year) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios:`
                }else if (ep !==null && movie == true) {
                     textEp.innerHTML = `Lançamento: ${year}<br>Duração: ${ep}`
                }
                else {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios: ${ep}`
                }
            }else {
                alert("esse anime ja foi adicionado a lista     ")
            }
        }
    } else {
        alert("digite algo")
    }
}

    texto.addEventListener('keydown', function(event) {
        if (event.key == 'Enter' || event.key == 'Tab') {
            PegarUrl()
        }
    })




function focar() {
    texto.focus()
}

let AnimesDeletor = [];

mostra.addEventListener('click',function(event){
    let animeMarcado = false;

    

    const animeClicado = event.target.closest("div");

    if (animeClicado && animeMarcado == false) {
        let animeMarcado = true;
        if (animeMarcado) {
            AnimesSelecionado = animeClicado.id

            console.log("FOi clicado o animme:", animeClicado.id);
        }
        if (animeMarcado == true &&  animeClicado.id && animeClicado.id !== "mostra" && document.getElementById(`${AnimesSelecionado}`).style.border !== "1px solid red") {
            document.getElementById(`${AnimesSelecionado}`).style.border = "1px solid red"
            if (!AnimesDeletor.includes(AnimesSelecionado)) {
                AnimesDeletor.push(AnimesSelecionado)
                console.log("a", AnimesDeletor)

            }
        }else if (animeMarcado == true &&  animeClicado.id && animeClicado.id !== "mostra" && document.getElementById(`${AnimesSelecionado}`).style.border == "1px solid red") {
            console.log("deu bom")
            document.getElementById(`${AnimesSelecionado}`).style.removeProperty('border')
            if(AnimesDeletor.includes(AnimesSelecionado)) {
                AnimesDeletor.splice(AnimesSelecionado)
            }
        }
    }

   
})

function Delete() {
    if (AnimesDeletor.length > 0) {
        AnimesDeletor.forEach(element => {
            document.getElementById(`${element}`).remove()
            AnimesDeletor = []
            AnimesPesquisados.filter(item => !AnimesDeletor.includes(item));
            console.log(AnimesPesquisados)
            
        })
    }else {
        alert("selecione algo para deletar")
    }
    
    
}
