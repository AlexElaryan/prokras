const feedbackForm = document.getElementById('feedbackForm');
const modal = document.querySelector('.feedback-modal')
const modalBtn = document.querySelectorAll('.modal__btn');
const modalContent = document.querySelector('.feedback-modal-content');

function modalClose() {
    modal.classList.remove('feedback-modal-active');
    document.body.style.overflow = 'auto';
}

function modalOpen() {
    modal.classList.add('feedback-modal-active');
    document.body.style.overflow = 'hidden';
}

modalBtn.forEach(btn => {
    btn.onclick = () => {
        if (!modal.classList.contains('feedback-modal-active')) {
            modalOpen();
        } else {
            modalClose();
        }
    }
})

modal.onclick = (e) => {
    if (!modalContent.contains(e.target)) {
        modalClose();
    }
};

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Name Validation (Only letters, min 2 chars)
    let nameInput = document.getElementById("name");
    let nameError = document.getElementById("nameError");
    let nameWrapper = nameInput.closest('.modal-form__input');
    let nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/;

    if (!nameRegex.test(nameInput.value.trim())) {
        nameError.textContent = "*заполните поле корректно";
        nameWrapper.classList.add('error');
        isValid = false;
    } else {
        nameError.textContent = "";
        nameWrapper.classList.remove('error');
    }

    // Phone Validation (+7 (999) 999-99-99)
    let phoneInput = document.getElementById("phone");
    let phoneError = document.getElementById("phoneError");
    let phoneWrapper = phoneInput.closest('.modal-form__input');
    let phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneError.textContent = "*заполните поле корректно";
        phoneWrapper.classList.add('error');
        isValid = false;
    } else {
        phoneError.textContent = "";
        phoneWrapper.classList.remove('error');
    }

    if (isValid) {
        Swal.fire({
            title: "Спасибо",
            text: "Ваша заявка успешно отправлена",
            icon: "success"
        });
    }
});

// Function to format phone number dynamically
function formatPhone(input) {
    let numbers = input.value.replace(/\D/g, ""); // Remove non-digits
    let formattedNumber = "+7 ";

    if (numbers.startsWith("7")) {
        numbers = numbers.substring(1); // Remove extra "7" if entered manually
    }

    if (numbers.length > 0) formattedNumber += "(" + numbers.substring(0, 3);
    if (numbers.length >= 4) formattedNumber += ") " + numbers.substring(3, 6);
    if (numbers.length >= 7) formattedNumber += "-" + numbers.substring(6, 8);
    if (numbers.length >= 9) formattedNumber += "-" + numbers.substring(8, 10);

    input.value = formattedNumber;
}

function clearError(input) {
    let wrapper = input.closest('.modal-form__input');
    let errorMessage = wrapper.querySelector('.error-message');

    if (wrapper.classList.contains('error')) {
        wrapper.classList.remove('error');
        errorMessage.textContent = "";
    }
}

const result = document.getElementById('result');

feedbackForm.addEventListener('submit', function (e) {
    const formData = new FormData(feedbackForm);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            feedbackForm.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
