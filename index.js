const urlAPI = "https://www.thecolorapi.com"
let colorsArr = []

const colorSchemeBtn = document.getElementById("color-scheme-btn")

document.addEventListener("submit", e => {
    //  Prevent refreshing page behaviour
    e.preventDefault()
    
    getColorScheme()
})

document.addEventListener("click", e =>{
    //  if user clicked on a hex code
    if (e.target.classList.contains("display-color-hex"))
    {
        //  Copy hex code to clipboard
        copyToClipboard(e.target.textContent)
    }
    
})

function getColorScheme(){
    const colorValue = document.getElementById("seed-color").value.replace("#", "")
    const colorScheme = document.getElementById("color-scheme").value
    
    // Reset colour array
    colorsArr = []
    
    fetch(urlAPI + `/scheme?hex=${colorValue}&mode=${colorScheme}`)
        .then(response => response.json())
        .then(data => 
        {
            for (let color of data.colors)
                colorsArr.push({"hex" : color.hex.value})
                
            renderColors()
        })
}

//  Renders html
function renderColors(){
    
    const htmlEl = document.getElementById("display-colors")
    let html = ""
    
    for (let color of colorsArr)
    {
        html += 
        `<div class="display-color-container">
            <div class="display-color-box" style="background-color: ${color.hex}">
            </div>
            <div class="display-color-text">
                <span class="tooltip">Copy to Clipboard</span>
                <div class="display-color-hex">${color.hex}</div>
            </div>
            
        </div>`
    }
    
    htmlEl.innerHTML = html
}

function copyToClipboard(valueToCopy){
    navigator.clipboard.writeText(valueToCopy)
    console.log(`Copied ${valueToCopy} to clipboard`)
}