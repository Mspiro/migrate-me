let tbody = document.querySelectorAll("tbody");
let trow = tbody[0].querySelectorAll("tr");
let userData = [];
for (let index = 0; index < trow.length; index++) {
  let username = trow[index].querySelectorAll("em")[0].innerText.trim();
  let name = trow[index]
    .querySelectorAll(".views-field-name a")[0]
    .innerText.trim();
  let email = trow[index]
    .querySelectorAll(".views-field-mail a")[0]
    .innerText.trim();
  let role = trow[index]
    .querySelectorAll(".views-field-roles-target-id li")[0]
    .innerText.trim();
  let status = trow[index]
    .querySelectorAll(".views-field-status")[0]
    .innerText.trim();
  let user = {
    username: username,
    name: name,
    email: email,
    role: role,
    status: status,
  };
  // Push the user object into the userData array
  userData.push(user);
}
// Display the arrow at the end (assuming using console.log)
console.log("→");

// Optional: Print the entire userData array (for debugging or further processing)
console.log(userData);
