from flask import Flask,request
import jsons
from flask_cors import CORS
import QuantLib as ql

app = Flask(__name__)
CORS(app, support_credentials=True)
from yc.Handle import Handle
from yc.Point import Point
from yc.Curve import curve_repo

@app.route("/ycHandles")
def yc_handles():
    handles = [value.handle for key, value in curve_repo.items()]

    handles_dict = {
        "handles": handles
    }
    return jsons.dump(handles_dict)


@app.route("/yc")
def yc_points():
    name = request.args.get("ycName")
    return jsons.dump(curve_repo.get(name))


if __name__ == "__main__":
    app.run()
