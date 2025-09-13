import { chunk, padStart } from "lodash";
import { checkWord } from "./wordle.api";
import { WordleFeedback } from "./interfaces/wordle-feedback.interface";

const WORDS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z"
];

export const solve = async (length: number): Promise<string> => {
  // Filter letters that are exist in the word
  if (!length || length < 1) throw new Error("Length is invalid.");

  const chunks = chunk(WORDS, length);
  const resultCheck: WordleFeedback[][] = await Promise.all(chunks.map(async (chunk) => {
    const result = await checkWord(padStart(chunk.join(""), length, "A"));
    return result;
  }));

  const matchedLetters = new Set<string>();
  resultCheck.forEach((result: WordleFeedback[]) => {
    result.forEach((feedback) => {
      if (feedback.result !== "absent") {
        matchedLetters.add(feedback.guess);
      }
    });
  });

  // Use matched letters to check correct word
  const correctLetters: string[] = Array.from({ length }, () => '');
  const resultCheckCorrect: WordleFeedback[][] = await Promise.all(
    [...matchedLetters].map(letter => checkWord(letter.repeat(length)))
  );

  resultCheckCorrect.forEach((result: WordleFeedback[]) => {
    result.forEach((feedback) => {
      if (feedback.result === "correct") {
        correctLetters[feedback.slot] = feedback.guess;
      }
    });
  });

  return correctLetters.join("");
}

export const verify = async (word: string): Promise<WordleFeedback[]> => {
  if (word.length < 1) throw new Error("Word is required.");
  return checkWord(word);
}