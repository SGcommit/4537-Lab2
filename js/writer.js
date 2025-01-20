// Note class to represent individual notes
// Each note stores a content string, which is initially empty by default
class Note {
  constructor(content = "") {
      this.content = content;
  }
}

// Utility function to load notes from localStorage
function loadNotes() {
  // Retrieve stored notes from localStorage, parsing the JSON string
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  
  // Convert stored objects into instances of the Note class
  return storedNotes.map((note) => new Note(note.content));
}

// Utility function to save notes to localStorage
function saveNotes(notes) {
  // Store the updated notes array as a JSON string in localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Update the "Last Saved" timestamp on the page
  document.getElementById("last-saved").textContent = new Date().toLocaleTimeString();
}
/*chat gpt was used to help write initial renderNotes function before editing */
// Function to render all notes on the page
function renderNotes(notes) {
  const notesContainer = document.getElementById("notes"); // Get the container for notes
  notesContainer.innerHTML = ""; // Clear existing content before re-rendering

  notes.forEach((note, index) => {
      const noteDiv = document.createElement("div"); // Create a container for each note

      // Create a text area for editing the note's content
      const textArea = document.createElement("textarea");
      textArea.value = note.content; // Set initial value from note data

      // Update the corresponding note content when the user types
      textArea.addEventListener("input", (e) => {
          notes[index].content = e.target.value;
      });

      // Create a "Remove" button to delete the note
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove"; // Set button text
      removeButton.classList.add("remove-button"); // Apply styling class

      // Remove the note from the list when clicked and re-render the notes
      removeButton.addEventListener("click", () => {
          notes.splice(index, 1); // Remove the note from the array
          renderNotes(notes); // Re-render the notes list
      });

      // Append the text area and remove button to the note container
      noteDiv.appendChild(textArea);
      noteDiv.appendChild(removeButton);

      // Append the note container to the main notes section
      notesContainer.appendChild(noteDiv);
  });

  // Save the updated notes list to localStorage
  saveNotes(notes);
}

// Event listener to run once the page has loaded
document.addEventListener("DOMContentLoaded", () => {
  const notes = loadNotes(); // Load existing notes from storage

  // Add a new note when the "Add Note" button is clicked
  document.getElementById("add-note").addEventListener("click", () => {
      notes.push(new Note()); // Add a new empty note to the list
      renderNotes(notes); // Re-render the notes list
  });

  renderNotes(notes); // Display all loaded notes

  // Automatically save notes every 2 seconds (autosave feature)
  setInterval(() => saveNotes(notes), 2000);
});

// Function to navigate back to the index.html page
function goBack() {
  window.location.href = "../index.html"; // Navigate one directory up
}
