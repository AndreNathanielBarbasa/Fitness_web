document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if (!firstName || !lastName || !age || !weight || !height) {
        alert("Please fill out all fields.");
        return;
    }

    if (!confirm("Are you sure you want to submit?")) {
        return;
    }

    const user = {
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height)
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("User saved successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert("Failed to save user.");
        }

    } catch (error) {
        console.error(error);
        alert("Cannot connect to the backend.");
    }
});