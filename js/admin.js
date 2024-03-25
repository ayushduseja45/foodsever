document.addEventListener('DOMContentLoaded', function () {
    const statsTable = document.getElementById('statsTable');
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Deliveries', 'Registrations'],
        datasets: [{
          label: 'Statistics',
          data: [0, 0],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  
    function fetchStats() {
      firebase.database().ref('deliveries').on('value', function (snapshot) {
        const deliveryCount = snapshot.numChildren();
        updateStats('deliveries', deliveryCount);
      });
  
      firebase.database().ref('registrations').on('value', function (snapshot) {
        const registrationCount = snapshot.numChildren();
        updateStats('registrations', registrationCount);
      });
    }
  
    function updateStats(type, count) {
      const index = type === 'deliveries' ? 0 : 1;
      chart.data.datasets[0].data[index] = count;
      chart.update();
    }
  
    fetchStats();
  });
  