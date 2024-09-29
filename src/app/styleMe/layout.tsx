import { faCauldron, faGameBoard } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lettering from "../_components/lettering";
import Bubble from "../_components/bubble";

export default function newRoot() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      {/*  logos */}
      <div>
        <div className="mt-5 flex items-center justify-center">
          <Lettering width="10rem" className="-mt-4" />
          <Bubble className="absolute -top-2 right-5" />
        </div>
      </div>

      {/* playfield */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-lg px-1">
          <div className="mx-5 grid grid-cols-5 grid-rows-5 gap-2 text-sm">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="flex aspect-square min-h-12 items-center justify-center rounded-sm bg-primary"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="bottom-0 w-full rounded-t-md bg-primary py-2">
        <div className="my-1 flex text-center">
          <FontAwesomeIcon icon={faGameBoard} className="h-10 flex-auto" />
          <FontAwesomeIcon
            icon={faCauldron}
            className="h-10 flex-auto text-transparent/20"
          />
          <FontAwesomeIcon
            icon={faCauldron}
            className="h-10 flex-auto text-transparent/20"
          />
        </div>
      </div>
    </div>
  );
}
