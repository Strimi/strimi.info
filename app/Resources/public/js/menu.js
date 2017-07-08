$(".menu-item").click(function(event){
    event.preventDefault();
    var getID = $(this).data('id');
    var getElement = $('#' + getID);
    $('html, body').animate({
        scrollTop: getElement.offset().top
    }, 1000);
});

$(document).ready(function(){
    $("body").scrollspy({
        target: "#menuNavbar",
        offset: 70
    })
});