import axios from "axios";

export const insertImageSvc = async (
  images: File,
  cols: number,
  rows: number
) => {
  const formData = new FormData();
  formData.append("photo", images);
  formData.append("cols", String(cols));
  formData.append("rows", String(rows));
  return await axios.post("/image", formData);
};
export const getAllImageSvc = async () => {
  const response = await axios("/image");
  return response.data.images;
};

export const getImageByIdSvc = async (id: string) => {
  const response = await axios("/image/" + id);
  return response.data;
};
