from pydantic import BaseModel
from datetime import date, datetime

class RecordBase(BaseModel):
    record_type: str
    amount: float
    category: str
    record_date: date
    description: str | None = None

class RecordCreate(RecordBase):
    pass

class RecordUpdate(RecordBase):
    pass

class RecordResponse(RecordBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
