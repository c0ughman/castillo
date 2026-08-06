#!/usr/bin/env python3
"""Apply shared chrome (nav, lang toggle, CTA strip, footer) to EN + ES pages."""
import os, re, glob, sys

import os
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LANG_BLOCK_RE = re.compile(
    r'<div class="nav__lang">.*?</div>', re.S)


def lang_block(en_href, es_href, active):
    en_cls = 'nav__lang-btn nav__lang-btn--active' if active == 'en' else 'nav__lang-btn'
    es_cls = 'nav__lang-btn nav__lang-btn--active' if active == 'es' else 'nav__lang-btn'
    en_cur = ' aria-current="true"' if active == 'en' else ''
    es_cur = ' aria-current="true"' if active == 'es' else ''
    return (
        '<div class="nav__lang">\n'
        f'            <a href="{en_href}" class="{en_cls}" hreflang="en" lang="en"{en_cur}>EN</a>\n'
        '            <span class="nav__lang-divider">/</span>\n'
        f'            <a href="{es_href}" class="{es_cls}" hreflang="es" lang="es"{es_cur}>ES</a>\n'
        '        </div>'
    )


def alternates(en_href, es_href):
    return (f'    <link rel="alternate" hreflang="en" href="{en_href}">\n'
            f'    <link rel="alternate" hreflang="es" href="{es_href}">\n')


# ---------- ES chrome translations (applied to site/es/**) ----------
ES_NAV = [
    ('<li><a href="index.html" class="is-active">Home</a></li>',
     '<li><a href="index.html" class="is-active">Inicio</a></li>'),
    ('<li><a href="index.html">Home</a></li>',
     '<li><a href="index.html">Inicio</a></li>'),
    ('<li><a href="who-we-are.html" class="is-active">Who We Are</a></li>',
     '<li><a href="who-we-are.html" class="is-active">Qui&eacute;nes Somos</a></li>'),
    ('<li><a href="who-we-are.html">Who We Are</a></li>',
     '<li><a href="who-we-are.html">Qui&eacute;nes Somos</a></li>'),
    ('<li><a href="contact.html" class="is-active">Contact</a></li>',
     '<li><a href="contact.html" class="is-active">Contacto</a></li>'),
    ('<li><a href="contact.html">Contact</a></li>',
     '<li><a href="contact.html">Contacto</a></li>'),
    # project pages use ../ prefixes
    ('<li><a href="../index.html">Home</a></li>',
     '<li><a href="../index.html">Inicio</a></li>'),
    ('<li><a href="../who-we-are.html">Who We Are</a></li>',
     '<li><a href="../who-we-are.html">Qui&eacute;nes Somos</a></li>'),
    ('<li><a href="../contact.html">Contact</a></li>',
     '<li><a href="../contact.html">Contacto</a></li>'),
    # mobile nav
    ('<a href="index.html">Home</a>', '<a href="index.html">Inicio</a>'),
    ('<a href="who-we-are.html">Who We Are</a>', '<a href="who-we-are.html">Qui&eacute;nes Somos</a>'),
    ('<a href="contact.html">Contact</a>', '<a href="contact.html">Contacto</a>'),
    ('<a href="../index.html">Home</a>', '<a href="../index.html">Inicio</a>'),
    ('<a href="../who-we-are.html">Who We Are</a>', '<a href="../who-we-are.html">Qui&eacute;nes Somos</a>'),
    ('<a href="../contact.html">Contact</a>', '<a href="../contact.html">Contacto</a>'),
]

