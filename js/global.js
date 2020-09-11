// this script repeated in all pages


/* Start Scroll To Top */
mybutton = document.getElementById("to-top");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
$('#to-top').click(function(){
    $('html').animate({ scrollTop: 0 }, 'slow'); return true;
});

/* End Scroll To Top */



/* Start Loader */
var myVar;

function HideLoader() {
    myVar = setTimeout(showPage, 500);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
/* End Loader */
