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
      <DialogContent className="sm:max-w-s flex max-w-xs flex-col items-center justify-center rounded-lg">
        <DialogHeader className="">
          <DialogTitle className="mb-2">{title}</DialogTitle>
          <FontAwesomeIcon
            icon={icon}
            size="2xl"
            className=""
          ></FontAwesomeIcon>
        </DialogHeader>
        {description ? <p>{description}</p> : <div />}
        <div className="">{children}</div>
        <div>
          <Button variant="default" onClick={onPrimaryClick} className="">
            {primaryButtonText}
          </Button>
          {secondaryButtonText ? (
            <Button
              variant="destructive"
              onClick={onSecondaryClick}
              className=""
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
