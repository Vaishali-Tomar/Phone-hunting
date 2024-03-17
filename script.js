document.addEventListener("DOMContentLoaded", function () {
  const searchField = document.querySelector('#searchField');
  const searchButton = document.querySelector('.searchButton');
  const phones = document.querySelectorAll('.phone');

  // Function to filter and display phones based on search query
  function searchPhones() {
      const searchValue = searchField.value.toLowerCase().trim();

      phones.forEach(phone => {
          const phoneName = phone.querySelector('h4').innerText.toLowerCase();
          if (searchValue === '' || phoneName.includes(searchValue)) {
              phone.style.display = 'block';
          } else {
              phone.style.display = 'none';
          }
      });
  }

  // Function to fetch phone details from API and show details
  function showPhoneDetails(event) {
      const phone = event.target.closest('.phone');
      const phoneName = phone.querySelector('h4').innerText;

      // API URL with search query for phone details
      const apiUrl = `https://openapi.programming-hero.com/api/phones?search=${encodeURIComponent(phoneName)}`;

      // Fetch phone details from API
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              // Replace this with your logic to display the phone details
              console.log(`Details of ${phoneName}:`, data);
              
          })
          .catch(error => {
              console.error('Error fetching phone details:', error);
              // Handle error if necessary
          });
  }

  // Add event listener for search input
  searchField.addEventListener('input', searchPhones);

  // Add event listener for search button
  searchButton.addEventListener('click', searchPhones);

  // Add event listener for "Show Details" buttons
  phones.forEach(phone => {
      const showDetailsButton = phone.querySelector('.buton-showDetails');
      showDetailsButton.addEventListener('click', showPhoneDetails);
  });
});