ES_CHROME = [
    ('<html lang="en">', '<html lang="es">'),
    ('aria-label="Open menu"', 'aria-label="Abrir men&uacute;"'),
    ('aria-label="Close menu"', 'aria-label="Cerrar men&uacute;"'),
    # CTA strip
    ('<span class="cta-strip__signature-meta">Studio &middot; Guatemala City</span>',
     '<span class="cta-strip__signature-meta">Estudio &middot; Ciudad de Guatemala</span>'),
    ('<h2 class="cta-strip__title">Let&rsquo;s build something <em>meaningful together.</em></h2>',
     '<h2 class="cta-strip__title">Construyamos algo <em>significativo, juntos.</em></h2>'),
    ('<p class="cta-strip__copy">Whether you&rsquo;re envisioning a new community, a distinctive residence, '
     'or a transformative urban project, we&rsquo;re here to help bring your vision to life.</p>',
     '<p class="cta-strip__copy">Ya sea que est&eacute; imaginando una nueva comunidad, una residencia distintiva '
     'o un proyecto urbano transformador, estamos aqu&iacute; para ayudarle a hacer realidad su visi&oacute;n.</p>'),
    ('class="btn btn--gold btn--no-arrow">Get in Touch</a>',
     'class="btn btn--gold btn--no-arrow">Cont&aacute;ctenos</a>'),
    # footer
    ('<span class="footer__copy">&copy; 2026 Castillo Arquitectos. All rights reserved.</span>',
     '<span class="footer__copy">&copy; 2026 Castillo Arquitectos. Todos los derechos reservados.</span>'),
    # shared form chrome
    ('<span class="eyebrow">Inquiry</span>', '<span class="eyebrow">Consulta</span>'),
    ('<span class="eyebrow">Start a conversation</span>', '<span class="eyebrow">Iniciemos una conversaci&oacute;n</span>'),
    ('Full name <span class="form__required"', 'Nombre completo <span class="form__required"'),
    ('>Email <span class="form__required"', '>Correo electr&oacute;nico <span class="form__required"'),
    ('Project type <span class="form__required"', 'Tipo de proyecto <span class="form__required"'),
    ('Project details <span class="form__required"', 'Detalles del proyecto <span class="form__required"'),
    ('<option value="" disabled selected>Select a category</option>',
     '<option value="" disabled selected>Seleccione una categor&iacute;a</option>'),
    ('<option value="other">Other</option>', '<option value="other">Otro</option>'),
    ('Timeline, location, or scope &mdash; as much as you can share helps us respond.',
     'Plazos, ubicaci&oacute;n o alcance &mdash; cuanto m&aacute;s pueda compartir, mejor podremos responderle.'),
    ('Timeline, location, or scope — as much as you can share helps us respond.',
     'Plazos, ubicaci&oacute;n o alcance &mdash; cuanto m&aacute;s pueda compartir, mejor podremos responderle.'),
    ('<label>Leave this field empty', '<label>Deje este campo vac&iacute;o'),
    ('<span class="form__submit-text">Send message</span>', '<span class="form__submit-text">Enviar mensaje</span>'),
    ('Fields marked <abbr title="required">*</abbr> are required.',
     'Los campos marcados con <abbr title="obligatorio">*</abbr> son obligatorios.'),
    # contact detail labels
    ('<span class="contact-detail__label">Email</span>', '<span class="contact-detail__label">Correo</span>'),
    ('<span class="contact-detail__label">Phone</span>', '<span class="contact-detail__label">Tel&eacute;fono</span>'),
    ('<span class="contact-detail__label">Studio</span>', '<span class="contact-detail__label">Estudio</span>'),
    ('<span class="contact-detail__label">Follow</span>', '<span class="contact-detail__label">S&iacute;guenos</span>'),
    ('<span class="contact-detail__value">Guatemala City, Guatemala</span>',
     '<span class="contact-detail__value">Ciudad de Guatemala, Guatemala</span>'),
    # project page chrome
    ('<span class="project-meta-row__label">Location</span>', '<span class="project-meta-row__label">Ubicaci&oacute;n</span>'),
    ('<span class="project-meta-row__label">Scope</span>', '<span class="project-meta-row__label">Alcance</span>'),
    ('<span class="project-meta-row__label">Area</span>', '<span class="project-meta-row__label">&Aacute;rea</span>'),
    ('<span class="project-meta-row__label">Status</span>', '<span class="project-meta-row__label">Estado</span>'),
    ('<span class="project-meta-row__label">Phases</span>', '<span class="project-meta-row__label">Fases</span>'),
    ('<span class="project-meta-row__label">Collaboration</span>', '<span class="project-meta-row__label">Colaboraci&oacute;n</span>'),
    ('<span class="project-meta-row__label">Recognition</span>', '<span class="project-meta-row__label">Reconocimiento</span>'),
    ('<span class="project-meta-row__label">Residences</span>', '<span class="project-meta-row__label">Residencias</span>'),
    ('<span class="h-panel__btn h-panel__btn--light h-panel__btn--small">Explore</span>',
     '<span class="h-panel__btn h-panel__btn--light h-panel__btn--small">Explorar</span>'),
    ('<span class="related-cta__eyebrow">Start a conversation</span>',
     '<span class="related-cta__eyebrow">Iniciemos una conversaci&oacute;n</span>'),
    ('<span class="related-cta__title">Tell us about your project</span>',
     '<span class="related-cta__title">Cu&eacute;ntenos sobre su proyecto</span>'),
    ('<p class="related__label fade">More in Residential</p>',
     '<p class="related__label fade">M&aacute;s en Residential</p>'),
    ('<p class="related__label fade">More in Community &amp; Master Planning</p>',
     '<p class="related__label fade">M&aacute;s en Community &amp; Master Planning</p>'),
    ('<p class="photo-credit">Photography by Topofilia Studio.</p>',
     '<p class="photo-credit">Fotograf&iacute;a por Topofilia Studio.</p>'),
    ('class="arrow-link">View project</a>', 'class="arrow-link">Ver proyecto</a>'),
    ('<span class="entry__link">Learn more</span>', '<span class="entry__link">Conozca m&aacute;s</span>'),
    ('<span class="eyebrow">Who We Are</span>', '<span class="eyebrow">Qui&eacute;nes Somos</span>'),
    ('<span class="eyebrow">Practice</span>', '<span class="eyebrow">Pr&aacute;ctica</span>'),
    ('<span class="eyebrow">Selected Projects</span>', '<span class="eyebrow">Proyectos Seleccionados</span>'),
    ('<span class="eyebrow">The Team</span>', '<span class="eyebrow">El Equipo</span>'),
    ('<span class="eyebrow">Careers</span>', '<span class="eyebrow">Trabaje con Nosotros</span>'),
    ('<span class="eyebrow">Founder &amp; Director</span>', '<span class="eyebrow">Fundador y Director</span>'),
    ('<span class="eyebrow">Contact</span>', '<span class="eyebrow">Contacto</span>'),
    ('<span class="eyebrow">Direct Contact</span>', '<span class="eyebrow">Contacto Directo</span>'),
    
    ('aria-label="Awards and recognition"', 'aria-label="Premios y reconocimientos"'),
    ('aria-label="Who We Are"', 'aria-label="Qui&eacute;nes Somos"'),
    ('<span class="home-who__list-title">Prix Versailles &mdash; Special Mention</span>',
     '<span class="home-who__list-title">Prix Versailles &mdash; Menci&oacute;n Especial</span>'),
    ('<h3 class="who-awards__title">Prix Versailles &mdash; Special Mention</h3>',
     '<h3 class="who-awards__title">Prix Versailles &mdash; Menci&oacute;n Especial</h3>'),
]


