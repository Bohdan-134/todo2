
window.onload=()=>{containrApp.innerHTML=createContainerApp();if(localStorage.getItem('tasks')){arrTasks=JSON.parse(localStorage.getItem("tasks"));arrTasksCheck=JSON.parse(localStorage.getItem("tasksCheck"));arrTasksDelete=JSON.parse(localStorage.getItem("tasksDelete"));showTask({type:'tasks',animationAllli:true,animationDeley:10})}}
const containrApp=document.querySelector('.container_app');const inputTask=document.querySelector('.input-add-task');const date={'day':moment().format('dddd'),'month':moment().format('MMMM'),'dayNum':moment().format('DD'),'year':moment().format('YYYY')}
let arrTasks=[];let arrTasksCheck=[];let arrTasksDelete=[];function objTask(description){this.description=description;this.check=false;}
function addTaskLS(){const inputTask=document.querySelector('.input-add-task');if(inputTask.value.trim()=='')return false;arrTasks.push(new objTask(inputTask.value));updateLS();showTask({type:'tasks',animationLastLi:true});inputTask.value='';}
function updateLS(){localStorage.setItem('tasks',JSON.stringify(arrTasks));localStorage.setItem('tasksCheck',JSON.stringify(arrTasksCheck));localStorage.setItem('tasksDelete',JSON.stringify(arrTasksDelete));}
function createElement(htmlElem,...cls){const newElem=document.createElement(htmlElem);for(let i=0;i<cls.length;i++){newElem.classList.add(cls[i]);}
return newElem;}
function setAttributes(el,options){Object.keys(options).forEach(function(attr){el.setAttribute(attr,options[attr]);})}
function showTask(obj){const tasksList=document.querySelector('.tasks-list');const tasksArrLS=JSON.parse(localStorage.getItem(obj.type));tasksList.innerHTML='';for(let key in tasksArrLS){const li=createElement('li','tasks-item',`${(tasksArrLS[key].check && obj.type == 'tasks') ? 'task-item__check' : null}`);setAttributes(li,{'data-num':`${key}`,'style':`${(key == (tasksArrLS.length - 1) && obj.animationLastLi == true) ? 'animation: dropn-top .7s .2s both' : (obj.animationAllli == true) ? 'animation: dropn-top .7s' + ' ' + '.' + key + 's' + ' ' + 'both' : null}`});const span=createElement('span','item-text');span.textContent=tasksArrLS[key].description;const btnWrapItems=createElement('div','button-items__wrap');if(obj.type=='tasksCheck'||obj.type=='tasksDelete'){btnWrapItems.style.display='none';}
const btnWrap1=createElement('div','btn-wrap');const buttonCheck=createElement('button','check-item');buttonCheck.onclick=checkTask;setAttributes(buttonCheck,{'data-btn-num':`${key}`,'style':`${(key == (tasksArrLS.length - 1) && obj.animationLastLi == true) ? 'animation: dropn-top .7s .3s both' : null}`});btnWrap1.append(buttonCheck);const btnWrap2=createElement('div','btn-wrap');const buttonDelete=createElement('button','delete-item');buttonDelete.onclick=deleteTask;setAttributes(buttonDelete,{'data-btn-num':`${key}`,'style':`${(key == (tasksArrLS.length - 1) && obj.animationLastLi == true) ? 'animation: dropn-top .7s .4s both' : null}`});btnWrap2.append(buttonDelete);btnWrapItems.append(btnWrap1,btnWrap2);li.append(span,btnWrapItems);tasksList.append(li);}}
function checkTask(){for(let key in arrTasks){if(this.getAttribute('data-btn-num')==key&&arrTasks[key].check==false){arrTasks[key].check=true;arrTasksCheck.push(arrTasks[key]);}else if(this.getAttribute('data-btn-num')==key&&arrTasks[key].check==true){arrTasks[key].check=false;arrTasksCheck.splice(key,1);}}
updateLS();showTask({type:'tasks',animationLastLi:false});}
function deleteTask(){for(let key in arrTasks){if(this.getAttribute('data-btn-num')==key){arrTasksDelete.push(arrTasks[key]);arrTasks.splice(key,1);}}
updateLS();showTask({type:'tasks',animationLastLi:false});}
function openFilterContainer(){const filtersList=document.querySelector('.filters-list');const btnOpenFilter=document.getElementById('open-filter');filtersList.classList.toggle('filters-list__open');btnOpenFilter.classList.toggle('open-filter__active');}
function createContainerApp(){return`
    <ul class="filters-list">
        <li class="filter-item">
            <button id="all-task" onclick="showTask({type: 'tasks', animationAllli : true, animationDeley: 0.2})">
                <i class='bx bx-list-ul' style='color:#ffffff'></i>
            </button>
        </li>
        <li class="filter-item">
            <button id="ready-task" onclick="showTask({ type: 'tasksCheck', animationAllli: true, animationDeley: 0.2 })">
                <i class='bx bx-check' style='color:#ffffff'></i>
            </button>
        </li>
        <li class="filter-item">
            <button id="no-ready-task" onclick="showTask({type: 'tasksDelete', animationAllli : true, animationDeley: 0.2})">
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
    <button id="open-filter" onclick="openFilterContainer()">
        <i class="bx bxs-chevron-up" style="color:#ff7040"></i>
    </button>
    `}