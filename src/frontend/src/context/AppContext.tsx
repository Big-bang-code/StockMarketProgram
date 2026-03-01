import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, Record, Statistics } from '../types';

// 初始状态
const initialState: AppState = {
  records: [],
  categories: [
    { id: 1, categoryType: 'income', categoryName: '工资', categoryIcon: '💰', isDefault: true },
    { id: 2, categoryType: 'income', categoryName: '投资收益', categoryIcon: '📈', isDefault: true },
    { id: 3, categoryType: 'income', categoryName: '兼职', categoryIcon: '💼', isDefault: true },
    { id: 4, categoryType: 'income', categoryName: '奖金', categoryIcon: '🎁', isDefault: true },
    { id: 5, categoryType: 'expense', categoryName: '餐饮', categoryIcon: '🍔', isDefault: true },
    { id: 6, categoryType: 'expense', categoryName: '交通', categoryIcon: '🚗', isDefault: true },
    { id: 7, categoryType: 'expense', categoryName: '购物', categoryIcon: '🛍️', isDefault: true },
    { id: 8, categoryType: 'expense', categoryName: '娱乐', categoryIcon: '🎮', isDefault: true },
    { id: 9, categoryType: 'expense', categoryName: '医疗', categoryIcon: '🏥', isDefault: true },
    { id: 10, categoryType: 'asset', categoryName: '现金', categoryIcon: '💵', isDefault: true },
    { id: 11, categoryType: 'asset', categoryName: '银行存款', categoryIcon: '🏦', isDefault: true },
    { id: 12, categoryType: 'asset', categoryName: '股票', categoryIcon: '📊', isDefault: true },
    { id: 13, categoryType: 'asset', categoryName: '基金', categoryIcon: '📈', isDefault: true },
    { id: 14, categoryType: 'asset', categoryName: '房产', categoryIcon: '🏠', isDefault: true },
  ],
  goals: [],
  statistics: {
    totalWealth: 125680.50,
    todayIncome: 1200.00,
    todayExpense: 850.00,
    monthGrowth: 12.5,
    totalIncome: 12500.00,
    totalExpense: 8200.00,
    surplus: 4300.00,
    averageDailyExpense: 273.33,
  },
  isLoading: false,
  error: null,
};

//  reducer 函数
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    case 'SET_STATISTICS':
      return { ...state, statistics: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_RECORD':
      return { ...state, records: [...state.records, action.payload] };
    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map(record =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter(record => record.id !== action.payload),
      };
    default:
      return state;
  }
};

// 上下文类型
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addRecord: (record: Omit<Record, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecord: (record: Record) => void;
  deleteRecord: (id: number) => void;
  getRecordsByType: (type: string) => Record[];
  getRecordsByDateRange: (startDate: string, endDate: string) => Record[];
  getCategoryName: (categoryType: string, categoryName: string) => string;
}

// 创建上下文
const AppContext = createContext<AppContextType | undefined>(undefined);

// 上下文提供器
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 模拟数据获取
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // 这里应该是 API 调用
      // 暂时使用模拟数据
      const mockRecords: Record[] = [
        {
          id: 1,
          recordType: 'income',
          amount: 8000,
          category: '工资',
          recordDate: '2026-03-01',
          description: '本月工资',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          recordType: 'expense',
          amount: 150,
          category: '餐饮',
          recordDate: '2026-03-01',
          description: '午餐',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          recordType: 'income',
          amount: 300,
          category: '投资收益',
          recordDate: '2026-02-29',
          description: '股票分红',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 4,
          recordType: 'expense',
          amount: 80,
          category: '交通',
          recordDate: '2026-02-28',
          description: '地铁费',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      dispatch({ type: 'SET_RECORDS', payload: mockRecords });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '获取数据失败' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 添加记录
  const addRecord = (record: Omit<Record, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecord: Record = {
      ...record,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_RECORD', payload: newRecord });
  };

  // 更新记录
  const updateRecord = (record: Record) => {
    dispatch({ type: 'UPDATE_RECORD', payload: record });
  };

  // 删除记录
  const deleteRecord = (id: number) => {
    dispatch({ type: 'DELETE_RECORD', payload: id });
  };

  // 根据类型获取记录
  const getRecordsByType = (type: string) => {
    return state.records.filter(record => record.recordType === type);
  };

  // 根据日期范围获取记录
  const getRecordsByDateRange = (startDate: string, endDate: string) => {
    return state.records.filter(
      record =>
        new Date(record.recordDate) >= new Date(startDate) &&
        new Date(record.recordDate) <= new Date(endDate)
    );
  };

  // 获取分类名称
  const getCategoryName = (categoryType: string, categoryName: string) => {
    const category = state.categories.find(
      cat => cat.categoryType === categoryType && cat.categoryName === categoryName
    );
    return category?.categoryName || categoryName;
  };

  // 上下文值
  const contextValue: AppContextType = {
    state,
    dispatch,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordsByType,
    getRecordsByDateRange,
    getCategoryName,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// 自定义 Hook 用于访问上下文
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
