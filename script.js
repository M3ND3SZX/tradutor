
    const traduzirSelect = document.getElementById('traduzirSelect')
    const traduzidoSelect = document.getElementById('traduzidoSelect')
    traduzidoSelect.value = 1
const campoTraducao = document.getElementById('campoTraducao')
            campoTraducao.focus()


let idioma1 = "pt-BR"
let idioma2 = "en-GB"
let idioma3 = "es-ES"

linguaTraduzida = idioma1
linguaResultado = idioma2
campoTraducao.addEventListener('keypress',(event)=>{
          if(event.key === "Enter"){
            if(campoTraducao.value!=''){
                if(campoTraducao.value.toLowerCase() == "alice"){
                    switchMode()
                } else
                traduzir()
            } else {
                document.getElementById('campoTraduzido').value = '';
            }
            document.getElementById('focusOut').focus()
          }
      })
      const campoTraduzido = document.getElementById('campoTraduzido')

async function traduzir(){

        const json = fetch(`https://api.mymemory.translated.net/get?q=${campoTraducao.value}&langpair=${linguaTraduzida}|${linguaResultado}`).then((response) => response.json())
        
        const response = await json

        const textoTraduzido = response.responseData.translatedText

        if (textoTraduzido != '' || textoTraduzido != null){
            document.getElementById('campoTraduzido').value = textoTraduzido;
        }else{
            console.log('ERRO')
        }

        

}

const bandeira1 = document.getElementById('bandeira1')
const bandeira2 = document.getElementById('bandeira2')
function atualizarBandeiras(){
    if(linguaTraduzida == idioma1){
        bandeira1.src='./img/flags/brazil.png'
    } if(linguaTraduzida==idioma2){
        bandeira1.src='./img/flags/usa.png'
    } if(linguaTraduzida==idioma3){
        bandeira1.src='./img/flags/espanha.png'   
    }
    
    if(linguaResultado == idioma1){
        bandeira2.src='./img/flags/brazil.png'
    } if(linguaResultado==idioma2){
        bandeira2.src='./img/flags/usa.png'
    } if(linguaResultado==idioma3){
        bandeira2.src='./img/flags/espanha.png'
    }
}
atualizarBandeiras()

let brightMode = 1
const bright = document.getElementById('botaoBright')
const caixaTraducao = document.getElementsByClassName('caixa-traducao')
const textoBox = document.querySelectorAll('h3')

completarCampos()
bright.addEventListener('click',switchMode)

function switchMode(){
    if(brightMode==1){
        brightMode=2
    } else
    if(brightMode==2){
        brightMode=1
    }
    completarCampos()
}



function completarCampos(){
    if(brightMode==1){
        bright.src = './img/lightmodeWhite.png'
        Array.from(caixaTraducao).forEach(caixa => {
            caixa.style.backgroundImage='url(./img/BookFieldLight.png)';
        });
        Array.from(textoBox).forEach(texto => {
            texto.style.color='#344E5F'
        });
        document.documentElement.style.setProperty('--corLivros', '#FFFDF1');
        document.documentElement.style.setProperty('--corBorda', '#000000');
        document.documentElement.style.setProperty('--corFundo1', '#FF8A00');
        document.documentElement.style.setProperty('--corFundo2', '#FFFFFF');
        document.documentElement.style.setProperty('--textColor', '#000000');
    } else {
        bright.src = './img/nightmodeWhite.png'
        Array.from(caixaTraducao).forEach(caixa => {
            caixa.style.backgroundImage='url(./img/BookFieldNight.png)';
        });
        Array.from(textoBox).forEach(texto => {
            texto.style.color='#51ABE7'
        });
        document.documentElement.style.setProperty('--corLivros', '#353531');
        document.documentElement.style.setProperty('--corBorda', '#FFFFFF');
        document.documentElement.style.setProperty('--corFundo1', '#995C14');
        document.documentElement.style.setProperty('--corFundo2', '#3F3224');
        document.documentElement.style.setProperty('--textColor', '#FFFFFF');
    }
}

function atualizarIdiomas(){
    const traduzir = traduzirSelect.value
    const traduzido = traduzidoSelect.value
    console.log(traduzir)
    console.log(traduzido)
    if(traduzir==0){
        linguaTraduzida=idioma1
    } if(traduzir==1){
        linguaTraduzida=idioma2
    } if(traduzir==2){
        linguaTraduzida=idioma3
    }
    if(traduzido==0){
        linguaResultado=idioma1
    } if(traduzido==1){
        linguaResultado=idioma2
    } if(traduzido==2){
        linguaResultado=idioma3
    }
    atualizarBandeiras()
}

const btnFalar = document.querySelector('#btnFalar')
const text = document.querySelector('#campoTraducao')
const recognition = createRecognition()
let listening = false

btnFalar.addEventListener('click', (e) => {
    if(!recognition) return

    listening ? recognition.stop() : recognition.start()

    btnFalar.textContent = listening? '': 'Parar de escutar'
   

})

function createRecognition(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition  
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null
    if(!recognition){
        text.innerHTML = "Speech não encontrado"
        return false
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () => console.log('started')
    recognition.onend = () => console.log('finished')
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.value = e.results[0] [0].transcript
    return recognition

}

const texto = document.getElementById('campoTraduzido')
const voices = document.getElementById('voices')
const btnVoz = document.getElementById('btnVoz')

window.speechSynthesis.onvoiceschanged = () => {
    let voicesList = window.speechSynthesis.getVoices()
    voices.innerHTML = ''

    if (voicesList.length > 0) {
        for (let i = 0; i < voicesList.length; i++) {
            let optionEl = document.createElement('option')
            optionEl.setAttribute('value', i)
            optionEl.innerHTML = voicesList[i].name
            voices.appendChild(optionEl)
        }
    } else {
        // Caso não haja vozes disponíveis
        let optionEl = document.createElement('option')
        optionEl.innerHTML = 'Nenhuma voz disponível'
        voices.appendChild(optionEl)
    }
};

btnVoz.addEventListener('click', () => {
    if (texto.value !== "") {
        let ut = new SpeechSynthesisUtterance(texto.value)
        let selectedVoiceIndex = voices.value
        ut.voice = window.speechSynthesis.getVoices()[selectedVoiceIndex]
        window.speechSynthesis.speak(ut)
    }
});

function updateStatus(){
    if (window.speechSynthesis.speaking){
        voices.setAttribute('disabled', 'disabled')
        btnVoz.setAttribute('disabled', 'disabled')
    }else{
        voices.removeAttribute('disabled')
        btnVoz.removeAttribute('disabled')
    
    }
}
setInterval(updateStatus,100)