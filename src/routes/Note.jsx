import { deleteNote } from "../asyncActions/notesActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Note() {
  const { id } = useParams();
  const { notes } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = notes.find((el) => el.id == id);
  if (!note) {
    return <div>Note not found</div>;
  }

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
    navigate("/notes");
  };

  return (
    <>
      <div className="relative w-full flex justify-between">
        <Link className="link" to="/notes">
          Back
        </Link>
        <h1 className="h1">{note.title}</h1>
        <div>
          <Link to={`/edit-note/${id}`} className="font-bold  link mr-10">
            edit
          </Link>
          <button
            className="font-bold  link"
            onClick={() => handleDeleteNote(id)}
          >
            delete
          </button>
        </div>
      </div>
      <p className="text-gray-500 ">{note.body}</p>
    </>
  );
}
