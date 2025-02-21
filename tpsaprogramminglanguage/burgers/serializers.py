from rest_framework import serializers
from .models import Burger, Order

class BurgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Burger
        fields = ['id', 'name', 'description', 'price', 'image']

class OrderSerializer(serializers.ModelSerializer):
    items = BurgerSerializer(many=True, read_only=True)
    items_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Order
        fields = ['id', 'items', 'items_ids', 'total', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']

    def create(self, validated_data):
        items_ids = validated_data.pop('items_ids', [])
        order = Order.objects.create(**validated_data)
        if items_ids:
            order.items.set(Burger.objects.filter(id__in=items_ids))
        return order 