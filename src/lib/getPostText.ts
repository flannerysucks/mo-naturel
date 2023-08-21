import * as fs from 'fs/promises';

export default async function getPostText(): Promise<string> {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    
    try {
        const fileContent = await fs.readFile('calendar.txt', 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');

        const lineIndex = currentDay - 1;
        if (lineIndex >= 0 && lineIndex < lines.length) {
            return lines[lineIndex];
        } else {
            return 'No content available for today.';
        }
    } catch (error) {
        return 'An error occurred while fetching the post content.';
    }
}
