
const texto = document.getElementById("busca")

let AnimesPesquisados = []

async function PegarUrl() {
    const src = document.getElementById("busca")
    const url = `https://api.jikan.moe/v4/anime?q=${src.value}`;


   
    const response = await fetch(url)
    if (src.value !== "") { 
       

        if (response.status === 200) {
            const data = await response.json()

            if (data.data.length === 0) {
                alert("deu erro")
            } else if (!AnimesPesquisados.includes(src.value)) {

      
               
                const anime = data.data[0]
        
                const imagem = anime.images.jpg.image_url;
        
                console.log(imagem)
        
                const imagemDoAnime = document.createElement("img")
                imagemDoAnime.src = imagem
                imagemDoAnime.style.width = "100%"
                imagemDoAnime.style.height = "100%"
                imagemDoAnime.style.objectFit = "cover"
                 
                const div = document.getElementById("anime")
                div.appendChild(imagemDoAnime)
                
                AnimesPesquisados.push(src.value)

                console.log(AnimesPesquisados)

                src.value = ""
                
                

                
    
            }else {
                alert("esse anime ja foi adicionado a lista     ")
            }
        }
    } else {
        alert("coloque algo")
    }
}

texto.addEventListener('focus',function(focus){
    document.addEventListener('keydown', function(event) {
        if (event.key == 'Enter' || event.key == 'Tab') {
            PegarUrl()
        }
    })
    
    
})

function focar() {
    texto.focus()
}

