import hashlib
import re

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import ugettext as _, ugettext_lazy as _

from conferences.models import Bus, Zosia
from utils.constants import MAX_BONUS_MINUTES, MIN_BONUS_MINUTES, PAYMENT_GROUPS, \
    SHIRT_SIZE_CHOICES, SHIRT_TYPES_CHOICES
from utils.time_manager import timedelta_since


def validate_hash(value):
    if value is None:
        return

    sha256_reg = r"[0-9a-f]{64}"
    m = re.match(sha256_reg, value)

    if not m:
        raise ValidationError(_('This is not a valid SHA256 hex string'))


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_staff=False, is_active=True, **extra_fields):
        'Creates a User with the given username, email and password'
        email = UserManager.normalize_email(email)
        user = self.model(email=email, is_active=is_active, is_staff=is_staff, **extra_fields)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(email, password, is_staff=True, is_superuser=True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    hash = models.CharField(_('hash'), max_length=64, default=None, blank=False, unique=True,
                            validators=[validate_hash])
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserManager()

    @property
    def short_hash(self):
        if self.hash is None:
            self.save()

        return self.hash[:8]

    @property
    def full_name(self):
        '''Returns the first_name plus the last_name, with a space in between.'''
        return f'{self.first_name} {self.last_name}'

    @property
    def reversed_name(self):
        '''Returns the last_name plus the first_name, with a space in between.'''
        return f'{self.last_name} {self.first_name}'

    def __str__(self):
        return self.full_name

    def save(self, *args, **kwargs):
        if self.hash is None:
            self.hash = hashlib.sha256(
                f"{self.email}{self.date_joined}".encode('utf-8')).hexdigest().lower()

        super().save(*args, **kwargs)


class Organization(models.Model):
    name = models.CharField(
        unique=True,
        max_length=300,
        blank=False,
        null=False
    )
    accepted = models.BooleanField(default=False)
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        owner = '' if self.accepted else f'({str(self.user)})'

        return f"{self.name} {owner}"


class UserPreferencesManager(models.Manager):
    def for_zosia(self, zosia, **override):
        defaults = {
            'zosia': zosia
        }
        defaults.update(**override)
        return self.filter(**defaults)


def validate_terms(value):
    if not value:
        raise ValidationError(_("Terms and conditions must be accepted"))


class UserPreferences(models.Model):
    class Meta:
        verbose_name_plural = 'Users preferences'

    objects = UserPreferencesManager()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    zosia = models.ForeignKey(Zosia, on_delete=models.CASCADE)

    organization = models.ForeignKey(
        Organization,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    # NOTE: Deleting bus will render some payment information inaccessible
    # (i.e. user chose transport -> user paid for it, transport is deleted, what now?)
    bus = models.ForeignKey(
        Bus,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="passengers"
    )

    # Day 1 (Coming)
    dinner_day_1 = models.BooleanField(default=False)
    accommodation_day_1 = models.BooleanField(default=False)

    # Day 2 (Regular day)
    breakfast_day_2 = models.BooleanField(default=False)
    dinner_day_2 = models.BooleanField(default=False)
    accommodation_day_2 = models.BooleanField(default=False)

    # Day 3 (Regular day)
    breakfast_day_3 = models.BooleanField(default=False)
    dinner_day_3 = models.BooleanField(default=False)
    accommodation_day_3 = models.BooleanField(default=False)

    # Day 4 (Return)
    breakfast_day_4 = models.BooleanField(default=False)

    # Misc
    # Mobile phone, Facebook, Google+, whatever - always handy when someone forgets to wake up.
    contact = models.TextField(help_text=_(
        "We need some contact to you in case you didn't show up - for example your phone number."
    ))
    information = models.TextField(
        default='',
        blank=True,
        help_text=_(
            "Here is where you can give us information about yourself that may be important during your trip."
        )
    )
    vegetarian = models.BooleanField(default=False)
    # Set by admin after checking payment
    payment_accepted = models.BooleanField(default=False)

    shirt_size = models.CharField(
        max_length=5,
        choices=SHIRT_SIZE_CHOICES,
        default=SHIRT_SIZE_CHOICES[0][0]
    )

    shirt_type = models.CharField(
        max_length=1,
        choices=SHIRT_TYPES_CHOICES,
        default=SHIRT_TYPES_CHOICES[0][0]
    )

    # Terms and conditions are accepted
    terms_accepted = models.BooleanField(validators=[validate_terms])

    # Assigned by admin for various reasons (early registration / payment, help, etc)
    # Should allow some users to book room earlier
    # Typically, almost everyone has some bonus, so we don't get trampled
    # by wave of users booking room at the same time
    bonus_minutes = models.IntegerField(
        default=MIN_BONUS_MINUTES,
        validators=[MinValueValidator(MIN_BONUS_MINUTES), MaxValueValidator(MAX_BONUS_MINUTES)]
    )

    def _pays_for(self, option_name):
        return getattr(self, option_name)

    def _price_for(self, chosen):
        if not chosen["accommodation"] and not chosen["dinner"] and not chosen["breakfast"]:
            return 0

        if chosen["dinner"] and chosen["breakfast"]:
            return self.zosia.price_whole_day

        if chosen["dinner"] and not chosen["breakfast"]:
            return self.zosia.price_accommodation_dinner

        if not chosen["dinner"] and chosen["breakfast"]:
            return self.zosia.price_accommodation_breakfast

        return self.zosia.price_accommodation

    @property
    def price(self):
        payment = self.zosia.price_base

        if self.bus is not None:
            payment += self.zosia.price_transport

        for accommodation, meals in PAYMENT_GROUPS.items():
            chosen = {
                # [:-6] removes day index, so we know which option has been chosen
                accommodation[:-6]: self._pays_for(accommodation),
                **{m[:-6]: self._pays_for(m) for m in meals}
            }
            payment += self._price_for(chosen)

        return payment

    def __str__(self):
        return str(self.user) + " preferences"

    def toggle_payment_accepted(self):
        self.payment_accepted = not self.payment_accepted

        return self.payment_accepted

    @property
    def room(self):
        return self.user.room_of_user.all().first()

    @property
    def roommate(self):
        if self.room.members_count <= 1:
            return None
        return self.room.members_to_string

    @property
    def transfer_title(self):
        return f"ZOSIA - {self.user.first_name} {self.user.last_name} - {self.user.short_hash}"

    @property
    def rooming_start_time(self):
        if not self.payment_accepted:
            return None

        return timedelta_since(self.zosia.rooming_start, minutes=-self.bonus_minutes)
