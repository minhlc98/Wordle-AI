import axios from "axios";
import { WordleFeedback } from "./interfaces/wordle-feedback.interface";

const baseURL: string = process.env.WORDLE_API_URL || "";
const wordleApi = axios.create({
  baseURL: baseURL && baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL,
  timeout: 10000,
});

export const checkWord = async (word: string) => {
  const { data } = await wordleApi.get<WordleFeedback[]>(`/daily?guess=${word}&size=${word.length}`);
  return data;
};

export default wordleApi;