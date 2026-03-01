import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { RecordType } from '../types';

const AddRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord, state } = useAppContext();
  const [formData, setFormData] = useState({
    recordType: 'income' as RecordType,
    amount: 0,
    category: '',
    recordDate: new Date().toISOString().split('T')[0],
    description: '',
  });

  // 获取分类选项
  const categories = state.categories.filter(
    category => category.categoryType === formData.recordType
  );

  // 处理表单变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecord(formData);
    navigate('/records');
  };

  // 获取类型标签
  const getTypeLabel = (recordType: RecordType) => {
    const labels = {
      income: '收入',
      expense: '支出',
      asset: '资产',
    };
    return labels[recordType];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">添加记录</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 记录类型 */}
          <div>
            <label className="label">记录类型</label>
            <div className="flex space-x-4">
              {(['income', 'expense', 'asset'] as RecordType[]).map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="recordType"
                    value={type}
                    checked={formData.recordType === type}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {getTypeLabel(type)}
                </label>
              ))}
            </div>
          </div>

          {/* 日期 */}
          <div>
            <label className="label" htmlFor="recordDate">日期</label>
            <input
              type="date"
              id="recordDate"
              name="recordDate"
              value={formData.recordDate}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* 金额 */}
          <div>
            <label className="label" htmlFor="amount">金额</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="input pl-8"
                required
              />
            </div>
          </div>

          {/* 分类 */}
          <div>
            <label className="label" htmlFor="category">分类</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">请选择分类</option>
              {categories.map(category => (
                <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* 描述 */}
          <div>
            <label className="label" htmlFor="description">描述（可选）</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="添加描述信息..."
              className="input"
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordPage;
