import numpy as np
from decimal import Decimal


def approximation_of_the_PI(runs):
    if(runs > 1_000_000):
        return 0

    times = 10
    pi = 0
    lim = pow(0.5, 2)
    surface_area_of_lim_figure = 4
    for i in range(0, times):
        in_circle = 0

        for j in range(0, runs):
            xs = np.random.uniform(-0.5, 0.5, 1)[0]
            ys = np.random.uniform(-0.5, 0.5, 1)[0]
            f = pow(xs, 2) + pow(ys, 2)
            if f <= lim:
                in_circle += 1

        pi += (in_circle/runs)*surface_area_of_lim_figure

    return pi/times

def approximation_of_the_figure_field_created_by_chart(coordinates_of_points, runs):
    if(runs > 1_000_000):
        return 0

    sorted(coordinates_of_points, key=lambda l: l[0], reverse=False)

    ab = list()
    max_x = 0
    max_y = 0
    for i in range(0, len(coordinates_of_points)):
        if i < len(coordinates_of_points)-1:
            ab.append(
                lin_equ(coordinates_of_points[i], coordinates_of_points[i+1])
            )

        if max_x < coordinates_of_points[i][0]:
            max_x = coordinates_of_points[i][0]

        if max_y < coordinates_of_points[i][1]:
            max_y = coordinates_of_points[i][1]

    in_figure = 0
    for i in range(0, runs):
        xs = np.random.uniform(0, max_x, 1)[0]
        ys = np.random.uniform(0, max_y, 1)[0]
        iteration = check_point_range(xs, ys, coordinates_of_points)
        lim_y = calculate_lim_for_x(xs, ab[iteration])
        if ys <= lim_y:
            in_figure += 1

    surface_area_of_lim_figure = max_x*max_y
    surface_area_of_figure = (in_figure/runs)*surface_area_of_lim_figure

    return surface_area_of_figure


def lin_equ(point1, point2):
    a = (point2[1] - point1[1]) / (point2[0] - point1[0])
    b = (point2[1] - (a * point2[0]))

    return a, b


def check_point_range(x, y, coordinates_of_points):
    for i in range(0, len(coordinates_of_points)):
        if coordinates_of_points[i][0] <= x and coordinates_of_points[i+1][0] >= x:
            return i


def calculate_lim_for_x(x, ab):
    y = ab[0]*x + ab[1]
    return y
