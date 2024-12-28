import { ChangeEvent } from 'react';

interface FileUploadProps {
    onFileUpload: (parsedUrls: string[]) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const parsedUrls = content
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line !== ''); // Filter out empty lines

                onFileUpload(parsedUrls);
            };
            reader.readAsText(file);
        }
    };

    return (
        <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
    );
}