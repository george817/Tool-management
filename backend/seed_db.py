"""
Database seeding script for local demo users.

PostgreSQL is used through DATABASE_URL. SQLite remains available through the
same db.py configuration if DATABASE_URL is changed during development.
"""

from app.database.db import Base, SessionLocal, engine
from app.models.tool import Tool  # noqa: F401 - imported so metadata includes tools
from app.models.user import RoleEnum, User
from app.utils.security import get_password_hash


DEMO_USERS = [
    {
        "name": "Ravi Kumar",
        "email": "operator@assetops.com",
        "password": "password123",
        "role": RoleEnum.OPERATOR,
        "department": "Tool Room",
    },
    {
        "name": "Priya Sharma",
        "email": "manager@assetops.com",
        "password": "password123",
        "role": RoleEnum.MANAGER,
        "department": "Operations",
    },
    {
        "name": "Arjun Mehta",
        "email": "director@assetops.com",
        "password": "password123",
        "role": RoleEnum.DIRECTOR,
        "department": "Leadership",
    },
    {
        "name": "System Administrator",
        "email": "admin@assetops.com",
        "password": "password123",
        "role": RoleEnum.ADMIN,
        "department": "IT",
    },
]


def seed_demo_users():
    """Create or update the four local demo users."""
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    created = 0
    updated = 0

    try:
        for user_data in DEMO_USERS:
            user = db.query(User).filter(User.email == user_data["email"]).first()
            if user:
                user.name = user_data["name"]
                user.password_hash = get_password_hash(user_data["password"])
                user.role = user_data["role"]
                user.department = user_data["department"]
                user.is_active = True
                updated += 1
            else:
                db.add(
                    User(
                        name=user_data["name"],
                        email=user_data["email"],
                        password_hash=get_password_hash(user_data["password"]),
                        role=user_data["role"],
                        department=user_data["department"],
                        is_active=True,
                    )
                )
                created += 1

        db.commit()
        print(f"Demo users ready. Created: {created}. Updated: {updated}.")
        print()
        for user_data in DEMO_USERS:
            print(f"{user_data['role'].value}: {user_data['email']} / {user_data['password']}")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_demo_users()
