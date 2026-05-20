import React from "react";

function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        <p className="mt-3 text-sm text-slate-600">{message}</p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="btn-muted"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className="btn-accent"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
