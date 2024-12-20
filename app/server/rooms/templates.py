from typing import List, Literal, NamedTuple
from reactivated import Pick, template

from .forms import UploadFileForm
from .models import Room, RoomLock

ROOM_DATA = List[
    Pick[
        Room,
        Literal[
            "id",
            "name",
            "description",
            "available_beds_single",
            "available_beds_double",
            "beds_single",
            "beds_double",
            "hidden",
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


@template
class Rooms(NamedTuple):
    rooms: ROOM_DATA
    user_room_lock: Pick[RoomLock, Literal["id", "password"]]


@template
class AdminRoomsList(NamedTuple):
    rooms: ROOM_DATA


@template
class AdminRoomsImport(NamedTuple):
    form: UploadFileForm
