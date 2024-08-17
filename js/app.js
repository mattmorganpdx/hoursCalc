document.addEventListener('DOMContentLoaded', () => {
  const weeksContainer = document.getElementById('weeks-container');
  const remainingTimeDisplay = document.getElementById('remaining-time');
  const title = document.getElementById('title');
  const totalHoursDisplay = document.getElementById('total-hours-display');
  const totalHoursInput = document.getElementById('total-hours-input');
  const editIcon = document.getElementById('edit-icon');
  let totalMinutes = (parseInt(localStorage.getItem('totalHours'), 10) || 120) * 60;

  function getWeeksOfMonth(year, month) {
    const weeks = [];
    let date = new Date(year, month, 1);
    let weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    while (date.getMonth() === month) {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekEnd.getMonth() !== month) {
        weekEnd.setDate(0);
      }

      weeks.push({ start: new Date(weekStart), end: new Date(weekEnd) });

      weekStart.setDate(weekStart.getDate() + 7);
      date.setDate(date.getDate() + 7);
    }

    return weeks;
  }

  function formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function generateWeekRows() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const weeks = getWeeksOfMonth(year, month);

    weeks.forEach((week, index) => {
      const weekRow = document.createElement('div');
      weekRow.classList.add('week-row');
      weekRow.innerHTML = `
        <label>Week ${index + 1} (${formatDate(week.start)} - ${formatDate(week.end)}):</label>
        <input type="number" class="hours" name="hours" min="0" placeholder="Hours">
        <input type="number" class="minutes" name="minutes" min="0" max="59" placeholder="Minutes">
      `;
      weeksContainer.appendChild(weekRow);
    });
  }

  function calculateRemainingTime() {
    const hoursInputs = document.querySelectorAll('.hours');
    const minutesInputs = document.querySelectorAll('.minutes');
    let totalInputMinutes = 0;

    hoursInputs.forEach((input, index) => {
      const hours = parseInt(input.value, 10) || 0;
      const minutes = parseInt(minutesInputs[index].value, 10) || 0;
      totalInputMinutes += (hours * 60) + minutes;
    });

    if (totalInputMinutes > totalMinutes) {
      alert('You cannot subtract more time than what is remaining.');
      return;
    }

    const remainingMinutes = totalMinutes - totalInputMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMinutesDisplay = remainingMinutes % 60;

    remainingTimeDisplay.textContent = `Remaining Time: ${remainingHours}h ${remainingMinutesDisplay}m`;
  }

  function setTitle() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    title.textContent += month;
  }

  function saveToLocalStorage() {
    const hoursInputs = document.querySelectorAll('.hours');
    const minutesInputs = document.querySelectorAll('.minutes');
    const data = [];

    hoursInputs.forEach((input, index) => {
      const hours = input.value ? parseInt(input.value, 10) : 0;
      const minutes = minutesInputs[index].value ? parseInt(minutesInputs[index].value, 10) : 0;
      if (hours !== 0 || minutes !== 0) {
        data.push({ hours, minutes });
      }
    });

    localStorage.setItem('workHoursData', JSON.stringify(data));
  }

  function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workHoursData')) || [];

    if (data.length > 0) {
      const hoursInputs = document.querySelectorAll('.hours');
      const minutesInputs = document.querySelectorAll('.minutes');

      data.forEach((item, index) => {
        if (hoursInputs[index]) hoursInputs[index].value = item.hours !== 0 ? item.hours : '';
        if (minutesInputs[index]) minutesInputs[index].value = item.minutes !== 0 ? item.minutes : '';
      });

      calculateRemainingTime();
    }
  }

  function enterEditMode() {
    totalHoursDisplay.style.display = 'none';
    totalHoursInput.style.display = 'inline';
    totalHoursInput.value = totalHoursDisplay.textContent;
    totalHoursInput.focus();
  }

  function exitEditMode(save) {
    totalHoursDisplay.style.display = 'inline';
    totalHoursInput.style.display = 'none';
    if (save) {
      const newTotalHours = parseInt(totalHoursInput.value, 10) || 0;
      totalHoursDisplay.textContent = newTotalHours;
      totalMinutes = newTotalHours * 60;
      localStorage.setItem('totalHours', newTotalHours);
      calculateRemainingTime();
    }
  }

  editIcon.addEventListener('click', enterEditMode);

  totalHoursInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      exitEditMode(true);
    } else if (event.key === 'Escape') {
      exitEditMode(false);
    }
  });

  generateWeekRows();
  setTitle();
  loadFromLocalStorage();
  calculateRemainingTime();

  document.querySelectorAll('.hours, .minutes').forEach(input => {
    input.addEventListener('input', () => {
      calculateRemainingTime();
      saveToLocalStorage();
    });
  });
});
