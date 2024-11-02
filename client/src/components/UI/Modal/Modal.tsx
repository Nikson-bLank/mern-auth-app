import { useEffect } from "react";
import ReactPortal from "../../portal/ReactPortal";
import cn from "../../../utils/cn";
import ClickAwayListener from "react-click-away-listener";

type ModalProps = {
    backdropClass?: string;
    children: React.ReactNode;
    className?: string;
    handleClose: () => void;
    isOpen?: boolean;
    modalChildrenContainerClass?: string;
    modalContainerClass?: string;
};

const Modal = ({
    isOpen,
    handleClose,
    children,
    modalContainerClass,
    backdropClass,
    modalChildrenContainerClass,
    className,
}: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [handleClose, isOpen]);
    if (!isOpen) return null; // Run when delete is confirmed.

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div
                className={cn(
                    "relative z-[60] modal_wrap ",
                    modalContainerClass
                )}
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className={cn(
                        "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
                        backdropClass
                    )}
                    aria-hidden="true"
                />
                <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                    <div
                        className={cn(
                            "flex h-full items-center justify-center p-0 text-center sm:items-center sm:p-0",
                            modalChildrenContainerClass
                        )}
                    >
                        <ClickAwayListener
                            {...(handleClose
                                ? { onClickAway: handleClose }
                                : { onClickAway: () => null })}
                        >
                            <div
                                className={cn(
                                    "relative transform overflow-hidden rounded-2xl overflow-y-auto overflow-x-hidden bg-white text-left shadow-xl transition-all  sm:w-full  sm:max-w-lg inset-0  m-4",
                                    className
                                )}
                            >
                                {children}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </div>
        </ReactPortal>
    );
};

export default Modal;
