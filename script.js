/* =========================================================
   SAEENZ | UNDERSWITCH — Disponibilidad de Booking
   =========================================================
   CÓMO ACTUALIZAR LAS FECHAS RESERVADAS:
   Editá el archivo "bookings.json" en este mismo repo.
   Agregá la fecha en formato "YYYY-MM-DD" al array "booked".
   Ejemplo:
     { "booked": ["2026-07-18", "2026-08-02"] }
   No hace falta tocar este archivo .js para nada.
   ========================================================= */

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Mes que se muestra al cargar la página (hoy)
let currentDate = new Date();
let viewYear = currentDate.getFullYear();
let viewMonth = currentDate.getMonth(); // 0-indexado

let bookedDates = []; // se llena al cargar bookings.json

const monthLabel = document.getElementById("monthLabel");
const datesRow = document.getElementById("datesRow");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

/* ---------- Carga de datos ---------- */

async function loadBookings() {
  try {
    const res = await fetch("bookings.json", { cache: "no-store" });
    const data = await res.json();
    bookedDates = data.booked || [];
  } catch (err) {
    console.error("No se pudo cargar bookings.json:", err);
    bookedDates = [];
  }
  renderMonth();
}

/* ---------- Render del calendario ---------- */

function renderMonth() {
  monthLabel.textContent = `${MESES[viewMonth]} ${viewYear}`;
  datesRow.innerHTML = "";

  // Genera las fechas "clave" del mes a mostrar: días 4, 11, 18 y 25
  // (mismo patrón que el diseño original — un pulso semanal de referencia)
  const diasDeReferencia = [4, 11, 18, 25];
  const diasEnMes = new Date(viewYear, viewMonth + 1, 0).getDate();

  let algunaFecha = false;

  diasDeReferencia.forEach((dia) => {
    if (dia > diasEnMes) return;
    algunaFecha = true;

    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(dia).padStart(2, "0");
    const isoDate = `${viewYear}-${mm}-${dd}`;
    const isBooked = bookedDates.includes(isoDate);

    const pill = document.createElement("span");
    pill.className = `date-pill ${isBooked ? "booked" : "available"}`;
    pill.textContent = `${dia} ${MESES[viewMonth].slice(0, 3)} — ${isBooked ? "Reservado" : "Disponible"}`;
    datesRow.appendChild(pill);
  });

  if (!algunaFecha) {
    const empty = document.createElement("p");
    empty.className = "no-dates";
    empty.textContent = "Sin fechas para mostrar este mes.";
    datesRow.appendChild(empty);
  }
}

function goToPrevMonth() {
  viewMonth--;
  if (viewMonth < 0) {
    viewMonth = 11;
    viewYear--;
  }
  renderMonth();
}

function goToNextMonth() {
  viewMonth++;
  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear++;
  }
  renderMonth();
}

prevBtn.addEventListener("click", goToPrevMonth);
nextBtn.addEventListener("click", goToNextMonth);

/* ---------- Modal del formulario ---------- */

const modal = document.getElementById("formModal");
const openFormBtn = document.getElementById("openFormBtn");
const closeModalBtn = document.getElementById("closeModal");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

function openModal() {
  modal.hidden = false;
  document.getElementById("name").focus();
}

function closeModal() {
  modal.hidden = true;
}

openFormBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---------- Envío del formulario a Formspree ---------- */

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "Enviando...";
  formStatus.className = "form-status";

  try {
    const response = await fetch(bookingForm.action, {
      method: "POST",
      body: new FormData(bookingForm),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      formStatus.textContent = "¡Solicitud enviada! Te contactaremos pronto.";
      formStatus.className = "form-status success";
      bookingForm.reset();
      setTimeout(closeModal, 2200);
    } else {
      throw new Error("Respuesta no exitosa");
    }
  } catch (err) {
    formStatus.textContent = "No se pudo enviar. Intentá de nuevo o escribinos directo.";
    formStatus.className = "form-status error";
  }
});

/* ---------- Inicio ---------- */

loadBookings();
