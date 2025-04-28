"use client";

export default function ConnectConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-70">
      <div className="bg-light p-6 rounded-xl shadow-xl text-mid max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Connect Wallet
        </h2>
        <p className="mb-6 text-sm text-muted">
          You need to connect your wallet before signing in.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-muted hover:bg-mid text-mid transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-secondary hover:bg-primary text-light font-semibold transition"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
