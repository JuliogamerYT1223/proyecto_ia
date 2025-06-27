const trendingItems = [
  {
    id: 1,
    name: "Biryanis Pulav",
    price: "$12.00",
    category: "Main Course",
    sales: 158,
    change: "+20%",
    trendingUp: true,
    img: "https://i.imgur.com/znP53tA.png",
  },
  {
    id: 2,
    name: "Burgers",
    price: "$42.00",
    category: "Combo",
    sales: 18,
    change: "-0.5%",
    trendingUp: false,
    img: "https://i.imgur.com/vB0Xkdl.png",
  },
  {
    id: 3,
    name: "Dal Palak Recipe",
    price: "$60.00",
    category: "Main Course",
    sales: 258,
    change: "+15%",
    trendingUp: true,
    img: "https://i.imgur.com/NXJlyU3.png",
  },
  {
    id: 4,
    name: "Pan Noodles",
    price: "$12.00",
    category: "Starters",
    sales: 58,
    change: "-10%",
    trendingUp: false,
    img: "https://i.imgur.com/7htDFAv.png",
  }
];

export default function TrendingItems() {
  return (
    <div className="bg-white p-4 rounded-xl shadow font-poppins">
      <h3 className="text-lg font-semibold text-red-900 mb-4">
        Trending Items
      </h3>
      <ul className="space-y-3">
        {trendingItems.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between text-sm border-b pb-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{`#${index + 1} ${item.name}`}</p>
                <p className="text-gray-400 text-xs">
                  {item.price} • {item.category}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-700">{item.sales}</p>
              <p
                className={`text-xs ${
                  item.trendingUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.trendingUp ? "▲" : "▼"} {item.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
