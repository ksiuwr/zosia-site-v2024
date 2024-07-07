from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .models import QA


@template
class QuestionsAndAnswers(NamedTuple):
    questions_and_answers: List[Pick[QA, Literal['id', 'question', 'answer']]]
