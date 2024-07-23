import Search from "./Search";
import { text } from "../../utils/constant";

const Homepage = () => {
  return (
    <div className="w-full pt-2 space-y-4">
      <Search />
      <h1 className="font-bold text-2xl">{text.HOME_TITLE}</h1>
      <p className="text-gray-500">{text.HOME_DESCRIPTION}</p>
    </div>
  );
};

export default Homepage;
