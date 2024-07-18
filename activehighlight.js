function highlightActiveLink() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navlinks');

    // Get the current URL path
    const currentPath = window.location.pathname.split('/').pop();

    // Loop through links and add 'active' class to the current page link
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run the function to highlight the active link
highlightActiveLink();