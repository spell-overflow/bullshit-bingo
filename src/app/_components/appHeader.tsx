import Bubble from "./bubble";
import DarkMode from "./darkmode";
import Lettering from "./lettering";
import SheetState from "./sheetState";

export default function AppHeader() {
  return (
    //
    <div className="mt-5 flex items-center justify-between ">
      <DarkMode className="ml-7" />
      <Lettering width="10rem" />
      <div>
        <Bubble className="mr-7 hidden w-16 sm:flex" />
        <SheetState className="mr-7 w-16 sm:hidden" />
      </div>
    </div>
  );
}
