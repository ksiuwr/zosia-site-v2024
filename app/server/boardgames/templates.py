from typing import NamedTuple, List
from reactivated import Pick, template

from .models import Boardgame


class BoardgameVotes(NamedTuple):
    name: str
    votes: int


@template
class BoardgamesHome(NamedTuple):
    boardgames: List[Pick[Boardgame, "name", "accepted", "user.first_name", "user.last_name", "url"]]
    paid: bool
    votes: List[BoardgameVotes]
