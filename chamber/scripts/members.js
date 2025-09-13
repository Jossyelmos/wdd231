const url = "data/members.json";
const cards = document.querySelector("#cards");
const gridButton = document.querySelector(".gridBtn");
const listButton = document.querySelector(".listBtn");

gridButton.addEventListener("click", () => {
    cards.classList.add('cards');
    cards.classList.remove('list');
});

listButton.addEventListener("click", () => {
    cards.classList.add('list');
    cards.classList.remove('cards');
})

async function getMembersInfo() {
  const response = await fetch(url);
  const data = await response.json();
  displayMember(data.members);
}

const displayMember = (members) => {
  members.forEach(member => {
    let card = document.createElement("li");
    let mem_name = document.createElement("h3");
    let b_tag = document.createElement("h4");
    let l_break = document.createElement("hr");

    // Image
    let portrait = document.createElement("img");
    portrait.setAttribute("src", member.imageurl);
    portrait.setAttribute("alt", `Portrait of ${member.name}`);
    portrait.setAttribute("loading", "lazy");

    // Address block
    let address = document.createElement("div");
    address.classList.add("address");
    address.innerHTML = `
      <p><span>Email:</span> ${member.email}</p>
      <p><span>Phone:</span> ${member.phone}</p>
      <p><span>Url:</span><a href="${member.url}" target="_blank"> ${member.url}</a></p>
    `;

    // Wrapper for image and address
    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("info-wrapper");
    infoWrapper.appendChild(portrait);
    infoWrapper.appendChild(address);

    // Assemble card
    mem_name.textContent = member.name;
    b_tag.textContent = member.description;

    card.appendChild(mem_name);
    card.appendChild(b_tag);
    card.appendChild(l_break);
    card.appendChild(infoWrapper);

    cards.appendChild(card);
  });
};

getMembersInfo();
