import { faCauldron, faGameBoard } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BubbleSvg from "@/public/bubble.svg";
import Lettering from "../_components/lettering";

export default function newRoot() {
  return (
    <div>
      {/* <div className="sm:grid sm:grid-cols-3">
        <div className="m-2 flex justify-center bg-primary text-center sm:col-span-2">
          <div className="m-2 bg-secondary">Lettering</div>
          <div className="m-2 hidden  bg-secondary sm:visible">
            Speechbubble
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div />
          <div className="flex items-center justify-center bg-primary">
            <div className="">bubble</div>
          </div>
        </div>
      </div> */}
      <div>
        <div className="block items-center bg-primary">
          <div className="flex justify-center">
            <Lettering />
            <div className="absolute right-0 top-0 bg-secondary text-muted-foreground">
              bubble
            </div>
          </div>
        </div>
      </div>
      {/* playfield */}
      <div className="m-4 grid h-screen place-items-center">
        <div className="grid grid-cols-5 grid-rows-5 gap-2 text-sm">
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
      {/* footer */}
      <div className="absolute bottom-0 w-full">
        <div className="flex rounded-t-md bg-primary text-center">
          <FontAwesomeIcon icon={faGameBoard} className="h-10 flex-auto" />
          <FontAwesomeIcon icon={faCauldron} className="h-10 flex-auto" />
          <FontAwesomeIcon icon={faCauldron} className="h-10 flex-auto" />
        </div>
      </div>
    </div>
  );
}
