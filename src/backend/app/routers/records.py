from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.record import Record
from app.schemas.record import RecordCreate, RecordUpdate, RecordResponse
from app.core.security import get_current_user
from datetime import date

router = APIRouter(prefix="/records", tags=["records"])

@router.get("/", response_model=list[RecordResponse])
def get_records(
    record_type: str | None = None,
    category: str | None = None,
    start_date: date | None = None,
    end_date: date | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Record).filter(Record.user_id == current_user.id)

    if record_type:
        query = query.filter(Record.record_type == record_type)

    if category:
        query = query.filter(Record.category == category)

    if start_date:
        query = query.filter(Record.record_date >= start_date)

    if end_date:
        query = query.filter(Record.record_date <= end_date)

    return query.order_by(Record.record_date.desc()).all()

@router.get("/{record_id}", response_model=RecordResponse)
def get_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    record = db.query(Record).filter(Record.id == record_id, Record.user_id == current_user.id).first()
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Record not found"
        )
    return record

@router.post("/", response_model=RecordResponse, status_code=status.HTTP_201_CREATED)
def create_record(
    record_data: RecordCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_record = Record(**record_data.dict(), user_id=current_user.id)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@router.put("/{record_id}", response_model=RecordResponse)
def update_record(
    record_id: int,
    record_data: RecordUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_record = db.query(Record).filter(Record.id == record_id, Record.user_id == current_user.id).first()
    if not db_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Record not found"
        )

    for key, value in record_data.dict(exclude_unset=True).items():
        setattr(db_record, key, value)

    db.commit()
    db.refresh(db_record)
    return db_record

@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_record = db.query(Record).filter(Record.id == record_id, Record.user_id == current_user.id).first()
    if not db_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Record not found"
        )

    db.delete(db_record)
    db.commit()
    return
