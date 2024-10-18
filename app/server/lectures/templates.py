from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .forms import LectureAdminForm, LectureForm, ScheduleForm
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


@template
class AdminLecturesList(NamedTuple):
    lectures: List[
        Pick[
            Lecture,
            Literal[
                'id',
                'title',
                'abstract',
                'description',
                'lecture_type',
                'duration',
                'accepted',
                'supporters_names',
                'requests',
                'events',
                'author.first_name',
                'author.last_name',
                'author.person_type',
            ],
        ]
    ]


@template
class AdminLecturesUpdate(NamedTuple):
    form: LectureAdminForm
    editing_existing_lecture: bool = False


@template
class AdminScheduleUpdate(NamedTuple):
    form: ScheduleForm
