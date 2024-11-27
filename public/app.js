document.addEventListener('DOMContentLoaded', () => {
    const medicationsList = document.getElementById('medicationsList');
    const medicationsSection = document.getElementById('medicationsSection');
    const searchSection = document.getElementById('searchSection');
    const addSection = document.getElementById('addSection');
    const searchButton = document.getElementById('searchButton');
    const addButton = document.getElementById('addButton');
    const viewAllButton = document.getElementById('viewAllButton');
  
    const API_URL = 'http://localhost:5159';
  
    viewAllButton.addEventListener('click', async () => {
      searchSection.classList.add('hidden');
      addSection.classList.add('hidden');
      medicationsSection.classList.remove('hidden');
      const response = await fetch(`${API_URL}/medications`);
      const medications = await response.json();
      medicationsList.innerHTML = medications.map(med => `<li>${med.name} - ${med.type} - Strength: ${med.strength}</li>`).join('');
    });
  
    searchButton.addEventListener('click', () => {
      medicationsSection.classList.add('hidden');
      addSection.classList.add('hidden');
      searchSection.classList.remove('hidden');
    });
  
    addButton.addEventListener('click', () => {
      medicationsSection.classList.add('hidden');
      searchSection.classList.add('hidden');
      addSection.classList.remove('hidden');
    });
  
    document.getElementById('searchSubmit').addEventListener('click', async () => {
      const searchTerm = document.getElementById('searchInput').value;
      const response = await fetch(`${API_URL}/medications/search?name=${searchTerm}`);
      const results = await response.json();
      const searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = results.length 
        ? results.map(med => `<div>${med.name} - ${med.type} - Strength: ${med.strength}</div>`).join('')
        : 'No medications found.';
    });
  
    document.getElementById('addForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const type = document.getElementById('type').value;
      const strength = document.getElementById('strength').value;
  
      const response = await fetch(`${API_URL}/medication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, strength }),
      });
      const newMed = await response.json();
      alert(`Medication ${newMed.name} added successfully!`);
      addSection.classList.add('hidden');
      medicationsSection.classList.remove('hidden');
      viewAllButton.click();
    });
  });
  
  
  