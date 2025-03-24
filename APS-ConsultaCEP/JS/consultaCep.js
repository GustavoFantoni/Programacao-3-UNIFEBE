class consultaCep {

    async getCep(cep) {
        let url = `https://viacep.com.br/ws/${cep}/json/`
        let response = await fetch(url);
        let objJson = response.json();
        return objJson;
    }
}