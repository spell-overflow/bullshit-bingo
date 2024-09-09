"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

export type iconType = "error" | "check" | "smile" | null;

export default function ModalDialog({
  open,
  setOpen,
  title,
  text,
  icon,
  buttonText,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
  title: string;
  text: string;
  icon: iconType;
  buttonText: string;
}) {
  const chooseIcon = () => {
    switch (icon) {
      case "error":
        return (
          <XMarkIcon
            aria-hidden="true"
            className="h-12 w-12 rounded-full bg-red-300 text-red-600"
          />
        );
      case "check":
        return (
          <CheckIcon
            aria-hidden="true"
            className="h-12 w-12 rounded-full bg-pine-300 text-pine-600"
          />
        );
      case "smile":
        return (
          <FaceSmileIcon
            aria-hidden="true"
            className="h-12 w-12 rounded-full bg-pine-300 text-pine-600"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-curious-blue-100 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-red-50 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mx-auto flex items-center justify-center">
                {chooseIcon()}
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-curious-blue-700 px-3 py-2 text-sm font-semibold text-curious-blue-100 shadow-sm hover:bg-curious-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-curious-blue-800"
              >
                {buttonText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
