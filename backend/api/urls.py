from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"fools", views.FooViewSet)

# api_urlpatterns = [
#     url('api/v1/', include(router.urls)),
# ]

urlpatterns = [
    path("", include(router.urls)),
]