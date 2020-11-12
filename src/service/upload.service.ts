type UploadImageResp = {
  url: string;
};
class UploadService {
  async uploadImage(file:File,
    onProgress?: (percent: number) => void
  ): Promise<UploadImageResp> {
    if (onProgress) {
      onProgress(50);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url:
            "https://img.ruten.com.tw/s4/892/273/ziujrhjk/1/f8/4e/22025708576846_977.jpg",
        });
      }, 1000);
    });
  }
}
export default new UploadService();