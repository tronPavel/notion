import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./routes/SignUp";
import LogIn from "./routes/LogIn";
import About from "./routes/About";
import Notes from "./routes/Notes";
import Layout from "./routes/Layout";
import EditNote from "./routes/EditNote";
import Note from "./routes/Note";
import NotFound from "./routes/NotFound";

import RequireAuth from "./components/RequireAuth";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { loadUser } from "./asyncActions/userActions";
import { loadNotes } from "./asyncActions/notesActions";

function AppWithUserLoader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(loadNotes(user.id));
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/edit-note/:id" element={<EditNote isEdit={true} />} />
        <Route path="/add-note" element={<EditNote />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWithUserLoader />
      </Provider>
    </BrowserRouter>
  );
}
