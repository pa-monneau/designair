import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { SearchIcon } from "./icons";
import { Input } from "./Input";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(props, ref) {
  return <Input ref={ref} type="search" leadingIcon={<SearchIcon aria-hidden className="size-4" />} {...props} />;
});

SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
