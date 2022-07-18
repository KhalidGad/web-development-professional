/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
let fragDom = document.createDocumentFragment();
let navList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function creatMenuLink(section, sectionName, sectionID) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.classList.add('menu__link');
    a.href = `#${sectionID}`;
    a.innerText = sectionName;
    // Scroll to section on link click
    a.addEventListener('click', (evt) => {
        evt.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    li.appendChild(a);
    return li;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavbar() {
    sections.forEach(section => {
        let name = section.getAttribute('data-nav');
        let id = section.getAttribute('id');
        let li = creatMenuLink(section, name, id);
        fragDom.appendChild(li);
    });
    navList.appendChild(fragDom);
}

// Add class 'active' to section and to related link in the navbar when near top of viewport
function toggleActiveState() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('your-active-class', entry.isIntersecting);
            document.querySelector(`.menu__link[href="#${entry.target.id}"]`).classList.toggle('nav-active-class', entry.isIntersecting);
        });
    },
        {
            threshold: 0.6,
        });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/
// Build menu 
buildNavbar();

// Set sections as active
window.addEventListener('scroll', toggleActiveState);


/**
 * Additional Features
 */

// Hide fixed navigation bar while not scrolling
let navHeader = document.getElementsByClassName('page__header')[0];

window.addEventListener('scroll', () => {
    navHeader.classList.remove('nav-hidden');
    let lastScrollY = window.scrollY;
    setTimeout(() => {
        if (lastScrollY === window.scrollY && lastScrollY !== 0) {
            navHeader.classList.add('nav-hidden');
        }
    }, 3000);
});

// scroll to top button
let up = document.getElementsByClassName('up')[0];
let pageTitle = document.getElementsByClassName('main__hero')[0];

up.addEventListener('click', () => {
    pageTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
})

window.addEventListener('scroll', () => {
    up.classList.toggle('show', this.scrollY >= 1000);
});

