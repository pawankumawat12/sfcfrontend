import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";

export default function LogoutModal({ isOpen, close, onConfirm }) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
      <div className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6">
          <DialogTitle className="text-lg font-semibold">
            Confirm sign out
          </DialogTitle>

          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to sign out?{" "}
          </p>

          <div className="mt-4 flex justify-end gap-3">
            <Button onClick={close} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </Button>

            <Button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              SignOut
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
