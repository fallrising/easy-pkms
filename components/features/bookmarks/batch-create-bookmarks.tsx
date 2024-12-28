import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { FileUpload } from './fileUpload';
import { UrlInputRow } from './bookmarkInputRow';

interface BatchCreateBookmarksProps {
  onClose: () => void;
}

export function BatchCreateBookmarks({ onClose }: BatchCreateBookmarksProps) {
  const [urls, setUrls] = useState<string[]>(['']);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { createBookmark } = useBookmarks();

  const itemsPerPage = 10; // Number of URLs to display per page

  const handleAddRow = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveRow = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const handleChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleFileUpload = (parsedUrls: string[]) => {
    setUrls(prev => [...prev, ...parsedUrls]);
    setCurrentPage(0); // Reset to the first page after uploading
  };

  const handleLoadExample = () => {
    setUrls([
      'http://google.com',
      'google.com',
    ]);
  };

  const normalizeUrl = (url: string): string => {
    try {
      // Add a default protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `http://${url}`;
      }
      const parsedUrl = new URL(url);
      // Normalize the URL by removing unnecessary parts (e.g., trailing slashes, default ports)
      return `${parsedUrl.protocol}//${parsedUrl.hostname}`.toLowerCase();
    } catch (e) {
      return url.toLowerCase(); // Fallback to lowercase if URL parsing fails
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(normalizeUrl(url));
      return parsedUrl.hostname.includes('.'); // Ensure domain has at least one dot
    } catch (e) {
      return false;
    }
  };

  const checkForDuplicates = (urls: string[]): string[] => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    urls.forEach(url => {
      const normalizedUrl = normalizeUrl(url);
      if (seen.has(normalizedUrl)) {
        duplicates.add(url); // Store the original URL for user feedback
      } else {
        seen.add(normalizedUrl);
      }
    });

    return Array.from(duplicates);
  };

  const handleBatchCreate = async () => {
    setError(null);

    // Check for duplicates
    const duplicates = checkForDuplicates(urls);
    if (duplicates.length > 0) {
      setError(`Duplicate URLs found: ${duplicates.join(', ')}`);
      return;
    }

    const validUrls = urls.filter(url => url.trim() !== '' && validateUrl(url));

    if (validUrls.length === 0) {
      setError('Please provide at least one valid URL.');
      return;
    }

    const bookmarksToCreate = validUrls.map(url => ({ title: '', url }));

    try {
      await createBookmark(bookmarksToCreate);
      onClose();
    } catch (err) {
      setError('Failed to create bookmarks. Please try again.');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(urls.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUrls = urls.slice(startIndex, endIndex);

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent aria-describedby="batch-create-description">
          <DialogHeader>
            <DialogTitle>Batch Create Bookmarks</DialogTitle>
            <DialogDescription id="batch-create-description">
              Add multiple bookmarks at once by providing URLs below or uploading a CSV file.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <FileUpload onFileUpload={handleFileUpload} />

            {displayedUrls.map((url, index) => (
                <UrlInputRow
                    key={startIndex + index}
                    index={startIndex + index}
                    url={url}
                    onChange={handleChange}
                    onRemove={handleRemoveRow}
                />
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
              >
                Previous
              </Button>
              <span>
              Page {currentPage + 1} of {totalPages}
            </span>
              <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                  disabled={currentPage === totalPages - 1}
              >
                Next
              </Button>
            </div>

            <Button onClick={handleAddRow}>Add Row</Button>
            <Button variant="outline" onClick={handleLoadExample}>
              Load Example
            </Button>

            {error && <div className="text-red-600">{error}</div>}

            <Button onClick={handleBatchCreate}>Create Bookmarks</Button>
          </div>
        </DialogContent>
      </Dialog>
  );
}