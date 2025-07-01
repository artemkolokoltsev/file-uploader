import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';

type Item = {
    id: string;
    ner: { parentId: string };
    cla: { fileClassification: string };
    status: string[];
};

const UploadCounters: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/cosmos/data')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const allUploaded = items.filter(item => item.ner?.parentId === '');
    const validFiles = items.filter(item => item.cla?.fileClassification === 'valid');
    const validNeedProof = validFiles.filter(item =>
        item.status?.includes('YELLOW')
    );
    const failed = items.filter(item => item.status?.includes('RED'));

    if (loading) {
        return <div className="text-center py-8 text-gray-500">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <StatCard title="Uploaded" count={allUploaded.length} />
            <StatCard title="Valid" count={validFiles.length} />
            <StatCard title="Proof" count={validNeedProof.length} />
            <StatCard title="Failed" count={failed.length} color="text-red-600" />
        </div>
    );
};

export default UploadCounters;
