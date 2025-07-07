export type Item = {
    id: string;
    ner: { parentId: string };
    cla: { fileClassification: string };
    status: string[];
};