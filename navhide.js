//hide navigation bar
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('.nav');

window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-90px"; // Adjust this value based on your navbar's height
    }
    prevScrollPos = currentScrollPos;
};