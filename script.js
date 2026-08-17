/* =========================================================
   KALDI COFFEE HOUSE
   MAIN JAVASCRIPT
   2026 PREMIUM COFFEE HOUSE WEBSITE
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const body = document.body;

const loader = document.getElementById("loader");

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const backToTop = document.getElementById("backToTop");

const heroBackgrounds =
    document.querySelectorAll(".hero-bg");

const statNumbers =
    document.querySelectorAll(".stat-number");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialPrev =
    document.getElementById("testimonialPrev");

const testimonialNext =
    document.getElementById("testimonialNext");


/* =========================================================
   2. LOADING SCREEN
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {

            loader.classList.add("hidden");

        }

    }, 800);

});


/* =========================================================
   3. MOBILE MENU
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        navLinks.classList.toggle("active");

        body.classList.toggle("no-scroll");

    });


    /* Close menu when a navigation link is clicked */

    const navigationItems =
        navLinks.querySelectorAll("a");


    navigationItems.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            body.classList.remove("no-scroll");

        });

    });

}


/* =========================================================
   4. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!menuToggle || !navLinks) {
        return;
    }


    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navLinks.classList.contains("active")
    ) {

        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        body.classList.remove("no-scroll");

    }

});


/* =========================================================
   5. STICKY HEADER
========================================================= */

function handleHeaderScroll() {

    if (!header) {
        return;
    }


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll
);


/* Run once when page loads */

handleHeaderScroll();


/* =========================================================
   6. HERO BACKGROUND SLIDER
========================================================= */

let currentHero = 0;

const heroInterval = 5000;


function showHero(index) {

    if (!heroBackgrounds.length) {
        return;
    }


    heroBackgrounds.forEach((background, i) => {

        background.classList.toggle(
            "active",
            i === index
        );

    });

}


function nextHero() {

    if (!heroBackgrounds.length) {
        return;
    }


    currentHero++;

    if (
        currentHero >=
        heroBackgrounds.length
    ) {

        currentHero = 0;

    }


    showHero(currentHero);

}


/* Start Hero Slider */

if (heroBackgrounds.length > 1) {

    setInterval(
        nextHero,
        heroInterval
    );

}


/* =========================================================
   7. STATISTICS COUNTER
========================================================= */

let countersStarted = false;


function animateCounter(element) {

    const target =
        parseInt(
            element.getAttribute("data-target")
        );


    if (isNaN(target)) {
        return;
    }


    let current = 0;


    const duration = 1800;

    const increment =
        target / (duration / 16);


    function updateCounter() {

        current += increment;


        if (current < target) {

            element.textContent =
                Math.floor(current);

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    updateCounter();

}


function startCounters() {

    if (countersStarted) {
        return;
    }


    if (!statNumbers.length) {
        return;
    }


    countersStarted = true;


    statNumbers.forEach(counter => {

        animateCounter(counter);

    });

}


/* =========================================================
   8. DETECT STATISTICS SECTION
========================================================= */

function checkCounters() {

    if (countersStarted) {
        return;
    }


    if (!statNumbers.length) {
        return;
    }


    const firstCounter =
        statNumbers[0];


    const rect =
        firstCounter.getBoundingClientRect();


    const windowHeight =
        window.innerHeight;


    if (
        rect.top <
        windowHeight * 0.85
    ) {

        startCounters();

    }

}


window.addEventListener(
    "scroll",
    checkCounters
);


/* Check immediately */

checkCounters();


/* =========================================================
   9. TESTIMONIAL SLIDER
========================================================= */

let currentTestimonial = 0;


function showTestimonial(index) {

    if (!testimonialCards.length) {
        return;
    }


    testimonialCards.forEach(
        (card, i) => {

            card.classList.toggle(
                "active",
                i === index
            );

        }
    );

}


function nextTestimonial() {

    if (!testimonialCards.length) {
        return;
    }


    currentTestimonial++;


    if (
        currentTestimonial >=
        testimonialCards.length
    ) {

        currentTestimonial = 0;

    }


    showTestimonial(
        currentTestimonial
    );

}


function previousTestimonial() {

    if (!testimonialCards.length) {
        return;
    }


    currentTestimonial--;


    if (currentTestimonial < 0) {

        currentTestimonial =
            testimonialCards.length - 1;

    }


    showTestimonial(
        currentTestimonial
    );

}


/* =========================================================
   TESTIMONIAL BUTTONS
========================================================= */

if (testimonialNext) {

    testimonialNext.addEventListener(
        "click",
        nextTestimonial
    );

}


if (testimonialPrev) {

    testimonialPrev.addEventListener(
        "click",
        previousTestimonial
    );


}


/* =========================================================
   10. AUTOMATIC TESTIMONIAL SLIDER
========================================================= */

if (testimonialCards.length > 1) {

    setInterval(
        nextTestimonial,
        6000
    );

}


/* =========================================================
   11. BACK TO TOP BUTTON
========================================================= */

function handleBackToTop() {

    if (!backToTop) {
        return;
    }


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop
);


/* =========================================================
   BACK TO TOP CLICK
========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   12. SMOOTH SCROLLING
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   13. ACTIVE NAVIGATION LINK
========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navItems.forEach(link => {

    const linkPage =
        link.getAttribute("href");


    if (!linkPage) {
        return;
    }


    /*
       If the page is opened directly,
       highlight the matching navigation item.
    */

    if (
        linkPage === currentPage ||
        (
            currentPage === "" &&
            linkPage === "index.html"
        )
    ) {

        navItems.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        link.classList.add("active");

    }

});


