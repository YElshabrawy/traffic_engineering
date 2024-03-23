import GoSCalculator from '@/components/GoSCalculator';
import TrafficCalculator from '@/components/TrafficCalculator';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100 text-gray-800">
            <GoSCalculator />
        </main>
    );
}
