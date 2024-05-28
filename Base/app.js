document.addEventListener("DOMContentLoaded", () => {
  const dataTable = document.getElementById("dataTable");
  const downloadButton = document.getElementById("downloadReport");

  // Simulate fetching data from an API or database
  const data = [
    {
      id: 1,
      actividad: "Producción",
      clase: "A",
      aspecto: "Emisiones",
      impacto: "Alto",
      caracteristicas: "CO2",
      condicion: "Normal",
      incidencia: "Alta",
    },
    {
      id: 2,
      actividad: "Logística",
      clase: "B",
      aspecto: "Residuos",
      impacto: "Medio",
      caracteristicas: "Plástico",
      condicion: "Bajo",
      incidencia: "Media",
    },
    // Add more data as needed
  ];

  // Function to render data in the table
  function renderTableData(data) {
    data.forEach((item) => {
      const newRow = dataTable.insertRow();
      newRow.innerHTML = `<td>${item.id}</td><td>${item.actividad}</td><td>${item.clase}</td><td>${item.aspecto}</td><td>${item.impacto}</td><td>${item.caracteristicas}</td><td>${item.condicion}</td><td>${item.incidencia}</td>`;
    });
  }

  // Function to download table data as CSV
  function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function exportTableToCSV(filename) {
    const headers = Array.from(document.querySelectorAll(".data-table th")).map(
      (th) => th.innerText
    );
    const rows = Array.from(dataTable.rows).map((row) => {
      return Array.from(row.cells).map((cell) => cell.innerText);
    });

    let csvContent = "";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    downloadCSV(csvContent, filename);
  }

  downloadButton.addEventListener("click", () => {
    exportTableToCSV("reporte_ambiental.csv");
  });

  // Render initial data in the table
  renderTableData(data);
});
