document
  .querySelector("#barra-pesquisa")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeCidade = document.querySelector("#nome_cidade").value;

    if (!nomeCidade) {
      document.querySelector("#container-tempo").classList.add("hide");
      showAlert("Voce precisa digitar o nome de uma cidade...");
      return;
    } 
    
    const apiKey = "833b125f727a4c5aaab35ed6ecd0a6e6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      nomeCidade
    )}&appid=${apiKey}&units=metric&lang=pt_BR`;

    const resultado = await fetch(apiUrl);
    const json = await resultado.json();

    if (json.cod === 200) {
      showInfo({
        cidade: json.name,
        pais: json.sys.country,
        temperatura: json.main.temp,
        descricao: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        temperatura_mx: json.main.temp_max,
        temperatura_mn: json.main.temp_min,
        umidade: json.main.humidity,
        vento: json.wind.speed,
      });
    } else {
      document.querySelector("#container-tempo").classList.add("hide");
      showAlert(`
        Nao foi possivel localizar...
        <img src="src/img/undraw_moonlight_ctir.svg">
        `);
    }
  });

function showInfo(json) {
  showAlert("");
  document.querySelector("#container-tempo").classList.remove("hide");

  document.querySelector("#cidade").innerHTML = `${json.cidade}`;
  document.querySelector("#bandeira").innerHTML = `${bandeira(json.pais)}`;
  document.querySelector(
    "#temperatura"
  ).innerHTML = `${json.temperatura.toFixed(1)}<span>°C</span>`;
  document.querySelector("#info-clima").innerHTML = `${json.descricao}`;
  document
    .querySelector("#icone-tempo")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  document.querySelector(
    "#temp-max"
  ).innerHTML = `${json.temperatura_mx.toFixed(1)}<span>°C</span>`;
  document.querySelector(
    "#temp-min"
  ).innerHTML = `${json.temperatura_mn.toFixed(1)}<span>°C</span>`;
  document.querySelector("#umidade").innerHTML = `${json.umidade.toFixed(
    0
  )}<span>%</span>`;
  document.querySelector("#vento").innerHTML = `${json.vento.toFixed(
    0
  )}<span>km/h</span>`;
}

function bandeira(pais) {
  const urlDaBandeira = `https://flagcdn.com/${pais.toLowerCase()}.svg`;

  // 3. Seleciona o elemento <img> e atualiza seu 'src'
  const elementoBandeira = document.querySelector("#bandeira");
  elementoBandeira.src = urlDaBandeira;
  elementoBandeira.alt = `Bandeira do país ${pais}`;

  return elementoBandeira;
}

function showAlert(msg) {
  const div = document.querySelector("#alert");
  div.style.display = "block";
  div.innerHTML = msg;
}
