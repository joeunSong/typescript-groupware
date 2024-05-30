// * basic
// * install libraries
// * recoil state
// * components
import { Dialog } from 'primereact/dialog';
// * constants

const Modal = (props: any) => {
  const {
    visible,
    setVisible,
    headerTemplate,
    contentTemplate,
    footerTemplate,
    dialogClassName,
    dialogHeaderClassName,
    dialogContentClassName,
    dialogFooterClassName,
    dialogCloseButtonClassName,
    dismissableMask,
  } = props;

  return (
    <Dialog
      modal={true}
      visible={visible}
      header={headerTemplate}
      footer={footerTemplate}
      // 외부 배경 클릭 시 Modal Close
      dismissableMask={dismissableMask ? dismissableMask : true}
      // Modal 크기 조정 비활성화
      resizable={false}
      // 드래그 비활성화
      draggable={false}
      className={`${dialogClassName ? dialogClassName : 'max-sm:w-full sm:w-10/12 md:w-10/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12'} max-h-full`}
      pt={{
        header: { className: dialogHeaderClassName ? dialogHeaderClassName : 'p-5' },
        content: { className: dialogContentClassName ? dialogContentClassName : 'p-5 pt-0' },
        footer: { className: dialogFooterClassName ? dialogFooterClassName : 'p-0 ' },
        closeButton: { className: dialogCloseButtonClassName ? dialogCloseButtonClassName : 'hidden' },
      }}
      onHide={() => {
        setVisible(false);
      }}
    >
      {contentTemplate()}
    </Dialog>
  );
};

export default Modal;
