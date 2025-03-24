window.onload = () => {
    let Infos = document.getElementById("areaInfos");
    let cep = document.getElementById("cep");

    if (cep) {
        let span = cep.querySelector("span"); 

        let textoCompleto = cep.textContent.trim();
        let textoSpan = span ? span.textContent.trim() : "";

        let textoForaDoSpan = textoCompleto.replace(textoSpan, "").trim();

        if (textoForaDoSpan === "") { 
            Infos.style.display = "none"; 
        }
    }

    getGeolocalizacao();
    let m = new historico();
    m.recuperarLista(); 
    
};