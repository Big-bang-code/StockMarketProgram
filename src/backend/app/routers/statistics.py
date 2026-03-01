from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.record import Record
from app.core.security import get_current_user
from datetime import date, timedelta
from sqlalchemy import func
from pydantic import BaseModel

router = APIRouter(prefix="/statistics", tags=["statistics"])

class WealthSummary(BaseModel):
    total_assets: float
    total_income: float
    total_expenses: float
    net_worth: float

class DailySummary(BaseModel):
    date: date
    income: float
    expenses: float
    net: float

class CategorySummary(BaseModel):
    category: str
    amount: float
    percentage: float

@router.get("/summary", response_model=WealthSummary)
def get_wealth_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 计算总资产（所有asset类型的记录）
    total_assets = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "asset"
    ).scalar() or 0.0

    # 计算总收入
    total_income = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "income"
    ).scalar() or 0.0

    # 计算总支出
    total_expenses = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "expense"
    ).scalar() or 0.0

    # 计算净资产
    net_worth = total_assets + total_income - total_expenses

    return {
        "total_assets": total_assets,
        "total_income": total_income,
        "total_expenses": total_expenses,
        "net_worth": net_worth
    }

@router.get("/daily-summary", response_model=list[DailySummary])
def get_daily_summary(
    days: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    end_date = date.today()
    start_date = end_date - timedelta(days=days)

    # 按日期分组计算每日收支
    daily_data = db.query(
        Record.record_date,
        func.sum(func.case((Record.record_type == "income", Record.amount), else_=0)).label("income"),
        func.sum(func.case((Record.record_type == "expense", Record.amount), else_=0)).label("expenses")
    ).filter(
        Record.user_id == current_user.id,
        Record.record_date >= start_date,
        Record.record_date <= end_date
    ).group_by(Record.record_date).order_by(Record.record_date).all()

    # 构建响应数据
    result = []
    current_date = start_date

    while current_date <= end_date:
        found = False
        for record_date, income, expenses in daily_data:
            if record_date == current_date:
                result.append({
                    "date": current_date,
                    "income": income or 0.0,
                    "expenses": expenses or 0.0,
                    "net": (income or 0.0) - (expenses or 0.0)
                })
                found = True
                break

        if not found:
            result.append({
                "date": current_date,
                "income": 0.0,
                "expenses": 0.0,
                "net": 0.0
            })

        current_date += timedelta(days=1)

    return result

@router.get("/category-summary/{record_type}", response_model=list[CategorySummary])
def get_category_summary(
    record_type: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if record_type not in ["income", "expense", "asset"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid record type. Must be 'income', 'expense', or 'asset'"
        )

    # 计算各分类的总额
    category_data = db.query(
        Record.category,
        func.sum(Record.amount).label("total")
    ).filter(
        Record.user_id == current_user.id,
        Record.record_type == record_type
    ).group_by(Record.category).order_by(func.sum(Record.amount).desc()).all()

    # 计算总金额
    total_amount = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == record_type
    ).scalar() or 0.0

    # 计算各分类的百分比
    result = []
    for category, amount in category_data:
        percentage = (amount / total_amount) * 100 if total_amount > 0 else 0.0
        result.append({
            "category": category,
            "amount": amount,
            "percentage": round(percentage, 2)
        })

    return result

@router.get("/growth-rate")
def get_growth_rate(
    period: str = "month",  # day, week, month, year
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    end_date = date.today()

    if period == "day":
        start_date = end_date - timedelta(days=1)
    elif period == "week":
        start_date = end_date - timedelta(weeks=1)
    elif period == "month":
        start_date = end_date - timedelta(days=30)
    elif period == "year":
        start_date = end_date - timedelta(days=365)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid period. Must be 'day', 'week', 'month', or 'year'"
        )

    # 计算期初净资产
    initial_assets = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "asset",
        Record.record_date < start_date
    ).scalar() or 0.0

    initial_income = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "income",
        Record.record_date < start_date
    ).scalar() or 0.0

    initial_expenses = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "expense",
        Record.record_date < start_date
    ).scalar() or 0.0

    initial_net_worth = initial_assets + initial_income - initial_expenses

    # 计算期末净资产
    final_assets = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "asset",
        Record.record_date <= end_date
    ).scalar() or 0.0

    final_income = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "income",
        Record.record_date <= end_date
    ).scalar() or 0.0

    final_expenses = db.query(func.sum(Record.amount)).filter(
        Record.user_id == current_user.id,
        Record.record_type == "expense",
        Record.record_date <= end_date
    ).scalar() or 0.0

    final_net_worth = final_assets + final_income - final_expenses

    # 计算增长率
    if initial_net_worth == 0:
        growth_rate = 100.0 if final_net_worth > 0 else 0.0
    else:
        growth_rate = ((final_net_worth - initial_net_worth) / initial_net_worth) * 100

    return {
        "period": period,
        "start_date": start_date,
        "end_date": end_date,
        "initial_net_worth": initial_net_worth,
        "final_net_worth": final_net_worth,
        "growth_rate": round(growth_rate, 2)
    }
