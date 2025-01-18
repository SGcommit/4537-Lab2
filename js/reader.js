function loadNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
  }
  
  function renderNotes(notes) {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
  
    notes.forEach((note) => {
      const noteDiv = document.createElement("div");
      const noteContent = document.createElement("p");
      noteContent.textContent = note.content;
      noteDiv.appendChild(noteContent);
      notesContainer.appendChild(noteDiv);
    });
  
    document.getElementById("last-updated").textContent = new Date().toLocaleTimeString();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const updateNotes = () => {
      const notes = loadNotes();
      renderNotes(notes);
    };
  
    updateNotes();
    setInterval(updateNotes, 2000); // Refresh every 2 seconds
  });
  