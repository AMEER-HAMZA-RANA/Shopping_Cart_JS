import items from '/items.json'
import setupCart from "./cart"
import currencyFormatter from './.util/currencyFormatter';

const storeItemTemp = document.querySelector('#store-item-temp')
const container = document.querySelector('[data-container]')


const IMAGE_URL = 'https://dummyimage.com/420x260'

const cart = document.querySelector('[data-cart]')

document.addEventListener('click', e => {
    if(e.target.matches('[data-add-to-cart-btn]')) {
        const item = e.target.closest('[data-item]')
        const id = parseInt(item.dataset.id)
        let price = item.querySelector('[data-price]').innerText.split('').filter(char => !isNaN(char)).join('').slice(0,-2)
        setupCart({id:id, price:parseInt(price)})
    } 
})



export default function setupStore() {
    items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
    const storeItemClone = storeItemTemp.content.cloneNode(true)
    const storeItem = storeItemClone.querySelector('[data-item]')
    storeItem.dataset.id = item.id

    const image = storeItem.querySelector('[data-image]')
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

    const category = storeItem.querySelector('[data-category]')
    category.innerText = item.category

    const name = storeItem.querySelector('[data-name]')
    name.innerText = item.name

    const price = storeItem.querySelector('[data-price]')
    price.innerText = currencyFormatter(item.priceCents / 100)

    container.appendChild(storeItem)
}

