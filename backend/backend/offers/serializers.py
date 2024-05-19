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
    category_data = OfferCategorySerializer()
    medias = OfferMediaSerializer(many=True)
    target_action = PrimaryKeyRelatedField(queryset=TargetAction.objects.all())
    target_action_data = TargetActionSerializer()
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

    def update(self, instance, validated_data):
        if 'image' in validated_data:
            old_image = instance.image
            old_image.delete()
        validated_data.pop('medias', None)
        return super().update(instance, validated_data)


"""

При обновлении с использованием вложенного сериализатора также будут созданы новые записи OfferMedia, если они включены в данные запроса. Это происходит потому, что при обновлении объекта Offer с помощью сериализатора, который включает в себя сериализатор для связанных объектов OfferMedia, Django REST Framework не будет определять, какие OfferMedia уже существуют и какие должны быть обновлены, а какие созданы.

Для обновления связанных объектов вложенных моделей вам следует использовать Nested Serializers и переопределить метод update() в соответствующем сериализаторе. В этом методе вы сможете определить логику обновления связанных объектов на основе данных запроса.

Вот пример, как это может выглядеть для вашего случая:

python
Copy code
class OfferSerializer(serializers.ModelSerializer):
    category = OfferCategorySerializer()
    medias = OfferMediaSerializer(many=True)
    target_action = TargetActionSerializer()

    class Meta:
        model = Offer
        fields = (
            "pk",
            "name",
            "category",
            "reward_from",
            "reward_to",
            "medias",
            "description",
            "rules",
            "target_action",
            "source_url"
        )
        read_only_fields = (
            "pk",
        )

    def update(self, instance, validated_data):
        # Обновляем основные поля Offer
        instance.name = validated_data.get('name', instance.name)
        # Далее обновляем связанные объекты OfferMedia
        medias_data = validated_data.pop('medias', None)
        if medias_data:
            # Удаляем существующие связанные объекты OfferMedia
            instance.medias.clear()
            # Создаем новые связанные объекты OfferMedia
            for media_data in medias_data:
                instance.medias.create(**media_data)
        return instance
"""
