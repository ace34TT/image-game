import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageByIdSvc } from "../services/image.services";
import {
  rotateMatrix,
  rotateMatrixNegative,
  shuffleMatrix,
} from "../helpers/matrix.helpers";

const PhotoEdit = () => {
  const { photoId } = useParams();
  const [originalData, setOriginal] = useState<any | null>(null);
  const [playgroundData, setPlaygroundData] = useState<any | null>(null);
  //
  const [gameStart, setGameStart] = useState(false);
  const [userWin, setUserWin] = useState(false);
  //
  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [steps, setSteps] = useState(0);
  const [firstImage, setFirstImage] = useState<{
    row: number;
    col: number;
  } | null>(null);

  //
  useEffect(() => {
    handleFetchImage();
    return () => {};
  }, []);

  const handleFetchImage = async () => {
    if (!photoId) return;
    const data = await getImageByIdSvc(photoId);
    setOriginal(data);
    setPlaygroundData(data);
  };
  const handleMixImages = () => {
    const rotatedResult = shuffleMatrix(playgroundData.data_2d);
    const _playgroundData = { ...playgroundData };
    _playgroundData.data_2d = rotatedResult;
    setPlaygroundData(_playgroundData);
  };
  const handleRotate = (_rotation: number) => {
    const rotatedResult =
      _rotation > 0
        ? rotateMatrix(playgroundData.data_2d)
        : rotateMatrixNegative(playgroundData.data_2d);
    const _playgroundData = { ...playgroundData };
    _playgroundData.data_2d = rotatedResult;
    setPlaygroundData(_playgroundData);
  };
  const handleCheck = () => {
    if (!gameStart) return;
    const areData2DArraysEqual =
      JSON.stringify(originalData.data_2d) ===
      JSON.stringify(playgroundData.data_2d);
    console.log(areData2DArraysEqual);
    if (areData2DArraysEqual) setUserWin(true);
  };
  const handleReset = () => {
    setUserWin(false);
    setPlaygroundData(originalData);
    setGameStart(false);
    setSteps(0);
  };

  return (
    <div className="w-8/12 mx-auto">
      {originalData && playgroundData && (
        <div
          className={`w-full mt-10 gap-4`}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${originalData.image.cols}, minmax(0, 1fr))`,
          }}
        >
          {playgroundData.data_2d.map((row: any, key: number) => {
            return row.map((item: any, _key: number) => {
              return (
                <img
                  src={`http://localhost:8000/uploads/${originalData.image.folder}/${item}`}
                  alt=""
                  key={item}
                  className={`${
                    firstImage &&
                    firstImage.row === key &&
                    firstImage.col === _key &&
                    "shadow-xl shadow-blue-900"
                  }`}
                  onClick={() => {
                    if (!gameStart || userWin) return;

                    if (imageIsSelected) {
                      if (!firstImage) return;
                      let _data = playgroundData.data_2d;
                      let _temp = _data[key][_key];
                      _data[key][_key] =
                        _data[firstImage?.row][firstImage?.col];
                      _data[firstImage?.row][firstImage?.col] = _temp;
                      const newData = playgroundData;
                      newData.data_2d = _data;
                      setSteps(steps + 1);
                      //
                      handleCheck();
                      setPlaygroundData(newData);
                      setFirstImage(null);
                      setImageIsSelected(false);
                    } else {
                      setFirstImage({ row: key, col: _key });
                      setImageIsSelected(true);
                    }
                    setFirstImage({ row: key, col: _key });
                    console.log(key, _key);
                  }}
                />
              );
            });
          })}
        </div>
      )}
      {gameStart && (
        <div className="prose text-center text-white mt-10">
          <h1 className="text-white">
            <span>Steps : </span> {steps}
          </h1>
        </div>
      )}
      {userWin && (
        <div className="prose text-center text-white mt-10">
          <h1 className="text-green-600">You win</h1>
        </div>
      )}
      <div className="my-10">
        {!gameStart && (
          <>
            <div className="flex gap-4">
              <button
                className="w-1/2 mt-5 border-blue-600 border-2 py-2  text-blue-600 font-bold rounded-2xl bg-blue-600 bg-opacity-15"
                onClick={() => {
                  handleRotate(-1);
                }}
              >
                Rotate left
              </button>
              <button
                className="w-1/2 mt-5 border-blue-600 border-2 py-2  text-blue-600 font-bold rounded-2xl bg-blue-600 bg-opacity-15"
                onClick={() => {
                  handleRotate(1);
                }}
              >
                Rotate right
              </button>
            </div>
            <button
              className="w-full mt-5 border-white border-2 py-2  text-white font-bold rounded-2xl bg-white bg-opacity-15"
              onClick={() => {
                handleMixImages();
              }}
            >
              Randomize
            </button>
          </>
        )}
        <button
          className="w-full mt-5 border-green-600 border-2 py-2  text-green-600 font-bold rounded-2xl bg-green-600 bg-opacity-15"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="w-full mt-5 border-blue-500 border-2 py-2  text-white font-bold rounded-2xl bg-blue-500"
          onClick={() => {
            setGameStart(true);
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default PhotoEdit;
