let events = [];

const list = document.querySelector("#starred");
const search = document.querySelector("#search");
const topic = document.querySelector("#topic");

fetch("events.json")
  .then((response) => response.json())
  .then((data) => {
    events = data;
    renderRepositories();
  });

function renderRepositories() {
  const searchText = search.value.toLowerCase();
  const selectedTopic = topic.value;

  list.innerHTML = "";

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchText);

    const matchesTopic =
      selectedTopic === "all" ||
      event.topic === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  filteredEvents.forEach((event) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>${event.name}</strong>
      <br>
      <small>
        ${event.language} · ${event.topic} · starred ${event.starred}
      </small>
    `;

    list.appendChild(item);
  });
}

search.addEventListener("input", renderRepositories);
topic.addEventListener("change", renderRepositories);