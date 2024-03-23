'use client';

import { calculateTraffic } from '@/utils/helpers';
import { useState } from 'react';

const TrafficCalculator = () => {
    const [N, setN] = useState<number>(0);
    const [GoSPercentage, setGoSPercentage] = useState<number>(0);
    const [method, setMethod] = useState<'Erlang B' | 'Erlang C'>('Erlang B');
    const [A, setA] = useState<number | null>(null);
    const [Au, setAu] = useState<number | null>(null);
    const [supportedUsers, setSupportedUsers] = useState<number | null>(null);

    const handleCalculate = () => {
        const A = calculateTraffic(N, GoSPercentage, method);
        setA(A);
        // // For Part B, calculate the supported users for given GoS and N
        // const supportedUsers = calculateN(GoSPercentage / 100, N, method, A);
        // setSupportedUsers(supportedUsers);
    };

    const exportTraffic = () => {
        // Export range of values of N from 1 to 10, and GoSPercentage from 0.5% to 5% in form of csv
        // const data = [];
        // ['Erlang B', 'Erlang C'].forEach((method) => {
        //     for (let n = 1; n <= 10; n++) {
        //         for (let gos = 0.5; gos <= 5; gos += 0.5) {
        //             const A = calculateA(H, lambda, supportedUsers, HUnit);
        //             const supportedUsers = calculateN(
        //                 gos / 100,
        //                 n,
        //                 method as 'Erlang B' | 'Erlang C',
        //                 A
        //             );
        //             data.push({
        //                 method: method,
        //                 N: n,
        //                 GoSPercentage: gos,
        //                 A: A,
        //                 SupportedUsers: supportedUsers,
        //             });
        //         }
        //     }
        // });
        // // export and download the data with a header
        // const headers = {
        //     method: 'Method',
        //     N: 'Number of trunks (N)',
        //     GoSPercentage: 'Grade of Service (%)',
        //     A: 'Traffic intensity [Erlang]',
        //     SupportedUsers: 'Supported Users',
        // };
        // data.unshift(headers);
        // const csv =
        //     'data:text/csv;charset=utf-8,' +
        //     data.map((d) => Object.values(d).join(',')).join('\n');
        // const encodedUri = encodeURI(csv);
        // const link = document.createElement('a');
        // link.setAttribute('href', encodedUri);
        // link.setAttribute('download', 'Traffic.csv');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
                Traffic Calculator
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1">Number of trunks (N)</label>
                    <input
                        type="text"
                        min={0}
                        onChange={(e) => setN(parseFloat(e.target.value))}
                        className="w-full border rounded py-1 px-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Grade of Service (%)</label>
                    <input
                        type="text"
                        min={0}
                        onChange={(e) =>
                            setGoSPercentage(parseFloat(e.target.value))
                        }
                        className="w-full border rounded py-1 px-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">
                        Select GoS calculation method:
                    </label>
                    <select
                        value={method}
                        onChange={(e) =>
                            setMethod(e.target.value as 'Erlang B' | 'Erlang C')
                        }
                        className="w-full border rounded py-1 px-2"
                    >
                        <option value="Erlang B">Erlang B</option>
                        <option value="Erlang C">Erlang C</option>
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
                    onClick={exportTraffic}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Export
                </button>
            </div>

            {A !== null && (
                <div className="mt-4">
                    <p>Traffic intensity (A): {A} Erlang</p>
                    <p>Supported Users: {supportedUsers}</p>
                </div>
            )}
        </div>
    );
};

export default TrafficCalculator;
