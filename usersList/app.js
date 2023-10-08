const list = document.getElementById('list')
const filter = document.getElementById('filter')
let Users = []

async function start() {
    list.innerHTML = "Loading..."
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setTimeout(() => {
        Users = data
        render(data)
    }, 2000)
  } catch (error) {
    list.style.color = 'red'
    list.innerHTML = error.message
  }
}

function render(users = []){
    if (users.length === 0){
        list.innerHTML = 'No match users!'
    } else{
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }
}

function toHTML (user){
    return `
    <li class="list-group-item">${user.name}</li>
    `
}

filter.addEventListener('input', (event) =>{
    const value  = event.target.value.toLowerCase()
    const filteredUsers = Users.filter((user) => {
        return user.name.toLowerCase().includes(value)
    })
    render(filteredUsers)
})

start();
