import items from './items.json'
import currencyFormatter from './.util/currencyFormatter.js'

const cartItemsContainer = document.querySelector('[data-cart-items-container]')
const cartItemTemp = document.querySelector('#cart-item-temp')
const totalPrice = document.querySelector('[data-total-price]')
const totalProductsInCart = document.querySelector('[data-total-products-in-cart]')

const IMAGE_URL = 'https://dummyimage.com/210x130'

export default function setupCart(id) {
    renderCartItem(id)
}

let cartItemsArr = []
let pricesArr = []

function renderCartItem({id, price}) {
    const cartItemClone = cartItemTemp.content.cloneNode(true)
    const cartItem = cartItemClone.querySelector('[data-cart-item]')
    const quantityElement = cartItem.querySelector('[data-product-quantity]')

    let changingItem = cartItemsArr.find(item => item.id === id)
    if(Boolean(changingItem)) {

        pricesArr.push({id:changingItem.id, price:price})

         changingItem = {id:changingItem.id, quantity:++changingItem.quantity}

        const myItem = cartItemsContainer.querySelector(`[data-id='${changingItem.id}']`)

        const myItemQuantity = myItem.querySelector('[data-product-quantity]')
        myItemQuantity.innerText = `x${changingItem.quantity}` 

        calculateTotal()
        setCartLength()

    } else {
        cartItemsArr.push({id,quantity:1, price:price})
        pricesArr.push({id, price:price})

    
    
    
        const item = items.find(item => item.id === id)
    
        cartItem.dataset.id = item.id
    
        const image = cartItem.querySelector('[data-product-image]')
        image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`
        
        const quantity = cartItemsArr.find(item => item.id === id).quantity
         quantityElement.innerText = quantity && `x${quantity}`

    
        const name = cartItem.querySelector('[data-product-name]')
        name.innerText = item.name
    
        const productPrice = cartItem.querySelector('[data-product-price]')
        productPrice.innerText = currencyFormatter(item.priceCents / 100)
    

        cartItemsContainer.appendChild(cartItem)

        calculateTotal()
        setCartLength()
        cartItemsArr.length === 1 && cart.classList.remove('invisible')
    }
}

document.addEventListener('click', e => {
    if(e.target.matches('[data-remove-from-cart-button]')) {
        const id = parseInt(e.target.closest('[data-cart-item]').dataset.id)
        removeItemFromCart(id)
    }
})

export function removeItemFromCart(id) {
const itemToRemove = cartItemsContainer.querySelector(`[data-id='${id}']`)
itemToRemove.remove()
 pricesArr = pricesArr.filter(item => item.id !== id)
cartItemsArr = cartItemsArr.filter(item => item.id !== id)
calculateTotal()
setCartLength()
}

const cartButton = document.querySelector('[data-cart-btn]')
const cart = document.querySelector('[data-cart]')


cartButton.addEventListener('click', () => {
    cart.classList.toggle('invisible')
})

function calculateTotal() {
    const finalPrice = pricesArr.length && pricesArr.map(a => a.price).reduce((a,b) => a+b)
    totalPrice.innerText = currencyFormatter(finalPrice)
}

function setCartLength() {
    const cartlength = pricesArr.length
    totalProductsInCart.innerText = cartlength
    cartlength === 0 && cart.classList.toggle('invisible')
}