import { memo, useState } from 'react';

const SearchBox = memo(function SearchBox(props: {
  handleSearch: (value: string) => void;
  term: string;
}) {
  const { handleSearch, term } = props;
  const [value, setValue] = useState<string>(term);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="flex w-full max-w-56 flex-col">
        <label
          htmlFor="search-box"
          className="invisible text-[0.7rem] text-gray-400"
        >
          Search identifiers
        </label>
        <input
          id="search-box"
          placeholder="Search identifiers"
          className="h-8 w-full rounded border border-solid border-slate-300 p-1 text-[0.7rem] text-slate-600 focus:border-slate-300 focus:outline-none focus-visible:border-slate-300 active:border-slate-300"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
});

export default SearchBox;
