'use strict';
const images = document.querySelectorAll(".flexItem img");
let csrfToken = localStorage.getItem('csrfToken');

// Function to add zoom effect
const addZoomEffect = () => {
    images.forEach((img) => {
        img.addEventListener("mouseover", zoomIn);
        img.addEventListener("mouseout", zoomOut);
    });
}

// Function to remove zoom effect
const removeZoomEffect = () => {
    images.forEach((img) => {
        img.removeEventListener("mouseover", zoomIn);
        img.removeEventListener("mouseout", zoomOut);
    });
}

// Zoom in and zoom out handlers
const zoomIn = (event) => {
    event.target.style.transform = "scale(1.5)";
}

const zoomOut = (event) => {
    event.target.style.transform = "scale(1)";
}
// function to make sure the email is in the correct format
const validateEmail = () => {
    let emailFeedback = document.getElementById('emailFeedback');
    let email = document.getElementById('userEmail').value;
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        emailFeedback.setAttribute("class", "failVal");
        emailFeedback.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailFeedback.textContent = '';
        emailFeedback.removeAttribute("class");
        return true;
    }
};
//function to make sure the phone number is in the correct format
const validatePhone = () => {
    let numberFeedback = document.getElementById("userNumFeedback");
    let phoneNumber = document.getElementById("userNum").value;
    let phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if(!phoneNumber.match(phonePattern)) {
        numberFeedback.setAttribute("class", "failVal");
        numberFeedback.textContent = "Enter correct format for the number 999-999-9999";
        return false;
    } else {
        numberFeedback.textContent = "";
        numberFeedback.removeAttribute("class");
        return true;
    }

}

//function to make sure both are in the correct format and to submit form
const validateForm = (e) => {
    e.preventDefault(); 
    const isEmailValid = validateEmail(); 
    const isPhoneValid = validatePhone();

    if (isEmailValid && isPhoneValid) {
        alert("Form is Submitted");
        
    }else {
        alert("form cant be submitted");
        e.preventDefault();
    }
};
const generateCsrfToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Initial setup based on window width
if (window.innerWidth > 800) {
    addZoomEffect();
}
if (!csrfToken) {
    csrfToken = generateCsrfToken();
    localStorage.setItem('csrfToken', csrfToken);
}

// Insert the token into the hidden form field
document.getElementById('csrfToken').value = csrfToken;
// Listen for window resizing and toggle the effect dynamically
window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        addZoomEffect();
    } else {
        removeZoomEffect();
    }
});

// Add a submit event listener to the form
document.getElementById('myForm').addEventListener('submit', function(e) {
    const formToken = document.getElementById('csrfToken').value;
    const storedToken = localStorage.getItem('csrfToken');
    const form = document.getElementById("myForm");

    if (formToken !== storedToken) {
        e.preventDefault();// Prevent form submission
        alert("cant submit form");
    } else {
        if(validateForm(e)) {
            alert('Form is being submitted');
            form.reset();
        } else {
            e.preventDefault()
        }
    }
});
document.getElementById("userEmail").addEventListener("keyup", validateEmail); 
document.getElementById("userNum").addEventListener("keyup", validatePhone);
