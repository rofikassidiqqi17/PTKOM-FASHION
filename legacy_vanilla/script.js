// ==========================================
// DATA BAJU
// ==========================================

const shirts = [

    {
        id: 1,
        name: "Basic T-Shirt",
        image: "img-home/5.jpg",
        style: {
            casual: 90,
            modern: 70,
            streetwear: 60,
            formal: 20,
            elegant: 30
        }
    },

    {
        id: 2,
        name: "Oversized Shirt",
        image: "img-home/9.jpg",
        style: {
            casual: 80,
            modern: 85,
            streetwear: 85,
            formal: 20,
            elegant: 40
        }
    },

    {
        id: 3,
        name: "Blouse",
        image: "img-home/8.jpg",
        style: {
            casual: 60,
            modern: 70,
            streetwear: 20,
            formal: 65,
            elegant: 90
        }
    },

    {
        id: 4,
        name: "Formal Shirt",
        image: "img-home/6.jpg",
        style: {
            casual: 30,
            modern: 70,
            streetwear: 15,
            formal: 95,
            elegant: 80
        }
    }

];


// ==========================================
// DATA CELANA
// ==========================================

const pants = [

    {
        id: 1,
        name: "Blue Jeans",
        image: "img-home/7.jpg",
        style: {
            casual: 90,
            modern: 70,
            streetwear: 70,
            formal: 20,
            elegant: 30
        }
    },

    {
        id: 2,
        name: "Wide Pants",
        image: "img-home/10.jpg",
        style: {
            casual: 70,
            modern: 90,
            streetwear: 60,
            formal: 40,
            elegant: 75
        }
    },

    {
        id: 3,
        name: "Cargo Pants",
        image: "img-home/11.jpg",
        style: {
            casual: 85,
            modern: 80,
            streetwear: 95,
            formal: 15,
            elegant: 20
        }
    },

    {
        id: 4,
        name: "Chino Pants",
        image: "img-home/12.jpg",
        style: {
            casual: 60,
            modern: 70,
            streetwear: 25,
            formal: 85,
            elegant: 70
        }
    }

];


// ==========================================
// DATA SEPATU
// ==========================================

const shoes = [

    {
        id: 1,
        name: "White Sneakers",
        image: "img-home/2.jpg",
        style: {
            casual: 90,
            modern: 80,
            streetwear: 80,
            formal: 20,
            elegant: 30
        }
    },

    {
        id: 2,
        name: "Loafers",
        image: "img-home/4.jpg",
        style: {
            casual: 40,
            modern: 65,
            streetwear: 20,
            formal: 90,
            elegant: 85
        }
    },

    {
        id: 3,
        name: "Flats",
        image: "img-home/1.jpg",
        style: {
            casual: 60,
            modern: 65,
            streetwear: 15,
            formal: 65,
            elegant: 90
        }
    },

    {
        id: 4,
        name: "High Sneakers",
        image: "img-home/3.jpg",
        style: {
            casual: 80,
            modern: 85,
            streetwear: 95,
            formal: 15,
            elegant: 25
        }
    }

];


// ==========================================
// SELECTED ITEM
// ==========================================

let selectedShirt = null;
let selectedPants = null;
let selectedShoes = null;

let shirtColor = "#FFFFFF";
let pantsColor = "#4169E1";
let shoesColor = "#FFFFFF";

let lastAnalysis = null;


// ==========================================
// ELEMENT
// ==========================================

const shirtContainer =
    document.getElementById("shirtContainer");

const pantsContainer =
    document.getElementById("pantsContainer");

const shoesContainer =
    document.getElementById("shoesContainer");


// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCards(
    data,
    container,
    type
) {

    container.innerHTML = "";

    data.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.style.display='none'"
                >

            </div>

            <div class="product-info">

                <h4>
                    ${item.name}
                </h4>

                <span>
                    ${type}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                if (type === "Baju") {

                    selectedShirt = item;

                    document
                        .querySelectorAll(
                            "#shirtContainer .product-card"
                        )
                        .forEach(card =>
                            card.classList.remove(
                                "selected"
                            )
                        );

                }


                if (type === "Celana") {

                    selectedPants = item;

                    document
                        .querySelectorAll(
                            "#pantsContainer .product-card"
                        )
                        .forEach(card =>
                            card.classList.remove(
                                "selected"
                            )
                        );

                }


                if (type === "Sepatu") {

                    selectedShoes = item;

                    document
                        .querySelectorAll(
                            "#shoesContainer .product-card"
                        )
                        .forEach(card =>
                            card.classList.remove(
                                "selected"
                            )
                        );

                }


                card.classList.add(
                    "selected"
                );

            }
        );


        container.appendChild(card);

    });

}


