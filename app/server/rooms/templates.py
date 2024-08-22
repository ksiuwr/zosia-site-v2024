from typing import List, Literal, NamedTuple
from reactivated import Pick, template

from .models import Room, RoomLock


@template
class Rooms(NamedTuple):
    rooms: List[
        Pick[
            Room,
            Literal[
                "id",
                "name",
                "description",
                "available_beds_single",
                "available_beds_double",
                "members.id",
                "members.first_name",
                "members.last_name",
                "lock.id",
                "lock.user.id",
                "lock.user.first_name",
                "lock.user.last_name",
                "lock.expiration_date",
            ],
        ]
    ]
    user_room_lock: Pick[RoomLock, Literal["id", "password"]]
