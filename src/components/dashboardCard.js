    function DashboardCard({ data }) {
        return (
            <>
                <div
                    className="bg-white w-40 md:w-60 h-24 flex items-start shadow-lg rounded-lg overflow-hidden"
                >
                    <div className="px-2 h-full bg-[#0CC9E8]"></div>
                    <div className="pl-4 pt-4">
                        <h2 className="text-md font-medium text-gray-700">{data[0]}</h2>
                        <p className="text-4xl font-bold text-gray-500">{data[1]}</p>
                    </div>
                </div>
            </>
        )
    }

    export default DashboardCard;
