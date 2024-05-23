from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ImageField
from .models import Partner, OfferType, OfferCategory, OfferMedia, Offer, TargetAction


class PartnerSerializer(ModelSerializer):
    class Meta:
        model = Partner
        fields = (
            "pk",
            "name",
            "about",
        )

        read_only_fields = (
            "pk",
        )


class OfferTypeSerializer(ModelSerializer):
    class Meta:
        model = OfferType
        fields = (
            "pk",
            "name",
        )
        read_only_fields = (
            "pk",
        )


class OfferCategorySerializer(ModelSerializer):
    class Meta:
        model = OfferCategory
        fields = (
            "pk",
            "name",
        )

        read_only_fields = (
            "pk",
        )


class OfferMediaSerializer(ModelSerializer):
    class Meta:
        model = OfferMedia
        fields = (
            "pk",
            "src",
            "alt",
            "file_type"
        )
        read_only_fields = (
            "pk",
        )


class TargetActionSerializer(ModelSerializer):
    class Meta:
        model = TargetAction
        fields = (
            "pk",
            "name",
        )
        read_only_fields = (
            "pk",
        )


class OfferSerializer(ModelSerializer):
    category = PrimaryKeyRelatedField(queryset=OfferCategory.objects.all())
    category_data = OfferCategorySerializer(read_only=True)
    medias = OfferMediaSerializer(many=True)
    target_action = PrimaryKeyRelatedField(queryset=TargetAction.objects.all())
    target_action_data = TargetActionSerializer(read_only=True)
    type = PrimaryKeyRelatedField(queryset=OfferType.objects.all())
    image = ImageField(required=False, max_length=None, use_url=True)

    class Meta:
        model = Offer
        fields = (
            "pk",
            "image",
            "name",
            "type",
            "category",
            "category_data",
            "reward_from",
            "reward_to",
            "medias",
            "description",
            "rules",
            "target_action",
            "target_action_data",
            "source_url"
        )
        read_only_fields = (
            "pk",
            "category_data",
            "target_action_data",
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category_data'] = OfferCategorySerializer(instance.category).data
        representation['target_action_data'] = TargetActionSerializer(instance.target_action).data
        return representation

    def update(self, instance, validated_data):
        if 'image' in validated_data:
            old_image = instance.image
            old_image.delete()
        validated_data.pop('medias', None)
        return super().update(instance, validated_data)
