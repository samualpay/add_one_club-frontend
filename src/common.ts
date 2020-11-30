import { Modal } from "antd";
class Common {
  showErrorModal(error: any) {
    Modal.error({
      title: `錯誤:${error.response.data.status}`,
      content: error.response.data.message,
    });
  }
}
export default new Common();