/* =========================================================
   14. CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768 &&
            navLinks &&
            menuToggle
        ) {

            navLinks.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            body.classList.remove(
                "no-scroll"
            );

        }

    }
);


/* =========================================================
   15. ESCAPE KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains(
                "active"
            )
        ) {

            navLinks.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            body.classList.remove(
                "no-scroll"
            );

        }

    }
);


/* =========================================================
   16. PREVENT EMPTY SOCIAL LINKS
========================================================= */

const emptyLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


emptyLinks.forEach(link => {

    /*
       These links are temporary placeholders.
       We prevent the page from jumping to the top.
    */

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

        }
    );

});


/* =========================================================
   17. PAGE READY
========================================================= */

console.log(
    "☕ KALDI Coffee House website loaded successfully."
);
/* =========================================================
   ABOUT PAGE FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        // Close other FAQ items
        faqItems.forEach((otherItem) => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            }

        });


        // Toggle current FAQ
        item.classList.toggle("active");


        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});
/* =========================================================
   KALDI COFFEE HOUSE
   GALLERY PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   GALLERY FILTER
========================================================= */

const galleryFilters =
    document.querySelectorAll(".gallery-filter");

const galleryItems =
    document.querySelectorAll(".gallery-item");


if (galleryFilters.length && galleryItems.length) {

    galleryFilters.forEach((filter) => {

        filter.addEventListener("click", () => {

            /* Remove active from all buttons */

            galleryFilters.forEach((button) => {

                button.classList.remove("active");

            });


            /* Add active to clicked button */

            filter.classList.add("active");


            const selectedCategory =
                filter.dataset.filter;


            /* Filter gallery items */

            galleryItems.forEach((item) => {

                const itemCategory =
                    item.dataset.category;


                if (
                    selectedCategory === "all" ||
                    itemCategory === selectedCategory
                ) {

                    item.classList.remove(
                        "gallery-hidden"
                    );

                } else {

                    item.classList.add(
                        "gallery-hidden"
                    );

                }

            });

        });

    });

}


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const galleryViewButtons =
    document.querySelectorAll(".gallery-view");


let currentGalleryIndex = 0;


/* =========================================================
   GET GALLERY IMAGES
========================================================= */

const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
);


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openGalleryLightbox(index) {

    if (!galleryLightbox || !galleryImages.length) {
        return;
    }


    currentGalleryIndex = index;


    const image =
        galleryImages[currentGalleryIndex];


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightboxCaption.textContent =
        image.alt;


    galleryLightbox.classList.add(
        "active"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox.classList.remove(
        "active"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   SHOW NEXT IMAGE
========================================================= */

function showNextGalleryImage() {

    if (!galleryImages.length) {
        return;
    }


    currentGalleryIndex++;


    if (
        currentGalleryIndex >=
        galleryImages.length
    ) {

        currentGalleryIndex = 0;

    }


    updateGalleryLightbox();

}


/* =========================================================
   SHOW PREVIOUS IMAGE
========================================================= */

function showPreviousGalleryImage() {

    if (!galleryImages.length) {
        return;
    }


    currentGalleryIndex--;


    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            galleryImages.length - 1;

    }


    updateGalleryLightbox();

}


/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateGalleryLightbox() {

    const image =
        galleryImages[currentGalleryIndex];


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightboxCaption.textContent =
        image.alt;

}


/* =========================================================
   GALLERY VIEW BUTTONS
========================================================= */

galleryViewButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                openGalleryLightbox(index);

            }
        );

    }
);


