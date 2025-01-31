import { useCallback, useEffect, useState } from "react";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  footer,
}: ModalProps) => {
  const onOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <div
        id="modal"
        className={cn(
          `absolute inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 transition-all duration-300 flex justify-center items-center z-50 ${
            isOpen ? "w-full left-0" : "w-0 left-full"
          }`
        )}
        onClick={onOutsideClick}
      >
        <div
          className={cn(
            `bg-[#f1f1f1] dark:bg-[#111] rounded-lg min-w-[300px] w-[90%] md:w-[75%] lg:w-[50%] space-y-4 relative ${
              isOpen ? "scale-100" : "scale-0"
            }`
          )}
          id="modal-content"
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold ">{title}</h1>
            <button onClick={onClose}>
              <X className="text-sm" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto px-4 pb-4">{children}</div>
          {footer && (
            <div className="p-4 border-t dark:border-gray-600">{footer}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default function Project6() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return (
    <div className="flex flex-col h-full gap-8 w-[80%] m-auto">
      <button onClick={toggleModal}>Open Modal</button>
      <Modal
        isOpen={showModal}
        onClose={toggleModal}
        title="Terms of Service"
        footer={
          <div className="flex items-center">
            <button
              onClick={toggleModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              onClick={toggleModal}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply. The
            European Union’s General Data Protection Regulation (G.D.P.R.) goes
            into effect on May 25 and is meant to ensure a common set of data
            rights in the European Union. It requires organizations to notify
            users as soon as possible of high-risk data breaches that could
            personally affect them.
          </p>
        </div>
      </Modal>
    </div>
  );
}
