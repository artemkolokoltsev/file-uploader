import type { Item } from '../components/types';

export function filterItemsByCategory(items: Item[], category: string): Item[] {
    const allUploaded = items.filter(item => item.ner?.parentId === '');

    switch (category) {
        case 'uploaded':
            return allUploaded;

        case 'valid':
            return allUploaded.filter(item =>
                item.cla?.fileClassification === 'valid' &&
                !items.some(child =>
                    child.ner?.parentId === item.id &&
                    child.cla?.fileClassification !== 'valid'
                )
            );

        case 'proof':
            return allUploaded.filter(item =>
                item.status?.some(s => s === 'YELLOW' || s === 'GREEN')
            );

        case 'failed':
            return allUploaded.filter(item =>
                item.status?.includes('RED')
            );

        default:
            return [];
    }
}
