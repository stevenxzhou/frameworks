# Run local
export FLASK_APP=main.py 
flask run

# Local use
http://127.0.0.1:5000/social/xiaohongshu?id=5dc61d350000000001000a93


# Deploy to Docker
docker build -t myflask .
docker save -o myflask.tar myflask:latest

docker login
docker tag myflask stevenxzhou/flask:latest
docker push stevenxzhou/flask:latest