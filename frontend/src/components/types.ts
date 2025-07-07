export type Item = {
    id: string;
    rec: {
        fileName: string;
    };
    ner: {
        parentId: string;
    };
    cla: {
        fileClassification: string;
    };
    status: string[];
};