from pydantic import BaseModel
from datetime import date, datetime

class FinancialGoalBase(BaseModel):
    goal_name: str
    target_amount: float
    current_amount: float = 0.0
    start_date: date
    end_date: date
    goal_type: str | None = None  # saving, investment, debt
    status: str = "active"  # active, completed, cancelled

class FinancialGoalCreate(FinancialGoalBase):
    pass

class FinancialGoalUpdate(FinancialGoalBase):
    pass

class FinancialGoalResponse(FinancialGoalBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
