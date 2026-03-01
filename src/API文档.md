# 财富管家应用API文档

## 1. 项目概述
财富管家应用是一个个人财富管理工具，提供财富记录、数据分析和可视化功能。后端使用FastAPI框架开发，提供RESTful API接口。

## 2. 基础信息

### 2.1 技术栈
- **框架**: FastAPI
- **语言**: Python 3.10+
- **数据库**: SQLite（默认）
- **认证**: JWT Token
- **API前缀**: `/api/v1`

### 2.2 接口地址
- 本地开发: `http://localhost:8000/api/v1`
- 文档地址: `http://localhost:8000/docs` (Swagger UI)

### 2.3 响应格式
所有API响应遵循统一格式：

```json
{
  "data": { /* 响应数据 */ },
  "message": "成功/错误信息",
  "code": 200
}
```

## 3. 认证接口

### 3.1 注册用户

**接口地址**: `POST /api/v1/auth/register`

**功能描述**: 新用户注册

**请求参数**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**响应示例**:
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 3.2 用户登录

**接口地址**: `POST /api/v1/auth/login`

**功能描述**: 用户登录，获取访问令牌

**请求参数**:
```json
{
  "username": "string",
  "password": "string"
}
```

**响应示例**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### 3.3 获取当前用户信息

**接口地址**: `GET /api/v1/auth/me`

**功能描述**: 获取当前登录用户的信息

**请求头**:
- `Authorization`: `Bearer {token}`

**响应示例**:
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

## 4. 记录管理接口

### 4.1 获取记录列表

**接口地址**: `GET /api/v1/records`

**功能描述**: 获取用户的所有财务记录

**请求头**:
- `Authorization`: `Bearer {token}`

**查询参数**:
- `record_type`: 记录类型（income/expense/asset，可选）
- `category`: 分类（可选）
- `start_date`: 开始日期（格式：YYYY-MM-DD，可选）
- `end_date`: 结束日期（格式：YYYY-MM-DD，可选）

**响应示例**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "record_type": "income",
    "amount": 5000.0,
    "category": "工资",
    "record_date": "2026-03-01",
    "description": "3月份工资",
    "created_at": "2026-03-01T10:30:00Z",
    "updated_at": "2026-03-01T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "record_type": "expense",
    "amount": 200.0,
    "category": "餐饮",
    "record_date": "2026-03-01",
    "description": "午餐",
    "created_at": "2026-03-01T10:35:00Z",
    "updated_at": "2026-03-01T10:35:00Z"
  }
]
```

### 4.2 获取单个记录

**接口地址**: `GET /api/v1/records/{record_id}`

**功能描述**: 获取单个财务记录的详细信息

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `record_id`: 记录ID

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "record_type": "income",
  "amount": 5000.0,
  "category": "工资",
  "record_date": "2026-03-01",
  "description": "3月份工资",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 4.3 创建记录

**接口地址**: `POST /api/v1/records`

**功能描述**: 创建新的财务记录

**请求头**:
- `Authorization`: `Bearer {token}`

**请求参数**:
```json
{
  "record_type": "income",
  "amount": 5000.0,
  "category": "工资",
  "record_date": "2026-03-01",
  "description": "3月份工资"
}
```

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "record_type": "income",
  "amount": 5000.0,
  "category": "工资",
  "record_date": "2026-03-01",
  "description": "3月份工资",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 4.4 更新记录

**接口地址**: `PUT /api/v1/records/{record_id}`

**功能描述**: 更新财务记录

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `record_id`: 记录ID

**请求参数**:
```json
{
  "record_type": "income",
  "amount": 5500.0,
  "category": "工资",
  "record_date": "2026-03-01",
  "description": "3月份工资（调整）"
}
```

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "record_type": "income",
  "amount": 5500.0,
  "category": "工资",
  "record_date": "2026-03-01",
  "description": "3月份工资（调整）",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:40:00Z"
}
```

### 4.5 删除记录

**接口地址**: `DELETE /api/v1/records/{record_id}`

**功能描述**: 删除财务记录

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `record_id`: 记录ID

**响应**: 无内容（204 No Content）

## 5. 分类管理接口

### 5.1 获取分类列表

**接口地址**: `GET /api/v1/categories`

**功能描述**: 获取所有分类（包括默认分类和用户自定义分类）

**请求头**:
- `Authorization`: `Bearer {token}`

