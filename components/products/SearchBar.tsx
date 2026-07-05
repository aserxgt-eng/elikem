'use client';

import { Search } from 'lucide-react';
import { debounce } from '@/lib/utils';
import { useMemo } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search products, categories, or batch numbers...' }: SearchBarProps) {
  const debounced = useMemo(() => debounce(onSearch, 300), [onSearch]);

  return (
    <div className="relative flex-1">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => debounced(e.target.value)}
        className="h-12 w-full rounded-xl border border-surface-border bg-white pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}
