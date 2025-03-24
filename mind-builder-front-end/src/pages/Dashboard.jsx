import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import StatsCard from '../components/ui/StatsCard'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    CurrencyDollarIcon,
    UsersIcon,
    ShoppingBagIcon,
    ClockIcon
} from '@heroicons/react/24/outline'

ChartJS.register(...registerables)

export default function Dashboard() {
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
        }],
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard
                    title="Total Revenue"
                    value="$24,000"
                    icon={<CurrencyDollarIcon className="h-6 w-6" />}
                    trend={<><ArrowUpIcon className="h-4 w-4 inline"/> 12% increase</>}
                />
                <StatsCard
                    title="Total Users"
                    value="1,200"
                    icon={<UsersIcon className="h-6 w-6" />}
                    trend={<><ArrowUpIcon className="h-4 w-4 inline"/> 8% increase</>}
                />
                <StatsCard
                    title="Total Products"
                    value="56"
                    icon={<ShoppingBagIcon className="h-6 w-6" />}
                    trend={<><ArrowDownIcon className="h-4 w-4 inline"/> 2% decrease</>}
                    trendColor="text-red-600"
                />
                <StatsCard
                    title="Pending Orders"
                    value="12"
                    icon={<ClockIcon className="h-6 w-6" />}
                />
            </div>

            {/* Charts and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
                    <Bar data={salesData} />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    {/* Activity items would go here */}
                </div>
            </div>
        </>
    )
}