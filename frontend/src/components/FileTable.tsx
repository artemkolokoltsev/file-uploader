import React, { useState, useMemo } from 'react';
import type { Item } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { filterItemsByCategory } from '../utils/filterByCategory';

type Props = {
    items: Item[];
    category: string;
};

// Table component to display document details
const FileTable: React.FC<Props> = ({ items, category }) => {
    const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});

    // Toggle to display children noes for parent file 
    const toggleExpand = (id: string) => {
        setExpandedParents(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Memoize filtered items by selected category to avoid unnecessary recalculations
    // Recomputes only when `items` or `category` change
    const roots = useMemo(
        () => filterItemsByCategory(items, category),
        [items, category]
    );

    // Look up for the parent id, grouyp by parent id file
    const getChildren = (parentId: string) =>
        items.filter(i => i.ner?.parentId === parentId);

    return (
        <div className="bg-white text-black rounded shadow overflow-auto max-h-[400px] border">
            <table className="min-w-full text-sm table-fixed">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-2 w-1/4">ID</th>
                        <th className="text-left p-2 w-1/4">File Name</th>
                        <th className="text-left p-2 w-1/4">Classification</th>
                        <th className="text-left p-2 w-1/4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {roots.map(parent => {
                        const children = getChildren(parent.id);
                        const isExpanded = expandedParents[parent.id];

                        return (
                            <React.Fragment key={parent.id}>
                                <tr
                                    className="border-t bg-white font-semibold hover:bg-gray-50 cursor-pointer"
                                    onClick={() => toggleExpand(parent.id)}
                                >
                                    <td className="p-2 flex items-center gap-2">
                                        {children.length > 0 ? (
                                            isExpanded ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )
                                        ) : (
                                            <span className="w-4 h-4" />
                                        )}
                                        {parent.id}
                                    </td>
                                    <td className="p-2">{parent.rec?.fileName || '—'}</td>
                                    <td className="p-2">{parent.cla?.fileClassification || '—'}</td>
                                    <td className="p-2">{parent.status?.join(', ') || '—'}</td>
                                </tr>

                                {isExpanded &&
                                    children.map(child => (
                                        <tr key={child.id} className="border-t bg-gray-50">
                                            <td className="p-2 pl-10">↳ {child.id}</td>
                                            <td className="p-2">{child.rec?.fileName || '—'}</td>
                                            <td className="p-2">{child.cla?.fileClassification || '—'}</td>
                                            <td className="p-2">{child.status?.join(', ') || '—'}</td>
                                        </tr>
                                    ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
