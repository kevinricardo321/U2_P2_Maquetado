const records = [];

const ctx=document.getElementById("weightChart");

const weightChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Peso (kg)",
            data: [],
            borderColor: "rgb(17, 189, 37)",
            backgroundColor: "rgba(245, 49, 59, 0.2)",
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true
    }
});

const form= document.getElementById("weightForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const weight = document.getElementById("weightInput").value;
    const date = document.getElementById("dateInput").value;

    records.push({
        date,
        weight
    });

    updateChart();
    updateTable();

    form.reset();
});


function updateTable() {
    const tbody = document.getElementById("historyTable");
    tbody.innerHTML = "";

    records.forEach(record => {
        let status;
        let color;

        if(record.weight < 50) {
            status = "Bajo";
            color = "danger";
        }

        if(record.weight >= 50 && record.weight < 80) {
            status = "Normal";
            color = "success";
        }

        if(record.weight >= 80) {
            status = "Alto";
            color = "warning";
        }

        tbody.innerHTML += `
            <tr>
                <td>${record.date}</td>
                <td>${record.weight}</td>
                <td><span class="badge bg-${color}">${status}</span></td>
            </tr>
        `;
        
    });
}

function updateChart() {
    weightChart.data.labels = records.map(record => record.date);
    weightChart.data.datasets[0].data = records.map(record => record.weight);
    weightChart.update();
}