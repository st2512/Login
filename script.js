const passwordInput = document.querySelector(".pass-field input"),
mailInput = document.querySelector(".mail-field input"),
eyeIcon = document.querySelector(".pass-field i"),
requirementsList = document.querySelectorAll(".requirement-list li"),
registerBtn = document.querySelector("button");

eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password"; //เปลี่ยนจาก text to password to text
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`; //เปลี่ยน icon เมื่อกดที่ icon
});

const requirements = [
    {regex : /.{8,}/, index : 0},
    {regex : /[A-Z]/, index : 1},
    {regex : /[a-z]/, index : 2},
    {regex : /[0-9]/, index : 3},
    {regex : /[^A-Za-z0-9]/, index : 4}
]
passwordInput.addEventListener("keyup" , (e) =>{
    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requimentsItem = requirementsList[item.index];
        if (isValid) {
            requimentsItem.firstElementChild.className = "fa-solid fa-check";
            requimentsItem.classList.add("valid");
        } else {
            requimentsItem.firstElementChild.className = "fa-solid fa-circle";
            requimentsItem.classList.remove("valid");
        }
    });
});

registerBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the form from submitting
    const form = document.querySelector("form");
    const invalidRequirement = document.querySelector(".requirement-list li:not(.valid)");

    // Regular expression for email validation
    const emailRegex = /\S+@\S+\.\S+/;

    // Check if email is valid
    if (!emailRegex.test(mailInput.value)) {
        alert("Invalid email!");
        return;
    }
    // Check if password is valid
    if (passwordInput.value.length < 8 || invalidRequirement) { 
        alert("Invalid password!");
        return;
    }
    // Submit the form if both email and password are valid
    form.submit();
});