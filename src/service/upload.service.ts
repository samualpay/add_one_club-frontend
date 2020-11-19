type UploadImageResp = {
  url: string;
};
class UploadService {
  async uploadImage(file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadImageResp> {
    // todo: uploadImage api
    if (onProgress) {
      onProgress(50);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url:
            "22025708576846_977.jpg",
        });
      }, 1000);
    });
  }
  async uploadVideo(file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadImageResp> {
    // todo: uploadVideo api
    if (onProgress) {
      onProgress(50);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url:
            "22025708576846_977.jpg",
        });
      }, 1000);
    });
  }
}
export default new UploadService();
