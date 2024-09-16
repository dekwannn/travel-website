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

    // Fungsi untuk memuat kartu tempat ke dalam halaman
    function loadPlaces() {
        const placesGrid = document.getElementById('places-grid');
        placesGrid.innerHTML = ''; // Clear previous content
        
        places.forEach(place => {
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

        // Trigger animation check after loading places
        setTimeout(handleScrollAnimation, 100);
    }

    loadPlaces();; // Panggil fungsi untuk memuat tempat
    
    // Ambil semua tombol filter
    // Ambil semua kartu tempat (place-card)
    let placeCards = document.querySelectorAll(".place-card");
    
    function filterPlaces(filterValue) {
        const placeCards = document.querySelectorAll(".place-card");
        placeCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                card.style.display = "block";
                card.classList.remove('is-visible');
                card.classList.add('fade-in');
            } else {
                card.style.display = "none";
            }
        });
        // Trigger animation check after filtering
        setTimeout(handleScrollAnimation, 100);
    }

    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterPlaces(this.getAttribute("data-filter"));
        });
    });

    const filterDropdown = document.getElementById("filter-dropdown");
    filterDropdown.addEventListener("change", function () {
        filterPlaces(this.value);
    });
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
