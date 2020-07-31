$(document).ready(function () {    
    $(".screen-center").animate({ left: "0%" }, 2000);
    $(".screen-center").fadeOut(1000);
    $(".screen-left").delay(2100).animate({ left: "100%" }, 1000);
    $(".screen-right").delay(2100).animate({ width: "0", left: "0%" }, 1000);  
});