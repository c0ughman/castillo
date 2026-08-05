// Shared site behavior — nav scroll, mobile menu, fade-in, hero rotation, language toggle (mock)

(function () {
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.5;

        const revealVideo = () => heroVideo.classList.add('is-ready');
        if (heroVideo.readyState >= 2) {
            revealVideo();
        } else {
            ['canplay', 'loadeddata', 'loadedmetadata'].forEach(ev =>
                heroVideo.addEventListener(ev, revealVideo, { once: true })
            );
            setTimeout(revealVideo, 3000);
        }

        // Nav + hero text all reveal together 2s after video starts
        const heroIntroEls = document.querySelectorAll('.hero-intro');
        const navIntroEl = document.querySelector('.nav--intro-hidden');

        const triggerIntro = () => {
            if (navIntroEl) {
                navIntroEl.classList.remove('nav--intro-hidden');
                navIntroEl.style.pointerEvents = '';
            }
            heroIntroEls.forEach(el => el.classList.add('is-in'));
        };

        const scheduleIntro = () => setTimeout(triggerIntro, 2200);

        if (heroVideo.readyState >= 2) {
            scheduleIntro();
        } else {
            heroVideo.addEventListener('canplay', scheduleIntro, { once: true });
            // Hard fallback at 4s in case video never fires canplay
            setTimeout(() => { if (navIntroEl && navIntroEl.classList.contains('nav--intro-hidden')) triggerIntro(); }, 4000);
        }

        // Parallax — translate the whole hero__bg at 40% of scroll speed
        const heroBg = heroVideo.closest('.hero__bg') || heroVideo.parentElement;
        const heroSection = heroBg ? heroBg.closest('.hero') : null;
        if (heroSection && heroBg) {
            let parallaxRaf = null;
            window.addEventListener('scroll', () => {
                if (parallaxRaf) return;
                parallaxRaf = requestAnimationFrame(() => {
                    parallaxRaf = null;
                    const scrollY = window.scrollY;
                    if (scrollY > heroSection.offsetHeight) return;
                    heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
                });
            }, { passive: true });
        }
    }

    // Blur effect on hero backgrounds as you scroll
    const heroBgs = document.querySelectorAll('.hero__bg');
    if (heroBgs.length) {
        let blurRaf = null;
        const updateBlur = () => {
            heroBgs.forEach(heroBg => {
                const heroSection = heroBg.closest('.hero');
                if (!heroSection) return;
                const scrollY = window.scrollY;
                const heroStart = heroSection.offsetTop;
                const heroHeight = heroSection.offsetHeight;
                const effectStartOffset = 100;
                const scrollRelative = scrollY - (heroStart + effectStartOffset);
                const totalDistance = heroHeight - effectStartOffset;
                const progress = Math.max(0, Math.min(1, scrollRelative / totalDistance));
                const maxBlur = 12;
                const blurAmount = progress * maxBlur;
                heroBg.style.filter = `blur(${blurAmount}px)`;
            });
        };
        window.addEventListener('scroll', () => {
            if (blurRaf) return;
            blurRaf = requestAnimationFrame(() => {
                blurRaf = null;
                updateBlur();
            });
        }, { passive: true });
        updateBlur();
    }

    const nav = document.getElementById('mainNav');
    const isHero = nav && nav.classList.contains('nav--hero');

    if (nav) {
        if (!isHero) nav.classList.add('nav--solid');
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (isHero) {
                if (y > 60) {
                    nav.classList.add('nav--scrolled');
                } else {
                    nav.classList.remove('nav--scrolled');
                }
            }
        });
    }

    // Mobile nav
    const toggle = document.getElementById('mobileToggle');
    const mobile = document.getElementById('mobileNav');
    const close  = document.getElementById('mobileClose');
    if (toggle && mobile) {
        toggle.addEventListener('click', () => mobile.classList.add('is-open'));
        if (close) close.addEventListener('click', () => mobile.classList.remove('is-open'));
        mobile.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => mobile.classList.remove('is-open'));
        });
    }

    // Hero slide rotation + dynamic caption (home only)
    const slides = document.querySelectorAll('.hero__slide');
    const captionEl    = document.getElementById('heroCaption');
    const captionText  = document.getElementById('heroCaptionText');
    const captionCount = document.getElementById('heroCaptionCounter');

    function setCaption(idx) {
        if (!captionEl || !slides.length) return;
        const slide = slides[idx];
        const total = slides.length;
        const text = (slide && slide.dataset && slide.dataset.caption) || '';
        captionEl.classList.add('is-fading');
        setTimeout(() => {
            if (captionText) captionText.innerHTML = text;
            if (captionCount) {
                const n = String(idx + 1).padStart(2, '0');
                const t = String(total).padStart(2, '0');
                captionCount.textContent = `${n} / ${t}`;
            }
            captionEl.classList.remove('is-fading');
        }, 320);
    }

    if (slides.length) {
        // Initialise on load (no fade-out flicker)
        if (captionEl) {
            const total = slides.length;
            const active = document.querySelector('.hero__slide.is-active') || slides[0];
            const idx = Array.from(slides).indexOf(active);
            if (captionText) captionText.innerHTML = active.dataset.caption || '';
            if (captionCount) {
                captionCount.textContent =
                    `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
            }
        }

        if (slides.length > 1) {
            let i = 0;
            setInterval(() => {
                slides[i].classList.remove('is-active');
                i = (i + 1) % slides.length;
                slides[i].classList.add('is-active');
                setCaption(i);
            }, 10000);
        }
    }

    // Fade-in observer (with on-load pass + safety timeout)
    const fades = document.querySelectorAll('.fade');
    if (fades.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        fades.forEach(el => io.observe(el));

        // Reveal anything already in the initial viewport without waiting for scroll
        requestAnimationFrame(() => {
            const vh = window.innerHeight;
            fades.forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.top < vh && r.bottom > 0) {
                    el.classList.add('is-in');
                    io.unobserve(el);
                }
            });
        });

        // Safety net: if anything is still hidden after 3.5s, reveal it
        setTimeout(() => {
            document.querySelectorAll('.fade:not(.is-in)').forEach(el => el.classList.add('is-in'));
        }, 3500);
    }

    // Language toggle (visual mock — no actual page swap yet)
    document.querySelectorAll('.nav__lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav__lang-btn').forEach(b => b.classList.remove('nav__lang-btn--active'));
            btn.classList.add('nav__lang-btn--active');
        });
    });

    // Scroll-pinned entry reveal — same mechanic at every viewport width
    // (the CSS driving it is unconditional, sized in vw/vh so it fits a
    // portrait phone the same way it fits a desktop window).
    const stages = document.querySelectorAll('.entry-stage');
    if (stages.length) {
        const data = new Map();

        const measure = (stage) => {
            const pin = stage.querySelector('.entry-stage__pin');
            const media = stage.querySelector('.entry__media');
            const track = stage.querySelector('.entry-stage__track');
            if (!pin || !media) return;
            const reverse = stage.classList.contains('entry-stage--reverse-h');
            media.style.transform = '';
            if (track) {
                track.style.transform = '';
                // Reversed track starts pulled all the way left so the entry-stage
                // (now the rightmost panel) is the first thing in view.
                if (reverse) {
                    const trackTravel = Math.max(0, track.scrollWidth - pin.offsetWidth);
                    if (trackTravel > 0) {
                        track.style.transform = `translate3d(${-trackTravel}px, 0, 0)`;
                    }
                }
            }
            const pinRect = pin.getBoundingClientRect();
            const mRect = media.getBoundingClientRect();
            const initCx = (mRect.left - pinRect.left) + mRect.width / 2;
            const initCy = (mRect.top  - pinRect.top)  + mRect.height / 2;
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // trackTravel only changes on resize (it's scrollWidth/offsetWidth,
            // both layout-dependent) — cache it here instead of reading it
            // every scroll frame in update(), which forced an extra layout
            // pass on top of the unavoidable one below and was a real
            // contributor to the janky/choppy motion on mobile.
            const trackTravel = track ? Math.max(0, track.scrollWidth - pin.offsetWidth) : 0;

            // Mobile only: glide the teaser's caption to true screen-center
            // as the image expands, instead of leaving it wherever it sits
            // in the stacked image/text card — that static position reads
            // as low/small once the image behind it goes full-screen.
            // Desktop's copy sits beside the image already and stays put.
            let copy = null, copyTx = 0, copyTy = 0;
            if (vw <= 1024) {
                copy = stage.querySelector('.entry__copy');
                if (copy) {
                    copy.style.transform = '';
                    const cRect = copy.getBoundingClientRect();
                    const initCcx = (cRect.left - pinRect.left) + cRect.width / 2;
                    const initCcy = (cRect.top  - pinRect.top)  + cRect.height / 2;
                    copyTx = vw / 2 - initCcx;
                    copyTy = vh / 2 - initCcy;
                }
            }

            data.set(stage, {
                media,
                track,
                pin,
                reverse,
                trackTravel,
                copy,
                copyTx,
                copyTy,
                // Desktop's zoom (phase1End 0.25 below) stays exactly as it
                // was. Mobile spreads the same zoom over more scroll
                // distance — still feedback that the expand still felt a
                // little glitchy; less scale-per-pixel-scrolled reads
                // smoother without changing the desktop feel at all.
                isMobile: vw <= 1024,
                // "Cover" scale — fills both axes. A width-only scale left
                // portrait/mobile viewports (tall relative to the media's
                // own box) with dead space above and below the image.
                scale: Math.max(vw / mRect.width, vh / mRect.height),
                tx: vw / 2 - initCx,
                ty: vh / 2 - initCy,
            });
        };

        const smoothstep = (t) => t * t * (3 - 2 * t);

        // Two-phase update: read every stage's rect first, then write all
        // style mutations after. Reading stage2's rect *after* stage1 had
        // already written new transforms/custom-properties would force a
        // synchronous layout recalc mid-loop (layout thrashing) — batching
        // reads-then-writes avoids that entirely.
        const updateAll = () => {
            const frames = [];
            for (const stage of stages) {
                const d = data.get(stage);
                if (!d) continue;
                const rect = stage.getBoundingClientRect();
                const pinScroll = rect.height - window.innerHeight;
                if (pinScroll <= 0) continue;
                frames.push({ stage, d, raw: Math.max(0, Math.min(1, -rect.top / pinScroll)) });
            }

            for (const { stage, d, raw } of frames) {
                if (d.track) {
                    // Phase 1: image expansion (0 → phase1End). Phase 2: horizontal track translation.
                    // Desktop keeps the original 0.25; mobile spreads the zoom over a bit
                    // more scroll distance so it reads as easing in rather than snapping.
                    const phase1End = d.isMobile ? 0.34 : 0.25;
                    const p1 = Math.max(0, Math.min(1, (raw - 0.03) / (phase1End - 0.03)));
                    const p2 = Math.max(0, Math.min(1, (raw - phase1End) / (1 - phase1End)));
                    const p = smoothstep(p1);
                    const s = 1 + (d.scale - 1) * p;
                    d.media.style.transform =
                        `translate3d(${d.tx * p}px, ${d.ty * p}px, 0) scale(${s})`;
                    stage.style.setProperty('--p', p.toFixed(3));

                    if (d.copy) {
                        d.copy.style.transform = `translate3d(${d.copyTx * p}px, ${d.copyTy * p}px, 0)`;
                    }

                    if (d.trackTravel > 0) {
                        const sp2 = smoothstep(p2);
                        // Reversed: start at -trackTravel and ease toward 0 (track moves right,
                        // panels enter from the left, CTA finishes flush at the viewport's left edge).
                        const translateX = d.reverse
                            ? -d.trackTravel * (1 - sp2)
                            : -d.trackTravel * sp2;
                        d.track.style.transform = `translate3d(${translateX}px, 0, 0)`;
                    }
                } else {
                    const tNorm = Math.max(0, Math.min(1, (raw - 0.08) / 0.92));
                    const p = smoothstep(tNorm);
                    const s = 1 + (d.scale - 1) * p;
                    d.media.style.transform =
                        `translate3d(${d.tx * p}px, ${d.ty * p}px, 0) scale(${s})`;
                    stage.style.setProperty('--p', p.toFixed(3));
                }
            }
        };

        const measureAll = () => stages.forEach(measure);

        const init = () => { measureAll(); updateAll(); };
        if (document.readyState === 'complete') init();
        else window.addEventListener('load', init);

        let raf = null;
        window.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { raf = null; updateAll(); });
        }, { passive: true });

        let resizeT = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(() => {
                stages.forEach(s => {
                    const d = data.get(s);
                    if (!d) return;
                    d.media.style.transform = '';
                    if (d.copy) d.copy.style.transform = '';
                });
                init();
            }, 120);
        });
    }

    // Horizontal scroll panels (home page) — desktop only, kicks in after entry-stage expansion
    const hScrolls = document.querySelectorAll('.h-scroll');
    const hScrollMQ = window.matchMedia('(min-width: 1025px)');
    if (hScrolls.length && hScrollMQ.matches) {
        const updateH = () => {
            hScrolls.forEach(section => {
                const sticky = section.querySelector('.h-scroll__sticky');
                const track  = section.querySelector('.h-scroll__track');
                if (!sticky || !track) return;
                const rect = section.getBoundingClientRect();
                const total = section.offsetHeight - sticky.offsetHeight;
                if (total <= 0) return;
                const scrolled = Math.max(0, Math.min(total, -rect.top));
                const progress = scrolled / total;
                const trackTravel = track.scrollWidth - sticky.offsetWidth;
                if (trackTravel <= 0) return;
                track.style.transform = `translate3d(${-trackTravel * progress}px, 0, 0)`;
            });
        };

        let hRaf = null;
        const onScroll = () => {
            if (hRaf) return;
            hRaf = requestAnimationFrame(() => { hRaf = null; updateH(); });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateH);
        window.addEventListener('load', updateH);
        updateH();
    }

    // Subnav active state — highlight current anchor in view
    const subnavLinks = document.querySelectorAll('.subnav a[href^="#"]');
    if (subnavLinks.length) {
        const sections = Array.from(subnavLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
        const setActive = () => {
            const y = window.scrollY + 200;
            let active = sections[0];
            for (const s of sections) {
                if (s.offsetTop <= y) active = s;
            }
            subnavLinks.forEach(a => {
                a.classList.toggle('is-active', a.getAttribute('href') === '#' + active.id);
            });
        };
        window.addEventListener('scroll', setActive);
        setActive();
    }

    /* Forms — AJAX submit to Netlify Forms, inline confirmation, no redirect.
       Brief 4.4: honeypot preferred over CAPTCHA; recipient configured in Netlify. */
    document.querySelectorAll('form[data-ajax-form]').forEach(form => {
        const status = form.querySelector('.form__status');
        const submit = form.querySelector('.form__submit');
        const submitText = form.querySelector('.form__submit-text');
        const originalText = submitText ? submitText.textContent : '';

        const say = (msg, state) => {
            if (!status) return;
            status.textContent = msg;
            status.hidden = false;
            status.classList.toggle('form__status--error', state === 'error');
        };

        form.addEventListener('submit', async e => {
            e.preventDefault();

            // Honeypot: a filled hidden field means a bot. Fail silently.
            if (form.elements.website && form.elements.website.value) return;

            const invalid = form.querySelector(':invalid');
            if (invalid) {
                invalid.focus();
                say('Please complete the required fields.', 'error');
                return;
            }

            if (submit) submit.disabled = true;
            if (submitText) submitText.textContent = 'Sending…';

            try {
                const body = new URLSearchParams(new FormData(form)).toString();
                const res = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body
                });
                if (!res.ok) throw new Error(res.status);
                form.reset();
                say(form.dataset.successMessage || 'Thank you. Castillo Arquitectos will be in touch.');
                if (submit) submit.hidden = true;
            } catch (err) {
                say('Something went wrong. Please email info@castilloarquitectos.com.', 'error');
                if (submit) submit.disabled = false;
                if (submitText) submitText.textContent = originalText;
            }
        });
    });
})();
