import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RecordManagementPage: React.FC = () => {
  const { state, deleteRecord } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 过滤记录
  const filteredRecords = state.records.filter(record => {
    const matchesSearch =
      !searchTerm ||
      record.description?.includes(searchTerm) ||
      record.category.includes(searchTerm) ||
      record.amount.toString().includes(searchTerm);

    const matchesType = filterType === 'all' || record.recordType === filterType;

    return matchesSearch && matchesType;
  });

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 格式化金额
  const formatAmount = (amount: number, recordType: string) => {
    const prefix = recordType === 'income' ? '+' : recordType === 'expense' ? '-' : '';
    const color = recordType === 'income' ? 'text-success' : recordType === 'expense' ? 'text-danger' : 'text-primary';
    return <span className={`text-money ${color}`}>{prefix}¥{amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>;
  };

  // 获取记录类型标签
  const getRecordTypeLabel = (recordType: string) => {
    const labels = {
      income: '收入',
      expense: '支出',
      asset: '资产',
    };
    return labels[recordType as keyof typeof labels] || recordType;
  };

  // 获取记录类型颜色
  const getRecordTypeColor = (recordType: string) => {
    const colors = {
      income: 'bg-success/10 text-success',
      expense: 'bg-danger/10 text-danger',
      asset: 'bg-primary/10 text-primary',
    };
    return colors[recordType as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">记录管理</h1>
        <Link to="/records/add" className="btn btn-primary">
          添加记录
        </Link>
      </div>

      {/* 搜索和筛选栏 */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input"
            >
              <option value="all">所有类型</option>
              <option value="income">收入</option>
              <option value="expense">支出</option>
              <option value="asset">资产</option>
            </select>
          </div>
        </div>
      </div>

      {/* 记录列表 */}
      <div className="card">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">暂无记录</p>
            <Link to="/records/add" className="btn btn-primary mt-4">
              添加第一条记录
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">日期</th>
                  <th className="text-left py-3 px-4 font-semibold">类型</th>
                  <th className="text-left py-3 px-4 font-semibold">分类</th>
                  <th className="text-left py-3 px-4 font-semibold">金额</th>
                  <th className="text-left py-3 px-4 font-semibold">描述</th>
                  <th className="text-center py-3 px-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{formatDate(record.recordDate)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                        {getRecordTypeLabel(record.recordType)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{record.category}</td>
                    <td className="py-3 px-4">{formatAmount(record.amount, record.recordType)}</td>
                    <td className="py-3 px-4">{record.description || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/records/edit/${record.id}`}
                          className="text-primary hover:text-primary/80"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="text-danger hover:text-danger/80"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordManagementPage;
