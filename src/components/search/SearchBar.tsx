/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuSearch, LuShuffle } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (query: string, filter: string) => void;
  initialFilter?: string;
}

const SearchBar = ({ onSearch, initialFilter = "name" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(initialFilter);

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query, filter);
    setQuery("");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <Input
            type="text"
            placeholder={`Search by ${filter}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="lg:h-12 py-6 pl-5 text-lg text-black lg:w-[30rem]"
          />
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px] py-6">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="ingredient">Ingredient</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            type="submit"
            className="lg:h-12 px-12 py-6 cursor-pointer"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
