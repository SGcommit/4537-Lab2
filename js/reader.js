// Function to load notes from localStorage
function loadNotes() {
  // Retrieve stored notes from localStorage, parsing the JSON string
  // If no notes exist, return an empty array to avoid errors
  return JSON.parse(localStorage.getItem("notes")) || [];
}
/*chat gpt was used to help write initial renderNotes function before editing */
// Function to render notes on the page
function renderNotes(notes) {
  const notesContainer = document.getElementById("notes"); // Get the container for displaying notes
  notesContainer.innerHTML = ""; // Clear any existing content before re-rendering

  notes.forEach((note) => {
      const noteDiv = document.createElement("div"); // Create a container for each note
      noteDiv.classList.add("note-container"); // Apply a CSS class for styling

      const noteContent = document.createElement("p"); // Create a paragraph for note text
      noteContent.textContent = note.content; // Set the note text content

      noteDiv.appendChild(noteContent); // Add the note text inside the note container
      notesContainer.appendChild(noteDiv); // Append the note container to the main section
  });

  // Update the "Last Updated" timestamp on the page
  document.getElementById("last-updated").textContent = new Date().toLocaleTimeString();
}

// When the document has fully loaded, run the following:
document.addEventListener("DOMContentLoaded", () => {
  const updateNotes = () => {
      const notes = loadNotes(); // Load stored notes from localStorage
      renderNotes(notes); // Render the loaded notes on the page
  };

  updateNotes(); // Initial rendering of notes

  // Automatically refresh the notes display every 2 seconds
  setInterval(updateNotes, 2000);
});

// Function to navigate back to the index.html page
function goBack() {
  window.location.href = "../index.html"; // Navigate one directory up
}
