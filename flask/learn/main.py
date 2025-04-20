#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from routes.xiaohongshu_routes import xiaohongshu_bp
from routes.helloworld_routes import helloworld_bp
from routes.protected_routes import protected_bp

app = Flask(__name__)

# Secret key for signing the JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a strong key
jwt = JWTManager(app)

app.register_blueprint(xiaohongshu_bp)
app.register_blueprint(helloworld_bp)
app.register_blueprint(protected_bp)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)