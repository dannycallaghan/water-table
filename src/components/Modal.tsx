import { ReactNode, memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = memo(function Modal({ children }: { children: ReactNode }) {
  const elRef = useRef<null | HTMLElement>(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot?.appendChild(elRef.current as HTMLElement);

    return () => {
      function remove() {
        modalRoot?.removeChild(elRef.current as HTMLElement);
      }
      remove();
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
});

export default Modal;
