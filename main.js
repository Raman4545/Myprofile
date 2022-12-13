var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");

    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");

    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");

}



var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";

}

function closemenu() {
    sidemenu.style.right = "-200px";

}



var nameError = document.getElementById('name-error');

var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function validatename() {
    var name = document.getElementById('contact-name').value;



    // Check if the fullName contains only letters and spaces
    if (!/^[a-zA-Z ]+$/.test(name)) {
        nameError.style.display = 'block';
        nameError.innerHTML = 'only letters allowed';
        setTimeout(function () { nameError.style.display = 'none'; }, 3000);
        return false;
    }

    // Check if the fullName contains at least two words
    let words = name.split(" ");
    if (words.length < 2) {
        nameError.innerHTML = 'write full name';
        return false;


    }
    nameError.style.display='block';
    nameError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    setTimeout(function () { nameError.style.display = 'none'; }, 3000);
    return true;
}

function validateemail() {
    var email = document.getElementById('contact-email').value;

    if (email.length == 0) {
        emailError.innerHTML = 'email please';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'invalid';
        return false;

    }
    emailError.style.display = 'block';
    emailError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    setTimeout(function () { emailError.style.display = 'none'; }, 3000);
    return true;

}
function validatemessage() {
    var message = document.getElementById('contact-message').value;
    var required = 30;
    var left = required-message.length;


    if (left > 0) {
        messageError.innerHTML = left + ' charachters required';
        return false;
    }
    messageError.style.display='block';
    messageError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    setTimeout(function () { messageError.style.display = 'none'; }, 3000);
    
    return true;


}

function validateform() {
    if (!validatename() || !validateemail() ||!validatemessage()) {
        submitError.style.display = 'block';

        submitError.innerHTML = 'please fill all fields';
        setTimeout(function () { submitError.style.display = 'none'; }, 3000);
        return false;
    }
}





const scriptURL = 'https://script.google.com/macros/s/AKfycbx13X6UD714IMxpmGhtH0j2eY5b9v_LWo9qJgdaQpOhFM0Zq_1hbPThQ7zHQRB8ICF9/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => {
            msg.innerHTML = "Message sent"
            setTimeout(function () {
                msg.innerHTML = " "
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})