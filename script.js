document.addEventListener('DOMContentLoaded', function() {

    // Typing effect for titles
    new Typed('.typing', {
        strings: ['scalable backends.', 'secure smart contracts.', 'performant web apps.'],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true
    });

    // --- MODIFIED: New "Hexagonal Network" Particle Background ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40, /* Fewer particles for a cleaner look */
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00FF7F"
            },
            "shape": {
                "type": "polygon", /* Changed from circle to polygon */
                "polygon": {
                    "nb_sides": 6 /* This makes it a hexagon */
                }
            },
            "opacity": {
                "value": 0.4,
                "random": true,
                "anim": {
                    "enable": true, /* Pulsing opacity effect */
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00FF7F",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1, /* Slower, more deliberate movement */
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
    
    // Modal Logic
    const modal = document.getElementById("contactModal");
    const openBtn = document.getElementById("contactBtn");
    const closeBtn = document.querySelector(".close-btn");
    const emailLink = document.getElementById("emailLink");

    const openModal = () => { modal.style.display = "flex"; };

    openBtn.onclick = openModal;
    if(emailLink) { emailLink.onclick = openModal; }
    closeBtn.onclick = () => { modal.style.display = "none"; };
    window.onclick = (event) => { if (event.target == modal) { modal.style.display = "none"; } };
    
    // Form Submission Logic
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.btn-submit');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // IMPORTANT: Replace with your Google Apps Script URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxNU4OdEQznQPboX_PVlLvokeL1d5g7THSwvrsR5U7XaK0QbXDZd5vz7CNcogaLfePWVA/exec'; 
        const formData = new FormData(form);
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                if(response.ok) {
                    submitButton.innerHTML = 'Sent <i class="fas fa-check"></i>';
                    submitButton.classList.add('success');
                    
                    setTimeout(() => {
                        form.reset();
                        modal.style.display = "none";
                        submitButton.classList.remove('success');
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    }, 2000);
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitButton.innerHTML = 'Error!';
                submitButton.classList.add('error');

                 setTimeout(() => {
                    submitButton.classList.remove('error');
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                }, 3000);
            });
    });
});