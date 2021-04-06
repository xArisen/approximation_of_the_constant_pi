import numpy as np


def approximation_of_the_PI(runs):
    if(runs > 1_000_000):
        return 0

    times = 10
    pi = 0
    lim = pow(0.5, 2)
    for i in range(0, times):
        in_circle = 0

        for j in range(0, runs):
            xs = np.random.uniform(-0.5, 0.5, 1)[0]
            ys = np.random.uniform(-0.5, 0.5, 1)[0]
            f = pow(xs, 2) + pow(ys, 2)
            if f <= lim:
                in_circle += 1

        pi += (in_circle/runs)*4

    return pi/times
