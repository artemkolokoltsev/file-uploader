import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { UploadCloud, CheckCircle, XCircle, FileWarningIcon } from 'lucide-react';
import type { Item } from './types';

type Props = {
    onCategorySelect: (category: string) => void;
    setItems: (items: Item[]) => void;
};

const UploadCounters: React.FC<Props> = ({ onCategorySelect, setItems }) => {
    const [items, setLocalItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/cosmos/data`);
            const data = await res.json();
            setLocalItems(data);
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30_000);
        return () => clearInterval(interval);
    }, []);

    const allUploaded = items.filter(item => item.ner?.parentId === '');
    const validFiles = items.filter(item => item.cla?.fileClassification === 'valid');
    const validNeedProof = validFiles.filter(item => item.status?.includes('YELLOW'));
    const failed = items.filter(item => item.status?.includes('RED'));

    if (loading) {
        return <div className="text-center py-8 text-gray-500">Loading...</div>;
    }

    return (
        <div className="grid gap-4 grid-cols-4">
            <StatCard
                title="Uploaded"
                count={allUploaded.length}
                icon={UploadCloud}
                backgroundColor="bg-blue-500"
                onClick={() => onCategorySelect('uploaded')}
            />
            <StatCard
                title="Valid"
                count={validFiles.length}
                icon={CheckCircle}
                backgroundColor="bg-green-500"
                onClick={() => onCategorySelect('valid')}
            />
            <StatCard
                title="Proof"
                count={validNeedProof.length}
                icon={FileWarningIcon}
                backgroundColor="bg-yellow-400"
                onClick={() => onCategorySelect('proof')}
            />
            <StatCard
                title="Failed"
                count={failed.length}
                icon={XCircle}
                backgroundColor="bg-red-500"
                onClick={() => onCategorySelect('failed')}
            />
        </div>
    );
};

export default UploadCounters;
