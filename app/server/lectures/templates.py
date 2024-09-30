from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .forms import LectureForm
from .models import Lecture


class AuthorsNamesWithLectureId(NamedTuple):
    lecture_id: int
    authors_names: str


@template
class Lectures(NamedTuple):
    lectures: List[
        Pick[
            Lecture,
            Literal['id', 'title', 'abstract', 'description', 'author.first_name', 'author.last_name',]
        ]
    ]

    all_authors_names: List[AuthorsNamesWithLectureId]


@template
class AddLecture(NamedTuple):
    form: LectureForm
