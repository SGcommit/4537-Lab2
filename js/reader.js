// NotesReader class to handle loading and displaying notes
class NotesReader {
  constructor() {
      this.init();
  }

  // Load notes from localStorage
  loadNotes() {
      return JSON.parse(localStorage.getItem("notes")) || [];
  }

  // Render notes to the page
  renderNotes() {
      const notesContainer = document.getElementById("notes");
      notesContainer.innerHTML = ""; // Clear existing content

      const notes = this.loadNotes();
      notes.forEach(note => {
          const noteDiv = document.createElement("div");
          noteDiv.classList.add("note-container");

          const noteContent = document.createElement("p");
          noteContent.textContent = note.content;

          noteDiv.appendChild(noteContent);
          notesContainer.appendChild(noteDiv);
      });

      // Update last-updated timestamp
      document.getElementById("last-updated").textContent = new Date().toLocaleTimeString();
  }

  // Periodically refresh displayed notes
  init() {
      this.renderNotes();
      setInterval(() => this.renderNotes(), 2000); // Refresh every 2 seconds
  }
}

// Initialize the NotesReader when the page loads
document.addEventListener("DOMContentLoaded", () => new NotesReader());

// Function to navigate back to index.html
function goBack() {
  window.location.href = "../index.html";
}
