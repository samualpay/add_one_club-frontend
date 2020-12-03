import Axios from "axios";

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
    const response = await Axios.post<{ filename: string }>(
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
    // todo: uploadVideo api
    if (onProgress) {
      onProgress(50);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: "22025708576846_977.jpg",
        });
      }, 1000);
    });
  }
}
export default new UploadService();
