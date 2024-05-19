from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, CreateAPIView
from .models import News
from .serializers import NewsShortSerializer, NewsSerializer, NewsListSerializer, NewsShortListSerializer
from authorization.permissions import IsAdminOrManager


class NewsShortListView(ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsShortListSerializer


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