/* =========================================================
   CLICK GALLERY IMAGE
========================================================= */

galleryItems.forEach((item, index) => {

    item.addEventListener(
        "click",
        (event) => {

            /*
             Prevent duplicate click when
             clicking the expand button.
            */

            if (
                event.target.closest(
                    ".gallery-view"
                )
            ) {

                return;

            }


            openGalleryLightbox(index);

        }
    );

});


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGalleryLightbox
    );

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPreviousGalleryImage
    );

}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNextGalleryImage
    );

}


/* =========================================================
   CLICK OUTSIDE IMAGE TO CLOSE
========================================================= */

if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                galleryLightbox
            ) {

                closeGalleryLightbox();

            }

        }
    );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        /* ESC = Close */

        if (
            event.key === "Escape"
        ) {

            closeGalleryLightbox();

        }


        /* Arrow Right = Next */

        if (
            event.key === "ArrowRight"
        ) {

            showNextGalleryImage();

        }


        /* Arrow Left = Previous */

        if (
            event.key === "ArrowLeft"
        ) {

            showPreviousGalleryImage();

        }

    }
);


/* =========================================================
   TOUCH / SWIPE SUPPORT
========================================================= */

let galleryTouchStartX = 0;

let galleryTouchEndX = 0;


if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "touchstart",
        (event) => {

            galleryTouchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    galleryLightbox.addEventListener(
        "touchend",
        (event) => {

            galleryTouchEndX =
                event.changedTouches[0].screenX;


            const swipeDistance =
                galleryTouchEndX -
                galleryTouchStartX;


            /*
             * Swipe left = next image
             */

            if (swipeDistance < -50) {

                showNextGalleryImage();

            }


            /*
             * Swipe right = previous image
             */

            if (swipeDistance > 50) {

                showPreviousGalleryImage();

            }

        },
        { passive: true }
    );

}
/* =========================================================
   KALDI COFFEE HOUSE
   CONTACT / RESERVATION JAVASCRIPT
========================================================= */


/* =========================================================
   RESERVATION FORM
========================================================= */

const reservationForm =
    document.getElementById("reservationForm");


if (reservationForm) {


    /* -----------------------------------------
       SET MINIMUM DATE TO TODAY
    ----------------------------------------- */

    const reservationDate =
        document.getElementById("reservationDate");


    if (reservationDate) {

        const today =
            new Date().toISOString().split("T")[0];

        reservationDate.min = today;

    }


    /* -----------------------------------------
       FORM SUBMIT
    ----------------------------------------- */

    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------
               GET FORM VALUES
            --------------------------------- */

            const name =
                document
                    .getElementById("reservationName")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("reservationPhone")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("reservationEmail")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("reservationDate")
                    .value;

            const time =
                document
                    .getElementById("reservationTime")
                    .value;

            const guests =
                document
                    .getElementById("reservationGuests")
                    .value;

            const message =
                document
                    .getElementById("reservationMessage")
                    .value
                    .trim();


            /* ---------------------------------
               BASIC VALIDATION
            --------------------------------- */

            if (
                !name ||
                !phone ||
                !date ||
                !time ||
                !guests
            ) {

                showReservationMessage(
                    "Please complete all required fields.",
                    "error"
                );

                return;

            }


            /* ---------------------------------
               PHONE VALIDATION
            --------------------------------- */

            const phonePattern =
                /^[0-9+\-\s()]{9,20}$/;


            if (!phonePattern.test(phone)) {

                showReservationMessage(
                    "Please enter a valid phone number.",
                    "error"
                );

                return;

            }


            /* ---------------------------------
               DATE VALIDATION
            --------------------------------- */

            const selectedDate =
                new Date(date + "T00:00:00");

            const currentDate =
                new Date();

            currentDate.setHours(
                0,
                0,
                0,
                0
            );


            if (selectedDate < currentDate) {

                showReservationMessage(
                    "Please choose today or a future date.",
                    "error"
                );

                return;

            }


            /* ---------------------------------
               TIME VALIDATION
            --------------------------------- */

            const selectedTime =
                timeToMinutes(time);


            const openingTime =
                timeToMinutes("07:00");

            const closingTime =
                timeToMinutes("22:00");


            if (
                selectedTime < openingTime ||
                selectedTime > closingTime
            ) {

                showReservationMessage(
                    "Please choose a reservation time between 7:00 AM and 10:00 PM.",
                    "error"
                );

                return;

            }


            /* ---------------------------------
               FORMAT DATE
            --------------------------------- */

            const formattedDate =
                formatReservationDate(date);


            /* ---------------------------------
               FORMAT TIME
            --------------------------------- */

            const formattedTime =
                formatReservationTime(time);


            /* ---------------------------------
               CREATE WHATSAPP MESSAGE
            --------------------------------- */

            const whatsappMessage =

`☕ KALDI COFFEE HOUSE
RESERVATION REQUEST

Hello KALDI,

I would like to request a table reservation.

👤 Name:
${name}

📱 Phone:
${phone}

📅 Date:
${formattedDate}

⏰ Time:
${formattedTime}

👥 Guests:
${guests}

📧 Email:
${email || "Not provided"}

📝 Special Request:
${message || "None"}

Thank you!`;


            /* ---------------------------------
               WHATSAPP NUMBER
            --------------------------------- */

            /*
             * IMPORTANT:
             * Replace the number below with
             * the real KALDI WhatsApp number.
             *
             * Use international format
             * WITHOUT + or spaces.
             *
             * Example:
             * 251912345678
             */

            const whatsappNumber =
                "2519XXXXXXXX";


            /* ---------------------------------
               CREATE WHATSAPP URL
            --------------------------------- */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* ---------------------------------
               SUCCESS MESSAGE
            --------------------------------- */

            showReservationMessage(
                "Your reservation request is ready. You will now be redirected to WhatsApp.",
                "success"
            );


            /* ---------------------------------
               OPEN WHATSAPP
            --------------------------------- */

            setTimeout(
                function () {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                },
                900
            );

        }
    );

}


