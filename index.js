const startBtn = document.getElementById('start-btn')
const createListEl = document.getElementById('create-list')
const closeListModal = document.getElementById('close-list-modal')
const listForm = document.getElementById('list-form')
const nameInput = document.getElementById('name-input')
const addNameBtn = document.getElementById('add-name-btn')
const createListBtn = document.getElementById('create-list-btn')
const namesList = document.getElementById('names-list')
const createListCntr = document.getElementById('create-list-cntr')
const secretSantaListCntr = document.getElementById('secret-santa-list-cntr')
const secretSantaList = document.getElementById('secret-santa-list')

const people = []

startBtn.addEventListener('click', ()=> {
    createListEl.style.display = 'grid'
    createListCntr.style.display = 'flex'
    secretSantaListCntr.style.display = 'none'
    
    closeCreateListEl()
    preventpageRefreshOnSubmit()
    addNameToPeopleArray()
    renderSecretSantaList()
})

function preventpageRefreshOnSubmit() {
    listForm.addEventListener('submit', e=> {
        e.preventDefault()
    })
}

function addNameToPeopleArray() {
    addNameBtn.addEventListener('click', e=> {
        if(nameInput.value) {
            people.push(nameInput.value)
            appendToNamesList(nameInput.value)
            nameInput.value = ''
        } 
        manageCreateListBtn()
    })
}

function appendToNamesList(name) {
        const nameEl = createListItem(name)
        namesList.append(nameEl)
}

function createListItem(content) {
    const listItem = document.createElement('li')
    listItem.textContent = content
    return listItem
}

function manageCreateListBtn() {
    if(people.length > 1) {
        createListBtn.disabled = false
        createListBtn.style.opacity = 1
    } else {
        createListBtn.disabled = true
        createListBtn.style.opacity = 0.5
    }
}

function closeCreateListEl() {
    closeListModal.addEventListener('click', ()=>{
        createListEl.style.display = 'none'
    })
}

function renderSecretSantaList() {
    createListBtn.addEventListener('click', e=> {
        getSecretSantaList(generateSecretSantaPairs(people))
    })
}

function getSecretSantaList(secretSantaPairs) {
    secretSantaList.textContent = ''
    for(const key in secretSantaPairs) {
        const secretSantaListItem = document.createElement('li')

        const santaCntr = document.createElement('p')
        santaCntr.textContent = `Santa: ${key}`
        secretSantaListItem.append(santaCntr)

        const recipientCntr = document.createElement('p')
        recipientCntr.textContent = `Recipient: ${secretSantaPairs[key]}`
        secretSantaListItem.append(recipientCntr)

        secretSantaList.append(secretSantaListItem)
    }
    createListCntr.style.display = 'none'
    secretSantaListCntr.style.display = 'flex'
}

function shufflePeople(peopleArray) {
  for (let i = peopleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [peopleArray[i], peopleArray[j]] = [peopleArray[j], peopleArray[i]];
  }
}

function generateSecretSantaPairs(peopleArray) {
    shufflePeople(peopleArray);
    const pairs = {};
    
        for(let i = 0; i < peopleArray.length; i++) {
        
            const currentPerson = peopleArray[i];
            const nextPerson = peopleArray[i + 1];
            const firstPerson = peopleArray[0];
            
            nextPerson ? pairs[currentPerson] = nextPerson : pairs[currentPerson] = firstPerson;
        }
        
   return pairs;
}