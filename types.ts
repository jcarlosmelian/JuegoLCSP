
export interface Choice {
  id: string;
  text: string;
  feedbackTitle: string;
  feedbackText: string; // Can include HTML for formatting
  isCorrect: boolean;
  points: number;
}

export interface DecisionPoint {
  id: string;
  question: string;
  imageUrl?: string;
  choices: Choice[];
  keyConcept: string; 
  referencePage?: string; // e.g. "p. 12" from the guide
}

export interface Scenario {
  id: string;
  title: string;
  introduction: string; 
  decisionPoints: DecisionPoint[];
  conclusion: string; 
}

export enum GameStage {
  Start = 'start',
  Playing = 'playing',
  Advisor = 'advisor',
  Feedback = 'feedback',
  ScenarioConclusion = 'scenario_conclusion',
  End = 'end'
}

export interface GameState {
  currentScenarioIndex: number;
  currentDecisionPointIndex: number;
  score: number;
  gameStage: GameStage;
  selectedChoice: Choice | null;
  advisorQuestion: string;
  advisorResponse: string;
  isLoadingAdvisor: boolean;
}

export interface GameLogEntry {
  scenarioTitle: string;
  decisionPointQuestion: string;
  chosenOptionText: string;
  isCorrect: boolean;
  pointsAwarded: number;
  feedback: string;
  timestamp: Date;
}
