import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote, updateNote } from "../asyncActions/notesActions"; // Импортируем действия

export default function EditNote({ isEdit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState("");

  const { user } = useSelector((state) => state.user);
  const { notes } = useSelector((state) => state.notes);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const note = notes.find((el) => el.id === id);
      if (note) {
        setTitle(note.title);
        setBody(note.body);
      }
    }
  }, [isEdit, id, notes]);

  const handleSaveNote = () => {
    if (title.trim() === "") {
      setErrors("Поле не должно быть пустым");
      return;
    }

    const note = {
      title,
      body,
      authorId: user.id,
      ...(isEdit ? { id } : { id: uuidv4(), createdAt: Date.now() }),
    };

    if (isEdit) {
      dispatch(updateNote(id, note));
    } else {
      dispatch(addNote(note));
    }
    navigate(`/note/${isEdit ? id : note.id}`);
  };

  return (
    <>
      <div className="relative w-full">
        <Link className="link" to={isEdit ? `/note/${id}` : "/notes"}>
          back
        </Link>
      </div>
      <h1 className="h1">
        {isEdit ? "Edit note" : "Add new note"}
      </h1>
      <input
        className="input"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      {errors && <div className="error">{errors}</div>}
      <textarea
        className="input"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Описание"
      />
      <button onClick={handleSaveNote} className="btn">
        Сохранить
      </button>
    </>
  );
}
