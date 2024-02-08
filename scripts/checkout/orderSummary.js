import {cart, removeFromCart, updateDeliveryOption} from '../../data/carts.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency  from '../utlis/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliverOptions, getDeliveryOption } from '../../data/deliveryOptions.js';



export function renderOrderSummary(){
  let cartSummaryHtml = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    console.log(cartItem);
    const deliveryOption = getDeliveryOption(deliveryOptionId);
   // console.log(deliveryOption);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHtml +=`
      <div class="cart-item-container js-cart-item-container-${matchProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });


  function deliveryOptionsHtml(matchProduct, cartItem){
    let html = '';

    deliverOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-Id="${matchProduct.id}" data-delivery-option="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked': '' }
            class="delivery-option-input"
            name="delivery-option-${matchProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  document.querySelector('.js-order-summery').innerHTML = cartSummaryHtml;
  //console.log(cartSummaryHtml);
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    })
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      console.log(productId + deliveryOptionId);
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