def apply(path, pairs):
    with open(path, encoding='utf-8') as f:
        s = f.read()
    for a, b in pairs:
        s = s.replace(a, b)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)


def set_lang_toggle(path, en_href, es_href, active):
    with open(path, encoding='utf-8') as f:
        s = f.read()
    s, n = LANG_BLOCK_RE.subn(lang_block(en_href, es_href, active), s, count=1)
    if n != 1:
        print(f'!! lang block not replaced in {path}')
    # hreflang alternates in <head>. Always drop any existing ones first: an ES page
    # copied from an already-processed EN page carries the EN-relative hrefs.
    s = re.sub(r'[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n', '', s)
    s = s.replace('    <link rel="stylesheet" href=',
                  alternates(en_href, es_href) + '    <link rel="stylesheet" href=', 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)


# --- EN top-level pages ---
for p in glob.glob(f'{SITE}/*.html'):
    name = os.path.basename(p)
    set_lang_toggle(p, name, f'es/{name}', 'en')

# --- EN project pages ---
for p in glob.glob(f'{SITE}/projects/*.html'):
    name = os.path.basename(p)
    set_lang_toggle(p, name, f'../es/projects/{name}', 'en')

# --- ES top-level pages ---
for p in glob.glob(f'{SITE}/es/*.html'):
    name = os.path.basename(p)
    set_lang_toggle(p, f'../{name}', name, 'es')
    apply(p, ES_NAV + ES_CHROME)

# --- ES project pages ---
for p in glob.glob(f'{SITE}/es/projects/*.html'):
    name = os.path.basename(p)
    set_lang_toggle(p, f'../../projects/{name}', name, 'es')
    apply(p, ES_NAV + ES_CHROME)

print('chrome applied')
