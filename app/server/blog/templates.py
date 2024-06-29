from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .models import BlogPost


@template
class Blog(NamedTuple):
    posts: List[Pick[BlogPost, Literal['id', 'title', 'content', 'publication', 'author.first_name', 'author.last_name']]]
