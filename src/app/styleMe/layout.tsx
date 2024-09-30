import { faCauldron, faGrid5 } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lettering from "../_components/lettering";
import Bubble from "../_components/bubble";

const navigation = [];

export default function newRoot() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      {/*  logos */}
      <div className="mt-5 flex justify-between">
        <div className="ml-7 w-16" />
        <Lettering width="10rem" />
        <Bubble className="mr-7 w-16" />
      </div>

      {/* playfield */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-md px-2 sm:bg-red-500">
          <div className="mx-5 grid grid-cols-5 grid-rows-5 gap-2 overflow-hidden text-sm">
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
          <FontAwesomeIcon icon={faGrid5} className="h-10 flex-auto" />
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
