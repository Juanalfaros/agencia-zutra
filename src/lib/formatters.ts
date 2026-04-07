/**
 * Format plain text with line breaks into HTML paragraphs
 * Converts double newlines into <p> tags and single newlines into <br>
 */
export function formatPlainText(text: string | undefined): string {
    if (!text) return '';

    // Split by double newlines to create paragraphs
    const paragraphs = text.split(/\n\s*\n/);

    return paragraphs
        .map((paragraph) => {
            // Trim and replace single newlines with <br>
            const formatted = paragraph
                .trim()
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
                .join('<br>');

            return formatted ? `<p>${formatted}</p>` : '';
        })
        .filter((p) => p.length > 0)
        .join('');
}

/**
 * Simple version that just preserves line breaks as <br> tags
 * Use this when you want to keep the text in a single container
 */
export function preserveLineBreaks(text: string | undefined): string {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}
