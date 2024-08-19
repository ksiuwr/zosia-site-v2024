from typing import List, Literal, NamedTuple
from reactivated import Pick, template

from .models import Room


@template
class Rooms(NamedTuple):
    rooms: List[
        Pick[
            Room,
            Literal[
                "name",
                "description",
                "available_beds_single",
                "available_beds_double",
                "members.first_name",
                "members.last_name",
                "lock.expiration_date",
            ],
        ]
    ]
