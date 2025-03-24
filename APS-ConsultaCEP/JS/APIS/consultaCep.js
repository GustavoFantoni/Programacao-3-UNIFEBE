class consultaCep {
    getCep(cep) {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    return { erro: true, mensagem: `Erro na requisição: ${response.status} - ${response.statusText}` };
                }
                return response.json();
            })
            .then(objJson => {
                return objJson.erro ? { erro: true, mensagem: "CEP não encontrado" } : objJson;
            })
            .catch(() => ({ erro: true, mensagem: "Erro ao buscar o CEP" }));
    }
}
