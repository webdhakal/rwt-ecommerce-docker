import { VariantCollection } from '@/Pages/Backend/Product/Edit';
import { MasonryImageType } from '@/types/MockData';

const imageExtensions = ['png', 'jpeg', 'jpg', 'gif'];

export const REGEX_PATTERN_ONLY_NUMBERS = `[0-9]`;

export const randomNumber = () => {
    return Math.floor(Math.random() * 1000);
};

export const randomImage = (id?: number, dimension?: string) => {
    return `https://picsum.photos/${dimension ?? '200/300'}?random=${id ?? randomNumber}`;
};

export const masnoryImages = (count = 100) => {
    const images: MasonryImageType[] = [];
    Array.from({ length: count }, (_, i) => {
        const width = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
        const height = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        const name = `Image-${i + 1}`;
        const alt = `Alt Image-${i + 1}`;
        const type = imageExtensions[Math.floor(Math.random() * imageExtensions.length + 1)];
        images.push({
            src: randomImage(undefined, `${width}/${height}`),
            width,
            height,
            name,
            alt,
            type,
        });
    });
    return images;
};

export function numberToWords(num: number): string {
    if (num === 0) return 'zero';
    if (num < 0) {
        return 'minus ' + numberToWords(-num);
    }
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tensWords = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    function threeDigitToWords(n: number): string {
        let str = '';
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        if (hundred > 0) {
            str += units[hundred] + ' Hundred';
            if (remainder > 0) {
                str += ' ';
            }
        }
        if (remainder < 10 && remainder > 0) {
            str += units[remainder];
        } else if (remainder >= 10 && remainder < 20) {
            str += teens[remainder - 10];
        } else if (remainder >= 20) {
            const ten = Math.floor(remainder / 10);
            const last = remainder % 10;
            str += tensWords[ten];
            if (last > 0) {
                str += '-' + units[last];
            }
        }
        return str.trim();
    }

    const billions = Math.floor(num / 1_000_000_000);
    const millions = Math.floor((num % 1_000_000_000) / 1_000_000);
    const thousands = Math.floor((num % 1_000_000) / 1_000);
    const remainder = num % 1_000;

    let words = '';

    if (billions > 0) {
        words += threeDigitToWords(billions) + ' Billion';
    }
    if (millions > 0) {
        if (words) words += ' ';
        words += threeDigitToWords(millions) + ' Million';
    }
    if (thousands > 0) {
        if (words) words += ' ';
        words += threeDigitToWords(thousands) + ' Thousand';
    }
    if (remainder > 0) {
        if (words) words += ' ';
        words += threeDigitToWords(remainder);
    }

    return words.trim();
}

function range(start: number, end: number) {
    // Returns an array of numbers from start to end (inclusive)
    // e.g., range(3, 7) => [3, 4, 5, 6, 7]
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
}

/**
 * getPaginationRange:
 * Generates an array of pages/ellipses to display.
 * - currentPage: the active page
 * - totalPageCount: total number of pages
 * - siblingCount: number of pages to show on either side of the current page
 *
 * Example output:
 *   [1, 2, 3, 4, 5, '...', 10]
 *   [1, '...', 4, 5, 6, 7, '...', 10]
 *   [1, 2, 3, 4, 5]  // if total pages < maximum slots
 */
export function getPaginationRange({
    currentPage,
    totalPageCount,
    siblingCount = 1,
}: {
    currentPage: number;
    totalPageCount: number;
    siblingCount: number;
}) {
    const totalPageNumbers = siblingCount * 2 + 5;
    // if the total page number is less than 7 then it will show all the pages (Default case when siblingCount = 1)
    if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
    }

    // Calculate left and right sibling boundaries
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    // Always include first and last pages
    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPageCount - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        // No left ellipsis, but right ellipsis
        const leftRange = range(1, rightSiblingIndex);
        return [...leftRange, '...', totalPageCount];
    } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        // Left ellipsis, but no right ellipsis
        const rightRange = range(leftSiblingIndex, totalPageCount);
        return [1, '...', ...rightRange];
    } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        // Both ellipses on sides
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [1, '...', ...middleRange, '...', totalPageCount];
    }
}

export type VariantCombination = {
    [attribute_name: string]: string | number;
};

export function cartesianProduct(attributes: VariantCollection): VariantCombination[] {
    return attributes.reduce<VariantCombination[]>((acc, attribute) => {
        const { attribute_name, attribute_value } = attribute;

        if (acc.length === 0) {
            return attribute_value.map((val) => ({ [attribute_name]: val }));
        }

        const newCombinations: VariantCombination[] = [];

        for (const combination of acc) {
            for (const val of attribute_value) {
                newCombinations.push({
                    ...combination,
                    [attribute_name]: val,
                });
            }
        }

        const enriched = newCombinations.map((item) => ({ ...item, price: 0, basePrice: 0, stock: 0 }));
        return enriched;
    }, []);
}

export function Truncate(fileName: string) {
    if (fileName.length > 30) {
        return fileName.slice(0, 20) + '.....';
    } else {
        return fileName;
    }
}
