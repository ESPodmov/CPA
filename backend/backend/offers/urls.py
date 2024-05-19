from django.urls import path, include
from .views import PartnerEditView, PartnerCreateView, PartnerListView, PartnerView, OfferTypeListView, OfferTypeView, \
    OfferTypeEditView, OfferTypeCreateView, TargetActionListView, TargetActionView, TargetActionEditView, \
    TargetActionCreateView, OfferCategoryListView, OfferCategoryView, OfferCategoryEditView, OfferCategoryCreateView, \
    OfferMediaListView, OfferMediaEditView, OfferMediaCreateView, OfferListView, OfferView, OfferEditView, \
    OfferCreateView

partner_urls = [
    path('<int:pk>/edit/', PartnerEditView.as_view(), name='partner-edit'),
    path('all/', PartnerListView.as_view(), name='partner-all'),
    path('create/', PartnerCreateView.as_view(), name='partner-create'),
    path('<int:pk>/', PartnerView.as_view(), name='partner-get')
]

offer_type_urls = [
    path('<int:pk>/edit/', OfferTypeEditView.as_view(), name='offer-type-edit'),
    path('all/', OfferTypeListView.as_view(), name='offer-type-all'),
    path('create/', OfferTypeCreateView.as_view(), name='offer-type-create'),
    path('<int:pk>/', OfferTypeView.as_view(), name='offer-type-get')
]

target_action_urls = [
    path('<int:pk>/edit/', TargetActionEditView.as_view(), name='target-action-edit'),
    path('all/', TargetActionListView.as_view(), name='target-action-all'),
    path('create/', TargetActionCreateView.as_view(), name='target-action-create'),
    path('<int:pk>/', TargetActionView.as_view(), name='target-action-get')
]

offer_category_urls = [
    path('<int:pk>/edit/', OfferCategoryEditView.as_view(), name='offer-category-edit'),
    path('all/', OfferCategoryListView.as_view(), name='offer-category-all'),
    path('create/', OfferCategoryCreateView.as_view(), name='offer-category-create'),
    path('<int:pk>/', OfferCategoryView.as_view(), name='offer-category-get')
]

offer_media_urls = [
    path('<int:pk>/edit/', OfferMediaEditView.as_view(), name='offer-media-edit'),
    path('all/', OfferMediaListView.as_view(), name='offer-media-all'),
    path('create/', OfferMediaCreateView.as_view(), name='offer-media-create'),
]

offer_urls = [
    path('<int:pk>/edit/', OfferEditView.as_view(), name='offer-edit'),
    path('all/', OfferListView.as_view(), name='offer-all'),
    path('create/', OfferCreateView.as_view(), name='offer-create'),
    path('<int:pk>/', OfferView.as_view(), name='offer-get')
]

urlpatterns = [
    path('partners/', include(partner_urls)),
    path('types/', include(offer_type_urls)),
    path('target-actions/', include(target_action_urls)),
    path('categories/', include(offer_category_urls)),
    path('<int:offer>/media/', include(offer_media_urls)),
    path('', include(offer_urls))
]
