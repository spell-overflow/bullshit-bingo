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
  // onSecondaryClick?: (
  //   event: MouseEventHandler<HTMLButtonElement>,
  // ) => void | Promise<void>;
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
      <DialogContent className="sm:max-w-s flex max-w-xs flex-col items-center justify-center rounded-lg text-center">
        <DialogHeader className="text-2xl">
          <DialogTitle className="mb-2 text-lg">{title}</DialogTitle>
          <FontAwesomeIcon icon={icon} size="xl"></FontAwesomeIcon>
        </DialogHeader>
        {description ? <p className="text-center">{description}</p> : <div />}
        <div>{children}</div>
        <div>
          <Button
            variant="default"
            onClick={onPrimaryClick}
            className="m-1 w-full"
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText ? (
            <Button
              variant="destructive"
              onClick={onSecondaryClick}
              className="m-1 w-full"
            >
              {secondaryButtonText}
            </Button>
          ) : (
            ""
          )}
        </div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
