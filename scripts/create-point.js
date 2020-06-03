

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https:servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res =>  res.json() )
  .then( states => {

      for( const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
  } )
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateSelect = document.querySelector("input[name=state]")

  const indexOfSelectedState = event.target.selectedIndex
  stateSelect.value = event.target.options[indexOfSelectedState].text

  const ufValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = ''
  citySelect.disabled = true

  fetch(url)
  .then( res =>  res.json() )
  .then( cities => {

    for( const city of cities) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
  } )
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


  // Itens de coleta
  // Pegar todos os li
  const itemsToCollect = document.querySelectorAll(".items-grid li")

  for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
  }
  const collectedItems = document.querySelector("input[name=items]")


  let selectedItems = []


  function handleSelectedItem(event) {

    const itemLi = event.target
    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    // verificar se existem items selecionados, se sim
    // pegar os itens selecioandos
    const alreadySelected = selectedItems.findIndex( item => {
      const itemFound = item == itemId
      return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
      // tirar da seleção 
      const filteredItems = selectedItems.filter( item => {
        const itemIsDifferente = item != itemId
        return itemIsDifferente 
      })
    
      selectedItems = filteredItems
    } else {
      selectedItems.push(itemId)
    }

    // se nao estiver sekecionado, adicioanr a seleção

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
  }