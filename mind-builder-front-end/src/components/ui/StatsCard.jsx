export default function StatsCard({ title, value, icon, trend, trendColor = 'text-green-600' }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-primary">
                    {icon}
                </div>
            </div>
            {trend && (
                <div className={`mt-2 text-sm ${trendColor}`}>
                    {trend}
                </div>
            )}
        </div>
    )
}