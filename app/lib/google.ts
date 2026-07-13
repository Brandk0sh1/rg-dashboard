const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQm59asRktGJKPGZGnfc7iCsckMI-Z64VjeGRFhZvDLCIHB0aj8rnICW_bLi1swS9YivKIxeGe4sshl/pub?output=csv";

export async function downloadDashboardCSV() {
  const response = await fetch(CSV_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Не удалось скачать CSV");
  }

  return await response.text();
}