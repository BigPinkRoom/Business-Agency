(function(){

    // Constants
    const header = document.getElementById('header'),
          navToggle = document.getElementById('nav-toggle'),
          navLink = document.querySelector('.nav__link'),
          intro = document.getElementById('intro');
    
    // Burger menu toggle
    function toggleHeaderBurger() {
        header.classList.toggle('active');
    }

    function hideHeaderActiveBurger() {
        if (event.target.closest('.nav__link') && event.target.closest('.header.active')) header.classList.toggle('active');
        return
    }

    navToggle.addEventListener('click', toggleHeaderBurger);
    document.addEventListener('click', hideHeaderActiveBurger);

    // Fix header on scroll
    function toggleFixedHeader() {
        let scrollHeight = window.pageYOffset,
            introHeight = intro.offsetHeight - header.offsetHeight;

        if(scrollHeight >= introHeight && !header.classList.contains('fixed')) {
            header.classList.add('fixed');
        }

        if(scrollHeight < introHeight && header.classList.contains('fixed')) {
            header.classList.remove('fixed');
        }
    }

    document.addEventListener('scroll', toggleFixedHeader);
    toggleFixedHeader();

    // Smooth scroll
    function smoothScroll() {
        if(!event.target.dataset.scroll) return
        if(!document.getElementById(event.target.dataset.scroll)) {
            document.location.href = `index.html#${event.target.dataset.scroll}`;
        }
        event.preventDefault();

        let element = document.getElementById(event.target.dataset.scroll),
            elementStartPosition = element.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
            startPosition = window.pageYOffset,
            distance = elementStartPosition - startPosition,
            duration = 1000,
            startTime = null;

        function animation(currentTime) {
            if(!startTime) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if(timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(timeElapsed, startPosition, distance, duration) {
           timeElapsed /= duration / 2;
           if (timeElapsed < 1) return distance / 2 * timeElapsed * timeElapsed * timeElapsed + startPosition;
           timeElapsed--;
           return -distance / 2 * (timeElapsed * (timeElapsed - 2) - 1) + startPosition;
        }

        requestAnimationFrame(animation)
    }

    document.addEventListener('click', smoothScroll)

    // Gallery filter
    function imageFilter() {
        if(!event.target.classList.contains("gallery__link")) return
        
        let categoryName = event.target.textContent.toLowerCase();

        let Allcategory = document.querySelectorAll(`.gallery__wrapper img[data-category]`);

        Allcategory.forEach(element => {
            if(categoryName === "all") {
                element.parentElement.style.display="block";
            } else {
            element.parentElement.style.display="none";
            }
        });

        let currentCategory = document.querySelectorAll(`.gallery__wrapper img[data-category='${categoryName}']`)

        currentCategory.forEach(element => {
            element.parentElement.style.display="block";
        });

    }

    document.addEventListener('click', imageFilter)    
})()