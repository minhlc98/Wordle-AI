### How it works
1. **Input validation:**  
  The function takes a `length` parameter (the target word length). If the value is invalid, it throws an error.

2. **Detecting present letters:**  
  - The function splits the English alphabet (`A-Z`) into groups of size `length`.
  - Each group is sent to the Wordle API using `checkWord`.
  - Based on the API feedback, it determines which letters are present in the word (not "absent").

3. **Finding correct letter positions:**  
  - For each detected letter, it creates a word by repeating that letter `length` times (e.g., "AAAAA").
  - It sends each word to the API to check which positions are "correct".
  - If the API returns "correct" for a position, the letter is placed at that index in the result.

4. **Return result:**  
  - The function joins the letters in their correct positions to form the final answer.

### Example usage

```ts
import { solve } from "./src/solve";

const result = await solve(5); // Find the correct 5-letter word
console.log(result); // Output the answer
```

### References
Wikipedia: https://en.wikipedia.org/wiki/Wordle
VnExpress: https://vnexpress.net/wordle-game-do-chu-thu-hut-2-trieu-nguoi-choi-moi-ngay-4416489.html
