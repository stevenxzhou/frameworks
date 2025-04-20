from flask import Blueprint

helloworld_bp = Blueprint('helloworld', __name__, url_prefix='/')

@helloworld_bp.route("/", methods=["GET"])
def helloworld():
    return 'Hello World!'