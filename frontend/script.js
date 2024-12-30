const todoInput = document.getElementById('todoInput');
const addTodo = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editTodoInput = document.getElementById('editTodoInput');
const saveEdit = document.getElementById('saveEdit');
// const editToastEl = document.getElementById('editToast');
// const editToast = new bootstrap.Toast(editToastEl);
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const confirmDelete = document.getElementById('confirmDelete');
// const deleteToastEl = document.getElementById('deleteToast');
// const deleteToast = new bootstrap.Toast(deleteToastEl);

const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 p-2 m-2`;
    toast.style.zIndex = 9999;
    toast.role = 'alert';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    document.body.appendChild(toast);

    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();

    toast.addEventListener('hidden.bs.toast', () => toast.remove());
};

let currentEditSpan = null; // Reference to the current todo being edited
let currentEditDate = null; // Reference to the date span of the todo being edited
let currentDeleteLi = null; // Reference to the current todo being deleted

let currentEditId = null;
let currentDeleteId = null;

const getCurrentFormattedDate = (date) => {
    const now = new Date(date);
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};

//post
addTodo.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (!todoText) return;

    fetch("https://to-do-api-gamma.vercel.app/api/todos", {
        method: "POST",
        body: JSON.stringify({
            text: todoText
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(todoitem => {
        createToDoItemUI(todoitem);
    });
});

saveEdit.addEventListener('click', () => {
    if (currentEditSpan && editTodoInput.value.trim()) {
        todoText = editTodoInput.value.trim();        
        fetch(`https://to-do-api-gamma.vercel.app/api/todos/${currentEditId}`, {
            method: "PUT",
            body: JSON.stringify({
                text: todoText
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(updatedTodoitem => {
            // createToDoItemUI(updatedTodoitem);
            console.log("Edit response: ", updatedTodoitem);
            editModal.hide();
            currentEditSpan.textContent = updatedTodoitem.data.text;
            currentEditDate.textContent = `Edited: ${getCurrentFormattedDate(updatedTodoitem.data.editedDate)}`;
            showToast(response.message);
        }).catch(error => {
            deleteModal.hide();
            showToast(error.error, 'danger');
        });
    }
});

confirmDelete.addEventListener('click', () => {
    if (currentDeleteLi) {
        fetch(`https://to-do-api-gamma.vercel.app/api/todos/${currentDeleteId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            currentDeleteLi.remove();
            deleteModal.hide();
            showToast(response.message);
        }).catch(error => {
            deleteModal.hide();
            showToast(error.error, 'danger');
        });
    }
});


todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo.click();
    }
});


const createToDoItemUI = (todoitem) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const todoTextContainer = document.createElement('div');
    todoTextContainer.className = 'd-flex flex-column gap-2'

    const span = document.createElement('span');
    span.textContent = todoitem.text;
    span.className = 'fw-bold';

    const dateSpan = document.createElement('small');
    dateSpan.textContent = `Created: ${getCurrentFormattedDate(todoitem.createdDate)}`;
    dateSpan.className = 'text-muted';

    const actionBtns = document.createElement('div');
    actionBtns.className = 'd-flex gap-1';

    const todoContent = document.createElement('div');
    todoContent.className = 'd-flex gap-1 w-100';

    const todoStatusContent = document.createElement('div');
    todoStatusContent.className = 'd-flex flex-row gap-1 w-100';

    const statusDiv = document.createElement('div');
    statusDiv.className = 'd-flex align-items-center me-3';

    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.className = 'form-check-input me-2';


    const statusLabel = document.createElement('span');
    // statusLabel.textContent = 'Pending';
    statusLabel.textContent = todoitem.status;
    statusLabel.className = 'badge bg-warning text-dark';
    statusCheckbox.checked = (todoitem.status == 'Completed') ? true : false;

    statusCheckbox.addEventListener('change', () => {
        if (statusCheckbox.checked) {
          statusLabel.textContent = 'Completed';
          statusLabel.className = 'badge bg-success';
          span.style.textDecoration = 'line-through';
        } else {
          statusLabel.textContent = 'Pending';
          statusLabel.className = 'badge bg-warning text-dark';
          span.style.textDecoration = 'none';
        }
    });

    statusDiv.appendChild(statusCheckbox);
    statusDiv.appendChild(statusLabel);

     // const statusButton = document.createElement('button');
    // statusButton.textContent = 'Pending';
    // statusButton.className = 'btn btn-warning btn-sm me-2';
    // statusButton.addEventListener('click', () => {
    //     if (statusButton.textContent === 'Pending') {
    //         statusButton.textContent = 'Completed';
    //         statusButton.className = 'btn btn-success btn-sm me-2';
    //         span.style.textDecoration = 'line-through';
    //     } else {
    //         statusButton.textContent = 'Pending';
    //         statusButton.className = 'btn btn-warning btn-sm me-2';
    //         span.style.textDecoration = 'none';
    //     }
    // });

    const editButton = document.createElement('button');
    editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editButton.className = 'btn btn-info btn-sm me-2';
    editButton.addEventListener('click', () => {
        currentEditSpan = span; // Save reference to the current todo text
        currentEditDate = dateSpan; // Save reference to the current date span
        editTodoInput.value = span.textContent; // Populate modal input with current text
        currentEditId = todoitem._id;
        editModal.show(); // Show the modal
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.addEventListener('click', () => {
        currentDeleteId = todoitem._id;
        currentDeleteLi = li; // Save reference to the current todo item
        deleteModal.show(); // Show the delete confirmation modal
    });

    todoContent.appendChild(statusCheckbox);
    todoContent.appendChild(span);
    todoStatusContent.appendChild(statusDiv);
    todoStatusContent.appendChild(dateSpan);

    todoTextContainer.appendChild(todoContent);
    todoTextContainer.appendChild(todoStatusContent);

    // actionBtns.appendChild(statusButton);
    actionBtns.appendChild(editButton);
    actionBtns.appendChild(deleteButton);

    li.appendChild(todoTextContainer);
    li.appendChild(actionBtns);

    todoList.appendChild(li);
    todoInput.value = '';
}

//get
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://to-do-api-gamma.vercel.app/api/todos');
    const todos = await response.json();

    console.log("todos: ", todos);

    todos.forEach(todoitem => {
        // Create list elements for each todo
        // Use todo.text, todo.status, and todo.createdDate
        createToDoItemUI(todoitem);
    });
});
