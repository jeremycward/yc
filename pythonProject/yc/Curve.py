import QuantLib as ql
from yc import Handle,Point



class YieldCurve:
    def __init__(self, handle, curvePoints):
        self.handle = handle
        self.curvePoints = curvePoints


def makeCurve(name, description):
    depo_maturities = [ql.Period(6, ql.Months), ql.Period(12, ql.Months)]
    depo_rates = [5.25, 5.5]

    # Bond rates
    bond_maturities = [ql.Period(6 * i, ql.Months) for i in range(3, 21)]
    bond_rates = [5.75, 6.0, 6.25, 6.5, 6.75, 6.80, 7.00, 7.1, 7.15,
                  7.2, 7.3, 7.35, 7.4, 7.5, 7.6, 7.6, 7.7, 7.8]

    handle = Handle.Handle(name, description)

    points = []
    xlist = depo_maturities + bond_maturities
    ylist = depo_rates + bond_rates

    for x, y in zip(xlist, ylist):
        points.append(Point.Point("{}".format(x), y))

    return YieldCurve(handle, points)


curve_repo = {
    "EUR-OUTRIGHT": makeCurve("EUR-OUTRIGHT", "Eur Vanilla Outright Curve"),
    "USD-OUTRIGHT": makeCurve("USD-OUTRIGHT", "Fed Vanilla Outright Curve")
}
