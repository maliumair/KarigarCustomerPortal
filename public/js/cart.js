var cart = [];
var tempCart = [];
function addToCart(addContainer, service) {
    let elemIndex = cart.findIndex(c => c.service._id === service._id);
    if (elemIndex === -1) {
        cart.push({ "service": service, "quantity": 1 });
        addContainer.firstChild.style.display = "inline";
        addContainer.children[1].innerText = 1;
        addContainer.children[1].style.borderTopLeftRadius = '0';
        addContainer.children[1].style.borderBottomLeftRadius = '0';
    }
    else {
        cart[elemIndex].quantity = cart[elemIndex].quantity + 1;
        addContainer.children[1].innerText = cart[elemIndex].quantity;
    }

    updateCartdisplay();
    populateCartItems();

}

function removeFromCart(addContainer, service) {
    let elemIndex = cart.findIndex(c => c.service._id === service._id);
    cart[elemIndex].quantity = cart[elemIndex].quantity - 1;
    addContainer.children[1].innerText = cart[elemIndex].quantity;
    if (cart[elemIndex].quantity === 0) {
        cart.splice(elemIndex, 1);
        addContainer.firstChild.style.display = "none";
        addContainer.children[1].innerText = "Add";
        addContainer.children[1].style.borderTopLeftRadius = '5px';
        addContainer.children[1].style.borderBottomLeftRadius = '5px';
    }
    updateCartdisplay();
    populateCartItems();

}

function updateCartdisplay() {
    let proceedContainer = document.getElementById('proceed');
    let total_quantity = document.getElementById('total-quantity');
    let total_cost = document.getElementById('total-cost');
    if (cart.length > 0) {
        proceedContainer.style.display = 'table';
        total_quantity.innerText = calculateTotalQuantity(cart);
        total_cost.innerText = "Rs " + calculateTotalCost(cart);
    }
    else {
        proceedContainer.style.display = 'none';

    }
}

function calculateTotalQuantity(array) {
    const total = array.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    return total;
}

function calculateTotalCost(array) {
    let total = array.reduce((accumulator, item) => {
        return accumulator + (item.service.price * item.quantity);
    }, 0);
    return total;
}

$('#place-order').on('click', function () {

    var request;
    if (request) {
        request.abort();
    }
    request = $.ajax({
        url: "/orders",
        type: "POST",
        data: JSON.stringify({
        }),
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {

        $('#error').text("Account Created Successfully!");

    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.responseJSON);
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
        $('#error').text(jqXHR.responseJSON.message);
        $inputs.prop("disabled", false);

    });
})

$('#proceed').on('click', function () {
    $('#cart-modal').modal('show');
    populateCartItems()
})

$('#cart-modal').on('show.bs.modal', function (e) {
    $('body').addClass("cart-modal-backdrop");
    tempCart = JSON.parse(JSON.stringify(cart));
}).on('hide.bs.modal', function (e) {
    $('body').removeClass("cart-modal-backdrop");
    cart = tempCart;
    updateCartdisplay()
})

function populateCartItems(){
    console.log(cart, tempCart)
    let data = cart;
    let container = $('#cart-items');
    container.html('');
    for (let i = 0; i < data.length; i++) {
        let col = document.createElement('div');
        let card = document.createElement('div');
        let row = document.createElement('div');
        let col1 = document.createElement('div');
        let col2 = document.createElement('div');
        let card_icon = document.createElement('img');
        let card_body = document.createElement('div');
        let title = document.createElement('h6');
        let price = document.createElement('p');
        let price_for = document.createElement('p');
        let addContainer = document.createElement('div');
        let minusBtn = document.createElement('button');
        let plusBtn = document.createElement('button');
        let quantity = document.createElement('span');
        col.setAttribute('class', 'col-lg-6 col-12');
        card.setAttribute('class', 'card service m-2 p-2');
        row.setAttribute('class', 'row no-gutters');
        col1. setAttribute('class', 'col-4 align-self-center') ;
        col2.setAttribute('class', 'col-8');
        card_body.setAttribute('class', 'card-body');
        title.setAttribute('class', 'card-title text-dark');
        price.setAttribute('class', 'card-text');
        price_for.setAttribute('class', 'card-text text-subtitle');
        addContainer.setAttribute('class', 'add-container-cart');
        plusBtn.setAttribute('class', 'btn plus-btn-cart');
        minusBtn.setAttribute('class', 'btn minus-btn-cart');
        quantity.setAttribute('class', 'quantity-span-cart');
        card_icon.style.width='100%';
        title.style.margin = '5px';
        price.style.margin = '5px';
        price_for.style.margin = '5px';
        price.style.fontWeight = 'bold';
        card_icon.src = '/static/images/led-tv.png';
        title.innerText = data[i].service.title;
        price.innerText = "Rs:" + data[i].service.price;
        price_for.innerText = "- " + data[i].service.price_for;  
        plusBtn.innerHTML = "+";
        minusBtn.innerHTML = "-";
        quantity.innerText = data[i].quantity;
        plusBtn.addEventListener('click', function(){
            addToCart(this.parentElement, data[i].service);
        })
        quantity.addEventListener('click', function(){
            addToCart(this.parentElement, data[i].service);
        })
        minusBtn.addEventListener('click', function(){
            removeFromCart(this.parentElement, data[i].service);
        })
        addContainer.append(minusBtn, quantity, plusBtn);
        card_body.append(title,price_for,price);
        col1.append(card_icon);
        col2.append(card_body);
        row.append(col1, col2);
        card.append(row, addContainer);
        col.append(card);
        container.append(col);
    }
}