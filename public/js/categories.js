$(document).ready(function () {
    request = $.ajax({
        url: "/categories",
        type: "GET",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        populate(response)
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {

        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );

        $('#categories-container').text( jqXHR.responseJSON.message)


    });
});

function populate(data){
    console.log(data)
    let container = $('#categories-container');
    for(let i=0; i< data.length; i++){
        let col = document.createElement('div');
        col.setAttribute('class', 'col-lg-3 col-md-4 col-sm-6 col-12');
        let card = document.createElement('div');
        card.setAttribute('class', 'card category text-center m-2 accent');
        card.style.minWidth = '80%';
        let card_icon = document.createElement('i');
        card_icon.setAttribute('class', data[i].icon +' fa-3x mt-3 text-light card-img-center');
        let card_body = document.createElement('div');
        card_body.setAttribute('class', 'card-body');
        let title = document.createElement('h5');
        title.setAttribute('class', 'card-title text-light');
        title.innerText = data[i].title;
        let link = document.createElement('a');
        link.setAttribute('class', 'text-accent stretched-link');
        link.href = "/browse/"+data[i].tag+"/"+data[i]._id;    
        card_body.append(title);
        card_body.append(link);
        card.append(card_icon, card_body);
        col.append(card);
        container.append(col);
    }
    
}