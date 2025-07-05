import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { UploadCloud, CheckCircle, XCircle, FileWarningIcon } from "lucide-react";

type Item = {
    id: string;
    ner: { parentId: string };
    cla: { fileClassification: string };
    status: string[];
};

// Counters grid
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
        <div className="p-4">
            <div
                className="grid gap-4"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
                }}
            >
                <StatCard title="Uploaded" count={allUploaded.length} icon={UploadCloud} backgroundColor="bg-blue-500" />
                <StatCard title="Valid" count={validFiles.length} icon={CheckCircle} backgroundColor="bg-green-400" />
                <StatCard title="Proof" count={validNeedProof.length} icon={FileWarningIcon} backgroundColor="bg-yellow-400" />
                <StatCard title="Failed" count={failed.length} icon={XCircle} backgroundColor="bg-red-400" />
            </div>
        </div>
    );
};

export default UploadCounters;
