
window.onload=()=>{containrApp.innerHTML=createContainerApp();}
const containrApp=document.querySelector('.container_app');const date={'day':moment().format('dddd'),'month':moment().format('MMMM'),'dayNum':moment().format('DD'),'year':moment().format('YYYY')}
const arrTasks=[];function objTask(description){this.description=description;this.check=false;}
function addTaskLS(){const inputTask=document.querySelector('.input-add-task');arrTasks.push(new objTask(inputTask.value));updateLS();inputTask.value='';}
function updateLS(){localStorage.setItem('tasks',JSON.stringify(arrTasks))}
function addTask(){}
function createContainerApp(){return`
    <ul class="filters-list">
        <li class="filter-item">
            <button id="all-task">
                <i class='bx bx-list-ul' style='color:#ffffff'></i>
            </button>
        </li>
        <li class="filter-item">
            <button id="ready-task">
                <i class='bx bx-check' style='color:#ffffff'></i>
            </button>
        </li>
        <li class="filter-item">
            <button id="no-ready-task">
                <i class='bx bx-x' style='color:#ffffff'></i>
            </button>
        </li>
    </ul>
    <div class="date-wrap">
        <h1 class="day-title">${date.day}</h1>
        <span class="date-subtitle">${date.month + ' ' + date.dayNum  + ',' + ' ' + date.year}</span>
    </div>
    <div class="form-add-task">
        <input class="input-add-task" type="text" />
        <button id="add-task" onclick="addTaskLS()">+</button>
    </div>
    <ul class="tasks-list"></ul>
    <button id="open-filter">
        <i class="bx bxs-chevron-up" style="color:#ff7040"></i>
    </button>
    `}