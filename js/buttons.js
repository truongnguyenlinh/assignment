document.addEventListener("DOMContentLoaded", () => {
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "container";
    buttonsDiv.id = "buttons_div";
    buttonsDiv.innerHTML = `
        <button id="admin">Admin</button>
        <button id="student">Student</button>
    `;
    document.body.appendChild(buttonsDiv);
    addButtonListener();
});

const addButtonListener = () =>{
    let adminButton = document.getElementById("admin");
    let studentButton = document.getElementById("student");

    adminButton.addEventListener("click", () => {
        location.href = "./admin.html"
    })

    studentButton.addEventListener("click", () => {
        location.href = "./student.html"
    })
}
