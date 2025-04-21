from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

urlpatterns = [
    path('books', views.BookListAPIView.as_view(), name='book-list'),
    path('books/<int:pk>', views.BookDetailAPIView.as_view(), name='book-detail'),
    path('books/<int:book_id>/reviews', views.ReviewListCreateAPIView.as_view(), name='book-reviews'),
    path('books/<int:book_id>/reviews/<int:pk>', views.ReviewRetrieveUpdateDestroyAPIView.as_view(), name='review-detail'),
]