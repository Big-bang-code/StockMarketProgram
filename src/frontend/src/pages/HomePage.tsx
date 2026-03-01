import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import LineChart from '../components/LineChart';

const HomePage: React.FC = () => {
  const { state } = useAppContext();

  // 准备图表数据
  const chartData = {
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

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">数据概览</h1>
        <Link to="/records/add" className="btn btn-primary">
          快速记录
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总资产</p>
              <p className="text-2xl font-bold text-gray-900 text-money">
                ¥{state.statistics.totalWealth.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <span className="text-primary text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">本月增长</p>
              <p className="text-2xl font-bold text-success text-money">
                +{state.statistics.monthGrowth}%
              </p>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <span className="text-success text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">今日收入</p>
              <p className="text-2xl font-bold text-success text-money">
                ¥{state.statistics.todayIncome.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
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
              <p className="text-sm text-gray-600">今日支出</p>
              <p className="text-2xl font-bold text-danger text-money">
                ¥{state.statistics.todayExpense.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-danger/10 p-3 rounded-full">
              <span className="text-danger text-xl">💸</span>
            </div>
          </div>
        </div>
      </div>

      {/* 财富增长趋势图 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">财富增长趋势</h2>
        <LineChart data={chartData} />
      </div>

      {/* 快速操作区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/records/add" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">➕</div>
            <h3 className="font-semibold text-lg">添加记录</h3>
            <p className="text-gray-600 text-sm">快速记录收入、支出或资产变动</p>
          </div>
        </Link>

        <Link to="/records" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="font-semibold text-lg">查看记录</h3>
            <p className="text-gray-600 text-sm">查看和管理所有财务记录</p>
          </div>
        </Link>

        <Link to="/analysis" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-lg">数据分析</h3>
            <p className="text-gray-600 text-sm">查看详细的财务分析报告</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
