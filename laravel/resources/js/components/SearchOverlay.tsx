// Create a new file at: resources/js/components/SearchOverlay.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { Command, CommandList, CommandGroup } from '@/shadcn/ui/command';
import { Link } from '@inertiajs/react';
import { Button } from '@/shadcn/ui/button';
import { useSearch } from '@/api/hooks/useSearch';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  trendingItems: Array<{ id: number; name: string; type: string }>;
  categories: Array<{ id: number; name: string; [key: string]: any }>;
  randomImage: (index: number) => string;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  query,
  onQueryChange,
  searchInputRef,
  trendingItems,
  categories,
  randomImage,
  onWheel,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { searchResults, isLoading, isError } = useSearch(query);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      searchInputRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, searchInputRef]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999]"
    >
      {/* Overlay Background */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Container */}
      <div 
        className="fixed inset-0 z-[10000] flex items-start justify-center pt-32 px-4"
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="w-full max-w-2xl" 
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-background py-4 pl-12 pr-6 text-foreground shadow-lg outline-none ring-2 ring-ring/20 focus:ring-2 focus:ring-primary"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  onClose();
                }
              }}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          
          <Command className="mt-4 max-h-[60vh] overflow-y-auto rounded-xl border bg-background p-4 shadow-lg">
            <CommandList>
              {/* Trending Items Section */}
              {!query && trendingItems.length > 0 && (
                <CommandGroup heading="Trending Items">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trendingItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex cursor-pointer items-center space-x-1 rounded-md border border-border bg-background px-3 py-1 transition hover:bg-secondary"
                        onClick={() => onClose()}
                      >
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CommandGroup>
              )}

              {/* Categories Section */}
              {!query && categories.length > 0 && (
                <CommandGroup heading="Categories" className="mt-4">
                  <div className="mt-2 flex space-x-3 overflow-x-auto pb-2" onWheel={onWheel}>
                    {categories.map((cat, index) => (
                      <div
                        key={cat.id}
                        className="flex flex-shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg bg-secondary p-3 transition hover:bg-secondary/70"
                        onClick={() => onClose()}
                      >
                        <img
                          className="h-16 w-16 rounded-lg bg-card object-cover"
                          src={randomImage(index)}
                          alt={cat.name}
                        />
                        <span className="text-xs font-medium">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </CommandGroup>
              )}

              {/* Search Results */}
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : isError ? (
                <div className="text-center text-red-500 p-4">
                  Failed to load search results
                </div>
              ) : query && searchResults.length > 0 ? (
                <CommandGroup heading="Search Results">
                  <div className="space-y-2">
                    {searchResults.map((product: any) => (
                      <Link href={`/product/${product?.slug}`} key={product.id}>
                        <div
                          className="flex items-center space-x-4 rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => {
                            onClose();
                          }}
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                            <img
                              src={product.image || randomImage(product.id)}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-medium text-foreground">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {product.categories?.[0]?.name || 'Uncategorized'}
                            </p>
                          </div>
                          {product.price && (
                            <div className="text-sm font-medium text-foreground">
                              ${parseFloat(product.price).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CommandGroup>
              ) : query ? (
                <div className="p-4 text-center text-muted-foreground">
                  No results found for "{query}"
                </div>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;