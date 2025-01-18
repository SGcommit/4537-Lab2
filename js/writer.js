class Note {
    constructor(content = "") {
      this.content = content;
    }
  }
  
  // Utility to load notes from localStorage
  function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return storedNotes.map((note) => new Note(note.content));
  }
  
  // Utility to save notes to localStorage
  function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("last-saved").textContent = new Date().toLocaleTimeString();
  }
  
  // Function to render all notes
  function renderNotes(notes) {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
  
    notes.forEach((note, index) => {
      const noteDiv = document.createElement("div");
  
      const textArea = document.createElement("textarea");
      textArea.value = note.content;
      textArea.addEventListener("input", (e) => {
        notes[index].content = e.target.value;
      });
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        notes.splice(index, 1);
        renderNotes(notes);
      });
  
      noteDiv.appendChild(textArea);
      noteDiv.appendChild(removeButton);
      notesContainer.appendChild(noteDiv);
    });
  
    saveNotes(notes);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const notes = loadNotes();
  
    document.getElementById("add-note").addEventListener("click", () => {
      notes.push(new Note());
      renderNotes(notes);
    });
  
    renderNotes(notes);
  
    setInterval(() => saveNotes(notes), 2000); // Autosave every 2 seconds
  });
  