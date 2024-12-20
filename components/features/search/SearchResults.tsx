'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { ScrollArea } from "@/components/common/scroll-area";
import { useEffect, useRef } from "react";
import { Loader2, Search } from "lucide-react";
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: number;
  title: string;
  type: 'document' | 'image' | 'chart' | 'note';
  content: string;
  url: string; // Added URL field
}

interface SearchResponse {
  items: SearchResult[];
  nextPage: number;
  hasMore: boolean;
}

interface MockDataType {
  documents: Array<{ title: string; content: string }>;
  charts: Array<{ title: string; content: string }>;
  notes: Array<{ title: string; content: string }>;
  [key: string]: Array<{ title: string; content: string }>;
}

// Mock search results for demonstration
const fetchSearchResults = async ({ pageParam = 0, query }: { pageParam?: number; query: string }): Promise<SearchResponse> => {
  // In a real application, you would call your API here
  // const response = await fetch(`/api/search?query=${query}&page=${pageParam}`);
  // return response.json();
  // For now, we'll keep the mock data but make it more structured
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockData: MockDataType = {
    documents: [
      { title: "Document 1", content: "Sample content about documents" },
      { title: "Document 2", content: "More sample content" },
    ],
    charts: [
      { title: "Sales Chart", content: "Chart showing sales data" },
      { title: "Revenue Chart", content: "Chart showing revenue" },
    ],
    notes: [
      { title: "Meeting Notes", content: "Notes from last meeting" },
      { title: "Project Ideas", content: "New project suggestions" },
    ]
  };

  const items = Array.from({ length: 10 }, (_, i) => {
    const id = pageParam * 10 + i;
    const types = ['document', 'chart', 'note'] as const;
    const type = types[id % types.length];
    const mockType = type + 's' as keyof MockDataType;

    return {
      id,
      title: mockData[mockType][id % 2].title,
      type,
      content: mockData[mockType][id % 2].content,
      url: `/cards?type=${type}&id=${id}`
    };
  });

  return {
    items,
    nextPage: pageParam + 1,
    hasMore: pageParam < 5,
  };
};

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
}

export function SearchResults({ query, isVisible }: SearchResultsProps) {
  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<SearchResponse, Error>({
    queryKey: ['search', query],
    queryFn: ({ pageParam }) => fetchSearchResults({ pageParam: pageParam as number, query }),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: query.length > 0 && isVisible,
    initialPageParam: 0,
  });

  const handleCardClick = (result: SearchResult) => {
    // Using the new router.push format
    router.push(`/cards?search=${encodeURIComponent(query)}&type=${result.type}&id=${result.id}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isVisible) return null;

  // Show empty state when search is visible but no query
  if (query.length === 0) {
    return (
      <Card className="mt-2 w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start Searching</h3>
          <p className="text-sm text-muted-foreground">
            Enter a search term to find documents, images, charts, and notes
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
      <Card className="mt-2 w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Search Results for "{query}"</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {isLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
              ) : (
                  <>
                    {data?.pages.map((page) =>
                        page.items.map((item) => (
                            <Card
                                key={item.id}
                                className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                                onClick={() => handleCardClick(item)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{item.title}</h3>
                                  <p className="text-sm text-muted-foreground">{item.content}</p>
                                </div>
                                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                              </div>
                            </Card>
                        ))
                    )}
                    <div ref={observerTarget} className="h-8 w-full">
                      {isFetchingNextPage && (
                          <div className="flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                      )}
                    </div>
                  </>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
  );
}