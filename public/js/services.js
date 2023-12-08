

$(document).ready(function () {
    let category_tag = window.location.href.split('/');
    category_tag = category_tag[category_tag.length - 2];
    let category_id = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
    let heading = category_tag.split('-');
    $('#page_heading').text(heading[0] + " " + heading[1]);
    request = $.ajax({
        url: "/services/category/" + category_id,
        type: "GET",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        populate(response);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        $('#services-container').text(jqXHR.responseJSON.message);
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown, jqXHR.responseJSON.message
        );

    });
});

function populate(data) {
    let container = $('#services-container');
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
        col.setAttribute('class', 'col-lg-4 col-md-6 col-12');
        card.setAttribute('class', 'card service m-2 p-2');
        row.setAttribute('class', 'row no-gutters');
        col1. setAttribute('class', 'col-4 align-self-center') ;
        col2.setAttribute('class', 'col-8');
        card_body.setAttribute('class', 'card-body');
        title.setAttribute('class', 'card-title text-dark');
        price.setAttribute('class', 'card-text');
        price_for.setAttribute('class', 'card-text text-subtitle');
        addContainer.setAttribute('class', 'add-container');
        plusBtn.setAttribute('class', 'btn plus-btn');
        minusBtn.setAttribute('class', 'btn minus-btn');
        quantity.setAttribute('class', 'quantity-span');
        card_icon.style.width='100%';
        title.style.margin = '5px';
        price.style.margin = '5px';
        price_for.style.margin = '5px';
        price.style.fontWeight = 'bold';
        card_icon.src = '/static/images/led-tv.png';
        title.innerText = data[i].title;
        price.innerText = "Rs:" + data[i].price;
        price_for.innerText = "- " + data[i].price_for;  
        plusBtn.innerHTML = "+";
        minusBtn.innerHTML = "-";
        quantity.innerText = 'Add';
        plusBtn.addEventListener('click', function(){
            addToCart(this.parentElement, data[i]);
        })
        quantity.addEventListener('click', function(){
            addToCart(this.parentElement, data[i]);
        })
        minusBtn.addEventListener('click', function(){
            removeFromCart(this.parentElement, data[i]);
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