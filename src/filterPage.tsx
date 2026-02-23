import {
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';

type Province = {
  id: number;
  name: string;
};

type Regency = {
  id: number;
  name: string;
  province_id: number;
};

type District = {
  id: number;
  name: string;
  regency_id: number;
};

type LoaderData = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
};

const DownArrow = () => (
  <div className="my-10 text-gray-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
    </svg>
  </div>
);

export default function FilterPage() {
  const { provinces, regencies, districts } =
    useLoaderData() as LoaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvince = searchParams.get('province');
  const selectedRegency = searchParams.get('regency');
  const selectedDistrict = searchParams.get('district');

  // Filtered data
  const filteredRegencies = selectedProvince
    ? regencies.filter(
        (r) => r.province_id === Number(selectedProvince)
      )
    : [];

  const filteredDistricts = selectedRegency
    ? districts.filter(
        (d) => d.regency_id === Number(selectedRegency)
      )
    : [];

  const provinceName =
    provinces.find((p) => p.id === Number(selectedProvince))
      ?.name || '';

  const regencyName =
    regencies.find((r) => r.id === Number(selectedRegency))
      ?.name || '';

  const districtName =
    districts.find((d) => d.id === Number(selectedDistrict))
      ?.name || '';

  function handleReset() {
    setSearchParams({});
  }

  function handleProvinceChange(value: string) {
    setSearchParams(
      value ? { province: value } : {}
    );
  }

  function handleRegencyChange(value: string) {
    setSearchParams({
      province: selectedProvince || '',
      regency: value,
    });
  }

  function handleDistrictChange(value: string) {
    setSearchParams({
      province: selectedProvince || '',
      regency: selectedRegency || '',
      district: value,
    });
  }

  const activeLevel = districtName
  ? "district"
  : regencyName
  ? "regency"
  : provinceName
  ? "province"
  : "country";

  return (
  <div className="min-h-screen bg-white flex">
    {/* Sidebar */}
    <aside className="w-[320px] bg-[#F8FAFC] border-r border-gray-200 px-8 py-10 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4480da"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path>
            <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path>
            <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path>
            <circle cx="12" cy="12" r="10"></circle>
        </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-800">
          Frontend Assessment
        </h1>
      </div>

      {/* Filter Title */}
      <h2 className="text-xs tracking-[0.25em] text-gray-400 mb-8">
        FILTER WILAYAH
      </h2>

      <div className="space-y-6">
        {/* Province */}
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">
            PROVINSI
          </label>
          <div className="relative">
            {/* Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-gray-400"
                >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path>
                <path d="M15 5.764v15"></path>
                <path d="M9 3.236v15"></path>
                </svg>
            </div>
            <select
                name="province"
                value={selectedProvince || ""}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
            >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                    {p.name}
                </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
        </div>

        {/* Regency */}
        <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">
            KOTA / KABUPATEN
        </label>

        <div className="relative">
            {/* Left Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 ${
                !selectedProvince ? "text-gray-300" : "text-gray-400"
                }`}
            >
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                <path d="M9 22v-4h6v4"></path>
                <path d="M8 6h.01"></path>
                <path d="M16 6h.01"></path>
                <path d="M12 6h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 10h.01"></path>
                <path d="M8 14h.01"></path>
            </svg>
            </div>
            <select
            name="regency"
            value={selectedRegency || ""}
            onChange={(e) => handleRegencyChange(e.target.value)}
            disabled={!selectedProvince}
            className="w-full h-12 pl-10 pr-10 rounded-xl border-2 border-gray-400 bg-white disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
            >
            <option value="">Pilih Kota/Kabupaten</option>
            {filteredRegencies.map((r) => (
                <option key={r.id} value={r.id}>
                {r.name}
                </option>
            ))}
            </select>

            {/* Right Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M6 9l6 6 6-6" />
            </svg>
            </div>
        </div>
        </div>

        {/* District */}
        <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">
            KECAMATAN
        </label>

        <div className="relative">
            {/* Left Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 ${
                !selectedRegency ? "text-gray-300" : "text-gray-400"
                }`}
            >
                <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"></path>
                <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"></path>
                <path d="M18 22v-3"></path>
                <circle cx="10" cy="10" r="3"></circle>
            </svg>
            </div>

            <select
            name="district"
            value={selectedDistrict || ""}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedRegency}
            className="w-full h-12 pl-10 pr-10 rounded-xl border-2 border-gray-400 bg-white disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
            >
            <option value="">Pilih Kecamatan</option>
            {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                {d.name}
                </option>
            ))}
            </select>

            {/* Right Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M6 9l6 6 6-6" />
            </svg>
            </div>
        </div>
        </div>
      </div>

      {/* Reset Button */}
        <button
        onClick={handleReset}
        className="mt-14 h-12 rounded-xl border-2 border-blue-500 text-blue-500 font-bold text-sm tracking-[2px] 
                    flex items-center justify-center gap-2
                    hover:bg-blue-500 hover:text-white 
                    transition-all duration-200"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"></path>
            <path d="m22 3-5 5"></path>
            <path d="m17 3 5 5"></path>
        </svg>
        RESET
        </button>
    </aside>

    {/* Main Content */}
    <main className="flex-1 flex flex-col bg-[#F8FAFC]">

    {/* Breadcrumb */}
    <div className="h-18 flex items-center px-10 border-b border-gray-200 bg-white">
        <nav className="breadcrumb flex items-center text-xs font-semibold tracking-widest">
            {/* Indonesia */}
            <span
            className={
                activeLevel === "country"
                ? "text-blue-500 font-semibold"
                : "text-gray-400"
            }
            >
            Indonesia
            </span>

            {provinceName && (
            <>
                <span className="mx-3 text-gray-300">›</span>
                <span
                className={
                    activeLevel === "province"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400"
                }
                >
                {provinceName}
                </span>
            </>
            )}

            {regencyName && (
            <>
                <span className="mx-3 text-gray-300">›</span>
                <span
                className={
                    activeLevel === "regency"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400"
                }
                >
                {regencyName}
                </span>
            </>
            )}

            {districtName && (
            <>
                <span className="mx-3 text-gray-300">›</span>
                <span className="text-blue-500 font-semibold">
                {districtName}
                </span>
            </>
            )}
        </nav>
</div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
            {provinceName && (
                <>
                <p className="text-xs tracking-[0.3em] text-blue-400 mb-4">
                    PROVINSI
                </p>
                <h1 className="text-6xl font-bold text-gray-900">
                    {provinceName}
                </h1>
                </>
            )}

            {provinceName && regencyName && <DownArrow />}

            {regencyName && (
                <>
                <p className="text-xs tracking-[0.3em] text-blue-400 mb-4">
                    KOTA / KABUPATEN
                </p>
                <h1 className="text-5xl font-bold text-gray-900">
                    {regencyName}
                </h1>
                </>
            )}

            {regencyName && districtName && <DownArrow />}

            {districtName && (
                <>
                <p className="text-xs tracking-[0.3em] text-blue-400 mb-4">
                    KECAMATAN
                </p>
                <h1 className="text-4xl font-bold text-gray-900">
                    {districtName}
                </h1>
                </>
            )}

        </div>
</main>
  </div>
);
}