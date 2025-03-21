export const truncateText = (text: string, maxLength: number = 100): string => 
    maxLength === 0 ? text : text.length > maxLength ? text.substring(0, maxLength).trimEnd() + "..." : text;