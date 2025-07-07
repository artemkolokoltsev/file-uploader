import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { UploadCloud, CheckCircle, FileWarningIcon, XCircle } from 'lucide-react';
import type { Item } from './types';
import { filterItemsByCategory } from '../utils/filterByCategory';

type Props = {
    onCategorySelect: (category: string) => void;
    setItems: (items: Item[]) => void;
    selectedCategory: string;
};

const UploadCounters: React.FC<Props> = ({ onCategorySelect, setItems, selectedCategory }) => {
    const [loading, setLoading] = useState(true);
    const [items, setLocalItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/files`);
                const data = await res.json();
                setLocalItems(data);
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30_000);
        return () => clearInterval(interval);
    }, [setItems]);

    if (loading) {
        return <div className="text-center py-8 text-gray-500">Loading...</div>;
    }

    const uploaded = filterItemsByCategory(items, 'uploaded');
    const valid = filterItemsByCategory(items, 'valid');
    const proof = filterItemsByCategory(items, 'proof');
    const failed = filterItemsByCategory(items, 'failed');

    return (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))' }}>
            <StatCard
                title="Uploaded"
                count={uploaded.length}
                icon={UploadCloud}
                backgroundColor="bg-blue-500"
                selected={selectedCategory === 'uploaded'}
                onClick={() => onCategorySelect('uploaded')}
            />
            <StatCard
                title="Valid"
                count={valid.length}
                icon={CheckCircle}
                backgroundColor="bg-green-400"
                selected={selectedCategory === 'valid'}
                onClick={() => onCategorySelect('valid')}
            />
            <StatCard
                title="Proof"
                count={proof.length}
                icon={FileWarningIcon}
                backgroundColor="bg-yellow-400"
                selected={selectedCategory === 'proof'}
                onClick={() => onCategorySelect('proof')}
            />
            <StatCard
                title="Failed"
                count={failed.length}
                icon={XCircle}
                backgroundColor="bg-red-400"
                selected={selectedCategory === 'failed'}
                onClick={() => onCategorySelect('failed')}
            />
        </div>
    );
};

export default UploadCounters;
