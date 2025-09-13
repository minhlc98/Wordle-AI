export interface WordleFeedback { 
  slot: number;
  guess: string;
  result: "absent" | "present" | "correct";
}