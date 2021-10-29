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

// Define Global variables
const navbarList = document.querySelector('#navbar__list');
const sectionsAll = document.querySelectorAll('section');
const navbarHrefs = ['section1', 'section2', 'section3', 'section4'];
const navbarNameItems = ['Section 1', 'Section 2', 'Section 3', 'Section 4'];

// build the nav
const buildNavbar = () => {
	navbarNameItems.forEach((nameItem, index) => {
		const navbarItem = document.createElement('li');
		const navbarLink = document.createElement('a');

		navbarLink.textContent = nameItem;
		navbarLink.href = `#${navbarHrefs[index]}`;
		navbarLink.classList.add('menu__link', navbarHrefs[index]);

		navbarItem.appendChild(navbarLink);
		navbarList.appendChild(navbarItem);
	});
};

// check navbar item active according section active
function checkNavbarItemActive(section, activeSection) {
	const navbarItem = navbarList.querySelector(`.${section.id}`);

	if (activeSection) {
		navbarItem.classList.add('selected');
	} else {
		navbarItem.classList.remove('selected');
	}
}

// add and remove active class for section elements
function activeSection(elementContent) {
	sectionsAll.forEach((section) => {
		const sectionDataset = section.dataset.nav;
		const activeSection = sectionDataset === elementContent;

		if (activeSection) {
			section.classList.add('your-active-class');
			checkNavbarItemActive(section, activeSection);
		} else {
			section.classList.remove('your-active-class');
			checkNavbarItemActive(section, activeSection);
		}
	});
}

// add class 'active' to section when click navbar menu and scroll to appropriate section
const handleClickNavbar = (evt) => {
	// prevent default when click element
	evt.preventDefault();

	// add class 'active' to section
	const elementContent = evt.target.textContent;
	activeSection(elementContent);

	// scroll to section
	sectionsAll.forEach((section) => {
		const sectionDataset = section.dataset.nav;
		if (sectionDataset === elementContent) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	});
};

// add class 'active' to section when scroll
const handleScroll = () => {
	sectionsAll.forEach((section) => {
		const domRect = section.getBoundingClientRect();
		if (domRect.y < 100 && domRect.y > -100) {
			activeSection(section.dataset.nav);
		}
	});
};

/**
 * Run app
 *
 **/

// Build menu
buildNavbar();

// Add event listener when click navbar menu
navbarList.addEventListener('click', handleClickNavbar);

// Add event listener when scroll
document.addEventListener('scroll', handleScroll);
