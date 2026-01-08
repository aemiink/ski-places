import { Snowflake, Mountain, Heart } from "lucide-react";

const WhySki = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Neden Kayak Merkezleri?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <Mountain className="mx-auto mb-4 text-blue-600" size={36} />
            <h3 className="font-semibold mb-2">Doğa & Manzara</h3>
            <p className="text-sm text-gray-600">
              Şehirden uzak, doğayla iç içe eşsiz manzaralar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <Snowflake className="mx-auto mb-4 text-blue-600" size={36} />
            <h3 className="font-semibold mb-2">Kış Sporları</h3>
            <p className="text-sm text-gray-600">
              Kayak, snowboard ve daha fazlası.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <Heart className="mx-auto mb-4 text-blue-600" size={36} />
            <h3 className="font-semibold mb-2">Unutulmaz Anlar</h3>
            <p className="text-sm text-gray-600">
              Aile ve arkadaşlarla keyifli anılar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySki;
