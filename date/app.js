const outputBox = document.getElementById('output')
const fullDateBtn = document.getElementById('full')
const dateDateBtn = document.getElementById('date')
const timeDateBtn = document.getElementById('time')

outputBox.textContent = 'I can show the time and date'

const fullDate = new Date()

dateDateBtn.onclick = function (){
    outputBox.textContent = fullDate.toLocaleDateString()
}

timeDateBtn.onclick = function (){
    outputBox.textContent = fullDate.toLocaleTimeString()
}

fullDateBtn.onclick = function (){
    outputBox.textContent = fullDate.toLocaleDateString() + ' ' + fullDate.toLocaleTimeString()
}