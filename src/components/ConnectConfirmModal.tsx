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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl text-white max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-green-400">
          Connect Wallet
        </h2>
        <p className="mb-6 text-sm text-gray-300">
          You need to connect your wallet before signing in.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-400 text-black hover:bg-green-500 transition font-semibold"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
