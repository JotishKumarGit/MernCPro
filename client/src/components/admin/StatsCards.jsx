// src/components/admin/StatsCards.jsx
export default function StatsCards() {
  const stats = [
    { title: "Revenue", value: "$45,000", color: "bg-success" },
    { title: "Orders", value: "320", color: "bg-primary" },
    { title: "Users", value: "1,200", color: "bg-info" },
  ];

  return (
    <div className="row g-4 mb-4">
      {stats.map((stat) => (
        <div className="col-12 col-md-4" key={stat.title}>
          <div className={`card text-white shadow-sm ${stat.color}`} data-aos="zoom-in">
            <div className="card-body">
              <h5 className="card-title">{stat.title}</h5>
              <p className="card-text fs-4 fw-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
