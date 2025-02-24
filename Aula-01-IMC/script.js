document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector('form');
  const areaResposta = document.querySelector('div.area-response'); 

  form.addEventListener('submit', function (event) {
  
      event.preventDefault();
      const peso = document.getElementById('peso').value;
      const altura = document.getElementById('altura').value;
      console.log('Peso:', peso);
      console.log('Altura:', altura);
      
  
      if (peso && altura) {
          const imc = calcularIMC(peso, altura);
          console.log('IMC:', imc);
          let classificacao;
          if (imc < 18.5) {
              classificacao = "Abaixo do peso";
              areaResposta.style.borderColor = "yellow";
          } else if (imc >= 18.5 && imc < 24.9) {
              classificacao = "Peso normal";
              areaResposta.style.borderColor = "green";
          } else if (imc >= 25 && imc < 29.9) {
              classificacao = "Sobrepeso";
              areaResposta.style.borderColor = "orange";
          } else if (imc >= 30 && imc < 34.9) {
              classificacao = "Obesidade grau 1";
              areaResposta.style.borderColor = "red";
          } else if (imc >= 35 && imc < 39.9) {
              classificacao = "Obesidade grau 2";
              areaResposta.style.borderColor = "red";
          } else {
              classificacao = "Obesidade grau 3 (obesidade mórbida)";
              areaResposta.style.borderColor = "red";
          }
          
          const resp = document.createElement("p");
          resp.textContent = classificacao;
          areaResposta.innerHTML = '';
          areaResposta.appendChild(resp);
          areaResposta.className = "response-area";
      }
  });

  function calcularIMC(p, a) {
      a = parseFloat(a);
      p = parseFloat(p);
      return p / (a * a);
  }
});
