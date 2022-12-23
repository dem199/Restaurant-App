import { menuArray } from '/data.js'

let order = initializeOrder()
const allOrderTable = document.getElementById('all-order-table')
const orderTable = document.getElementById('order-table')
const theTotalPrice = document.getElementById('the-total-price')

const orderForm = document.getElementById('order-form')
orderForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const orderFormData = new FormData(orderForm)
  const fullName = orderFormData.get('fullName')
    orderForm.style.display = 'none'
    orderTable.style.display = 'none'
    
    setTimeout(function () {
        document.getElementById('pending-message').innerText = `Thanks, ${fullName}! your order is on its way`
        
    }, 1500)
})

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  }else if(e.target.dataset.remove) {
    removeItem(e.target.dataset.remove)
  }else if(e.target.id === "complete-btn"){
    completeOrder()
}
})

function handleAddClick(addId) {
  if(document.getElementById("order-table").classList.contains("hide")) {
    document.getElementById("order-table").classList.remove("hide")
  }
  let targetFood = getFood(addId)
  targetFood.orders++
  renderSum()
}

function removeItem(id) {
  let targetFood = getFood(id)
  targetFood.orders--
  if(order.length == 0) {
    document.getElementById("order-table").classList.add("hide") 
  } else {
    document.getElementById("order-table").classList.remove("hide")  
  }
  renderSum()
}

function completeOrder() {
  setTimeout(function() {
    orderForm.style.display = 'block'
}, 200)
}

function initializeOrder() {
  let newOrder = menuArray.map( food => (
      {
          name: food.name,
          id: food.id,
          price: food.price,
          orders: 0
      }
  ))
  return newOrder
}

function getFood(id) {
  let newFood = order.filter(function(food) {
      return food.id === parseInt(id)
  })[0]
  return newFood
}

function calculateOrderPrice(){
  let price = 0
  for(let food of order) {
      price += food.price*food.orders
  }
  return price
}

function renderSum() {
  let orderFood = ''
  let orderHTML = ''
  let total = calculateOrderPrice()
  for (let food of order){
      if(food.orders > 0){
          orderFood +=  `
          <div class="order-div">
              <div class="item">
                <h1 class="item-quantity">${food.orders}</h1>
                <h1 class="item-name">${food.name}</h1>

                <button
                  class="remove-button"
                  id="remove-button-${food.id}"
                  data-remove="${food.id}"
                >
                  remove
                </button>
              </div>
              <div class="item-price">$${food.price}</div>
            </div>
`
      }
  }
  orderHTML += `
              <h1 class="total-price">Total Price</h1>
              <h1 class="amount">$${total}</h1>

              `

  allOrderTable.innerHTML = orderFood
  theTotalPrice.innerHTML = orderHTML
}

function getFeedHtml(){

    let feedHtml = ``
        
    menuArray.forEach(function (menu) {
       
        feedHtml += `
      
        <div class="inner-container">
        <div class="container">
          <div class="food-container">
            <p class="emoji">${menu.emoji}</p>
            <div class="food-details">
              <h1 class="food">${menu.name}</h1>
              <p class="ingredients">${menu.ingredients}</p>
              <p class="price">$${menu.price}</p>
            </div>
          </div>
        </div>
      <i class="fa-light fa-plus" id="add-icon-${menu.id}" data-add="${menu.id}" ></i>
      </div> 
        `    
    })
    return feedHtml
    }
    
    function render(){
    document.getElementById('outer-container').innerHTML = getFeedHtml()    
    }
    render() 
        
    
    
   