/* script.js - Dual Mode Logic */

document.addEventListener('DOMContentLoaded', () => {
    // ---- STATE MANAGEMENT ----
    const htmlEl = document.documentElement;
    const splitLanding = document.getElementById('split-landing');
    const mainApp = document.getElementById('main-app');

    // Buttons & Toggles
    const btnBusiness = document.getElementById('btn-business');
    const btnCreative = document.getElementById('btn-creative');
    const modeToggle = document.getElementById('mode-toggle');
    const labelBusiness = document.getElementById('label-business');
    const labelCreative = document.getElementById('label-creative');

    // Mode Sections
    const secBusiness = document.getElementById('business-content');
    const secCreative = document.getElementById('creative-content');

    // Dynamic Header Elements
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const navPortfolioLink = document.getElementById('nav-portfolio-link');
    const navExperienceLink = document.getElementById('nav-experience-link');

    // Flags
    let currentMode = 'landing';
    let particlesInitialized = false;

    // ---- TRANSITION LOGIC ----
    function enterMode(mode) {
        currentMode = mode;
        htmlEl.setAttribute('data-theme', mode);

        // Hide Landing, Show Main App
        splitLanding.style.opacity = '0';
        setTimeout(() => {
            splitLanding.style.display = 'none';
            mainApp.classList.remove('hidden');

            // Trigger reveals after app is visible
            setTimeout(() => initializeObservers(), 100);

        }, 800); // Wait for CSS fade out

        applyModeContent(mode);
    }

    function applyModeContent(mode) {
        // Toggle Switch State
        modeToggle.checked = (mode === 'creative');

        if (mode === 'business') {
            labelBusiness.classList.add('active');
            labelCreative.classList.remove('active');

            secBusiness.classList.remove('hidden-section');
            secCreative.classList.add('hidden-section');

            heroTitle.innerText = "KUNAL JANGID";
            heroSubtitle.innerText = "Strategic Operations Manager & Systems Optimizer";

            navPortfolioLink.style.display = 'none';
            navExperienceLink.style.display = 'block';

            // Ensure Particle memory is cleared/paused if we want perfect performance
            // but for now, CSS opacity handles hiding it.

        } else if (mode === 'creative') {
            labelCreative.classList.add('active');
            labelBusiness.classList.remove('active');

            secCreative.classList.remove('hidden-section');
            secBusiness.classList.add('hidden-section');

            heroTitle.innerText = "KUNAL JANGID";
            heroTitle.classList.add('glitch-text');
            heroTitle.setAttribute('data-text', 'KUNAL JANGID');
            heroSubtitle.innerText = "Multidisciplinary Designer & Digital Visualizer";

            navPortfolioLink.style.display = 'block';
            navExperienceLink.style.display = 'none';

            if (!particlesInitialized) {
                initCanvas();
                drawParticles();
                particlesInitialized = true;
            }
        }

        // Reset scroll strictly to top when switching major modes
        window.scrollTo(0, 0);
    }

    // EVENT LISTENERS: SPLIT LANDING
    btnBusiness.addEventListener('click', () => {
        enterMode('business');
    });
    btnCreative.addEventListener('click', () => {
        enterMode('creative');
    });

    // EVENT LISTENERS: NAV TOGGLE
    modeToggle.addEventListener('change', (e) => {
        const newMode = e.target.checked ? 'creative' : 'business';
        htmlEl.setAttribute('data-theme', newMode);
        applyModeContent(newMode);
    });

    // ---- PARTICLES (Creative Mode Only visually) ----
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let resizeTimer;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        particles = [];
        const particleCount = Math.floor((width * height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function drawParticles() {
        if (currentMode !== 'creative') {
            // Pause animation loop if not in creative mode
            requestAnimationFrame(drawParticles);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#00eaff';

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 234, 255, ${0.15 - distance / 666})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        if (particlesInitialized) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initCanvas, 200);
        }
    });

    // ---- SCROLL INTERACTIONS ----
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        if (currentMode === 'landing') return;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollAmount = window.scrollY;
        progressBar.style.width = `${(scrollAmount / docHeight) * 100}%`;
    });

    // Smooth Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const navContainer = document.querySelector('.nav-links');
    const navOffset = 70;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navOffset,
                    behavior: 'smooth'
                });
            }
            if (window.innerWidth <= 768) {
                navContainer.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('active');
    });

    // ---- INTERSECTION OBSERVERS (Animations) ----
    let countersStarted = false;
    const statCounters = document.querySelectorAll('.counter');
    const progressBars = document.querySelectorAll('.progress');

    function initializeObservers() {
        const revealElements = document.querySelectorAll('.reveal');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Counters (Creative Stats)
                    if (entry.target.id === 'summary-creative' && !countersStarted && currentMode === 'creative') {
                        countersStarted = true;
                        statCounters.forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            const duration = 2000;
                            const step = target / (duration / 16);
                            let current = 0;

                            const updateCounter = () => {
                                current += step;
                                if (current < target) {
                                    counter.innerText = Math.ceil(current);
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.innerText = target + (target > 50 ? '+' : '');
                                }
                            };
                            updateCounter();
                        });
                    }

                    // Progress Bars (Creative Skills)
                    if (entry.target.id === 'skills-creative') {
                        setTimeout(() => {
                            progressBars.forEach(bar => {
                                bar.style.width = bar.getAttribute('data-width');
                            });
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => sectionObserver.observe(el));
    }

    // ---- CREATIVE PORTFOLIO MODAL ----
    const imageModal = document.getElementById('image-modal');
    const videoModal = document.getElementById('video-modal');

    if (imageModal) {
        const modalImg = document.getElementById('modal-img');
        const captionText = document.getElementById('caption');
        const closeBtn = document.querySelector('.close-modal');

        window.openModal = function (src, title, desc) {
            if (currentMode !== 'creative') return;
            modalImg.src = src;
            captionText.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            imageModal.classList.add('open');
        };

        closeBtn.addEventListener('click', () => { imageModal.classList.remove('open'); modalImg.src = ''; });
        imageModal.addEventListener('click', (e) => { if (e.target === imageModal) { imageModal.classList.remove('open'); modalImg.src = ''; } });
    }

    if (videoModal) {
        const modalVideo = document.getElementById('modal-video');
        const videoCaption = document.getElementById('video-caption');
        const closeVideoBtn = document.querySelector('.close-video-modal');

        window.openVideoModal = function (src, title, desc) {
            if (currentMode !== 'creative') return;
            modalVideo.src = src;
            videoCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            videoModal.classList.add('open');
            modalVideo.play();
        };

        closeVideoBtn.addEventListener('click', () => { videoModal.classList.remove('open'); modalVideo.pause(); modalVideo.src = ''; });
        videoModal.addEventListener('click', (e) => { if (e.target === videoModal) { videoModal.classList.remove('open'); modalVideo.pause(); modalVideo.src = ''; } });
    }

    // ---- PORTFOLIO DATA RENDERING ----
    function renderPortfolio() {
        if (typeof portfolioData === 'undefined') {
            console.error("portfolioData is not defined. Make sure portfolio-data.js is linked before script.js.");
            return;
        }

        // Render Graphic Design Grid
        const graphicGrid = document.getElementById('graphic-design-grid');
        if (graphicGrid && portfolioData.graphics) {
            let graphicHTML = '';
            portfolioData.graphics.forEach(item => {
                const title = item.title.replace(/'/g, "\\'");
                const desc = item.description.replace(/'/g, "\\'");
                graphicHTML += `
                    <div class="gallery-item glass-card" onclick="openModal('${item.image}', '${title}', '${desc}')">
                        <div class="item-overlay"></div>
                        <img src="${item.image}" alt="${item.category}" loading="lazy" onerror="this.src='${item.fallbackImage || ''}'">
                        <div class="item-info">
                            <h4>${item.title}</h4>
                            <p>${item.category}</p>
                        </div>
                    </div>
                `;
            });
            graphicGrid.innerHTML = graphicHTML;
        }

        // Render Video Edits Grid
        const videoGrid = document.getElementById('video-edits-grid');
        if (videoGrid && portfolioData.videos) {
            let videoHTML = '';
            portfolioData.videos.forEach(item => {
                const title = item.title.replace(/'/g, "\\'");
                const desc = item.description.replace(/'/g, "\\'");
                videoHTML += `
                    <div class="video-card glass-card" onclick="openVideoModal('${item.videoSrc}', '${title}', '${desc}')" style="cursor:pointer;">
                        <div class="video-thumbnail">
                            <div class="play-btn" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-play" style="font-size:2.5rem;color:#00eaff;text-shadow:0 0 20px rgba(0,234,255,0.8);"></i>
                            </div>
                        </div>
                        <div class="item-info">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
            });
            videoGrid.innerHTML = videoHTML;
        }
    }

    // Call render once on load
    renderPortfolio();
});
