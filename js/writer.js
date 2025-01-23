// Note class to represent individual notes
class Note {
  constructor(content = "") {
      this.content = content;
  }
}

// NotesManager class to handle note storage, rendering, and interactions
class NotesManager {
  constructor() {
      this.notes = this.loadNotes(); // Load existing notes from storage
      this.init();
  }

  // Load notes from localStorage
  loadNotes() {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      return storedNotes.map(note => new Note(note.content));
  }

  // Save notes to localStorage
  saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      document.getElementById("last-saved").textContent = new Date().toLocaleTimeString();
  }

  // Render notes to the page
  renderNotes() {
      const notesContainer = document.getElementById("notes");
      notesContainer.innerHTML = ""; // Clear existing content

      this.notes.forEach((note, index) => {
          const noteDiv = document.createElement("div");

          // Create a text area for editing note content
          const textArea = document.createElement("textarea");
          textArea.value = note.content;
          textArea.addEventListener("input", (e) => {
              this.notes[index].content = e.target.value;
          });

          // Create a remove button for each note
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.classList.add("remove-button");

          // Remove note from the list
          removeButton.addEventListener("click", () => {
              this.notes.splice(index, 1);
              this.renderNotes();
          });

          // Append elements to note container
          noteDiv.appendChild(textArea);
          noteDiv.appendChild(removeButton);
          notesContainer.appendChild(noteDiv);
      });

      // Save updated notes
      this.saveNotes();
  }

  // Add a new empty note and re-render
  addNote() {
      this.notes.push(new Note());
      this.renderNotes();
  }

  // Initialize event listeners and set up autosave
  init() {
      document.getElementById("add-note").addEventListener("click", () => this.addNote());
      this.renderNotes();
      setInterval(() => this.saveNotes(), 2000); // Autosave every 2 seconds
  }
}

// Initialize the NotesManager when the page loads
document.addEventListener("DOMContentLoaded", () => new NotesManager());

// Function to navigate back to index.html
function goBack() {
  window.location.href = "../index.html";
}
