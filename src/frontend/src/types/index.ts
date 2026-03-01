// 记录类型
export type RecordType = 'income' | 'expense' | 'asset';

// 记录数据类型
export interface Record {
  id: number;
  recordType: RecordType;
  amount: number;
  category: string;
  recordDate: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// 分类类型
export interface Category {
  id: number;
  categoryType: RecordType;
  categoryName: string;
  categoryIcon?: string;
  isDefault: boolean;
}

// 财务目标类型
export interface FinancialGoal {
  id: number;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  goalType: 'saving' | 'investment' | 'debt';
  status: 'active' | 'completed' | 'cancelled';
}

// 统计数据类型
export interface Statistics {
  totalWealth: number;
  todayIncome: number;
  todayExpense: number;
  monthGrowth: number;
  totalIncome: number;
  totalExpense: number;
  surplus: number;
  averageDailyExpense: number;
}

// 图表数据类型
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string | string[];
    backgroundColor?: string | string[];
    fill?: boolean;
  }[];
}

// 应用状态类型
export interface AppState {
  records: Record[];
  categories: Category[];
  goals: FinancialGoal[];
  statistics: Statistics;
  isLoading: boolean;
  error: string | null;
}

// 动作类型
export type AppAction =
  | { type: 'SET_RECORDS'; payload: Record[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_GOALS'; payload: FinancialGoal[] }
  | { type: 'SET_STATISTICS'; payload: Statistics }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_RECORD'; payload: Record }
  | { type: 'UPDATE_RECORD'; payload: Record }
  | { type: 'DELETE_RECORD'; payload: number };
