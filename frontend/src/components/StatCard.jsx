const StatCard = ({ title, value, icon }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">{title}</h3>
          {icon && <span className="text-gray-400">{icon}</span>}
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    );
  };
  