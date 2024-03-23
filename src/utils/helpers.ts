import algebra from 'algebra.js';

const factorial = (n: number): number => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
};

const calculateErlangB = (N: number, A: number): number => {
    let numerator = Math.pow(A, N) / factorial(N);
    let denominator = 0;
    for (let i = 0; i <= N; i++) {
        denominator += Math.pow(A, i) / factorial(i);
    }
    return numerator / denominator;
};

const calculateErlangC = (N: number, A: number): number => {
    if (N === A) return 1;
    let numerator = ((Math.pow(A, N) / factorial(N)) * N) / (N - A);
    let denominator = 0;
    for (let i = 0; i < N; i++) {
        denominator += Math.pow(A, i) / factorial(i);
    }
    denominator += ((Math.pow(A, N) / factorial(N)) * N) / (N - A);
    return numerator / denominator;
};

const binomialCoefficient = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= (n - (k - i)) / i;
    }
    return result;
};

const calculateBinomial = (N: number, Au: number, K: number): number => {
    let sum = 0;
    // check first if N is greater than K
    if (N >= K) return 0;
    for (let i = N; i <= K - 1; i++) {
        sum +=
            binomialCoefficient(K - 1, i) *
            Math.pow(Au, i) *
            Math.pow(1 - Au, K - 1 - i);
    }
    return sum;
};

export const calculateA = (
    H: number,
    lambda: number,
    K: number,
    HUnit: 'minutes' | 'seconds' | 'hours'
) => {
    let calculatedH = H / 60;
    if (HUnit === 'seconds') calculatedH /= 60;
    else if (HUnit === 'hours') calculatedH *= 60;

    return lambda * calculatedH * K;
};

export const calculateGoS = (
    A: number,
    N: number,
    method: 'Erlang B' | 'Erlang C' | 'Binomial',
    K: number
) => {
    let calculatedGoS = 0;

    if (method === 'Erlang B') calculatedGoS = calculateErlangB(N, A);
    else if (method === 'Erlang C') calculatedGoS = calculateErlangC(N, A);
    else if (method === 'Binomial')
        calculatedGoS = calculateBinomial(N, A / K, K);

    return calculatedGoS;
};

function solveEquation(equation: string, threshold = 0.001) {
    const sides = equation.split('=');

    const f = (x: number) => {
        const leftSide = sides[0].replace(/x/g, `(${x})`);
        const rightSide = sides[1].replace(/x/g, `(${x})`);
        return eval(leftSide) - eval(rightSide);
    };

    let x = 0; // Initial guess for x
    let fx = f(x);

    // Iterate until the difference is below the threshold
    while (Math.abs(fx) > threshold) {
        // Adjust x by a small amount
        x += 0.1;
        fx = f(x);
    }

    return x;
}

function calculateTrafficIntensity(N: number, GoS: number): number {
    const erlangB = (A: number, N: number): number => {
        let numerator = Math.pow(A, N) / factorial(N);
        let denominator = 0;
        for (let n = 0; n <= N; n++) {
            denominator += Math.pow(A, n) / factorial(n);
        }
        return numerator / denominator;
    };

    let A = 0.01; // Initial guess for A
    let blockingProbability = erlangB(A, N);

    // Adjust A until the blocking probability matches the GoS
    while (blockingProbability * 100 > GoS) {
        A += 0.01;
        blockingProbability = erlangB(A, N);
    }

    return A;
}

export const calculateTraffic = (
    N: number,
    GoSPercentage: number,
    method: 'Erlang B' | 'Erlang C'
) => {
    const p = GoSPercentage / 100;

    if (method === 'Erlang B') {
        return calculateTrafficIntensity(N, GoSPercentage);
    } else return 0;
};
