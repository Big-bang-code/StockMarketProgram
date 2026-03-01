import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const { state } = useAppContext();
  const [name, setName] = useState('用户');
  const [email, setEmail] = useState('user@example.com');
  const [currency, setCurrency] = useState('CNY');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">设置</h1>

        <div className="space-y-6">
          {/* 基本信息 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">基本信息</h2>
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="name">用户名</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="label" htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </section>

          {/* 显示设置 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">显示设置</h2>
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="currency">货币</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="input"
                >
                  <option value="CNY">人民币 (¥)</option>
                  <option value="USD">美元 ($)</option>
                  <option value="EUR">欧元 (€)</option>
                  <option value="GBP">英镑 (£)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="label" htmlFor="darkMode">深色模式</label>
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </section>

          {/* 通知设置 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">通知设置</h2>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="notifications">接收通知</label>
              <input
                type="checkbox"
                id="notifications"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </section>

          {/* 数据管理 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">数据管理</h2>
            <div className="space-y-4">
              <button className="btn btn-primary w-full">
                导出数据
              </button>

              <button className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 w-full">
                导入数据
              </button>

              <button className="btn btn-danger w-full">
                清空数据
              </button>
            </div>
          </section>

          {/* 关于应用 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">关于应用</h2>
            <div className="space-y-2">
              <p className="text-gray-600">应用名称: 财富管家</p>
              <p className="text-gray-600">版本: v1.0.0</p>
              <p className="text-gray-600">开发者: 前端开发工程师</p>
              <p className="text-gray-600">最后更新: 2026-03-01</p>
            </div>
          </section>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <button className="btn btn-primary">
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
