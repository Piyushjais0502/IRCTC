document.addEventListener('DOMContentLoaded', function () {
  // 🌙 Dark Mode Toggle
  const toggle = document.getElementById('theme-toggle');
  const isDark = localStorage.getItem('theme') === 'dark';

  if (isDark) {
    document.body.classList.add('dark');
    toggle.textContent = '☀️ Light Mode';
  } else {
    toggle.textContent = '🌙 Dark Mode';
  }

  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkMode = document.body.classList.contains('dark');
    toggle.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });

  // 🔐 Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('login-output').textContent = "✅ Login successful!";
    });
  }

  // ✍️ Signup Form Validation
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const username = document.getElementById('username')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value;
      const confirmPassword = document.getElementById('confirm-password')?.value;
      const output = document.getElementById('signup-output');

      if (!name || !username || !email || !password || !confirmPassword) {
        output.textContent = '⚠️ Please fill in all fields.';
        return;
      }

      if (password !== confirmPassword) {
        output.textContent = '❌ Passwords do not match.';
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        output.textContent = '❌ Enter a valid email address.';
        return;
      }

      output.textContent = "🎉 Registration successful!";
      signupForm.reset();
    });
  }

  // 🚉 PNR Form
  const pnrForm = document.getElementById('pnr-form');
  if (pnrForm) {
    pnrForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('pnr-output').textContent = "✅ Your ticket is confirmed!";
    });
  }

  // 🎟️ Booking Form + Results
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

      const travelDate = document.getElementById('date');
      if (travelDate) {
        travelDate.valueAsDate = new Date();
      }
    });
  }

  // 🧠 Typing Effect
  //const typingText = document.getElementById('typing-text');
  //const phrases = ['Book your journey.', 'Check your PNR.', 'Travel safely.'];
  //let phraseIndex = 0;
  //let letterIndex = 0;
  //let isDeleting = false;

  //function type() {
    //if (!typingText) return;
    //const currentPhrase = phrases[phraseIndex];

//    if (isDeleting) {
  //    typingText.textContent = currentPhrase.substring(0, letterIndex--);
    //  if (letterIndex < 0) {
      //  isDeleting = false;
        //phraseIndex = (phraseIndex + 1) % phrases.length;
      //}
    //} else {
      //typingText.textContent = currentPhrase.substring(0, letterIndex++);
      //if (letterIndex > currentPhrase.length) {
        //isDeleting = true;
        //letterIndex = currentPhrase.length;
      //}
    //}

    //setTimeout(type, isDeleting ? 100 : 200);
  //}

  //if (typingText) type();

  // ⬆️ Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 🚂 Booking Flow: Book Now → Passenger Form → Ticket Page
  const resultsTable = document.getElementById('results');
  const passengerFormContainer = document.getElementById('passenger-form-container');
  const passengerForm = document.getElementById('passenger-form');
  const selectedTrainInfo = document.getElementById('selected-train-info');

  if (resultsTable) {
    resultsTable.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Book Now') {
        const row = e.target.closest('tr');
        const trainNo = row.children[0].textContent;
        const trainName = row.children[1].textContent;
        selectedTrainInfo.value = `${trainNo} - ${trainName}`;
        passengerFormContainer.style.display = 'block';
        passengerForm.reset();
        window.scrollTo({ top: passengerFormContainer.offsetTop - 20, behavior: 'smooth' });
      }
    });
  }

  if (passengerForm) {
    passengerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('passenger-name').value;
      const age = document.getElementById('passenger-age').value;
      const gender = document.getElementById('passenger-gender').value;
      const train = selectedTrainInfo.value;

      // Generate PNR number
      const pnr = 'PNR' + Math.random().toString().substr(2, 8);
      
      // Calculate fares
      const baseFare = Math.floor(Math.random() * (2000 - 800 + 1)) + 800;
      const gst = Math.floor(baseFare * 0.05);
      const totalFare = baseFare + gst;

      const ticketDetails = {
        pnr,
        name,
        age,
        gender,
        train: train.split(' - ')[1],
        trainNumber: train.split(' - ')[0],
        source: document.getElementById('source').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value,
        class: document.getElementById('class').value,
        seatNumber: `${['S1', 'S2', 'A1', 'B1', 'C1'][Math.floor(Math.random() * 5)]}-${Math.floor(Math.random() * 72) + 1}`,
        baseFare,
        gst,
        totalFare
      };

      localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
      window.location.href = 'ticket.html';
    });
  }

  // Populate Ticket Details on ticket.html
  const ticketContainer = document.getElementById('ticket-container');
  const noTicketMessage = document.getElementById('no-ticket-message');

  if (window.location.pathname.includes('ticket.html')) {
    const ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
    
    if (ticketDetails) {
      document.getElementById('pnr-number').textContent = ticketDetails.pnr;
      document.getElementById('train-number').textContent = ticketDetails.trainNumber;
      document.getElementById('train-name').textContent = ticketDetails.train;
      document.getElementById('source-station').textContent = ticketDetails.source;
      document.getElementById('destination-station').textContent = ticketDetails.destination;
      document.getElementById('travel-date').textContent = ticketDetails.date;
      document.getElementById('travel-class').textContent = ticketDetails.class;
      document.getElementById('passenger-name-display').textContent = ticketDetails.name;
      document.getElementById('passenger-age-display').textContent = ticketDetails.age;
      document.getElementById('passenger-gender-display').textContent = ticketDetails.gender;
      document.getElementById('seat-number').textContent = ticketDetails.seatNumber;
      document.getElementById('base-fare').textContent = ticketDetails.baseFare;
      document.getElementById('gst').textContent = ticketDetails.gst;
      document.getElementById('total-fare').textContent = ticketDetails.totalFare;
      
      ticketContainer.style.display = 'block';
      noTicketMessage.style.display = 'none';
    } else {
      ticketContainer.style.display = 'none';
      noTicketMessage.style.display = 'block';
    }
  }
});
