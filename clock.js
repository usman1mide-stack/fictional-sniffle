document.addEventListener("DOMContentLoaded", function() {

    const container = document.getElementById("course");
    const result = document.getElementById("result");

    // --- ADD NEW COURSE ---
    document.getElementById("tone").onclick = function() {
        const newCourse = document.createElement("div");
        newCourse.classList.add("course");
        newCourse.innerHTML = `
            <input type="text" placeholder="Subject Name">
            <input type="text" class="credit" placeholder="Credit">
            <input type="text" class="grade" placeholder="Grade (A-F)">
        `;
        container.appendChild(newCourse);
    };

    // --- DELETE LAST COURSE ---
    document.getElementById("delete").onclick = function() {
        const rows = container.querySelectorAll(".course");
        if (rows.length > 1) {
            container.removeChild(rows[rows.length - 1]);
        } else {
            alert("At least one course must remain");
        }
    };

    // --- CLEAR ALL INPUTS ---
    document.getElementById("button").onclick = function() {
        container.querySelectorAll("input").forEach(input => input.value = "");
        result.textContent = "GPA: 0.00";
    };

    // --- CALCULATE GPA (letter grades) ---
    document.getElementById("butto").onclick = function() {
        const rows = container.querySelectorAll(".course");
        let totalPoints = 0;
        let totalCredits = 0;

        // Map letter grades to numeric values (5.0 scale)
        const gradeMap = {
            "A": 5.0,
            "B": 4.0,
            "C": 3.0,
            "D": 2.0,
            "E": 1.0,
            "F": 0.0
        };

        rows.forEach(row => {
            const credit = parseFloat(row.querySelector(".credit").value) || 0;
            const gradeLetter = row.querySelector(".grade").value.toUpperCase().trim();
            const grade = gradeMap[gradeLetter] !== undefined ? gradeMap[gradeLetter] : 0;

            totalPoints += credit * grade;
            totalCredits += credit;
        });

        const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
        result.textContent = "GPA: " + gpa;
    };

});