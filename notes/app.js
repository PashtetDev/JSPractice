
const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [
  {
    title: "Пройти курс по JS",
    completed: false,
  },
  {
    title: "Жестко трахнуться",
    completed: true,
  },
];

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputElement.value = "";
};

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    switch (type) {
      case "toggle":
        notes[index].completed = true;
        render()
        break;
      case "remove":
        notes.splice(index, 1)
        render()
        break;
      default:
        break;
    }
  }
};

function inputNote(note, index) {
  listElement.insertAdjacentHTML(
    "beforeend",
    `
      <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span class="${
              note.completed ? "text-decoration-line-through" : ""
            }">${note.title}</span>
            <span>
              <span class= ${
                !note.completed ? '"btn btn-small btn-success"' : ""
              } data-index=${index} data-type="toggle"${
      !note.completed ? ">&check;" : '">'
    }</span>
              <span class="btn btn-small btn-danger"data-index="${index}" data-type="remove">&times;</span>
            </span>
          </li>
        </ul>`
  );
}

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0){
    listElement.innerHTML = '<p>Empty</p>'
  }
  for (let i = 0; i < notes.length; i++) {
    inputNote(notes[i], i);
  }
}

render();
