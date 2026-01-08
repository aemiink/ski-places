import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Mountain,
  Eye,
  EyeOff,
  Heart,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const [skiAreas, setSkiAreas] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const skiRes = await api.get("/ski-areas");
      setSkiAreas(skiRes.data.data || []);

      const commentRes = await api.get("/comments");
      setCommentsCount(commentRes.data.count || 0);
    } catch (error) {
      console.error("Dashboard fetch error", error);
    }
  };

  const totalLikes = skiAreas.reduce(
    (acc, s) => acc + (s.likes?.length || 0),
    0
  );

  const published = skiAreas.filter(
    (s) => s.isPublished
  ).length;

  const draft = skiAreas.length - published;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat
          icon={<Mountain />}
          label="Kayak Merkezi"
          value={skiAreas.length}
        />
        <Stat
          icon={<Eye />}
          label="Yayında"
          value={published}
        />
        <Stat
          icon={<EyeOff />}
          label="Taslak"
          value={draft}
        />
        <Stat
          icon={<Heart />}
          label="Toplam Beğeni"
          value={totalLikes}
        />
      </div>

      {/* COMMENTS */}
      <div className="bg-white border rounded-lg p-5 flex items-center gap-4">
        <MessageSquare className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">
            Toplam Yorum
          </p>
          <p className="text-xl font-semibold">
            {commentsCount}
          </p>
        </div>
      </div>

      {/* LAST SKI AREAS */}
      <div className="bg-white border rounded-lg">
        <h2 className="text-lg font-semibold p-4 border-b">
          Son Eklenen Kayak Merkezleri
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">
                Başlık
              </th>
              <th className="p-3">
                Konum
              </th>
              <th className="p-3">
                Durum
              </th>
            </tr>
          </thead>

          <tbody>
            {skiAreas.slice(0, 5).map((s) => (
              <tr
                key={s._id}
                className="border-t"
              >
                <td className="p-3">
                  {s.title}
                </td>
                <td className="p-3 text-center">
                  {s.location}
                </td>
                <td className="p-3 text-center">
                  {s.isPublished ? (
                    <span className="text-green-600">
                      Yayında
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Taslak
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="bg-white border rounded-lg p-5 flex items-center gap-4">
    <div className="text-blue-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>
      <p className="text-xl font-semibold">
        {value}
      </p>
    </div>
  </div>
);

export default Dashboard;
