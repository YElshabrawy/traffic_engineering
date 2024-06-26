'use client';
import { calculateA, calculateGoS } from '@/utils/helpers';
import Link from 'next/link';
import React, { useState } from 'react';

const GoSCalculator = () => {
    const [N, setN] = useState<number>(0);
    const [K, setK] = useState<number>(0);
    const [lambda, setLambda] = useState<number>(0);
    const [H, setH] = useState<number>(0);
    const [HUnit, setHUnit] = useState<'minutes' | 'seconds' | 'hours'>(
        'minutes'
    );

    const [method, setMethod] = useState<'Erlang B' | 'Erlang C' | 'Binomial'>(
        'Erlang B'
    );
    const [A, setA] = useState<number | null>(null);
    const [AUnit, setAUnit] = useState<'Erlang' | 'CCS'>('Erlang');
    const [GoS, setGoS] = useState<number | null>(null);

    const handleCalculate = () => {
        // Validate inputs
        if (N <= 0 || K <= 0 || lambda <= 0 || H <= 0) {
            alert('Please enter positive valid values for N, K, λ, and H');
            return;
        }
        const A = calculateA(H, lambda, K, HUnit);
        const GoS = calculateGoS(A, N, method, K);
        setA(A);
        setGoS(GoS * 100);
    };

    const exportGoS = () => {
        // Validate lambda and H
        if (lambda <= 0 || H <= 0) {
            alert('Please enter positive valid values for λ and H');
            return;
        }
        // Export range of values of N from 1 to 10, and K from 5 to 50 in form of csv
        const data = [];
        ['Erlang B', 'Erlang C', 'Binomial'].forEach((method) => {
            for (let n = 1; n <= 10; n++) {
                for (let k = 5; k <= 50; k += 5) {
                    const A = calculateA(H, lambda, k, HUnit);
                    const GoS = calculateGoS(
                        A,
                        n,
                        method as 'Erlang B' | 'Erlang C' | 'Binomial',
                        k
                    );
                    // calculateGoS(H, lambda, i, j);
                    data.push({
                        method: method,
                        N: n,
                        K: k,
                        A: A,
                        GoS: GoS * 100,
                    });
                }
            }
        });
        // export and download the data with a header
        const headers = {
            method: 'Method',
            N: 'Number of trunks (N)',
            K: 'Number of users (K)',
            A: 'Traffic intensity [Erlang]',
            GoS: 'Grade of Service [%]',
        };
        data.unshift(headers);
        const csv =
            'data:text/csv;charset=utf-8,' +
            data.map((d) => Object.values(d).join(',')).join('\n');
        const encodedUri = encodeURI(csv);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'GoS.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <h2 className="text-2xl font-bold text-blue-500">GoS Calculator</h2>
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block mb-1">
                            Number of trunks (N)
                        </label>
                        <input
                            type="text"
                            // value={N}
                            min={0}
                            onChange={(e) => setN(parseFloat(e.target.value))}
                            className="w-full border rounded py-1 px-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Number of users (K)
                        </label>
                        <input
                            type="text"
                            // value={K}
                            min={0}
                            onChange={(e) => setK(parseFloat(e.target.value))}
                            className="w-full border rounded py-1 px-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Average call rate (λ)
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                min={0}
                                // value={lambda}
                                onChange={(e) =>
                                    setLambda(parseFloat(e.target.value))
                                }
                                className="w-full border rounded py-1 px-2 mr-2"
                            />
                            <p className="whitespace-nowrap">calls / hour</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Call holding time (H)
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                min={0}
                                onChange={(e) =>
                                    setH(parseFloat(e.target.value))
                                }
                                className="w-full border rounded py-1 px-2 mr-2"
                            />
                            <select
                                value={HUnit}
                                onChange={(e) =>
                                    setHUnit(
                                        e.target.value as
                                            | 'minutes'
                                            | 'seconds'
                                            | 'hours'
                                    )
                                }
                                className="border rounded py-1 px-2"
                            >
                                <option value="hours">Hours</option>
                                <option value="minutes">Minutes</option>
                                <option value="seconds">Seconds</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Select GoS calculation method:
                        </label>
                        <select
                            value={method}
                            onChange={(e) =>
                                setMethod(
                                    e.target.value as
                                        | 'Erlang B'
                                        | 'Erlang C'
                                        | 'Binomial'
                                )
                            }
                            className="w-full border rounded py-1 px-2"
                        >
                            <option value="Erlang B">Erlang B</option>
                            <option value="Erlang C">Erlang C</option>
                            <option value="Binomial">Binomial</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Select A unit:</label>
                        <select
                            value={AUnit}
                            onChange={(e) =>
                                setAUnit(e.target.value as 'Erlang' | 'CCS')
                            }
                            className="w-full border rounded py-1 px-2"
                        >
                            <option value="Erlang">Erlang</option>
                            <option value="CCS">CCS</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCalculate}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={exportGoS}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Export Table
                    </button>
                </div>

                {A !== null && GoS !== null && (
                    <div className="mt-4">
                        <p>
                            <span className="font-bold">
                                Traffic intensity (A):
                            </span>{' '}
                            {AUnit == 'Erlang' ? A : A * 36} {AUnit}
                        </p>
                        <p>
                            <span className="font-bold">
                                Grade of Service (GoS):
                            </span>{' '}
                            {GoS}%
                        </p>
                    </div>
                )}
            </div>
            <footer className="text-center text-gray-500 text-sm mt-4">
                <p>
                    Made with ❤️ by{' '}
                    <Link
                        href="https://github.com/YElshabrawy"
                        className="text-blue-500 hover:underline"
                    >
                        Youssef Elshabrawy
                    </Link>
                </p>
            </footer>
        </>
    );
};

export default GoSCalculator;
