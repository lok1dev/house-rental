import { Navigation } from "../layout";

const Header = () => {
   return (
      <div className="w-full flex items-center bg-secondary">
         <div className="text-white font-bold text-xl w-[256px] flex-none flex justify-center items-center">
            Rent house
         </div>
         <div>
            <Navigation isAdmin />
         </div>
      </div>
   );
};

export default Header;
