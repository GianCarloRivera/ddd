from django.core.management.base import BaseCommand
from burgers.models import Burger

class Command(BaseCommand):
    help = 'Load initial burger data'

    def handle(self, *args, **kwargs):
        burgers = [
            {
                'name': 'Classic Burger',
                'description': 'Beef patty, lettuce, tomato, cheese',
                'price': 8.99,
                'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
            },
            {
                'name': 'Double Cheese',
                'description': 'Double patty, double cheese, bacon',
                'price': 11.99,
                'image': 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500'
            },
            {
                'name': 'Veggie Burger',
                'description': 'Plant-based patty, avocado, sprouts',
                'price': 9.99,
                'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500'
            }
        ]

        for burger_data in burgers:
            Burger.objects.get_or_create(**burger_data)

        self.stdout.write(self.style.SUCCESS('Successfully loaded burger data')) 