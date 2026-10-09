/**
 * Reliable Land Survey Consultancy - Centralized Top Bar Component
 * Single Source of Truth for top contact & location bar across all pages.
 */
(function() {
    const inlineStyles = `
@keyframes topBarMarquee {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(-25%, 0, 0);
        transform: translate3d(-25%, 0, 0);
    }
}
@-webkit-keyframes topBarMarquee {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(-25%, 0, 0);
        transform: translate3d(-25%, 0, 0);
    }
}

@media (max-width: 768px) {
    .top-bar-exact {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 38px !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        white-space: nowrap !important;
        box-sizing: border-box !important;
        z-index: 1000 !important;
        background: linear-gradient(90deg, #0a192f, #112240, #0a192f) !important;
        border-bottom: 2px solid #f47b20 !important;
        box-shadow: 0 4px 15px rgba(244, 123, 32, 0.3) !important;
    }
    .top-bar-exact::-webkit-scrollbar {
        display: none !important;
    }
    .top-bar-track {
        display: flex !important;
        width: max-content !important;
        min-width: 400% !important;
        align-items: center !important;
        white-space: nowrap !important;
        animation: topBarMarquee 22s linear infinite !important;
        -webkit-animation: topBarMarquee 22s linear infinite !important;
        will-change: transform !important;
        -webkit-backface-visibility: hidden !important;
        backface-visibility: hidden !important;
    }
    .top-bar-content {
        display: inline-flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        width: auto !important;
        padding: 0 28px !important;
        gap: 15px !important;
        font-size: 11px !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
        box-sizing: border-box !important;
    }
    .top-bar-content.top-bar-duplicate {
        display: inline-flex !important;
    }
    .top-bar-left {
        display: inline-flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        gap: 10px !important;
        white-space: nowrap !important;
        font-size: 11px !important;
        flex-shrink: 0 !important;
    }
    .top-bar-item {
        display: inline-flex !important;
        align-items: center !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
    }
    .top-bar-divider {
        display: inline-block !important;
        color: rgba(255, 255, 255, 0.3) !important;
        margin: 0 4px !important;
    }
    .top-bar-right {
        display: inline-flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        gap: 8px !important;
        margin: 0 !important;
        flex-shrink: 0 !important;
    }
    .top-bar-right .top-bar-social {
        width: 24px !important;
        height: 24px !important;
        font-size: 11px !important;
        flex-shrink: 0 !important;
    }
    .top-bar-right .top-bar-social svg {
        width: 12px !important;
        height: 12px !important;
    }
    .nav-exact {
        top: 48px !important;
    }
}

@media (min-width: 769px) {
    .top-bar-track {
        display: flex !important;
        width: 100% !important;
        justify-content: center !important;
        transform: none !important;
        -webkit-transform: none !important;
        animation: none !important;
        -webkit-animation: none !important;
    }
    .top-bar-content.top-bar-duplicate {
        display: none !important;
    }
    .top-bar-content {
        display: flex !important;
        width: 85% !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 0 !important;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .top-bar-content {
        width: 92% !important;
    }
}

@media (hover: hover) and (pointer: fine) {
    .top-bar-exact:hover .top-bar-track {
        animation-play-state: paused !important;
        -webkit-animation-play-state: paused !important;
    }
}
`;

    function buildSegmentHtml(isDuplicate) {
        return `
        <div class="top-bar-content${isDuplicate ? ' top-bar-duplicate' : ''}"${isDuplicate ? ' aria-hidden="true"' : ''}>
            <div class="top-bar-left">
                <span class="top-bar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Pune, Maharashtra
                </span>
                <span class="top-bar-divider">|</span>
                <span class="top-bar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <a href="tel:+918600044688" style="color: inherit; text-decoration: none;">+91 86000 44688</a> / <a href="tel:+919604646777" style="color: inherit; text-decoration: none;">+91 96046 46777</a>
                </span>
            </div>
            <div class="top-bar-right">
                <a href="https://wa.me/919604646777" target="_blank" rel="noopener" class="top-bar-social" aria-label="WhatsApp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="tel:+919604646777" class="top-bar-social" aria-label="Call Us">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </a>
                <a href="mailto:info@reliablelandsurvey.in" class="top-bar-social" aria-label="Email Us">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
            </div>
        </div>`;
    }

    const topBarHtml = `<div class="top-bar-exact">
    <div class="top-bar-track">
        ${buildSegmentHtml(false)}
        ${buildSegmentHtml(true)}
        ${buildSegmentHtml(true)}
        ${buildSegmentHtml(true)}
    </div>
</div>`;

    function injectStyles() {
        if (!document.getElementById('topbar-core-styles')) {
            const style = document.createElement('style');
            style.id = 'topbar-core-styles';
            style.textContent = inlineStyles;
            (document.head || document.documentElement).appendChild(style);
        }
    }

    function renderTopBar() {
        injectStyles();
        const placeholder = document.getElementById('site-topbar') || document.querySelector('.site-topbar');
        if (placeholder) {
            placeholder.outerHTML = topBarHtml;
            return;
        }
        const existing = document.querySelector('.top-bar-exact');
        if (existing) {
            if (!existing.querySelector('.top-bar-track') || existing.querySelectorAll('.top-bar-duplicate').length < 3) {
                existing.outerHTML = topBarHtml;
            }
            return;
        }
        const nav = document.querySelector('.nav-exact') || document.querySelector('nav');
        if (nav && nav.parentNode) {
            nav.insertAdjacentHTML('beforebegin', topBarHtml);
        } else if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', topBarHtml);
        }
    }

    renderTopBar();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderTopBar);
    }
})();
