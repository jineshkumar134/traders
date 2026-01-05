
export enum AccountTier {
  MASTER = 'Master',
  STUDENT = 'Student',
  PRACTITIONER = 'Practitioner',
  PRACTICE = 'Practice'
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface Position {
  id: string;
  symbol: string;
  side: OrderSide;
  avgPrice: number;
  quantity: number;
  pnl: number;
  timestamp: number;
}

export interface Trade {
  id: string;
  symbol: string;
  side: OrderSide;
  price: number;
  quantity: number;
  timestamp: number;
  status: 'COMPLETED' | 'CANCELLED';
}

export interface AccountStats {
  balance: number;
  buyingPower: number;
  equity: number;
  dailyPnl: number;
  maxDrawdown: number;
  dailyLossLimit: number;
  isLocked: boolean;
  failReason?: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
}
