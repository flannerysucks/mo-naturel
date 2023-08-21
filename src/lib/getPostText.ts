import { promises as fsPromises } from 'fs';

export default async function getPostText(): Promise<string> {
    try {
        const fileContent = await fsPromises.readFile('calendar.txt', 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');

        const currentDate = new Date();
        const currentDayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));

        const lineIndex = currentDayOfYear % lines.length;
        const postText = lines[lineIndex];

        return postText;
    } catch (error) {
        console.error('Error reading or processing file:', error);
        throw error;
    }
}

// Example usage
getPostText()
    .then(text => {
        console.log('Today\'s post text:', text);
    })
    .catch(error => {
        console.error('Error:', error);
    });
