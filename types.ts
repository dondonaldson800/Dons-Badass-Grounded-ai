
export enum AppMode {
  GENERAL = 'GENERAL',
  LEGAL = 'LEGAL',
  MEDICAL = 'MEDICAL',
  FINANCE = 'FINANCE',
  REAL_ESTATE = 'REAL_ESTATE',
  ACADEMIC = 'ACADEMIC',
  PATENT = 'PATENT',
  TAX = 'TAX',
  LOGISTICS = 'LOGISTICS',
  CRYPTO = 'CRYPTO',
  GRANT = 'GRANT',
  ADS = 'ADS',
  ECOM = 'ECOM',
  ESG = 'ESG',
  VENTURE = 'VENTURE',
  HR = 'HR',
  TECH = 'TECH',
  NEWS = 'NEWS',
  TRAVEL = 'TRAVEL',
  SALES = 'SALES'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  EMPIRE_PRO = 'EMPIRE_PRO'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  sources?: GroundingSource[];
  isThinking?: boolean;
}

export type FeatureType = 
  | 'chat' 
  | 'image_gen' 
  | 'image_edit' 
  | 'video_gen' 
  | 'voice_live' 
  | 'analysis' 
  | 'tts';

export interface AppTile {
  id: AppMode;
  name: string;
  size: 'large' | 'medium' | 'small';
  color: string;
  icon: string;
}
