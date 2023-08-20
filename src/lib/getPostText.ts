import * as fs from 'fs';
export default async function getPostText() {

  const calendarFilePath = 'calendar.txt';
  let lines: string[] = [];
  let currentIndex = 0;
  
  // Read the lines from the calendar.txt file
  try {
    const data = fs.readFileSync(calendarFilePath, 'utf-8');
    lines = data.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error('Error reading the calendar file:', error);
    process.exit(1);
  }
  
  // Function to post a line and schedule the next post
  function postLine() {
    if (currentIndex < lines.length) {
      console.log(lines[currentIndex]);
      currentIndex++;
      scheduleNextPost();
    } else {
      console.log('All lines have been posted.');
    }
  }
  
  // Function to schedule the next post
  function scheduleNextPost() {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    setTimeout(postLine, oneDayInMilliseconds);
  }
  
  // Start posting
  return "hello";
}
