import * as fs from 'fs';
export default async function getPostText(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const calendarFilePath = 'calendar.txt';
    let lines: string[] = [];
    let currentIndex = 0;

    // Read the lines from the calendar.txt file
    try {
      const data = fs.readFileSync(calendarFilePath, 'utf-8');
      lines = data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
      console.error('Error reading the calendar file:', error);
      reject(error); // Reject the promise with the error
      return;
    }

    // Function to post a line and schedule the next post
    function postLine() {
      if (currentIndex < lines.length) {
        console.log(lines[currentIndex]);
        currentIndex++;
        scheduleNextPost();
      } else {
        console.log('All lines have been posted.');
        resolve('All lines have been posted.'); // Resolve the promise
        // Terminate the Node.js process after all lines have been posted
      }
    }

    // Function to schedule the next post
    function scheduleNextPost() {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      setTimeout(postLine, oneDayInMilliseconds);
    }

    // Start posting
    postLine(); // Start the posting process;
  });
}
