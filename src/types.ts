export type Language = 'en' | 'bn';

export interface ServiceItem {
  id: string;
  title: string;
  titleBn: string;
  shortDesc: string;
  shortDescBn: string;
  subItems: string[];
  subItemsBn: string[];
  iconName: string;
  badge?: string;
  badgeBn?: string;
  fullDetails: {
    category?: string;
    categoryBn?: string;
    overview: string;
    overviewBn: string;
    deliverables: string[];
    deliverablesBn: string[];
    idealFor: string;
    idealForBn: string;
    documents?: string[];
    documentsBn?: string[];
    steps?: string[];
    stepsBn?: string[];
    authority?: string;
    authorityBn?: string;
  };
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  iconName: string;
  highlight: string;
  highlightBn: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  iconName: string;
  tag: string;
  tagBn: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  categoryBn: string;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: string;
  categoryBn: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isSuggested?: boolean;
}