/* =========================================================
   TIME → MINUTES
========================================================= */

function timeToMinutes(time) {

    const parts =
        time.split(":");

    const hours =
        parseInt(
            parts[0],
            10
        );

    const minutes =
        parseInt(
            parts[1],
            10
        );

    return (
        hours * 60 +
        minutes
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatReservationDate(date) {

    const dateObject =
        new Date(
            date + "T00:00:00"
        );


    return dateObject.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatReservationTime(time) {

    const parts =
        time.split(":");

    let hours =
        parseInt(
            parts[0],
            10
        );

    const minutes =
        parts[1];

    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    return (
        hours +
        ":" +
        minutes +
        " " +
        period
    );

}


/* =========================================================
   RESERVATION MESSAGE
========================================================= */

function showReservationMessage(
    message,
    type
) {


    /* -----------------------------------------
       REMOVE EXISTING MESSAGE
    ----------------------------------------- */

    const existingMessage =
        document.querySelector(
            ".reservation-form .form-success, " +
            ".reservation-form .form-error"
        );


    if (existingMessage) {

        existingMessage.remove();

    }


    /* -----------------------------------------
       CREATE MESSAGE
    ----------------------------------------- */

    const messageElement =
        document.createElement("div");


    messageElement.className =
        type === "success"
            ? "form-success"
            : "form-error";


    messageElement.setAttribute(
        "role",
        "alert"
    );


    messageElement.innerHTML =

        type === "success"

            ?

            `<i class="fa-solid fa-circle-check"></i>
             ${message}`

            :

            `<i class="fa-solid fa-circle-exclamation"></i>
             ${message}`;


    /* -----------------------------------------
       INSERT MESSAGE
    ----------------------------------------- */

    reservationForm.appendChild(
        messageElement
    );


    /* -----------------------------------------
       SCROLL TO MESSAGE
    ----------------------------------------- */

    messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /* -----------------------------------------
       REMOVE AFTER 7 SECONDS
    ----------------------------------------- */

    setTimeout(
        function () {

            if (
                messageElement &&
                messageElement.parentNode
            ) {

                messageElement.remove();

            }

        },
        7000
    );

}


/* =========================================================
   WHATSAPP LINKS
========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        ".whatsapp-link"
    );


whatsappLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*
                 * Replace with the real
                 * KALDI WhatsApp number.
                 */

                const whatsappNumber =
                    "2519XXXXXXXX";


                const message =
                    "Hello KALDI Coffee House! I would like to know more about your coffee house and services.";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }
);


/* =========================================================
   PREVENT PAST DATE
========================================================= */

const dateInput =
    document.getElementById(
        "reservationDate"
    );


if (dateInput) {

    dateInput.addEventListener(
        "change",
        function () {

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];


            if (
                this.value &&
                this.value < today
            ) {

                this.value = "";

                showReservationMessage(
                    "Past dates cannot be selected. Please choose today or a future date.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   CONTACT PAGE CONSOLE CHECK
========================================================= */

console.log(
    "KALDI Contact & Reservation system loaded successfully."
);