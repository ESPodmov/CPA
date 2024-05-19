from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import DestroyAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView, \
    RetrieveUpdateDestroyAPIView, CreateAPIView, GenericAPIView
from .models import Partner, OfferType, TargetAction, OfferCategory, OfferMedia, Offer
from .serializers import PartnerSerializer, OfferTypeSerializer, TargetActionSerializer, OfferCategorySerializer, \
    OfferMediaSerializer, OfferSerializer
from authorization.permissions import IsAdmin
from rest_framework.response import Response
from stats.models import Click
from authorization.models import User
from django.shortcuts import redirect


class PartnerBaseView(GenericAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class PartnerEditView(DestroyAPIView, UpdateAPIView, PartnerBaseView):
    permission_classes = [IsAdmin]


class PartnerCreateView(CreateAPIView, PartnerBaseView):
    pagination_class = [IsAdmin]


class PartnerListView(ListAPIView, PartnerBaseView):
    permission_classes = [IsAdmin]


class PartnerView(RetrieveAPIView, PartnerBaseView):
    pass


class OfferTypeBaseView(GenericAPIView):
    queryset = OfferType.objects.all()
    serializer_class = OfferTypeSerializer
    permission_classes = [IsAdmin]


class OfferTypeListView(ListAPIView, OfferTypeBaseView):
    pass


class OfferTypeView(RetrieveAPIView, OfferTypeBaseView):
    pass


class OfferTypeEditView(UpdateAPIView, DestroyAPIView, OfferTypeBaseView):
    pass


class OfferTypeCreateView(CreateAPIView, OfferTypeBaseView):
    pass


class TargetActionBaseView(GenericAPIView):
    queryset = TargetAction.objects.all()
    serializer_class = TargetActionSerializer
    permission_classes = [IsAdmin]


class TargetActionListView(ListAPIView, TargetActionBaseView):
    pass


class TargetActionView(RetrieveAPIView, TargetActionBaseView):
    pass


class TargetActionEditView(UpdateAPIView, DestroyAPIView, TargetActionBaseView):
    pass


class TargetActionCreateView(CreateAPIView, TargetActionBaseView):
    pass


class OfferCategoryBaseView(GenericAPIView):
    queryset = OfferCategory.objects.all()
    serializer_class = OfferCategorySerializer
    permission_classes = [IsAdmin]


class OfferCategoryListView(ListAPIView, OfferCategoryBaseView):
    permission_classes = []


class OfferCategoryView(RetrieveAPIView, OfferCategoryBaseView):
    pass


class OfferCategoryEditView(UpdateAPIView, DestroyAPIView, OfferCategoryBaseView):
    pass


class OfferCategoryCreateView(CreateAPIView, OfferCategoryBaseView):
    pass


class OfferMediaBaseView(GenericAPIView):
    queryset = OfferMedia.objects.all()
    serializer_class = OfferMediaSerializer


class OfferMediaListView(ListAPIView, OfferMediaBaseView):

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(OfferMedia.objects.filter(offer__pk=request.query_params.get("offer")))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class OfferMediaEditView(UpdateAPIView, DestroyAPIView, OfferMediaBaseView):
    permission_classes = [IsAdmin]


class OfferMediaCreateView(CreateAPIView, OfferMediaBaseView):
    permission_classes = [IsAdmin]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        offer = Offer.objects.get(pk=request.query_params.get("offer"))
        media = OfferMedia.objects.create(**serializer.validated_data())
        offer.medias.add(media)
        offer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class OfferBaseView(GenericAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


class OfferListView(ListAPIView, OfferTypeBaseView):
    def list(self, request, *args, **kwargs):
        offers_category = request.GET.get("category", None)
        queryset = Offer.objects.filter(category__pk=offers_category) if offers_category else self.get_queryset()

        queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class OfferView(RetrieveAPIView, OfferTypeBaseView):
    pass


class OfferEditView(UpdateAPIView, DestroyAPIView, OfferTypeBaseView):
    permission_classes = [IsAdmin]


class OfferCreateView(CreateAPIView, OfferTypeBaseView):
    permission_classes = [IsAdmin]


@api_view(["GET"])
def redirect_view(request):
    partner = request.GET.get('partner', None)
    if partner:
        offer = Offer.objects.get(request.query_params.get('pk'))
        user = User.objects.get(pk=int(partner))
        if not offer or not user:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        user_ip = request.META.get('HTTP_X_FORWARDED_FOR')
        if user_ip:
            user_ip = user_ip.split(',')[0].strip()
        else:
            user_ip = request.META.get('REMOTE_ADDR')
        if not user_ip:
            user_ip = "0.0.0.0"

        click = Click.objects.create(offer=offer, source=user, ip_address=user_ip)
        return redirect(
            f"{offer.source_url}?utm_source=tronius&utm_medium={offer.type}?utm_campaign={user.pk}&utm_content={click.pk}")
