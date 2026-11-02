// ==========================================
// MADMAXANIME
// ANIME WEBSITE JAVASCRIPT
// ==========================================


// ==========================================
// 1. ANIME SLIDER
// ==========================================

// LIST OF FEATURED ANIME

const animeArticles = [
    {
        title: "JUJUTSU KAISEN",
        description: "Enter a world of curses, powerful sorcerers and deadly battles."
    },
    {
        title: "DEMON SLAYER",
        description: "Follow Tanjiro on his journey to save his sister."
    },
    {
        title: "ATTACK ON TITAN",
        description: "Humanity fights for survival against terrifying Titans."
    },
    {
        title: "SOLO LEVELING",
        description: "Witness Sung Jin-Woo's incredible journey to become stronger."
    },
    {
        title: "ONE PIECE",
        description: "Join Luffy and his crew on their adventure for the ultimate treasure."
    }
];


// START AT THE FIRST ANIME

let currentAnime = 0;


// GET HTML ELEMENTS

const articleTitle = document.getElementById("title");
const articleDescription = document.getElementById("description");
const article = document.querySelector(".article");


// FUNCTION TO DISPLAY ANIME

function showAnime(direction) {

    if (!article || !articleTitle || !articleDescription) {
        return;
    }

    article.classList.add("moving");

    setTimeout(function () {

        currentAnime =
            (currentAnime + direction + animeArticles.length)
            % animeArticles.length;

        articleTitle.textContent =
            animeArticles[currentAnime].title;

        articleDescription.textContent =
            animeArticles[currentAnime].description;

        article.classList.remove("moving");

    }, 150);
}


// NEXT ANIME BUTTON

const nextButton = document.getElementById("next");

if (nextButton) {
    nextButton.addEventListener("click", function () {
        showAnime(1);
    });
}


// PREVIOUS ANIME BUTTON

const previousButton = document.getElementById("previous");

if (previousButton) {
    previousButton.addEventListener("click", function () {
        showAnime(-1);
    });
}


// ==========================================
// 2. ANIME GALLERY PREVIEW
// ==========================================

// GET ALL ANIME IMAGES

const galleryImages = document.querySelectorAll(
    ".featured-gallery img, .menu img"
);

let currentImageIndex = 0;


// OPEN IMAGE PREVIEW

