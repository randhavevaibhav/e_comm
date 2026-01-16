"use client";

import { SearchIcon } from "lucide-react"

export const ProductSearch = ()=>{
    return ( <div className="flex items-center gap-2 border-2 border-input px-3 rounded-full 
     transition-all duration-200
     focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {/* product search */}
      <input
        className="py-1.5 h-10 w-full bg-transparent outline-none placeholder-muted-foreground focus:ring-0"
        type="text"
        placeholder="Search products"
      />
      <SearchIcon className="text-muted-foreground" />
</div>)
}