**查询参数**:
- `category_type`: 分类类型（income/expense/asset，可选）
- `include_default`: 是否包含默认分类（默认true）

**响应示例**:
```json
[
  {
    "id": 1,
    "user_id": null,
    "category_type": "income",
    "category_name": "工资",
    "category_icon": null,
    "is_default": true,
    "created_at": "2026-03-01T10:30:00Z",
    "updated_at": "2026-03-01T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "category_type": "expense",
    "category_name": "打车",
    "category_icon": null,
    "is_default": false,
    "created_at": "2026-03-01T10:30:00Z",
    "updated_at": "2026-03-01T10:30:00Z"
  }
]
```

### 5.2 获取单个分类

**接口地址**: `GET /api/v1/categories/{category_id}`

**功能描述**: 获取单个分类的详细信息

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `category_id`: 分类ID

**响应示例**:
```json
{
  "id": 1,
  "user_id": null,
  "category_type": "income",
  "category_name": "工资",
  "category_icon": null,
  "is_default": true,
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 5.3 创建分类

**接口地址**: `POST /api/v1/categories`

**功能描述**: 创建新的分类

**请求头**:
- `Authorization`: `Bearer {token}`

**请求参数**:
```json
{
  "category_type": "expense",
  "category_name": "打车",
  "category_icon": "🚗",
  "is_default": false
}
```

**响应示例**:
```json
{
  "id": 2,
  "user_id": 1,
  "category_type": "expense",
  "category_name": "打车",
  "category_icon": "🚗",
  "is_default": false,
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 5.4 更新分类

**接口地址**: `PUT /api/v1/categories/{category_id}`

**功能描述**: 更新分类信息

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `category_id`: 分类ID

**请求参数**:
```json
{
  "category_type": "expense",
  "category_name": "打车费",
  "category_icon": "🚖",
  "is_default": false
}
```

**响应示例**:
```json
{
  "id": 2,
  "user_id": 1,
  "category_type": "expense",
  "category_name": "打车费",
  "category_icon": "🚖",
  "is_default": false,
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:40:00Z"
}
```

### 5.5 删除分类

**接口地址**: `DELETE /api/v1/categories/{category_id}`

**功能描述**: 删除分类

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `category_id`: 分类ID

**响应**: 无内容（204 No Content）

## 6. 财务目标接口

### 6.1 获取财务目标列表

**接口地址**: `GET /api/v1/financial-goals`

**功能描述**: 获取所有财务目标

**请求头**:
- `Authorization`: `Bearer {token}`

**查询参数**:
- `status`: 状态（active/completed/cancelled，可选）
- `goal_type`: 目标类型（saving/investment/debt，可选）

**响应示例**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "goal_name": "购房首付",
    "target_amount": 300000.0,
    "current_amount": 150000.0,
    "start_date": "2026-01-01",
    "end_date": "2028-12-31",
    "goal_type": "saving",
    "status": "active",
    "created_at": "2026-03-01T10:30:00Z",
    "updated_at": "2026-03-01T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "goal_name": "还清信用卡",
    "target_amount": 5000.0,
    "current_amount": 3000.0,
    "start_date": "2026-02-01",
    "end_date": "2026-12-31",
    "goal_type": "debt",
    "status": "active",
    "created_at": "2026-03-01T10:30:00Z",
    "updated_at": "2026-03-01T10:30:00Z"
  }
]
```

### 6.2 获取单个财务目标

**接口地址**: `GET /api/v1/financial-goals/{goal_id}`

**功能描述**: 获取单个财务目标的详细信息

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `goal_id`: 目标ID

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "goal_name": "购房首付",
  "target_amount": 300000.0,
  "current_amount": 150000.0,
  "start_date": "2026-01-01",
  "end_date": "2028-12-31",
  "goal_type": "saving",
  "status": "active",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 6.3 创建财务目标

**接口地址**: `POST /api/v1/financial-goals`

**功能描述**: 创建新的财务目标

**请求头**:
- `Authorization`: `Bearer {token}`

**请求参数**:
```json
{
  "goal_name": "购房首付",
  "target_amount": 300000.0,
  "current_amount": 150000.0,
  "start_date": "2026-01-01",
  "end_date": "2028-12-31",
  "goal_type": "saving",
  "status": "active"
}
```

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "goal_name": "购房首付",
  "target_amount": 300000.0,
  "current_amount": 150000.0,
  "start_date": "2026-01-01",
  "end_date": "2028-12-31",
  "goal_type": "saving",
  "status": "active",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:30:00Z"
}
```

