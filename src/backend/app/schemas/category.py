from pydantic import BaseModel
from datetime import datetime

class CategoryBase(BaseModel):
    category_type: str
    category_name: str
    category_icon: str | None = None
    is_default: bool = False

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    user_id: int | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
