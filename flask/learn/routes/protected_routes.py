from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

protected_bp = Blueprint('protected', __name__, url_prefix='/api')

# Login route to issue tokens
@protected_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    # Basic check; replace with database verification in a real app
    if username == 'test' and password == 'password':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    return jsonify({'msg': 'Bad credentials'}), 401

@protected_bp.route('/protected', methods=['GET'])
@jwt_required()  # Ensures this route requires a valid JWT
def protected():
    return jsonify({'msg': 'This is a protected route'})