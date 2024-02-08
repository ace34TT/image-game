import { Route, Routes } from "react-router-dom";
import "./App.css";
import ImageForm from "./pages/ImageForm";
import PhotoEdit from "./pages/PhotoEdit";

function App() {
  return (
    <Routes>
      <Route index element={<ImageForm />} />
      <Route path="photo/:photoId" element={<PhotoEdit />} />
    </Routes>
  );
}

export default App;
