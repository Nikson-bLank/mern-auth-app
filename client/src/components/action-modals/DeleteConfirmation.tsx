import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

type Props = {
    open: boolean;
    onClose: () => void;
    deleteTitle: string;
    deleteInfo: string;
    onConfirm: () => void;
    loading: boolean;
};

const DeleteConfirmation = ({
    open,
    onClose,
    deleteTitle,
    deleteInfo,
    onConfirm,
    loading,
}: Props) => {
    return (
        <Modal isOpen={open} handleClose={onClose}>
            <div className="flex flex-col gap-2 p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold leading-tight tracking-wide">
                    {deleteTitle}
                </h2>
                <p className="flex-1 text-red-400">{deleteInfo}</p>
                <div className="flex flex-col justify-end items-center gap-3 mt-6 sm:flex-row">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={onConfirm}
                        loading={loading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
