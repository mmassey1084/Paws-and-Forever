'use strict';
const bannerButton = document.getElementById("banner-button");

var countDownDate = new Date("Jan 5, 2027 15:37:25").getTime();;

var x = setInterval(function () {
// Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

//fades the section elements in when the window loads
function fade() {
    if(window.innerWidth > 800){
        $('h1').hide().delay(1500).fadeIn();
        $('#bannerParagraph').hide().delay(2000).fadeIn();
        $('#banner-button').hide().delay(2500).fadeIn();
    }
}
bannerButton.addEventListener("click", () => {
    window.open("adoptionPage.html");
});
$(window).on("load", fade);