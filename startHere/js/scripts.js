const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

document.querySelector("#results").innerHTML = `
    <p>Appointment for ${myInfo.get("first")} ${myInfo.get("last")}</p>
    <p>Proxy ${myInfo.get("ordinance")} on ${myInfo.get("date")} in the ${myInfo.get("location")}</p>
    <p>Your phone: ${myInfo.get("phone")}</p>
    <p>our email is ${myInfo.get("email")}</p>
`;