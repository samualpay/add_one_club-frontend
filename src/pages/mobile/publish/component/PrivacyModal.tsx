import { Modal } from "antd-mobile";
import React from "react";
import "./PrivacyModal.css";
type Props = {
  visible: boolean;
  onComfirm: () => void;
  onCancel: () => void;
};
function closest(el: any, selector: string) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
function PrivacyModal({ visible, onComfirm, onCancel }: Props) {
  function onWrapTouchStart(event: React.TouchEvent) {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }

    const pNode = closest(event.target, ".am-modal-content");
    if (!pNode) {
      event.preventDefault();
    }
  }
  return (
    <Modal
      visible={visible}
      transparent
      maskClosable={false}
      onClose={onCancel}
      //   onClose={this.onClose('modal1')}
      title="Title"
      footer={[
        {
          text: "同意",
          onPress: () => {
            onComfirm();
          },
        },
        {
          text: "不同意",
          onPress: () => {
            onCancel();
          },
        },
      ]}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className="normal" style={{ height: 100, overflow: "scroll" }}>
        <p>
          非常歡迎您光臨「愛加 I
          add網站」（以下簡稱本網站），為了讓您能夠安⼼使⽤本網站的
          各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列
          內容：
        </p>
        <p className="bold">⼀、隱私權保護政策的適⽤範圍 </p>
        <p>
          隱私權保護政策內容，包括本網站如何處理在您使⽤網站服務時收集到的個⼈識別資料。隱
          私權保護政策不適⽤於本網站以外的相關連結網站，也不適⽤於非本網站所委託或參與管理
          的⼈員。
        </p>
        <p className="bold">⼆、個⼈資料的蒐集、處理及利⽤⽅式 </p>
        <ul>
          <li>
            當您造訪本網站或使⽤本網站所提供之功能服務時，我們將視該服務功能性質，請您
            提供必要的個⼈資料，並在該特定⽬的範圍內處理及利⽤您的個⼈資料；非經您書⾯
            同意，本網站不會將個⼈資料⽤於其他⽤途。
          </li>
          <li>
            本網站在您填寫相關購買資料時，會保留您所提供的個⼈資料，如姓名、電話、電⼦
            郵件地址、地址、信⽤卡等資料及使⽤時間等。
          </li>
          <li>
            於⼀般瀏覽時，伺服器會⾃⾏記錄相關⾏徑，包括您使⽤連線設備的IP位址、使⽤時
            間、使⽤的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此
            記錄為內部應⽤，決不對外公佈。
          </li>
          <li>
            為提供精確的服務，我們會將收集的資料進⾏統計與分析，分析結果之統計數據或說
            明⽂字呈現，除供內部研究外，我們會視需要公佈統計數據及說明⽂字，但不涉及特
            定個⼈之資料。
          </li>
        </ul>
      </div>
    </Modal>
  );
}
export default PrivacyModal;
