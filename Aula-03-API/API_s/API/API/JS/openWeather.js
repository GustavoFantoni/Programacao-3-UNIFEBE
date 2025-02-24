class OpenWeather {
    constructor() {
        this.latitude = '-27.068082670556073';
        this.longitude = '-48.88484553005221';
        this.key = '59a002e3e67f061997521b4019fe2abf';
        this.idioma = 'pt_br';
        this.units = 'metric';
    }

    async getClima() {
        let chave = this.key;
        let lat = this.latitude;
        let lon = this.longitude;
        let lang = this.idioma;
        let units = this.units

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&lang=${lang}&units=${units}`;

        let response = await fetch(url);

        let objJson = await response.json();

        console.log(objJson);

        return objJson;

    }
}