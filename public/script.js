window.onload = function () {
  fetch('http://localhost:3000/todo', {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((body) => {
      const todoBody = document.getElementById('todo-body');
      const doneBody = document.getElementById('done-body');
      body.forEach((todo, index) => {
        if (todo.done) {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${todo.text}</td>`;
          doneBody.appendChild(row);
        } else {
          const row = document.createElement('tr');
          row.id = `todo-${index}`;
          row.innerHTML = `
            <td scope="row" class="text-left">${todo.text}</td>
            <td>
              <button
                class="btn btn-outline-success btn-sm"
                id=${todo.id}
                onclick="doneTODO(event)"
              >
                Done
              </button>
            </td>`;
          todoBody.appendChild(row);
        }
      });
    })
    .catch((error) => console.error('Fetch error:', error));
};

function createTODO() {
  const todo = document.querySelector('input').value;
  fetch('/todo', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: todo })
  }).then(() => window.location.reload());
}

function doneTODO(event) {
  const { id } = event.target;
  fetch(`http://localhost:3000/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(() => window.location.reload());
}
