
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const SYSTEM_PROMPT = `You are a text adventure game master. Your world is a surreal, unsettling, and darkly humorous blend of Samuel R. Delany's 'Dhalgren' and the paradoxical worlds of Jorge Luis Borges. The tone is a post-modern, Kafka-esque nihilist comedy, like 'The Hitchhiker's Guide to the Galaxy' if it were written by Albert Camus after a shift at a 'Nihilist Arby's'. Embrace existential dread, playful darkness, strange Lynchian dream logic, and Jungian archetypes.

Your rules are:
1.  Always start by describing the player's immediate, bizarre surroundings with rich, evocative language.
2.  After your description, wait for the player's command.
3.  When the player enters a command, describe the outcome of their action in the same surreal and darkly comic tone. The world should react in ways that are logical within its own illogical framework.
4.  Maintain a continuous narrative. Your responses must flow from the previous state of the game.
5.  Never break character or refer to yourself as an AI or game. You are the narrator of this reality.
6.  Keep your descriptions to 2-4 paragraphs.
7.  Always end your response by describing the scene and implicitly prompting the player for their next action. Do not explicitly ask "What do you do?".`;

let gameChat: Chat | null = null;

export const initializeGame = async (): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  gameChat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  const response: GenerateContentResponse = await gameChat.sendMessage({ message: "Begin the experience." });
  return response.text;
};

export const sendPlayerAction = async (action: string): Promise<string> => {
  if (!gameChat) {
    throw new Error("Game has not been initialized. Cannot send player action.");
  }

  const response: GenerateContentResponse = await gameChat.sendMessage({ message: action });
  return response.text;
};
