"use strict"

window.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('.modal__backdrop')
  const dogsList = document.querySelector('.list__wrapper')

  backdrop.addEventListener('click', (event) => {
    event.target.classList.remove('active')
    const modal = document.querySelector('.modal')
    event.target.removeChild(modal)
    document.body.style.overflow = ''
  })

  const getDogs = async function () {
    const res = await fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
    if (!res.ok) throw new Error('Could not fetch dogs!!!')
    return await res.json()
  }

  function createListItem (dog) {
    const baseImgURL = 'https://usersdogs.dmytrominochkin.cloud'
    const { id, title, description, dogImage } = dog
    dogsList.insertAdjacentHTML('beforeend', `
      <div class="list__item" data-id="${id}">
        <div class="dog__photo">
          <img src="${baseImgURL}${dogImage}" alt="dog-avatar">
        </div>
        <div class="item__info">
          <h2>${title}</h2>
          <span>${description}</span></span>
        </div>
      </div>
    `)
  }

  function addEventListeners(dogs) {
    const listItems = document.querySelectorAll('.list__item')
    listItems.forEach(item => {
      item.addEventListener('click', (event) => {
        const dogID = +item.dataset.id
        const currentDog = dogs.find((dog) => dog.id === dogID)
        console.log(dogID)
        showModal(currentDog)
      })
    })
  }

  function showModal(dog) {
    const baseImgURL = 'https://usersdogs.dmytrominochkin.cloud'
    const { title, sex, age, description, dogImage } = dog
    const imageURL = `${baseImgURL}${dogImage}`
    backdrop.insertAdjacentHTML('beforeend', `
      <div class="modal">
        <div class="modal__image">
          <img src="${imageURL}" alt="dog-avatar">
        </div>
        <div class="modal__content">
          <div class="caption">
            <h2>${title}</h2>
            <span class="line__gray"></span>
          </div>
          <div class="sex">
            <span class="label">Sex</span>
            <span class="text">${sex}</span>
            <span class="line__gray"></span>
          </div>
          <div class="age">
            <span class="label">Age</span>
            <span class="text">${age}</span>
            <span class="line__gray"></span>
          </div>
          <div class="personality">
            <span class="label">Personality</span>
            <span class="text">${description}</span>
          </div>
        </div>
        <div class="modal__button">
          <button><ion-icon name="call"></ion-icon> Adopt Me</button>
        </div>
      </div>
    `)
    backdrop.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  getDogs().then((dogs) => {
    console.log(dogs)
    dogs.forEach((dog) => {
      createListItem(dog)
    })
    addEventListeners(dogs)
  })
})