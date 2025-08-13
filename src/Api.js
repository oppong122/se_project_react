import { checkResponse } from "./utils/weatherApi";
const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItems({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

function deleteItems(id) {
  // console.log(deleteItems);
  return fetch(`${baseUrl}/items/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

// console.log(deleteItems)

export { getItems, addItems, deleteItems }; //deleteItems };
