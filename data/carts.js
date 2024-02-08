export let cart = JSON.parse(localStorage.getItem('cart'));
//console.log(cart);
//localStorage.removeItem('cart');

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}else{
  console.log('cart isnot empty')
}

function  saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  let match;
  cart.forEach((item)=>{
    if(productId === item.productId){
      match = item;
    }
  });
  if(match){
    match.quantity++;
  }else{
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    })
  }
  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let match;
  cart.forEach((item)=>{
    if(productId === item.productId){
      match = item;
    }
  });

  match.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}