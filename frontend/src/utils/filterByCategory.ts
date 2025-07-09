import type { Item } from '../components/types';

// Filter component by category
//  uploaded => all files uploaded: Items where `ner.parentId == ""`. Card Background: Blue
//  valid => valid files uploaded: Items where `cla.fileClassification == "valid"`. Card Background: Green
//  proof => Valid files that need proof: Items where any `status` value equals "YELLOW". Card Background: Yellow
//  failed => Failed: Items where any `status` value equals "RED". Card Background: Red
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
