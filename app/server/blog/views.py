from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import require_http_methods
from django.utils.translation import gettext_lazy as _

from .forms import BlogPostForm
from .models import BlogPost
from .templates import AdminBlogList, AdminBlogUpdate, Blog


@require_http_methods(['GET'])
def index(request):
    return Blog(posts=BlogPost.objects.select_related("author").all()).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def create(request):
    form = BlogPostForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('blog_list')

    return AdminBlogUpdate(form=form).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def list(request):
    return AdminBlogList(posts=BlogPost.objects.select_related('author').all()).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def edit(request, pk=None):
    if pk is not None:
        post = get_object_or_404(BlogPost, pk=pk)
        form = BlogPostForm(request.POST or None, instance=post)
    else:
        post = None
        form = BlogPostForm(request.POST or None)

    if form.is_valid():
        form.save()
        messages.success(request, _('Post updated'))
        return redirect('blog_list')

    return AdminBlogUpdate(form=form, editing_existing_post=post is not None).render(request)