### 6.4 更新财务目标

**接口地址**: `PUT /api/v1/financial-goals/{goal_id}`

**功能描述**: 更新财务目标信息

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `goal_id`: 目标ID

**请求参数**:
```json
{
  "goal_name": "购房首付",
  "target_amount": 300000.0,
  "current_amount": 160000.0,
  "start_date": "2026-01-01",
  "end_date": "2028-12-31",
  "goal_type": "saving",
  "status": "active"
}
```

**响应示例**:
```json
{
  "id": 1,
  "user_id": 1,
  "goal_name": "购房首付",
  "target_amount": 300000.0,
  "current_amount": 160000.0,
  "start_date": "2026-01-01",
  "end_date": "2028-12-31",
  "goal_type": "saving",
  "status": "active",
  "created_at": "2026-03-01T10:30:00Z",
  "updated_at": "2026-03-01T10:40:00Z"
}
```

### 6.5 删除财务目标

**接口地址**: `DELETE /api/v1/financial-goals/{goal_id}`

**功能描述**: 删除财务目标

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `goal_id`: 目标ID

**响应**: 无内容（204 No Content）

## 7. 数据分析接口

### 7.1 获取财富摘要

**接口地址**: `GET /api/v1/statistics/summary`

**功能描述**: 获取财富摘要信息

**请求头**:
- `Authorization`: `Bearer {token}`

**响应示例**:
```json
{
  "total_assets": 200000.0,
  "total_income": 5000.0,
  "total_expenses": 2000.0,
  "net_worth": 203000.0
}
```

### 7.2 获取每日摘要

**接口地址**: `GET /api/v1/statistics/daily-summary`

**功能描述**: 获取每日收支摘要

**请求头**:
- `Authorization`: `Bearer {token}`

**查询参数**:
- `days`: 天数（默认30）

**响应示例**:
```json
[
  {
    "date": "2026-03-01",
    "income": 5000.0,
    "expenses": 200.0,
    "net": 4800.0
  },
  {
    "date": "2026-03-02",
    "income": 0.0,
    "expenses": 150.0,
    "net": -150.0
  }
]
```

### 7.3 获取分类摘要

**接口地址**: `GET /api/v1/statistics/category-summary/{record_type}`

**功能描述**: 获取指定类型记录的分类摘要

**请求头**:
- `Authorization`: `Bearer {token}`

**路径参数**:
- `record_type`: 记录类型（income/expense/asset）

**响应示例**:
```json
[
  {
    "category": "工资",
    "amount": 5000.0,
    "percentage": 80.0
  },
  {
    "category": "投资收益",
    "amount": 1250.0,
    "percentage": 20.0
  }
]
```

### 7.4 获取增长率

**接口地址**: `GET /api/v1/statistics/growth-rate`

**功能描述**: 获取财富增长率

**请求头**:
- `Authorization`: `Bearer {token}`

**查询参数**:
- `period`: 时间周期（day/week/month/year，默认month）

**响应示例**:
```json
{
  "period": "month",
  "start_date": "2026-02-01",
  "end_date": "2026-03-01",
  "initial_net_worth": 200000.0,
  "final_net_worth": 203000.0,
  "growth_rate": 1.5
}
```

## 8. 错误码说明

| 状态码 | 说明 | 可能原因 |
|--------|------|----------|
| 200 | 成功 | 请求成功 |
| 201 | 创建成功 | 资源创建成功 |
| 204 | 无内容 | 请求成功，但无返回内容 |
| 400 | 无效请求 | 参数错误或请求格式不正确 |
| 401 | 未认证 | 缺少或无效的token |
| 403 | 禁止访问 | 用户无权限访问该资源 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 服务器内部错误 |

## 9. 测试和运行

### 9.1 安装依赖

```bash
cd src/backend
pip install -r requirements.txt
```

### 9.2 启动服务器

```bash
uvicorn app.main:app --reload
```

### 9.3 访问文档

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 10. 项目结构

```
src/backend
├── app
│   ├── core          # 核心配置（JWT、安全等）
│   ├── database      # 数据库连接和配置
│   ├── models        # SQLAlchemy数据模型
│   ├── routers       # API路由
│   └── schemas       # Pydantic数据验证模型
└── requirements.txt  # 项目依赖
```
