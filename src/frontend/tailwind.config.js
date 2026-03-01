/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // 蓝色系主色调
        success: '#10b981', // 绿色（收入）
        danger: '#ef4444', // 红色（支出）
        warning: '#f59e0b', // 黄色（警告）
      },
    },
  },
  plugins: [],
}
