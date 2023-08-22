import * as fs from 'fs';

export default async function getPostText(): Promise<string> {
  const today = new Date();
  const monthDayString = today.toISOString().substring(5); // Format: MM-DD

  const filePath = 'calendar.txt';

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    
    for (const line of lines) {
      const lineDate = line.substring(0, 5); // Extract MM-DD from the line
      if (lineDate === monthDayString) {
        return line.substring(11); // Extract the text after the date
      }
    }
    
    return "No post found for today's date.";
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
}

// Example usage
getPostText()
  .then(text => console.log(text))
  .catch(error => console.error(error));
