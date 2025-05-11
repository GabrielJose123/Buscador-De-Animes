const texto = document.getElementById("busca");
const mostra = document.getElementById("mostra");

let AnimesPesquisados = [];
let AnimesDeletor = [];
let animeMarcado = false;

async function PegarUrl() {
    const src = document.getElementById("busca");
    const url = `https://api.jikan.moe/v4/anime?q=${src.value}`;

    const response = await fetch(url);

    if (src.value !== "") {
        if (response.status === 200) {
            const data = await response.json();

            if (data.data.length === 0) {
                console.log("deu erro");
            } else if (!AnimesPesquisados.includes(src.value)) {
                let imagem;
                let titulo;
                let ep;
                let movie = false;
                let year;

                const anime = data.data[0];

                if (anime.images?.jpg?.image_url) {
                    imagem = anime.images.jpg.image_url;
                    console.log(imagem);
                } else {
                    console.log("imagens inválidas na API");
                }

                if (anime.title) {
                    titulo = anime.title;
                } else {
                    console.log("título inválido");
                }

                if (anime.episodes !== null) {
                    ep = anime.episodes;
                    if (ep == 1) {
                        movie = true;
                        if (anime.duration) {
                            ep = anime.duration;
                        }
                    }
                } else {
                    console.log("número de episódios não encontrado");
                }

                if (anime.year !== null) {
                    year = anime.year;
                } else if (anime.aired?.prop?.from?.year) {
                    year = anime.aired.prop.from.year;
                } else {
                    year = "";
                }

                const textEp = document.createElement("p");
                const text = document.createElement("p");

                const imagemDoAnime = document.createElement("img");
                imagemDoAnime.src = imagem;
                imagemDoAnime.style.width = "100%";
                imagemDoAnime.style.height = "100%";
                imagemDoAnime.style.objectFit = "cover";

                const animeDiv = document.createElement("div");
                animeDiv.id = titulo;
                animeDiv.classList.add("class");

                text.innerHTML = titulo;
                animeDiv.appendChild(text);
                animeDiv.appendChild(imagemDoAnime);
                animeDiv.appendChild(textEp);

                mostra.appendChild(animeDiv);

                AnimesPesquisados.push(src.value);
                src.value = "";

                if (year == null) {
                    textEp.innerHTML = `Lançamento: Episódios: ${ep}`;
                } else if (ep == null && !movie) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios:`;
                } else if (ep == null && movie) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Duração:`;
                } else if (ep == null && year) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios:`;
                } else if (ep !== null && movie) {
                    textEp.innerHTML = `Lançamento: ${year}<br>Duração: ${ep}`;
                } else {
                    textEp.innerHTML = `Lançamento: ${year}<br>Episódios: ${ep}`;
                }

                console.log(AnimesPesquisados);
                console.log(document.querySelectorAll(".class").length);
            } else {
                alert("Esse anime já foi adicionado à lista.");
            }
        }
    } else {
        alert("Digite algo.");
    }
}

texto.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
        PegarUrl();
    }
});

function focar() {
    texto.focus();
}

mostra.addEventListener('click', function (event) {
    const animeClicado = event.target.closest("div");
    if (animeClicado && animeClicado.id !== "mostra") {
        animeMarcado = true;
        const animeSelecionado = animeClicado.id;

        console.log("Foi clicado o anime:", animeSelecionado);

        animeClicado.style.border = "1px solid red";

        if (!AnimesDeletor.includes(animeSelecionado)) {
            AnimesDeletor.push(animeSelecionado);
            console.log("Selecionados para deletar:", AnimesDeletor);
        }
    }
});

function Delete() {
    if (AnimesDeletor.length > 0) {
        AnimesDeletor.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        });
        AnimesDeletor = [];
    } else {
        alert("Selecione algo para deletar.");
    }
}