// ==========================================
// LOAD PRODUCT
// ==========================================

createProductCards(
    shirts,
    shirtContainer,
    "Baju"
);

createProductCards(
    pants,
    pantsContainer,
    "Celana"
);

createProductCards(
    shoes,
    shoesContainer,
    "Sepatu"
);


// ==========================================
// COLOR PICKER
// ==========================================

document
    .getElementById("shirtColor")
    .addEventListener(
        "input",
        function () {

            shirtColor =
                this.value.toUpperCase();

        }
    );


document
    .getElementById("pantsColor")
    .addEventListener(
        "input",
        function () {

            pantsColor =
                this.value.toUpperCase();

        }
    );


document
    .getElementById("shoesColor")
    .addEventListener(
        "input",
        function () {

            shoesColor =
                this.value.toUpperCase();

        }
    );


// ==========================================
// HEX → RGB
// ==========================================

function hexToRgb(hex) {

    hex = hex.replace("#", "");

    return {

        r: parseInt(
            hex.substring(0, 2),
            16
        ),

        g: parseInt(
            hex.substring(2, 4),
            16
        ),

        b: parseInt(
            hex.substring(4, 6),
            16
        )

    };

}


// ==========================================
// COLOR COMPATIBILITY
// ==========================================

function calculateColorCompatibility() {

    const shirt =
        hexToRgb(shirtColor);

    const pants =
        hexToRgb(pantsColor);

    const shoes =
        hexToRgb(shoesColor);


    const shirtPantsDifference =
        Math.abs(shirt.r - pants.r) +
        Math.abs(shirt.g - pants.g) +
        Math.abs(shirt.b - pants.b);


    const pantsShoesDifference =
        Math.abs(pants.r - shoes.r) +
        Math.abs(pants.g - shoes.g) +
        Math.abs(pants.b - shoes.b);


    let score = 100;


    if (
        shirtPantsDifference > 400
    ) {

        score -= 15;

    }

    if (
        pantsShoesDifference > 400
    ) {

        score -= 15;

    }


    if (
        shirtPantsDifference > 600
    ) {

        score -= 15;

    }


    return Math.max(
        50,
        Math.min(100, score)
    );

}


// ==========================================
// STYLE SCORE
// ==========================================

function calculateStyleScore() {

    const styles = [
        "casual",
        "modern",
        "streetwear",
        "formal",
        "elegant"
    ];


    const result = {};


    styles.forEach(style => {

        result[style] = Math.round(

            (
                selectedShirt.style[style] +
                selectedPants.style[style] +
                selectedShoes.style[style]
            ) / 3

        );

    });


    return result;

}


// ==========================================
// COMBINATION SCORE
// ==========================================

function calculateCombinationScore() {

    let score = 100;


    // Formal + streetwear terlalu jauh

    if (
        selectedShirt.style.formal > 80 &&
        selectedPants.style.streetwear > 80
    ) {

        score -= 20;

    }


    if (
        selectedShirt.style.streetwear > 80 &&
        selectedPants.style.formal > 80
    ) {

        score -= 20;

    }


    // Elegant + cargo kurang selaras

    if (
        selectedShirt.style.elegant > 80 &&
        selectedPants.style.streetwear > 85
    ) {

        score -= 15;

    }


    return Math.max(
        60,
        score
    );

}


// ==========================================
// GET DOMINANT STYLE
// ==========================================

function getDominantStyle(scores) {

    let dominant =
        "casual";

    let highest =
        scores.casual;


    Object.keys(scores).forEach(style => {

        if (
            scores[style] > highest
        ) {

            highest =
                scores[style];

            dominant =
                style;

        }

    });


    return dominant;

}


// ==========================================
// STYLE NAME
// ==========================================

