import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import UploadCounters from './UploadCounters';

const UploadCountersFrame: React.FC = () => {
    const dragRef = useRef<HTMLDivElement>(null);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <Draggable
                nodeRef={dragRef}
                handle=".drag-handle"
                bounds="parent"
            >
                <div
                    ref={dragRef}
                    className="absolute top-10 left-10 z-50"
                    style={{ position: 'absolute' }}
                >
                    <Resizable
                        defaultSize={{ width: 600, height: 400 }}
                        minWidth={300}
                        minHeight={200}
                        maxWidth={window.innerWidth - 20}
                        maxHeight={window.innerHeight - 20}
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
                        <div className="bg-white text-center rounded-xl shadow-xl border border-gray-300 h-full w-full flex flex-col overflow-hidden">
                            <div className="drag-handle bg-gray-100 px-4 py-2 border-b rounded-t-xl text-sm font-medium text-gray-700 cursor-move">
                                Uploading Dashboard
                            </div>
                            <div className="flex-1 overflow-auto p-4 no-drag">
                                <UploadCounters />
                            </div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gray-400 pointer-events-none rounded-br-xl" />
                        </div>
                    </Resizable>
                </div>
            </Draggable>
        </div>
    );
};

export default UploadCountersFrame;
