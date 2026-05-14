document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that should fade in
    const faders = document.querySelectorAll('.fade-in-up');

    // Options for the IntersectionObserver
    const appearOptions = {
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger a bit before the element is fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Apply observer to all fader elements
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Countdown Timer Logic
    // Set a fake deadline for urgency: 2 days, 5 hours, 30 minutes from the time they open the page
    // Or set it to end of current month. For FOMO, a rolling 48-72 hours is very effective.
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 53); // 53 hours from now
    deadline.setMinutes(deadline.getMinutes() + 14);

    function updateCountdown() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            // Keep it at zero if it somehow expires while they are watching
            document.getElementById('cd-days').innerText = "00";
            document.getElementById('cd-hours').innerText = "00";
            document.getElementById('cd-minutes').innerText = "00";
            document.getElementById('cd-seconds').innerText = "00";
            
            document.getElementById('st-hours').innerText = "00";
            document.getElementById('st-minutes').innerText = "00";
            document.getElementById('st-seconds').innerText = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('cd-days').innerText = days.toString().padStart(2, '0');
        document.getElementById('cd-hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('cd-minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('cd-seconds').innerText = seconds.toString().padStart(2, '0');

        // Update sticky banner
        document.getElementById('st-hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('st-minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('st-seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Run once immediately, then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
