document.addEventListener('DOMContentLoaded', function () {
  // Dark Mode Toggle
  const toggle = document.getElementById('theme-toggle');
  const isDark = localStorage.getItem('theme') === 'dark';

  if (isDark) {
    document.body.classList.add('dark');
    toggle.textContent = '☀️ Light Mode';
  } else {
    toggle.textContent = '🌙 Dark Mode';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkMode = document.body.classList.contains('dark');
    toggle.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('login-output').textContent = "✅ Login successful!";
    });
  }

  // Signup Form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('signup-output').textContent = "🎉 Registration successful!";
    });
  }

  // PNR Form
  const pnrForm = document.getElementById('pnr-form');
  if (pnrForm) {
    pnrForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('pnr-output').textContent = "✅ Your ticket is confirmed!";
    });
  }

  // Booking Form + Mock Results
  const bookingForm = document.getElementById('book-form');
  if (bookingForm) {
    const resultsTable = document.getElementById('results');
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const tbody = resultsTable.querySelector('tbody');
      tbody.innerHTML = `
        <tr>
          <td>12878</td><td>Garib Rath Express</td><td>08:00</td><td>20:00</td><td>₹1,150</td>
          <td><button class="btn">Book Now</button></td>
        </tr>
        <tr>
          <td>12454</td><td>Rajdhani Express</td><td>16:00</td><td>04:00</td><td>₹1,800</td>
          <td><button class="btn">Book Now</button></td>
        </tr>
      `;
      resultsTable.style.display = 'table';
    });

    // Set default date to today
    const travelDate = document.getElementById('date');
    if (travelDate) {
      travelDate.valueAsDate = new Date();
    }
  }
});
