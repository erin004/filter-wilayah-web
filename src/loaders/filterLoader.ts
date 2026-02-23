export async function filterLoader() {
    // ambil data dummy
  const res = await fetch('/data/indonesia_regions.json');
  return res.json();
}