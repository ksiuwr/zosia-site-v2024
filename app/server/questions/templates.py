from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .forms import QAForm
from .models import QA


@template
class QuestionsAndAnswers(NamedTuple):
    questions_and_answers: List[Pick[QA, Literal['id', 'question', 'answer']]]


@template
class AdminQuestionsList(NamedTuple):
    questions: List[Pick[QA, Literal['id', 'question', 'priority']]]


@template
class AdminQuestionsUpdate(NamedTuple):
    form: QAForm
    editing_existing_question: bool = False
