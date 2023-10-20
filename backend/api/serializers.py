from rest_framework import serializers
from api.models import Category, Country, Actor, User, UserProfile, Film, FilmEpisode, RateFilm, RateFilmEpisode, Comment, CommentFilm, CommentFilmEpisode, History, Tracking, PlayList, PlayListEpisode, gender_type, age_restrictions
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Category
        fields = ['id', 'name', 'description', 'slug']
    

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'country_name', 'country_flag']
    
class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['id', 'name', 'description', 'slug', 'gender', 'country', 'avatar']




class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], None ,make_password(validated_data['password']))
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style= { 'input_type': 'password'})

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [ 'id', 'user', 'birth', 'gender', 'avatar', 'favourite_category', 'favourite_actor']

class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id','name', 'slug', 'description', 'actors', 'category', 'avatar', 'age_restriction', 'release_date']


class FilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmEpisode
        fields = ['id','film', 'slug', 'episode', 'avatar', 'release_date', 'link', 'description']

class RateFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateFilm
        fields = ['id','user', 'film', 'rate']

class RateFilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateFilmEpisode
        fields = ['id','user', 'film_episode', 'rate']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','user', 'parent_comment', 'content', 'time']

class CommentFilmSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CommentFilm
        fields = ['id','user', 'film']

class CommentFilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CommentFilmEpisode
        fields = ['id','user', 'film_episode']

class HistorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = History
        fields = ['id','user', 'film_episode', 'time']

class TrackingSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tracking
        fields = ['id','user', 'film_episode', 'time']

class PlayListSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PlayList
        fields = ['id','user', 'name', 'slug']

class PlayListEpisodeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PlayListEpisode
        fields = ['id','play_list', 'film_episode', 'index']