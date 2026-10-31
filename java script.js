
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector("nav");

menuBtn.addEventListener("click", function() {
    navigation.classList.toggle("active");
});

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function() {
        navigation.classList.remove("active");
    });
});

// STORE BUTTON
const storeBtn = document.getElementById("storeBtn");

storeBtn.addEventListener("click", function() {
    alert("Welcome to the MADMAXANIME Store! Coming soon.");
});

// WELCOME MESSAGE
console.log("MADMAXANIME website loaded successfully!");
