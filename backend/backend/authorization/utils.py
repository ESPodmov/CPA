import enum
from .models import User, Admin, Manager
from typing import Union


class UserType(enum.Enum):
    user = "user"
    admin = "admin"
    manager = "manager"


def get_user_type(user: Union[User, Admin, Manager, None]) -> Union[UserType, None]:
    if isinstance(user, Admin):
        return UserType.admin
    elif isinstance(user, Manager):
        return UserType.manager
    elif isinstance(user, User):
        return UserType.user
    else:
        return None


def get_user(**kwargs) -> Union[Admin, Manager, User]:
    user = None

    for model in [User, Admin, Manager]:
        try:
            user = model.objects.get(**kwargs)
            break
        except model.DoesNotExist:
            continue
    return user


def get_user_type_short(username):
    return get_user_type(get_user(username=username))


def authenticate(username=None, phone=None, password=None) -> Union[None, Admin, User, Manager]:
    identify = {'username': username} if username else {'phone': phone} if phone else None
    if not identify:
        return None
    user = get_user(**identify)
    if user and user.check_password(password):
        return user
    return None
