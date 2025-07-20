// 1. انتخاب المنت‌ها
const addTaskBtn = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const showAllBtn = document.getElementById('show-all');
const showCompletedBtn = document.getElementById('show-completed');
const showPendingBtn = document.getElementById('show-pending');

function addTask(taskText, completed = false) {
    if (!taskText) return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'ویرایش';
    editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;

        li.replaceChild(input, span);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'ثبت';

        saveBtn.addEventListener('click', () => {
            span.textContent = input.value || span.textContent;
            li.replaceChild(span, input);
            li.removeChild(saveBtn);
            saveTasks();
        });

        li.appendChild(saveBtn);
    });

    if (completed) li.classList.add('completed');

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
    saveTasks();
    taskInput.value = '';
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        saveTasks();
        taskInput.value = '';
    }
});

showAllBtn.addEventListener('click', () => {
    document.querySelectorAll('#task-list li').forEach(li => li.style.display = 'flex');
});

showCompletedBtn.addEventListener('click', () => {
    document.querySelectorAll('#task-list li').forEach(li => {
        li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
    });
});

showPendingBtn.addEventListener('click', () => {
    document.querySelectorAll('#task-list li').forEach(li => {
        li.style.display = li.classList.contains('completed') ? 'none' : 'flex';
    });
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const text = li.querySelector('span').textContent;
        const completed = li.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
}

document.addEventListener('DOMContentLoaded', loadTasks);
