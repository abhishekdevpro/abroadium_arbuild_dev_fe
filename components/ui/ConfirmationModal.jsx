
import React from "react";
import { Trash, AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
  icon: CustomIcon,
  isLoading = false
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return { variant: "danger", defaultIcon: Trash };
      case "warning":
        return { variant: "outline", defaultIcon: AlertTriangle };
      default:
        return { variant: "primary", defaultIcon: AlertTriangle };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = CustomIcon || styles.defaultIcon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} showCloseButton={false}>
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 bg-gray-100">
          <IconComponent className="w-6 h-6 text-gray-600" />
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={styles.variant}
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
