function calculateAge() {

  var day = parseInt(document.getElementById("day").value);
  var month = parseInt(document.getElementById("month").value);
  var year = parseInt(document.getElementById("year").value);

  var errorMsg = document.getElementById("error-msg");
  var resultCard = document.getElementById("result");

  // Reset
  errorMsg.textContent = "";
  resultCard.style.display = "none";

  // Validation
  if (!day || !month || !year) {
    errorMsg.textContent = " Please fill in all three fields!";
    return;
  }
  if (day < 1 || day > 31) {
    errorMsg.textContent = "Day must be between 1 and 31!";
    return;
  }
  if (month < 1 || month > 12) {
    errorMsg.textContent = "Month must be between 1 and 12!";
    return;
  }
  if (year < 1900 || year > 2025) {
    errorMsg.textContent = " Please enter a valid year!";
    return;
  }

  var dob = new Date(year, month - 1, day);
  var today = new Date();

  if (dob > today) {
    errorMsg.textContent = " Date of birth cannot be in the future!";
    return;
  }

  // Calculate
  var years = today.getFullYear() - dob.getFullYear();
  var months = today.getMonth() - dob.getMonth();
  var days = today.getDate() - dob.getDate();

  if (days < 0) { months--; days += 30; }
  if (months < 0) { years--; months += 12; }

  // Total days lived
  var totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));

  // Display
  document.getElementById("res-years").textContent = years;
  document.getElementById("res-months").textContent = months;
  document.getElementById("res-days").textContent = days;

  var monthNames = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];

  document.getElementById("res-summary").innerHTML =
    "Born on <strong>" + monthNames[dob.getMonth()] + " " + day + ", " + year + "</strong>" +
    " — you have lived <strong>" + totalDays.toLocaleString() + " days</strong> in total.";

  resultCard.style.display = "block";
}

// Enter key
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") calculateAge();
});