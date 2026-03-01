import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const AnalysisPage: React.FC = () => {
  const { state } = useAppContext();
  const [timeRange, setTimeRange] = useState('month');

  // 准备图表数据
  const wealthGrowthData = {
    labels: ['2026-02-25', '2026-02-26', '2026-02-27', '2026-02-28', '2026-02-29', '2026-03-01'],
    datasets: [
      {
        label: '财富总额',
        data: [120000, 121500, 122000, 122500, 123000, 125680.50],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const incomeExpenseData = {
    labels: ['2026-02-25', '2026-02-26', '2026-02-27', '2026-02-28', '2026-02-29', '2026-03-01'],
    datasets: [
      {
        label: '收入',
        data: [2000, 0, 300, 0, 0, 8000],
        backgroundColor: '#10b981',
      },
      {
        label: '支出',
        data: [0, 100, 0, 80, 0, 150],
        backgroundColor: '#ef4444',
      },
    ],
  };

  const expenseCategoryData = {
    labels: ['餐饮', '交通', '购物', '娱乐', '医疗'],
    datasets: [
      {
        label: '支出分类',
        data: [500, 200, 300, 150, 100],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
      },
    ],
  };

  const assetDistributionData = {
    labels: ['现金', '银行存款', '股票', '基金', '房产'],
    datasets: [
      {
        label: '资产分布',
        data: [5000, 80000, 20000, 10000, 10680.50],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和时间范围选择 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
        <div>
          <label className="label mr-2">时间范围:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input w-32"
          >
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年</option>
          </select>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总收入</p>
              <p className="text-2xl font-bold text-success text-money">
                ¥{state.statistics.totalIncome.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <span className="text-success text-xl">💵</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总支出</p>
              <p className="text-2xl font-bold text-danger text-money">
                ¥{state.statistics.totalExpense.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-danger/10 p-3 rounded-full">
              <span className="text-danger text-xl">💸</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">盈余</p>
              <p className="text-2xl font-bold text-primary text-money">
                ¥{state.statistics.surplus.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <span className="text-primary text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均每日支出</p>
              <p className="text-2xl font-bold text-warning text-money">
                ¥{state.statistics.averageDailyExpense.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-warning/10 p-3 rounded-full">
              <span className="text-warning text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 财富增长趋势图 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">财富增长趋势</h2>
          <LineChart data={wealthGrowthData} />
        </div>

        {/* 收支对比图 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">收支对比</h2>
          <BarChart data={incomeExpenseData} />
        </div>

        {/* 支出分类图 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">支出分类</h2>
          <PieChart data={expenseCategoryData} />
        </div>

        {/* 资产分布图 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">资产分布</h2>
          <PieChart data={assetDistributionData} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
