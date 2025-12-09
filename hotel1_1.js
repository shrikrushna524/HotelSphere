
const hotels = [
  {
    name: "Taj Hotel",
    rating: 5,
    reviewText: "Superb",
    reviewScore: 9.5,
    distance: "0.6 km",
    location: "Rajkamal chowk, Amravati",
    imageUrl: "taj.jpg",
  },
  {
    name: "Hotel Vienna",
    rating: 4,
    reviewText: "Very Good",
    reviewScore: 9.2,
    distance: "1.2 km",
    location: "Chatrapati park, Gandhi Nagar, Amravati",
    imageUrl: "vienna.jpg",
  },
];

function displayHotels(filter = {}) {
  const hotelContainer = document.getElementById("hotel-list");
  hotelContainer.innerHTML = "";

  hotels.forEach((hotel) => {
    const hotelCard = document.createElement("div");
    hotelCard.className = "hotel-card";

    hotelCard.innerHTML = `
      <div class="card">
        <img src="${hotel.imageUrl}" alt="${hotel.name}" class="hotel-img" />
        <div class="hotel-info">
          <h2>${hotel.name}</h2>
          <div class="stars">${"★".repeat(hotel.rating)}${"☆".repeat(5 - hotel.rating)}</div>
          <p>${hotel.distance} from city center</p>
          <p>${hotel.location}</p>
          <div class="review">
            <span class="review-text">${hotel.reviewText}</span>
            <span class="review-score">${hotel.reviewScore}</span>
          </div>
        </div>
      </div>
    `;

    hotelContainer.appendChild(hotelCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayHotels();

  document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      displayHotels();
    });
  });
});
