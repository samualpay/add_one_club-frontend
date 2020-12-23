// import Axios from "axios";
import axiosForAdmin from "../config/axiosForAdmin";
type UploadImageResp = {
  url: string;
};
class UploadService {
  async uploadImage(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadImageResp> {
    const fmData = new FormData();
    fmData.append("image", file);
    const response = await axiosForAdmin.axios.post<{ filename: string }>(
      "/api/upload/image",
      fmData,
      {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          if (onProgress) {
            onProgress(percent);
            if (percent === 100) {
              setTimeout(() => {
                onProgress(0);
              }, 100);
            }
          }
        },
      }
    );
    return { url: response.data.filename };
  }
  async uploadVideo(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadImageResp> {
    const fmData = new FormData();
    fmData.append("video", file);
    const response = await axiosForAdmin.axios.post<{ filename: string }>(
      "/api/upload/video",
      fmData,
      {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          if (onProgress) {
            onProgress(percent);
            if (percent === 100) {
              setTimeout(() => {
                onProgress(0);
              }, 100);
            }
          }
        },
      }
    );
    return { url: response.data.filename };
  }
}
export default new UploadService();
