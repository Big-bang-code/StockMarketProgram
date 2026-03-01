from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import (
    auth_router,
    records_router,
    categories_router,
    financial_goals_router,
    statistics_router
)

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 初始化FastAPI应用
app = FastAPI(
    title="Wealth Manager API",
    description="API for wealth management application",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含路由
app.include_router(auth_router, prefix="/api/v1")
app.include_router(records_router, prefix="/api/v1")
app.include_router(categories_router, prefix="/api/v1")
app.include_router(financial_goals_router, prefix="/api/v1")
app.include_router(statistics_router, prefix="/api/v1")

# 根路径
@app.get("/")
def root():
    return {
        "message": "Welcome to Wealth Manager API",
        "version": "1.0.0",
        "docs": "/docs"
    }
