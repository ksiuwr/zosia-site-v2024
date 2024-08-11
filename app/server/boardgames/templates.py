from typing import Literal, NamedTuple, List
from reactivated import Pick, template

from .models import Boardgame


class BoardgameVotes(NamedTuple):
    name: str
    votes: int


@template
class BoardgamesHome(NamedTuple):
    boardgames: List[Pick[Boardgame, Literal["id", "name", "accepted", "user.first_name", "user.last_name", "url"]]]
    votes: List[BoardgameVotes]
    paid: bool


@template
class BoardgamesMyGames(NamedTuple):
    user_boardgames: List[Pick[Boardgame, Literal["id", "name", "accepted", "url"]]]
    votes: List[BoardgameVotes]
    can_add: bool