function getStyleName(style) {

    const names = {

        casual: "Casual",

        modern: "Modern",

        streetwear: "Streetwear",

        formal: "Formal",

        elegant: "Elegant"

    };


    return names[style];

}


// ==========================================
// RECOMMENDATION
// ==========================================

function generateRecommendation(
    style,
    colorScore,
    combinationScore
) {

    const styleText =
        getStyleName(style);


    if (
        colorScore >= 85 &&
        combinationScore >= 85
    ) {

        return `
            Outfit kamu memiliki kombinasi
            yang cukup harmonis. Gaya
            <strong>${styleText}</strong>
            juga terlihat konsisten sehingga
            cocok digunakan untuk aktivitas
            kampus sehari-hari.
        `;

    }


    if (
        colorScore < 75
    ) {

        return `
            Gaya <strong>${styleText}</strong>
            sudah terlihat dari pilihan item,
            tetapi kombinasi warnanya masih
            bisa dibuat lebih harmonis.
            Coba gunakan warna netral seperti
            putih, hitam, beige, abu-abu,
            atau navy.
        `;

    }


    if (
        combinationScore < 75
    ) {

        return `
            Warna outfit sudah cukup sesuai,
            tetapi beberapa jenis item memiliki
            karakter style yang berbeda.
            Coba gunakan item dengan karakter
            yang lebih seragam agar outfit
            terlihat lebih cohesive.
        `;

    }


    return `
        Outfit kamu sudah cukup sesuai.
        Gaya <strong>${styleText}</strong>
        memberikan kesan yang cocok untuk
        digunakan di lingkungan kampus.
    `;

}


// ==========================================
// ANALYZE OUTFIT
// ==========================================

