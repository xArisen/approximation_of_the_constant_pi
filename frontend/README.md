# Monte Carlo PI aproximation

This is simple Frontend page for calculating PI aproximation error, using Monte Carlo method. App makes API call requesting calculations of PI, returning back calculated values. After recieving such data, the app calculates the error of aproximation and presents results on the diagram.

## Parameters

There are 3 parameters to choose:
- Minimum samples number
- Maximum samples number
- Difference between each sample size 

For example: Minimum = 100 000, maximum = 1 000 000, difference = 100 000. The first PI approximation will be calculated for 100 000 samples, second for 200 000, third for 300 000 etc. up to 1 000 000.

## Screenshot
![Screenshot](https://gitlab.com/JPawlow/monte_carlo/-/tree/master/public/Screenshot.jpg?raw=true)