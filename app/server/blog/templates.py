from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .forms import BlogPostForm
from .models import BlogPost


@template
class Blog(NamedTuple):
    posts: List[Pick[BlogPost, Literal['id', 'title', 'content', 'publication', 'author.first_name', 'author.last_name']]]


@template
class AdminBlogList(NamedTuple):
    posts: List[Pick[BlogPost, Literal['id', 'title', 'publication', 'author.first_name', 'author.last_name']]]


@template
class AdminBlogUpdate(NamedTuple):
    form: BlogPostForm
    editing_existing_post: bool = False
