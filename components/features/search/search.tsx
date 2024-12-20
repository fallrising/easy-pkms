'use client'

import { Search as SearchIcon } from "lucide-react";
import { Input } from "../../common/input";
import React, {useEffect, useRef, useState} from "react";
import { SearchResults } from "./SearchResults";

export function Search() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearching(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsSearching(true);
    };

    return (
        <div className="relative w-full max-w-2xl" ref={searchContainerRef}>
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                    placeholder="Search everything..."
                    className="pl-10 bg-secondary/50 border-0 search-glow"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setIsSearching(true)}
                />
            </div>
            <div className="absolute left-0 right-0 z-50 mt-2">
                <SearchResults query={query} isVisible={isSearching} />
            </div>
        </div>
    );
}