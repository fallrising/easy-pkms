import { Input } from '@/components/common/input';
import { Button } from '@/components/common/button';

interface UrlInputRowProps {
    index: number;
    url: string;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

export function UrlInputRow({ index, url, onChange, onRemove }: UrlInputRowProps) {
    return (
        <div key={index} className="flex space-x-2">
            <Input
                placeholder="URL"
                value={url}
                onChange={(e) => onChange(index, e.target.value)}
            />
            <Button variant="destructive" onClick={() => onRemove(index)}>
                Remove
            </Button>
        </div>
    );
}