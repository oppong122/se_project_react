import { checkResponse } from "./checkResponse";
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
  }).then(checkResponse);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, addItems, deleteItems };
