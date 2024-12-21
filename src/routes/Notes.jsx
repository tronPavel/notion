import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadNotes, deleteNote } from "../asyncActions/notesActions";

export default function Notes() {
  const { notes, loading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadNotes(user.id));
    }
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1 className="h1">Notes</h1>
      {notes
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((n) => (
          <div
            className="flex items-center justify-between p-8 border shadow-md w-full"
            key={n.id}
          >
            <Link to={`/note/${n.id}`}>
              <span className="link mr-20">{n.title}</span>
              <span className="font-light">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </Link>
            <div>
              <Link className="font-bold link mr-10" to={`/edit-note/${n.id}`}>
                Edit
              </Link>
              <button
                className="font-bold link"
                onClick={() => dispatch(deleteNote(n.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      <Link to="/add-note" className="btn">
        Add new note
      </Link>
    </>
  );
}
