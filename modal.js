function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((closeBtn) => closeBtn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// Formulaire avec vérification
function validate(event) {
    // Ne pas envoyer directement le formulaire
    event.preventDefault();
    // Récupérer les éléments du formulaire
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const birthdate = document.getElementById("birthdate");
    const quantity = document.getElementById("quantity");
    const location = document.querySelector('input[name="location"]:checked');
    const checkbox1 = document.getElementById("checkbox1");

    // Gestion des erreurs
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.textContent = "";
    });

    let isValid = true;

    // Vérification et validation du champ Prénom
    if (firstName.value.trim() === "" || firstName.value.length < 2) {
        document.getElementById("first-error").textContent = "Le champ Prénom doit avoir au moins 2 caractères.";
        isValid = false;
    }
    // Vérification et validation du champ Nom de famille
    if (lastName.value.trim() === "" || lastName.value.length < 2) {
        document.getElementById("last-error").textContent = "Le champ Nom de famille doit avoir au moins 2 caractères.";
        isValid = false;
    }
    // Vérification et validation de l'adresse mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById("email-error").textContent = "L'adresse mail saisie n'est pas valide.";
        isValid = false;
    }
    // Vérification et validation de la date d'anniversaire
    const birthdateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    if (!birthdateRegex.test(birthdate.value)) {
        document.getElementById("birthdate-error").textContent = "Le champ Date de naissance ne doit pas être vide.";
        isValid = false;
    }
    const minimalAge = 15;
    const isAgeOk = checkAge(birthdate.value, minimalAge)
    if(!isAgeOk){
        document.getElementById("birthdate-error").textContent = `Il faut avoir plus de ${minimalAge} ans`;
        isValid = false
    }
    // Vérification et validation du nombre de concours
    const quantityValue = parseInt(quantity.value, 10);
    if (isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
        document.getElementById("quantity-error").textContent = "Le nombre de concours doit être une valeur numérique.";
        isValid = false;
    }
    // Vérification et validation de la sélection d'un emplacement
    if (!location) {
        document.getElementById("location-error").textContent = "Veuillez sélectionner un emplacement.";
        isValid = false;
    }
    // Vérification et validation de la case des conditions générales
    if (!checkbox1.checked) {
        document.getElementById("checkbox1-error").textContent = "Vous devez accepter les conditions générales.";
        isValid = false;
    }

    if (!isValid) {
        return false;
    }
    
    //Message de confirmation de réservation
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.textContent = "Merci ! Votre réservation a été reçue.";
    confirmationMessage.classList.add("success");

    // Appel fonction pour fermer le modal du formulaire
    closeModal();

    // Appel fonction pour ouvrir le modal de validation
    openConfirmationModal();

    document.getElementById("reserve").reset();

    return true;
}

// Fonction pour ouvrir le modal de confirmation
function openConfirmationModal() {
    const confirmationModal = document.getElementById("confirmation-modal");
    confirmationModal.style.display = "block";
}

// Fonction pour fermer le modal de confirmation
function closeConfirmationModal() {
    const confirmationModal = document.getElementById("confirmation-modal");
    confirmationModal.style.display = "none";
}

function checkAge(date, reference){
    const input = new Date(date)
    const birthMoreReference = new Date(input.getFullYear() + parseInt(reference), input.getMonth() -1 , input.getDay())
    const now = new Date()
    if(birthMoreReference < now) {
        return true
    }
    return false
}