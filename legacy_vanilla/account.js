// ==========================================
// DEFAULT PROFILE IMAGE
// ==========================================

const defaultProfile =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
             width="300"
             height="300"
             viewBox="0 0 300 300">

            <rect
                width="300"
                height="300"
                fill="#eee"
            />

            <circle
                cx="150"
                cy="115"
                r="55"
                fill="#bbb"
            />

            <path
                d="M60 280
                   C60 205 105 180 150 180
                   C195 180 240 205 240 280"
                fill="#bbb"
            />

        </svg>
    `);


// ==========================================
// ELEMENT
// ==========================================

const authSection =
    document.getElementById("authSection");

const profileSection =
    document.getElementById("profileSection");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");


// ==========================================
// GET USERS
// ==========================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("fitcampUsers")
    ) || [];

}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "fitcampCurrentUser"
        )
    );

}


// ==========================================
// SAVE USERS
// ==========================================

function saveUsers(users) {

    localStorage.setItem(
        "fitcampUsers",
        JSON.stringify(users)
    );

}


// ==========================================
// SWITCH LOGIN / REGISTER
// ==========================================

document
    .getElementById("showRegister")
    .addEventListener(
        "click",
        function () {

            loginForm.classList.add(
                "hidden"
            );

            registerForm.classList.remove(
                "hidden"
            );

        }
    );


document
    .getElementById("showLogin")
    .addEventListener(
        "click",
        function () {

            registerForm.classList.add(
                "hidden"
            );

            loginForm.classList.remove(
                "hidden"
            );

        }
    );


// ==========================================
// REGISTER
// ==========================================

document
    .getElementById("register")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            let users =
                getUsers();


            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                message.textContent =
                    "Email sudah terdaftar.";

                message.style.color =
                    "#b84b5b";

                return;

            }


            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password,

                profileImage:
                    defaultProfile,

                outfitHistory: []

            };


            users.push(newUser);

            saveUsers(users);


            message.textContent =
                "Akun berhasil dibuat. Silakan Sign In.";

            message.style.color =
                "#628b69";


            document
                .getElementById("register")
                .reset();


            setTimeout(
                function () {

                    registerForm.classList.add(
                        "hidden"
                    );

                    loginForm.classList.remove(
                        "hidden"
                    );

                },
                1000
            );

        }
    );


// ==========================================
// LOGIN
// ==========================================

document
    .getElementById("login")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const users =
                getUsers();


            const user =
                users.find(
                    item =>
                        item.email === email &&
                        item.password === password
                );


            if (!user) {

                message.textContent =
                    "Email atau password salah.";

                message.style.color =
                    "#b84b5b";

                return;

            }


            localStorage.setItem(
                "fitcampCurrentUser",
                JSON.stringify(user)
            );


            message.textContent =
                "Login berhasil.";

            message.style.color =
                "#628b69";


            setTimeout(
                function () {

                    showProfile();

                },
                500
            );

        }
    );


// ==========================================
// SHOW PROFILE
// ==========================================

function showProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        authSection.classList.remove(
            "hidden"
        );

        profileSection.classList.add(
            "hidden"
        );

        return;

    }


    authSection.classList.add(
        "hidden"
    );

    profileSection.classList.remove(
        "hidden"
    );


    document.getElementById(
        "profileName"
    ).textContent =
        user.name;


    document.getElementById(
        "profileEmail"
    ).textContent =
        user.email;


    document.getElementById(
        "profileImage"
    ).src =
        user.profileImage ||
        defaultProfile;


    displayOutfitHistory();

}


// ==========================================
// LOGOUT
// ==========================================

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "fitcampCurrentUser"
            );


            profileSection.classList.add(
                "hidden"
            );

            authSection.classList.remove(
                "hidden"
            );


            document
                .getElementById("login")
                .reset();

        }
    );


// ==========================================
// UPLOAD PROFILE
// ==========================================

document
    .getElementById("profileUpload")
    .addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "File harus berupa gambar."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const image =
                        event.target.result;


                    const currentUser =
                        getCurrentUser();


                    if (!currentUser) {
                        return;
                    }


                    currentUser.profileImage =
                        image;


                    updateUser(
                        currentUser
                    );


                    document.getElementById(
                        "profileImage"
                    ).src = image;

                };


            reader.readAsDataURL(file);

        }
    );


// ==========================================
// EDIT PROFILE
// ==========================================

const editProfileCard =
    document.getElementById(
        "editProfileCard"
    );


document
    .getElementById("editProfileBtn")
    .addEventListener(
        "click",
        function () {

            const user =
                getCurrentUser();


            document.getElementById(
                "editName"
            ).value =
                user.name;


            document.getElementById(
                "editEmail"
            ).value =
                user.email;


            editProfileCard.classList.remove(
                "hidden"
            );


            editProfileCard.scrollIntoView({
                behavior: "smooth"
            });

        }
    );


// ==========================================
// CANCEL EDIT
// ==========================================

document
    .getElementById("cancelEdit")
    .addEventListener(
        "click",
        function () {

            editProfileCard.classList.add(
                "hidden"
            );

        }
    );


// ==========================================
// SAVE PROFILE
// ==========================================

document
    .getElementById("saveProfile")
    .addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "editName"
                ).value.trim();


            const email =
                document.getElementById(
                    "editEmail"
                ).value
                .trim()
                .toLowerCase();


            const message =
                document.getElementById(
                    "editMessage"
                );


            if (!name || !email) {

                message.textContent =
                    "Nama dan email harus diisi.";

                message.style.color =
                    "#b84b5b";

                return;

            }


            const currentUser =
                getCurrentUser();


            const users =
                getUsers();


            const emailUsed =
                users.find(
                    user =>
                        user.email === email &&
                        user.id !== currentUser.id
                );


            if (emailUsed) {

                message.textContent =
                    "Email tersebut sudah digunakan.";

                message.style.color =
                    "#b84b5b";

                return;

            }


            currentUser.name =
                name;

            currentUser.email =
                email;


            updateUser(
                currentUser
            );


            document.getElementById(
                "profileName"
            ).textContent =
                name;


            document.getElementById(
                "profileEmail"
            ).textContent =
                email;


            message.textContent =
                "Profile berhasil diperbarui.";

            message.style.color =
                "#628b69";


            setTimeout(
                function () {

                    editProfileCard.classList.add(
                        "hidden"
                    );

                },
                700
            );

        }
    );


// ==========================================
// UPDATE USER
// ==========================================

function updateUser(updatedUser) {

    const users =
        getUsers();


    const index =
        users.findIndex(
            user =>
                user.id === updatedUser.id
        );


    if (index === -1) {
        return;
    }


    users[index] =
        updatedUser;


    saveUsers(users);


    localStorage.setItem(
        "fitcampCurrentUser",
        JSON.stringify(updatedUser)
    );

}


// ==========================================
// OUTFIT HISTORY
// ==========================================

function displayOutfitHistory() {

    const container =
        document.getElementById(
            "outfitHistory"
        );


    const user =
        getCurrentUser();


    // Belum ada outfit

    if (
        !user ||
        !user.outfitHistory ||
        user.outfitHistory.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-history">

                <p>
                    Belum ada outfit yang disimpan.
                </p>

                <p>
                    Yuk coba analisis outfit kamu
                    di halaman Home!
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    // Tampilkan outfit

    user.outfitHistory.forEach(
        function (outfit, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "history-card";


            card.innerHTML = `

                <div class="history-images">

                    <div class="history-item">

                        <img
                            src="${outfit.shirt.image}"
                            alt="Baju"
                        >

                    </div>


                    <div class="history-item">

                        <img
                            src="${outfit.pants.image}"
                            alt="Celana"
                        >

                    </div>


                    <div class="history-item">

                        <img
                            src="${outfit.shoes.image}"
                            alt="Sepatu"
                        >

                    </div>

                </div>


                <div class="history-info">

                    <span class="history-style">
                        ${outfit.style}
                    </span>


                    <h3>
                        Outfit ${index + 1}
                    </h3>


                    <div class="history-items">

                        <p>
                            <strong>Baju:</strong>
                            ${outfit.shirt.name}
                        </p>

                        <p>
                            <strong>Celana:</strong>
                            ${outfit.pants.name}
                        </p>

                        <p>
                            <strong>Sepatu:</strong>
                            ${outfit.shoes.name}
                        </p>

                    </div>


                    <div class="history-colors">

                        <div class="color-item">

                            <span
                                class="history-color"
                                style="
                                    background:
                                    ${outfit.shirt.color || "#ffffff"};
                                ">
                            </span>

                            <small>
                                Baju
                            </small>

                        </div>


                        <div class="color-item">

                            <span
                                class="history-color"
                                style="
                                    background:
                                    ${outfit.pants.color || "#ffffff"};
                                ">
                            </span>

                            <small>
                                Celana
                            </small>

                        </div>


                        <div class="color-item">

                            <span
                                class="history-color"
                                style="
                                    background:
                                    ${outfit.shoes.color || "#ffffff"};
                                ">
                            </span>

                            <small>
                                Sepatu
                            </small>

                        </div>

                    </div>


                    <div class="history-score">

                        Compatibility

                        <strong>
                            ${outfit.score}%
                        </strong>

                    </div>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// INITIAL CHECK
// ==========================================

showProfile();