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
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface dialogProperties {
  open: boolean;
  setOpen: (state: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  windowIcon?: IconDefinition;
  footer?: React.ReactNode;
  trigger?: string;
}

const DialogWindow: React.FC<dialogProperties> = ({
  title,
  description,
  children,
  windowIcon,
  footer,
  open,
  setOpen,
}) => {
  const icon: IconDefinition = windowIcon ? windowIcon : faHatWitch;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center justify-center text-center">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <FontAwesomeIcon
            icon={icon}
            size="2xl"
            className="pt-10"
          ></FontAwesomeIcon>
          {description && <div />}
        </DialogHeader>
        <div className="mt-4">{children}</div>
        <Button
          variant="default"
          onClick={() => setOpen(false)}
          className="w-full"
        >
          Restart game
        </Button>
        <DialogFooter className="mt-4">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