function openPreview(image) {

    const preview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");

    if (!preview || !previewImage) {
        return;
    }

    currentImageIndex =
        Array.from(galleryImages).indexOf(image);

    previewImage.src = image.src;
    previewImage.alt = image.alt;

    preview.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// CHANGE IMAGE

function changeImage(direction, event) {

    if (event) {
        event.stopPropagation();
    }

    if (galleryImages.length === 0) {
        return;
    }

    currentImageIndex =
        (currentImageIndex + direction + galleryImages.length)
        % galleryImages.length;

    const selectedImage = galleryImages[currentImageIndex];

    const previewImage = document.getElementById("previewImage");

    if (previewImage) {
        previewImage.src = selectedImage.src;
        previewImage.alt = selectedImage.alt;
    }
}


// CLOSE IMAGE PREVIEW

function closePreview() {

    const preview = document.getElementById("imagePreview");

    if (preview) {
        preview.style.display = "none";
    }

    document.body.style.overflow = "auto";
}


// KEYBOARD CONTROLS

document.addEventListener("keydown", function (event) {

    const preview = document.getElementById("imagePreview");

    if (!preview || preview.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        closePreview();
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }

});


// ==========================================
// 3. ANIME SEARCH SYSTEM
// ==========================================

// GET SEARCH ELEMENTS

const animeSearch = document.getElementById("animeSearch");

const animeCards = document.querySelectorAll(".anime-card");

const searchResults = document.getElementById("searchResults");

const noResults = document.getElementById("noResults");

const clearSearch = document.getElementById("clearSearch");


// SEARCH FUNCTION

function searchAnime() {

    const searchText = animeSearch.value
        .trim()
        .toLowerCase();

    let visibleAnime = 0;


    // CHECK EVERY ANIME CARD

    animeCards.forEach(function (card) {

        const animeName = card.querySelector("h3");

        const animeDescription = card.querySelector("p");


        // COLLECT ANIME INFORMATION

        const animeInformation = (

            (animeName ? animeName.textContent : "") +
            " " +
            (animeDescription ? animeDescription.textContent : "")

        ).toLowerCase();


        // CHECK IF ANIME MATCHES SEARCH

        const matches = animeInformation.includes(searchText);


        // SHOW OR HIDE ANIME

        card.hidden = !matches;


        if (matches) {
            visibleAnime++;
        }

    });


    // UPDATE SEARCH RESULTS

    if (searchResults) {

        searchResults.textContent =
            "Found " + visibleAnime + " anime.";

    }


    // SHOW NO RESULTS MESSAGE

    if (noResults) {
        noResults.hidden = visibleAnime !== 0;
    }


    // SHOW CLEAR BUTTON

    if (clearSearch) {

        clearSearch.classList.toggle(
            "show",
            searchText.length > 0
        );

    }

}


// SEARCH WHILE TYPING

if (animeSearch) {

    animeSearch.addEventListener(
        "input",
        searchAnime
    );

}


// CLEAR SEARCH

if (clearSearch && animeSearch) {

    clearSearch.addEventListener("click", function () {

        animeSearch.value = "";

        searchAnime();

        animeSearch.focus();

    });

}


// ==========================================
// 4. ANIME WATCHLIST
// ==========================================

// GET WATCHLIST BUTTONS

const watchlistButtons = document.querySelectorAll(".add-watchlist");


// ADD OR REMOVE ANIME FROM WATCHLIST

watchlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const animeName = button.dataset.anime;

        if (!animeName) return;

        const isAdded = button.classList.toggle("added");

        button.textContent = isAdded
            ? "Added to Watchlist ✓"
            : "Add to Watchlist +";

    });

});


// ==========================================
// 5. ANIME CATEGORY FILTER
// ==========================================

// GET CATEGORY BUTTONS

const categoryButtons = document.querySelectorAll(".category-btn");


// FILTER ANIME BY CATEGORY

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category = button.dataset.category;

        animeCards.forEach(function (card) {

            const animeCategory = card.dataset.category;

            if (category === "all" || animeCategory === category) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });

    });

});


// ==========================================
// 6. NEWS SECTION
// ==========================================

// GET NEWS CARDS

const newsCards = document.querySelectorAll(".news-card");


// DISPLAY NEWS

newsCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const newsTitle = card.querySelector("h3");

        if (newsTitle) {
            console.log("Opening anime news:", newsTitle.textContent);
        }

    });

});


// ==========================================
// 7. ANIME CONTACT FORM
// ==========================================

// GET CONTACT FORM

const contactForm = document.getElementById("contactForm");


// SEND CONTACT MESSAGE

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = document.getElementById("contactMessage");

        if (message) {

            message.textContent =
                "Thank you for contacting MADMAXANIME!";

        }

        contactForm.reset();

    });

}


// ==========================================
// 8. MOBILE NAVIGATION
// ==========================================

// GET MENU ELEMENTS

const menuButton = document.getElementById("menuButton");

const navigation = document.querySelector(".nav-links");


// OPEN AND CLOSE MOBILE MENU

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

}


// ==========================================
// 9. BACK TO TOP BUTTON
// ==========================================

// GET BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");


// SCROLL TO TOP

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ==========================================
// 10. WEBSITE INITIALISATION
// ==========================================

// DISPLAY FIRST ANIME

if (animeArticles.length > 0 && articleTitle && articleDescription) {

    articleTitle.textContent = animeArticles[0].title;

    articleDescription.textContent = animeArticles[0].description;

}


// RUN SEARCH ON STARTUP

if (animeSearch) {
    searchAnime();
}


// ==========================================
// END OF MADMAXANIME JAVASCRIPT
// ==========================================