import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHatWitch,
  type IconDefinition,
} from "@fortawesome/pro-regular-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import type { MouseEventHandler } from "react";

interface dialogProperties {
  open: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  windowIcon?: IconDefinition;
  footer?: React.ReactNode;
  trigger?: string;
  primaryButtonText: string;
  onPrimaryClick: MouseEventHandler<HTMLButtonElement>;
  secondaryButtonText?: string;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
  onOpenChange: (state: boolean) => void;
}

const DialogWindow: React.FC<dialogProperties> = ({
  title,
  description,
  children,
  windowIcon,
  footer,
  open,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  onOpenChange,
}) => {
  const icon: IconDefinition = windowIcon ? windowIcon : faHatWitch;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center justify-center text-center">
        <DialogHeader className="items-center">
          <DialogTitle>{title}</DialogTitle>
          <FontAwesomeIcon
            icon={icon}
            size="2xl"
            className="pt-10"
          ></FontAwesomeIcon>
        </DialogHeader>
        {description ? description : <div />}
        <div className="mt-4">{children}</div>
        <div>
          <Button
            variant="default"
            onClick={onPrimaryClick}
            className="mx-4 w-fit"
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText ? (
            <Button
              variant="destructive"
              onClick={onSecondaryClick}
              className="mx-4 w-fit"
            >
              {secondaryButtonText}
            </Button>
          ) : (
            ""
          )}
        </div>
        <DialogFooter className="mt-4">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
