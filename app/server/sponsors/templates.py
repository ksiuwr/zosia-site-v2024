from typing import List, Literal, NamedTuple
from reactivated import template, Pick

from .forms import SponsorForm
from .models import Sponsor


@template
class AdminSponsorsList(NamedTuple):
    sponsors: List[Pick[Sponsor, Literal['id', 'name', 'is_active', 'sponsor_type']]]


@template
class AdminSponsorsUpdate(NamedTuple):
    form: SponsorForm
    editing_existing_sponsor: bool = False
