async function buscar() {
  let cep = document.getElementById("cepInput").value.trim();

  cep = cep.replace(/\D/g, "");

  console.log("CEP formatado:", cep);

  if (cep.length !== 8) {
    alert("CEP inválido! Digite um CEP com 8 números.");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    console.log("Resposta da API:", data);

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }

    mostrarResultado(data);
  } catch (error) {
    alert("Erro ao buscar o CEP.");
    console.error("Erro:", error);
  }
}

function mostrarResultado(data) {
  let resultado = document.getElementById("resultado");

  if (!resultado) {
    resultado = document.createElement("div");
    resultado.id = "resultado";
    document.querySelector(".container").appendChild(resultado);
  }

  resultado.innerHTML = `
    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
    <p><strong>Bairro:</strong> ${data.bairro}</p>
    <p><strong>Cidade:</strong> ${data.localidade}</p>
    <p><strong>Estado (UF):</strong> ${data.uf}</p>
  `;
}
