"use strict"

$(document).ready(() => {
  const backdrop = $('.modal__backdrop')
  const dogsList = $('.list__wrapper')
  backdrop.on('click', () => {
    backdrop.removeClass('active')
    backdrop.empty()
    $('body').css('overflow', '')
  })

  function getDogs () {
    $.get('https://usersdogs.dmytrominochkin.cloud/dogs', (dogs) => {
      dogs.forEach(dog => createListItem(dog))
      addEventListeners(dogs)
    })
  }

  function createListItem (dog) {
    const baseImgURL = 'https://usersdogs.dmytrominochkin.cloud'
    const { id, title, description, dogImage } = dog
    dogsList.append(`
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
    const listItems = $('.list__item')
    listItems.each(function () {
      $(this).on('click', () => {
        const dogID = +this.dataset.id
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
    backdrop.append(`
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
    backdrop.addClass('active')
    $('body').css('overflow', 'hidden')
  }

   getDogs()
})