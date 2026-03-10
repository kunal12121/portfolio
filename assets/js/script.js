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

                    // Counters (Creative Stats) — values auto-read from portfolioData.counts
                    if (entry.target.id === 'summary-creative' && !countersStarted && currentMode === 'creative') {
                        countersStarted = true;
                        const counts = (typeof portfolioData !== 'undefined' && portfolioData.counts) ? portfolioData.counts : {};
                        const mapping = [
                            { id: 'count-graphic', value: counts.graphicDesign || 0 },
                            { id: 'count-video', value: counts.videoEdits || 0 },
                            { id: 'count-ui', value: counts.uiConcepts || 0 }
                        ];
                        mapping.forEach(({ id, value }) => {
                            const el = document.getElementById(id);
                            if (!el) return;
                            const duration = 1800;
                            const step = value / (duration / 16);
                            let current = 0;
                            const tick = () => {
                                current += step;
                                if (current < value) {
                                    el.innerText = Math.ceil(current);
                                    requestAnimationFrame(tick);
                                } else {
                                    el.innerText = value + '+';
                                }
                            };
                            tick();
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

    // ---- PORTFOLIO DATA RENDERING (FOLDER-WINDOW SYSTEM) ----
    function escStr(s) { return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

    function renderPortfolio() {
        if (typeof portfolioData === 'undefined') return;
        renderGraphicDesign();
        renderUxUi();
        renderVideos();
    }

    // ---- GRAPHIC DESIGN: Category → Project folders → Image grid ----
    const graphicGrid = document.getElementById('graphic-design-grid');

    function renderGraphicDesign(catIndex = null, projIndex = null) {
        if (!graphicGrid || !portfolioData.graphicDesign) return;

        if (catIndex === null) {
            // Level 0: Show category folders (brand identity, logo)
            let html = '';
            portfolioData.graphicDesign.forEach((cat, ci) => {
                const count = cat.projects.reduce((acc, p) => acc + p.images.length, 0);
                html += `<div class="folder-card glass-card hover-glow" onclick="drillGraphic(${ci})">
                    <i class="fas fa-folder-open folder-icon"></i>
                    <h4>${cat.category}</h4>
                    <p>${cat.projects.length} project${cat.projects.length !== 1 ? 's' : ''} · ${count} images</p>
                </div>`;
            });
            graphicGrid.innerHTML = `<div class="folder-grid">${html}</div>`;

        } else if (projIndex === null) {
            // Level 1: Show project folders inside a category
            const cat = portfolioData.graphicDesign[catIndex];
            let html = `<div class="folder-breadcrumb">
                <span class="breadcrumb-link" onclick="drillGraphic()">Graphic Design</span>
                <i class="fas fa-chevron-right"></i>
                <span>${cat.category}</span></div>
            <div class="folder-grid">`;
            cat.projects.forEach((proj, pi) => {
                html += `<div class="folder-card glass-card hover-glow" onclick="drillGraphic(${catIndex}, ${pi})">
                    <i class="fas fa-folder folder-icon"></i>
                    <h4>${proj.name}</h4>
                    <p>${proj.images.length} image${proj.images.length !== 1 ? 's' : ''}</p>
                </div>`;
            });
            html += `</div>`;
            graphicGrid.innerHTML = html;

        } else {
            // Level 2: Show all images in a project
            const cat = portfolioData.graphicDesign[catIndex];
            const proj = cat.projects[projIndex];
            let html = `<div class="folder-breadcrumb">
                <span class="breadcrumb-link" onclick="drillGraphic()">Graphic Design</span>
                <i class="fas fa-chevron-right"></i>
                <span class="breadcrumb-link" onclick="drillGraphic(${catIndex})">${cat.category}</span>
                <i class="fas fa-chevron-right"></i>
                <span>${proj.name}</span></div>
            <div class="image-grid">`;
            proj.images.forEach(img => {
                const src = escStr(img.path);
                const name = escStr(img.file.replace(/\.[^.]+$/, ''));
                html += `<div class="gallery-item" onclick="openModal('${src}', '${name}', '${escStr(proj.name)}')">
                    <img src="${img.path}" alt="${img.file}" loading="lazy">
                    <div class="item-overlay"></div>
                    <div class="item-info"><h4>${img.file.replace(/\.[^.]+$/, '')}</h4></div>
                </div>`;
            });
            html += `</div>`;
            graphicGrid.innerHTML = html;
        }
    }

    window.drillGraphic = function (ci, pi) {
        renderGraphicDesign(ci !== undefined ? ci : null, pi !== undefined ? pi : null);
    };

    // ---- UX/UI: Project folders → Image grid ----
    const uxGrid = document.getElementById('ux-ui-grid');

    function renderUxUi(projIndex = null) {
        if (!uxGrid || !portfolioData.uxUi) return;

        if (projIndex === null) {
            // Level 0: Project folders
            let html = '';
            portfolioData.uxUi.forEach((proj, pi) => {
                const cover = proj.images[0] ? proj.images[0].path : '';
                html += `<div class="folder-card glass-card hover-glow" onclick="drillUx(${pi})" ${cover ? `style="background-image:url('${cover}');background-size:cover;background-position:center;"` : ''}>
                    <div class="folder-card-overlay"></div>
                    <i class="fas fa-mobile-alt folder-icon" style="position:relative;z-index:2;"></i>
                    <h4 style="position:relative;z-index:2;">${proj.name}</h4>
                    <p style="position:relative;z-index:2;">${proj.images.length} screen${proj.images.length !== 1 ? 's' : ''}</p>
                </div>`;
            });
            uxGrid.innerHTML = `<div class="folder-grid">${html}</div>`;
        } else {
            const proj = portfolioData.uxUi[projIndex];
            let html = `<div class="folder-breadcrumb">
                <span class="breadcrumb-link" onclick="drillUx()">UX/UI Projects</span>
                <i class="fas fa-chevron-right"></i>
                <span>${proj.name}</span></div>
            <div class="image-grid">`;
            proj.images.forEach(img => {
                const src = escStr(img.path);
                const name = escStr(img.file.replace(/\.[^.]+$/, ''));
                html += `<div class="gallery-item" onclick="openModal('${src}', '${name}', '${escStr(proj.name)}')">
                    <img src="${img.path}" alt="${img.file}" loading="lazy">
                    <div class="item-overlay"></div>
                    <div class="item-info"><h4>${img.file.replace(/\.[^.]+$/, '')}</h4></div>
                </div>`;
            });
            html += `</div>`;
            uxGrid.innerHTML = html;
        }
    }

    window.drillUx = function (pi) { renderUxUi(pi !== undefined ? pi : null); };

    // ---- VIDEO EDITS ----
    function renderVideos() {
        const videoGrid = document.getElementById('video-edits-grid');
        if (!videoGrid || !portfolioData.videos) return;
        let html = '';
        portfolioData.videos.forEach(item => {
            const src = escStr(item.path);
            const name = escStr(item.name);
            html += `<div class="video-card glass-card" onclick="openVideoModal('${src}', '${name}', 'Video Edit')" style="cursor:pointer;">
                <div class="video-thumbnail">
                    <div class="play-btn-center"><i class="fas fa-play"></i></div>
                </div>
                <div class="item-info" style="position:static;opacity:1;transform:none;padding:15px;">
                    <h4>${item.name}</h4>
                    <p>Video Edit</p>
                </div>
            </div>`;
        });
        videoGrid.innerHTML = html;
    }

    // Call render once on load
    renderPortfolio();
});
