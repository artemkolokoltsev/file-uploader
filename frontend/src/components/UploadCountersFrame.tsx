import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import UploadCounters from './UploadCounters';
import type { Item } from './types';
import FileTable from './FileTable';

const UploadCountersFrame: React.FC = () => {
    const dragRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [height, setHeight] = useState<number>(500);

    const MIN_HEIGHT = 100;

    return (
        <div className="absolute inset-0 overflow-hidden">
            <Draggable nodeRef={dragRef} handle=".drag-handle" bounds="parent">
                <div ref={dragRef} className="absolute top-10 left-10 z-50">
                    <Resizable
                        defaultSize={{ width: 800, height }}
                        minWidth={200}
                        minHeight={MIN_HEIGHT}
                        maxWidth={window.innerWidth - 20}
                        maxHeight={window.innerHeight - 20}
                        onResizeStop={(e, direction, ref) => {
                            setHeight(ref.offsetHeight);
                        }}
                        enable={{ bottomRight: true }}
                        handleStyles={{
                            bottomRight: {
                                position: 'absolute',
                                width: '16px',
                                height: '16px',
                                right: '0',
                                bottom: '0',
                                cursor: 'nwse-resize',
                            },
                        }}
                    >
                        <div className="bg-white text-left rounded-xl shadow-xl h-full w-full flex flex-col overflow-hidden">
                            <div className="drag-handle bg-blue-500 p-4 py-2 rounded-t-xl text-sm font-medium text-white cursor-move">
                                Files Upload Dashboard
                            </div>
                            <div className="flex-1 overflow-auto p-4 space-y-4">
                                <UploadCounters
                                    onCategorySelect={setSelectedCategory}
                                    setItems={setItems}
                                />
                                {selectedCategory && height > MIN_HEIGHT && (
                                    <FileTable items={items} category={selectedCategory} />
                                )}
                            </div>
                        </div>
                    </Resizable>
                </div>
            </Draggable>
        </div>
    );
};

export default UploadCountersFrame;