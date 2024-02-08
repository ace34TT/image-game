import { useEffect, useState } from "react";
import { getAllImageSvc, insertImageSvc } from "../services/image.services";
import { useNavigate } from "react-router-dom";

const ImageForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  //
  const [images, setImages] = useState<any[] | null>(null);

  useEffect(() => {
    handleGetImages();
    return () => {};
  }, []);

  const handleGetImages = async () => {
    const _images = await getAllImageSvc();
    setImages(_images);
  };
  const handleInsert = async () => {
    if (!image) return;
    await insertImageSvc(image, cols, rows);
    setImage(null);
    setCols(0);
    setRows(0);
    await handleGetImages();
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="w-6/12 border border-slate-800 p-5 rounded-3xl mx-auto text-white prose amx-w-none mt-48">
        <form className="" encType="multipart/form-data">
          <h1 className="text-slate-200">Upload your file here </h1>
          <input
            type="file"
            name="photo"
            className="bg-gray-700 border-gray-700 py-1 p-2 border w-full"
            id=""
            accept=".jpg"
            required
            onChange={(e) => {
              if (!e.target.files) return;
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <div className="w-full flex gap-5 mt-5">
            <div className="w-1/2">
              <label
                htmlFor="number-input"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Select a Cols :{" "}
              </label>
              <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="2"
                required
                name="cols"
                onChange={(e) => setCols(parseInt(e.target.value!))}
                value={cols}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="number-input"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Select a Rows :{" "}
              </label>
              <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="2"
                required
                name="rows"
                onChange={(e) => setRows(parseInt(e.target.value!))}
                value={rows}
              />
            </div>
          </div>
          <button
            className="py-1 bg-blue-600 font-bold mt-10 w-full rounded-lg"
            onClick={handleInsert}
          >
            Processing
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 w-10/12 mx-auto mt-10 ">
        {images &&
          images.map((item, key) => {
            return (
              <div
                className="w-52 h-52 rounded-2xl overflow-hidden shadow-md"
                key={key}
                onClick={() => navigate(`/photo/${item.id}`)}
              >
                <img
                  src={`http://localhost:8000/uploads/${item.folder}/${item.folder}_img.jpg`}
                  className="object-fill w-full h-full"
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ImageForm;
