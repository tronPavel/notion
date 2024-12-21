export const loadNotes = (userId) => async (dispatch) => {
  dispatch({ type: "NOTES_LOADING" });

  const response = await fetch(
    `http://localhost:5000/notes?authorId=${userId}`
  );
  const notes = await response.json();

  dispatch({ type: "NOTES_LOADED", payload: notes });
};

export const addNote = (note) => async (dispatch) => {
  const response = await fetch(`http://localhost:5000/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  const newNote = await response.json();
  dispatch({ type: "NOTE_ADDED", payload: newNote });
};

export const updateNote = (id, updatedNote) => async (dispatch) => {
  const response = await fetch(`http://localhost:5000/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

  const newNote = await response.json();
  dispatch({ type: "NOTE_UPDATED", payload: newNote });
};

export const deleteNote = (id) => async (dispatch) => {
  await fetch(`http://localhost:5000/notes/${id}`, {
    method: "DELETE",
  });

  dispatch({ type: "NOTE_DELETED", payload: id });
};
