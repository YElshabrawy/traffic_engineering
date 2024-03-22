const factorial = (n: number): number => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
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
    console.log('Hello');
    console.log(N, Au, K);
    let sum = 0;
    // check first if N is greater than K
    if (N >= K) return 0;
    for (let i = N; i <= K - 1; i++) {
        sum +=
            binomialCoefficient(K - 1, i) *
            Math.pow(Au, i) *
            Math.pow(1 - Au, K - 1 - i);
    }
    console.log(sum);
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
