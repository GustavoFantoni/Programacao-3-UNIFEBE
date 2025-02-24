async function mostrarClima() {
    let o = new OpenWeather();
    let objClima = await o.getClima();

    let clima = document.getElementById("temperatura");
    let cidade = document.getElementById("cidade");
    let icone = document.getElementById("icon-api");
    clima.innerHTML = Math.round(objClima.main.temp);
    cidade.innerHTML = objClima.name;
    let icon = objClima.weather[0].icon;
    icone.src = `icons/${icon}.png`;
}

window.onload = () => {
    mostrarClima();
}