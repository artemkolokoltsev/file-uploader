import React from 'react';
import type { Item } from './types';

type Props = {
    items: Item[];
    category: string;
};

const FileTable: React.FC<Props> = ({ items, category }) => {
    const filtered = {
        uploaded: items.filter(i => i.ner?.parentId === ''),
        valid: items.filter(i => i.cla?.fileClassification === 'valid'),
        proof: items.filter(i => i.cla?.fileClassification === 'valid' && i.status?.includes('YELLOW')),
        failed: items.filter(i => i.status?.includes('RED')),
    }[category] || [];

    return (
        <div className="bg-white text-black border rounded shadow overflow-auto max-h-64">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Classification</th>
                        <th className="text-left p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(file => (
                        <tr key={file.id} className="border-t hover:bg-gray-50">
                            <td className="p-2">{file.id}</td>
                            <td className="p-2">{file.cla?.fileClassification}</td>
                            <td className="p-2">{file.status?.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
