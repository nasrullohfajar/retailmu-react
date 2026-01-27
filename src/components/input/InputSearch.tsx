import type { InputSearchProps } from "./type";
import { LuSearch } from "react-icons/lu";

const InputSearch = ({
  setPage,
  setSearch,
  searchInput,
  setSearchInput,
}: InputSearchProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchInput);
      }}
      className="flex items-center justify-center border border-gray-300 rounded w-52 xl:w-62  text-xs xl:text-sm h-10 xl:h-11.5 px-3 gap-3"
    >
      <div>
        <LuSearch size={18} color="gray" />
      </div>
      <input
        type="text"
        placeholder="Cari..."
        value={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
        className="w-full focus:outline-none"
      />
    </form>
  );
};

export default InputSearch;
