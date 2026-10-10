// ==========================================
// DATA OUTFIT
// ==========================================

const outfits = [

    {
        title: "Simple Campus Look",
        category: "casual",
        image: "img-galeri/simple-cl.jpg",
        description:
            "Kombinasi sederhana dan nyaman untuk aktivitas kuliah sehari-hari.",
        tags: [
            "T-Shirt",
            "Jeans",
            "Sneakers"
        ]
    },

    {
        title: "Clean Campus Outfit",
        category: "casual",
        image: "img-galeri/clean-cl.jpg",
        description:
            "Outfit clean dan rapi yang cocok untuk kuliah dan mengerjakan tugas.",
        tags: [
            "Shirt",
            "Straight Pants",
            "Sneakers"
        ]
    },

    {
        title: "Campus Formal",
        category: "formal",
        image: "img-galeri/formal-cl.jpg",
        description:
            "Pilihan outfit formal untuk presentasi, seminar, atau kegiatan kampus.",
        tags: [
            "Shirt",
            "Chino",
            "Loafers"
        ]
    },

    {
        title: "Relaxed Streetwear",
        category: "streetwear",
        image: "img-galeri/street-cl.jpg",
        description:
            "Style streetwear yang santai dan lebih bold untuk aktivitas kampus.",
        tags: [
            "Hoodie",
            "Cargo",
            "Sneakers"
        ]
    },

    {
        title: "Soft Campus Look",
        category: "elegant",
        image: "img-galeri/soft-cl.jpg",
        description:
            "Outfit dengan potongan feminin dan elegant untuk tampilan kampus.",
        tags: [
            "Blouse",
            "Kulot",
            "Flats"
        ]
    },

    {
        title: "Hijab Daily Look",
        category: "hijab",
        image: "img-galeri/hijab-cl.jpg",
        description:
            "Inspirasi outfit hijab yang simple dan nyaman digunakan sehari-hari.",
        tags: [
            "Hijab",
            "Oversized Shirt",
            "Jeans"
        ]
    },

    {
        title: "Modern Campus",
        category: "casual",
        image: "img-galeri/modern-cl.jpg",
        description:
            "Perpaduan item basic dengan sentuhan modern untuk tampilan kampus.",
        tags: [
            "Basic Top",
            "Wide Pants",
            "Sneakers"
        ]
    },

    {
        title: "Elegant Hijab Look",
        category: "hijab",
        image: "img-galeri/elegant-cl.jpg",
        description:
            "Tampilan hijab yang clean dan elegant untuk kegiatan kampus.",
        tags: [
            "Blouse",
            "Long Skirt",
            "Hijab"
        ]
    }

];


// ==========================================
// ELEMENT
// ==========================================

const galleryGrid =
    document.getElementById("galleryGrid");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.getElementById("searchInput");

const noResult =
    document.getElementById("noResult");

const modal =
    document.getElementById("outfitModal");

const closeModal =
    document.getElementById("closeModal");


// ==========================================
// CURRENT FILTER
// ==========================================

let currentFilter = "all";


// ==========================================
// DISPLAY GALLERY
// ==========================================

function displayGallery() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredOutfits =
        outfits.filter(outfit => {

            const matchesFilter =
                currentFilter === "all" ||
                outfit.category === currentFilter;


            const searchableText = (

                outfit.title +
                " " +
                outfit.category +
                " " +
                outfit.description +
                " " +
                outfit.tags.join(" ")

            ).toLowerCase();


            const matchesSearch =
                searchableText.includes(searchText);


            return (
                matchesFilter &&
                matchesSearch
            );

        });


    galleryGrid.innerHTML = "";


    // Tidak ada hasil

    if (filteredOutfits.length === 0) {

        noResult.classList.remove("hidden");

        return;

    }


    noResult.classList.add("hidden");


    // Tampilkan outfit

    filteredOutfits.forEach(outfit => {

        const item =
            document.createElement("div");

        item.className =
            "gallery-item";


        item.innerHTML = `

            <img
                src="${outfit.image}"
                alt="${outfit.title}"
                loading="lazy"
            >

            <div class="gallery-overlay">

                <h3>
                    ${outfit.title}
                </h3>

                <span>
                    ${outfit.category}
                </span>

            </div>

        `;


        item.addEventListener(
            "click",
            function () {

                openModal(outfit);

            }
        );


        galleryGrid.appendChild(item);

    });

}


// ==========================================
// FILTER
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            this.classList.add(
                "active"
            );


            currentFilter =
                this.dataset.filter;


            displayGallery();

        }
    );

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        displayGallery();

    }
);


// ==========================================
// OPEN MODAL
// ==========================================

function openModal(outfit) {

    document.getElementById(
        "modalImage"
    ).src = outfit.image;


    document.getElementById(
        "modalImage"
    ).alt = outfit.title;


    document.getElementById(
        "modalCategory"
    ).textContent =
        outfit.category;


    document.getElementById(
        "modalTitle"
    ).textContent =
        outfit.title;


    document.getElementById(
        "modalDescription"
    ).textContent =
        outfit.description;


    document.getElementById(
        "modalTag1"
    ).textContent =
        outfit.tags[0] || "";


    document.getElementById(
        "modalTag2"
    ).textContent =
        outfit.tags[1] || "";


    document.getElementById(
        "modalTag3"
    ).textContent =
        outfit.tags[2] || "";


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeOutfitModal() {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeOutfitModal
);


// Klik area luar modal

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeOutfitModal();

        }

    }
);


// Tekan ESC

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeOutfitModal();

        }

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

displayGallery();