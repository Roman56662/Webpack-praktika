let list = []; 
let del = []; 

window.onload = () => {
  if (localStorage.list != null) {
    list = localStorage.getItem('list');
    list = JSON.parse(list);
    createNewItems(list, 'list');

    del = localStorage.getItem('del');
    del = JSON.parse(del);
  }

  newItem = localStorage.getItem('newItem');
  newItem = JSON.parse(newItem);

  checkList = localStorage.getItem('checkList');
  checkList = JSON.parse(checkList);
  
  unCheckList = localStorage.getItem('unCheckList');
  unCheckList = JSON.parse(unCheckList);
}

const button = document.getElementById('button'); 
const button_show_all = document.getElementById('show_all') 
const button_show_del = document.getElementById('show_del') 
const button_show_check = document.getElementById('show_check') 
const button_show_noCheck = document.getElementById('show_no-check') 
const button_clear = document.getElementById('clear') 
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

    list.push(newItem); 
    localStorage.setItem('list', JSON.stringify(list));
    createNewItems(list, 'list'); 
  } else { 
    alert('Empty'); 
  } 
  input.value = ''; 
} 

const removeItem = (id) => { 
  const newList = []; 
  list.forEach(item => { 
    if (item.id === id) { 
      del.push(item); 
      localStorage.setItem('del', JSON.stringify(del));
    } else { 
      newList.push(item) 
    } 
  }) 

  list = newList 
  localStorage.setItem('list', JSON.stringify(list));
  createNewItems(newList, 'newList') 
} 

const createNewItems = (array, key) => { 
  localStorage.setItem(key, JSON.stringify(array));
  array = localStorage.getItem(key);
  array = JSON.parse(array);
  console.log(array);
  const arrayElements = array.map(item => `<li id='${item.id}'><input type='checkbox' ${item.isChecked ? 'checked' : ''} ></input><p>${item.message}</p><button>X</button></li>`) 
  const stringElements = arrayElements.join('') 
  ul.innerHTML = stringElements; 
  array.forEach(item => { 
    const elem = document.getElementById(item.id) 
    const buttonRemove = elem.getElementsByTagName('button')[0] 
    buttonRemove.onclick = () => { 
      removeItem(item.id) 
    } 
    const check = elem.getElementsByTagName('input')[0] 
    check.onchange = (e) => changeItem(item.id, e.target.checked); 
    }) 
} 

const changeItem = (id, value) => { 
  const checkList = list.map(item => { 
    if (item.id === id) { 
      item.isChecked = value 
      localStorage.setItem('list', JSON.stringify(list));
      return item 
    } 
    return item 
  }) 
  localStorage.setItem('checkList', JSON.stringify(checkList));
  list = checkList 
} 

button_show_all.onclick = () => { 
  createNewItems(list, 'list') 
} 

button_show_del.onclick = () => { 
  createNewItems(del, 'del') 
} 

button_show_check.onclick = () => { 
  const checkList = list.filter(item => item.isChecked == true) 
  createNewItems(checkList, 'checkList') 
} 

button_show_noCheck.onclick = () => { 
  const unCheckList = list.filter(item => item.isChecked == false) 
  createNewItems(unCheckList, 'unCheckList') 
}

button_clear.onclick = () => {
  delete localStorage.list;
  delete localStorage.newItem;
  delete localStorage.del;
  delete localStorage.checkList;
  delete localStorage.unCheckList;
  location.reload();
}