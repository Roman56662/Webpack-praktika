let list = []; 
let checkList = []; 
let unCheckList = [];
let del = []; 

const button = document.getElementById('button'); 
const button_show_all = document.getElementById('show_all') 
const button_show_del = document.getElementById('show_del') 
const button_show_check = document.getElementById('show_check') 
const button_show_noCheck = document.getElementById('show_no-check') 
const ul = document.getElementById('list'); 
const input = document.getElementById('input') 

button.onclick = () => { 
  const message = input.value; 
  if (message != '') { 
    const newItem = { 
      id: new Date().getTime(), 
      message: message, 
      isChecked: false, 
      isDel: false 
    } 
    unCheckList.push(newItem);
    list.push(newItem); 
    createNewItems(); 
  } else { 
    alert('Empty'); 
  } 
  input.value = ''; 
} 

const removeItem = (id) => { 
  let itemList = list.find(index => index.id == id);
  del.push(itemList);
  list = list.filter(item => item.id !== id) 
  createNewItems() 
} 

const createNewItems = () => { 
  const arrayElements = list.map(item => `<li id='${item.id}'><input type='checkbox' ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements; 

  list.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const buttonRemove = elem.getElementsByTagName('button')[0] 
    buttonRemove.onclick = () => {
      removeItem(item.id) 
    }
    const check = elem.getElementsByTagName('input')[0]
    check.checked = item.isChecked;
    check.removeAttribute("disabled");
    check.onclick = () => {
      if (check.checked == true){
          elem.className = 'checked';
          item.isChecked = true;
      } 
      else {
          elem.className = 'none-checked';
          item.isCheked = false;

      }
  }
  })
  
  
}

button_show_all.onclick = () => {
  const arrayElements = list.map(item => `<li id='${item.id}'><input type='checkbox' ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements;
  list.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const check = elem.getElementsByTagName('input')[0]
    check.removeAttribute("disabled");
    check.disabled = 'true'
    check.checked = item.isChecked;
    if (check.checked == true){
      elem.className = 'checked';
      item.isChecked = true;
  } 
  else {
      elem.className = 'none-checked';
      item.isChecked = false;
  }
})
}

button_show_del.onclick = () =>{ 
  const arrayElements = del.map(item => `<li id='${item.id}'><input type='checkbox' ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements;
  del.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const check = elem.getElementsByTagName('input')[0]
    check.removeAttribute("disabled");
    check.disabled = 'true'
    check.checked = item.isChecked;
    if (check.checked == true){
      elem.className = 'checked';
      item.isChecked = true;
  } 
  else {
      elem.className = 'none-checked';
      item.isChecked = false;
  }
  })
}

button_show_check.onclick = () =>{
  checkList = list.filter(item => item.isChecked == true)
  const arrayElements = checkList.map(item => `<li id='${item.id}'><input type='checkbox' ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements;
  checkList.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const check = elem.getElementsByTagName('input')[0]
    elem.className = 'checked';
    check.disabled = 'true'
    check.checked = item.isChecked;
  })
}

button_show_noCheck.onclick = () => {
  unCheckList = list.filter(item => item.isChecked == false)
  const arrayElements = unCheckList.map(item => `<li id='${item.id}'><input type='checkbox' ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements;
  unCheckList.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const check = elem.getElementsByTagName('input')[0]
    elem.className = 'none-checked';
    check.disabled = 'true'
    check.checked = item.isChecked;
  })
}
