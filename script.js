const addTaskBtn = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', () => {
        if(li.classList.contains('completed')){
        li.classList.remove('completed');
            
        }

        else{
        li.classList.add('completed');
            
        }
    });

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn=document.createElement('button');
      deleteBtn.textContent = 'حذف';

    deleteBtn.addEventListener('click' , ()=>{
        li.remove();
    });

    const editbtn = document.createElement('button');
    editbtn.textContent='ویرایش';

    editbtn.addEventListener('click',()=>{
        const input=document.createElement('input');
        input.type='Text';
        input.value=span.textContent;
        li.removeChild(span);
        li.appendChild(input);

        const edit =()=>{
            span.textContent = input.textContent || span.textContent;
            li.replaceChild (span , input);
        }

        const savebtn = document.createElement('button');
        savebtn.textContent = "ثبت";
        savebtn.addEventListener('click', ()=>{
            span.textContent=input.value || span.textContent;
            li.replaceChild(span,input);
            li.removeChild(savebtn);

        })
                li.appendChild(savebtn);

        })

    li.appendChild(checkbox);
    li.appendChild(span);

    taskList.appendChild(li);
    li.appendChild(editbtn);

    li.appendChild(deleteBtn);

    taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown' , (Event)=>{
    if (Event.key==='Enter'){
        addTask();
    }
});
