<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let selectedDate = new Date();

  let days = [];
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar para comparación de solo fecha

    let calendarDays = [];
    // Rellenar días vacíos al inicio del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: '', isPlaceholder: true });
    }
    // Rellenar los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      calendarDays.push({
        day: i,
        isPlaceholder: false,
        isToday: currentDate.getTime() === today.getTime(),
        isSelected: selectedDate && currentDate.getTime() === new Date(selectedDate).setHours(0,0,0,0),
        isPast: currentDate < today,
        fullDate: currentDate
      });
    }
    days = calendarDays;
  }

  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    generateCalendar(year, month);
  }

  function nextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    generateCalendar(year, month);
  }

  function selectDay(day) {
    if (!day.day || day.isPast) return; // No se pueden seleccionar días pasados o placeholders

    selectedDate = day.fullDate;
    dispatch('dateSelected', selectedDate); // Enviar evento al componente padre
    generateCalendar(year, month); // Regenerar para mostrar la selección
  }

  onMount(() => {
    selectDay({ day: date.getDate(), fullDate: date, isPast: false }); // Seleccionar el día de hoy al cargar
  });
</script>

<div class="calendar">
  <div class="header">
    <button on:click={prevMonth} aria-label="Mes anterior">❮</button>
    <span class="month-year">{monthNames[month]} {year}</span>
    <button on:click={nextMonth} aria-label="Siguiente mes">❯</button>
  </div>
  <div class="weekdays">
    {#each dayNames as dayName}
      <div>{dayName}</div>
    {/each}
  </div>
  <div class="days-grid">
    {#each days as day}
      <button 
        class="day" 
        class:placeholder={day.isPlaceholder}
        class:today={day.isToday}
        class:selected={day.isSelected}
        class:past={day.isPast}
        on:click={() => selectDay(day)}
        disabled={day.isPast || day.isPlaceholder}
      >
        {day.day}
      </button>
    {/each}
  </div>
</div>

<style>
  .calendar {
    width: 100%;
    max-width: 350px;
    background-color: var(--color-background-light);
    border: 1px solid var(--color-background-medium);
    border-radius: 8px;
    padding: var(--spacing-unit) * 2;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-unit) 0;
  }
  .header .month-year {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--color-dark-primary);
  }
  .header button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-dark-primary);
    padding: var(--spacing-unit);
    border-radius: 50%;
  }
  .header button:hover {
    background-color: var(--color-background-medium);
  }
  .weekdays, .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }
  .weekdays div {
    font-weight: 500;
    font-size: 0.8rem;
    color: #777;
    padding: var(--spacing-unit) 0;
  }
  .day {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-unit);
    border-radius: 50%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.9rem;
    aspect-ratio: 1/1; /* Para que sean círculos */
    transition: background-color 0.2s, color 0.2s;
  }
  .day:not(.placeholder):not(.past):hover {
    background-color: var(--color-beige-secondary);
  }
  .day.today {
    font-weight: bold;
    border: 1px solid var(--color-beige-secondary);
  }
  .day.selected {
    background-color: var(--color-teal-accent);
    color: white;
    font-weight: bold;
  }
  .day.past {
    color: #ccc;
    text-decoration: line-through;
    cursor: not-allowed;
  }
  .day.placeholder {
    cursor: default;
  }
</style>