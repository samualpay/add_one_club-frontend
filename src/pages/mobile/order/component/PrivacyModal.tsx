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
      title="訂購提醒"
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
      <div className="normal" style={{ maxHeight: 500, overflow: "scroll" }}>
        <p>
          當你確認購買並填寫基本資料，
          <br />
          送出後即代表您確認購買此商品 <br />
          本店小本生意，疫情期間已經很慘了，
          <br />
          請不要棄單喔~ <br />
          若您反悔請立即來電取消0955562843
        </p>
      </div>
    </Modal>
  );
}
export default PrivacyModal;