function analyzeOutfit() {

    const message =
        document.getElementById(
            "analyzeMessage"
        );


    if (!selectedShirt) {

        message.textContent =
            "Silakan pilih baju terlebih dahulu.";

        return;

    }


    if (!selectedPants) {

        message.textContent =
            "Silakan pilih celana terlebih dahulu.";

        return;

    }


    if (!selectedShoes) {

        message.textContent =
            "Silakan pilih sepatu terlebih dahulu.";

        return;

    }


    message.textContent = "";


    const styleScores =
        calculateStyleScore();


    const dominantStyle =
        getDominantStyle(
            styleScores
        );


    const styleScore =
        styleScores[dominantStyle];


    const combinationScore =
        calculateCombinationScore();


    const colorScore =
        calculateColorCompatibility();


    const overall =
        Math.round(

            (styleScore * 0.45) +
            (combinationScore * 0.25) +
            (colorScore * 0.30)

        );


    // ======================================
    // SIMPAN HASIL ANALISIS
    // ======================================

    lastAnalysis = {

        style:
            getStyleName(
                dominantStyle
            ),

        score:
            overall,

        shirt: {

            name:
                selectedShirt.name,

            image:
                selectedShirt.image

        },

        pants: {

            name:
                selectedPants.name,

            image:
                selectedPants.image

        },

        shoes: {

            name:
                selectedShoes.name,

            image:
                selectedShoes.image

        }

    };


    // ======================================
    // SHOW RESULT
    // ======================================

    document
        .getElementById(
            "resultSection"
        )
        .classList.add("show");


    document
        .getElementById(
            "mainStyle"
        )
        .textContent =
            getStyleName(
                dominantStyle
            );


    document
        .getElementById(
            "overallScore"
        )
        .textContent =
            overall;


    document
        .getElementById(
            "overallScore2"
        )
        .textContent =
            overall + "%";


    document
        .getElementById(
            "styleCompatibility"
        )
        .textContent =
            combinationScore + "%";


    document
        .getElementById(
            "colorScore"
        )
        .textContent =
            colorScore + "%";


    // ======================================
    // DESCRIPTION
    // ======================================

    document
        .getElementById(
            "resultDescription"
        )
        .textContent =
            `Outfit kamu memiliki karakter ${getStyleName(
                dominantStyle
            )} dengan skor keseluruhan ${overall}/100.`;


    // ======================================
    // SELECTED ITEM
    // ======================================

    document
        .getElementById(
            "resultShirt"
        )
        .src =
            selectedShirt.image;


    document
        .getElementById(
            "resultShirtName"
        )
        .textContent =
            selectedShirt.name;


    document
        .getElementById(
            "resultShirtColorBox"
        )
        .style.background =
            shirtColor;


    document
        .getElementById(
            "resultShirtColor"
        )
        .textContent =
            shirtColor;


    document
        .getElementById(
            "resultPants"
        )
        .src =
            selectedPants.image;


    document
        .getElementById(
            "resultPantsName"
        )
        .textContent =
            selectedPants.name;


    document
        .getElementById(
            "resultPantsColorBox"
        )
        .style.background =
            pantsColor;


    document
        .getElementById(
            "resultPantsColor"
        )
        .textContent =
            pantsColor;


    document
        .getElementById(
            "resultShoes"
        )
        .src =
            selectedShoes.image;


    document
        .getElementById(
            "resultShoesName"
        )
        .textContent =
            selectedShoes.name;


    document
        .getElementById(
            "resultShoesColorBox"
        )
        .style.background =
            shoesColor;


    document
        .getElementById(
            "resultShoesColor"
        )
        .textContent =
            shoesColor;


    // ======================================
    // STYLE BARS
    // ======================================

    updateScore(
        "casual",
        styleScores.casual
    );

    updateScore(
        "modern",
        styleScores.modern
    );

    updateScore(
        "streetwear",
        styleScores.streetwear
    );

    updateScore(
        "formal",
        styleScores.formal
    );

    updateScore(
        "elegant",
        styleScores.elegant
    );


    // ======================================
    // RECOMMENDATION
    // ======================================

    document
        .getElementById(
            "recommendationText"
        )
        .innerHTML =
            generateRecommendation(
                dominantStyle,
                colorScore,
                combinationScore
            );


    document
        .getElementById(
            "resultSection"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// UPDATE SCORE BAR
// ==========================================

function updateScore(
    style,
    score
) {

    document
        .getElementById(
            style + "Score"
        )
        .textContent =
            score;


    document
        .getElementById(
            style + "Bar"
        )
        .style.width =
            score + "%";

}


// ==========================================
// ANALYZE BUTTON
// ==========================================

document
    .getElementById(
        "analyzeBtn"
    )
    .addEventListener(
        "click",
        analyzeOutfit
    );


// ==========================================
// SAVE OUTFIT
// ==========================================

function saveOutfit() {

    const saveMessage =
        document.getElementById(
            "saveMessage"
        );


    const currentUserData =
        localStorage.getItem(
            "fitcampCurrentUser"
        );


    if (!currentUserData) {

        saveMessage.textContent =
            "Silakan login terlebih dahulu untuk menyimpan outfit.";

        saveMessage.style.color =
            "#b04b5b";

        return;

    }


    if (!lastAnalysis) {

        saveMessage.textContent =
            "Silakan analisis outfit terlebih dahulu.";

        saveMessage.style.color =
            "#b04b5b";

        return;

    }


    const currentUser =
        JSON.parse(
            currentUserData
        );


    const usersData =
        localStorage.getItem(
            "fitcampUsers"
        );


    if (!usersData) {

        saveMessage.textContent =
            "Data akun tidak ditemukan.";

        return;

    }


    const users =
        JSON.parse(
            usersData
        );


    const userIndex =
        users.findIndex(
            user =>
                user.id ===
                currentUser.id
        );


    if (userIndex === -1) {

        saveMessage.textContent =
            "Akun tidak ditemukan.";

        return;

    }


    if (
        !users[userIndex].outfitHistory
    ) {

        users[userIndex].outfitHistory = [];

    }


    users[userIndex]
        .outfitHistory
        .push(lastAnalysis);


    localStorage.setItem(
        "fitcampUsers",
        JSON.stringify(users)
    );


    localStorage.setItem(
        "fitcampCurrentUser",
        JSON.stringify(
            users[userIndex]
        )
    );


    saveMessage.textContent =
        "♡ Outfit berhasil disimpan ke Account!";

    saveMessage.style.color =
        "#628b69";

}


document
    .getElementById(
        "saveOutfitBtn"
    )
    .addEventListener(
        "click",
        saveOutfit
    );