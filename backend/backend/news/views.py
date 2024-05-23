from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, CreateAPIView
from .models import News
from .serializers import NewsShortSerializer, NewsSerializer, NewsListSerializer, NewsShortListSerializer
from authorization.permissions import IsAdminOrManager
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 4  # Установите размер страницы по вашему усмотрению
    page_size_query_param = 'page_size'  # Имя параметра, определяющего размер страницы
    max_page_size = 100


class NewsShortListView(ListAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsShortSerializer
    pagination_class = CustomPagination


class NewsShortView(RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsShortSerializer


class NewsView(RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAdminOrManager]


class NewsCreateView(CreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsListSerializer
    permission_classes = [IsAdminOrManager]


class NewsListView(ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsListSerializer
    permission_classes = [IsAdminOrManager]
