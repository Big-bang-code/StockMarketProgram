from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.financial_goal import FinancialGoal
from app.schemas.financial_goal import FinancialGoalCreate, FinancialGoalUpdate, FinancialGoalResponse
from app.core.security import get_current_user

router = APIRouter(prefix="/financial-goals", tags=["financial-goals"])

@router.get("/", response_model=list[FinancialGoalResponse])
def get_financial_goals(
    status: str | None = None,
    goal_type: str | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(FinancialGoal).filter(FinancialGoal.user_id == current_user.id)

    if status:
        query = query.filter(FinancialGoal.status == status)

    if goal_type:
        query = query.filter(FinancialGoal.goal_type == goal_type)

    return query.order_by(FinancialGoal.end_date).all()

@router.get("/{goal_id}", response_model=FinancialGoalResponse)
def get_financial_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id, FinancialGoal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Financial goal not found"
        )
    return goal

@router.post("/", response_model=FinancialGoalResponse, status_code=status.HTTP_201_CREATED)
def create_financial_goal(
    goal_data: FinancialGoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = FinancialGoal(**goal_data.dict(), user_id=current_user.id)
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.put("/{goal_id}", response_model=FinancialGoalResponse)
def update_financial_goal(
    goal_id: int,
    goal_data: FinancialGoalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id, FinancialGoal.user_id == current_user.id).first()
    if not db_goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Financial goal not found"
        )

    for key, value in goal_data.dict(exclude_unset=True).items():
        setattr(db_goal, key, value)

    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.delete("/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_financial_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id, FinancialGoal.user_id == current_user.id).first()
    if not db_goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Financial goal not found"
        )

    db.delete(db_goal)
    db.commit()
    return
