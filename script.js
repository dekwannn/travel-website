// Toggle navbar menu and hamburger animation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function () {
    // Data untuk tempat populer
    const places = [
        {
            category: "waterfall",
            imgSrc: "assets/images/banyumala.png",
            location: "Bedugul",
            title: "Banyumala Waterfall"
        },
        {
            category: "waterfall",
            imgSrc: "assets/images/katolampo.png",
            location: "Ubud",
            title: "Katu Lampo Waterfall"
        },
        {
            category: "waterfall",
            imgSrc: "assets/images/tibumana.png",
            location: "Ubud",
            title: "Tibumana Waterfall"
        },
        {
            category: "lakes",
            imgSrc: "assets/images/beratan.png",
            location: "Bedugul",
            title: "Lake Beratan"
        },
        {
            category: "rice-terraces",
            imgSrc: "assets/images/tegalalang.png",
            location: "Ubud",
            title: "Tegalalang"
        },
        {
            category: "temples",
            imgSrc: "assets/images/goagajah.png",
            location: "Ubud",
            title: "Goa Gajah"
        },
        {
            category: "temples",
            imgSrc: "assets/images/tirtaempul.png",
            location: "Ubud",
            title: "Tirta Empul"
        },
        {
            category: "temples",
            imgSrc: "assets/images/lempuyang.png",
            location: "Lempuyang",
            title: "Pura Lempuyang"
        },
        {
            category: "temples",
            imgSrc: "assets/images/tirtagangga.png",
            location: "Lempuyang",
            title: "Tirta Gangga"
        },
        {
            category: "rice-terraces",
            imgSrc: "assets/images/jatiluwih.png",
            location: "Bedugul",
            title: "Jatiluwih"
        }
    ];

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    window.addEventListener('scroll', debounce(handleScrollAnimation));
    window.addEventListener('load', handleScrollAnimation);

    let visibleCount = 3;
    const increment = 3;

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((element) => {
          if (isElementInViewport(element)) {
            element.classList.add('is-visible');
          }
        });
    }

    window.addEventListener('scroll', debounce(handleScrollAnimation));
    window.addEventListener('load', handleScrollAnimation);

    function loadPlaces(filter = 'all') {
        const placesGrid = document.getElementById('places-grid');
        placesGrid.innerHTML = ''; // Clear previous content
        
        const filteredPlaces = filter === 'all' 
            ? places 
            : places.filter(place => place.category === filter);

        filteredPlaces.slice(0, visibleCount).forEach(place => {
            const card = document.createElement('div');
            card.classList.add('place-card', 'fade-in');
            card.setAttribute('data-category', place.category);
            
            card.innerHTML = `
                <img src="${place.imgSrc}" alt="${place.title}">
                <p class="location">${place.location}</p>
                <h3>${place.title}</h3>
            `;
            
            placesGrid.appendChild(card);
        });

        updateViewMoreButton(filteredPlaces.length);
        setTimeout(handleScrollAnimation, 100);
    }

    function updateViewMoreButton(totalCount) {
        const viewMoreBtn = document.getElementById('view-more-btn');
        if (visibleCount < totalCount) {
            viewMoreBtn.style.display = 'block';
        } else {
            viewMoreBtn.style.display = 'none';
        }
    }

    function handleViewMore() {
        visibleCount += increment;
        const currentFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');
        loadPlaces(currentFilter);
    }

    const viewMoreBtn = document.createElement('button');
    viewMoreBtn.id = 'view-more-btn';
    viewMoreBtn.innerText = 'View More';
    viewMoreBtn.addEventListener('click', handleViewMore);
    document.querySelector('.popular-places').appendChild(viewMoreBtn);

    // Event listeners for filter buttons
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            visibleCount = 3; // Reset visibleCount when filter changes
            loadPlaces(this.getAttribute("data-filter"));
        });
    });

    // Event listener for dropdown
    const filterDropdown = document.getElementById("filter-dropdown");
    filterDropdown.addEventListener("change", function () {
        visibleCount = 3; // Reset visibleCount when filter changes
        loadPlaces(this.value);
    });

    // Initial load
    loadPlaces();
});

document.addEventListener("DOMContentLoaded", function () {
    const filterDropdown = document.getElementById("filter-dropdown");
    const placeCards = document.querySelectorAll(".place-card");

    filterDropdown.addEventListener("change", function () {
        const filterValue = this.value;

        placeCards.forEach(card => {
            if (filterValue === "all") {
                card.style.display = "block"; // Tampilkan semua
            } else {
                if (card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block"; // Tampilkan yang sesuai filter
                } else {
                    card.style.display = "none"; // Sembunyikan yang tidak sesuai
                }
            }
        });
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      }
    });
  }
