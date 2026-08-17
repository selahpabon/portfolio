/* ===========================================================
   Work page: "Other Work" coverflow carousel + detail panel
   Vanilla JS, no dependencies. Scoped entirely to work.html.
   =========================================================== */

(function () {
  'use strict';

  var carousel = document.getElementById('carousel');
  var track = document.getElementById('carousel-track');
  if (!carousel || !track) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll('.carousel-card'));
  var dotsWrap = document.getElementById('carousel-dots');
  var carouselPrev = document.getElementById('carousel-prev');
  var carouselNext = document.getElementById('carousel-next');
  var backdrop = document.getElementById('work-panel-backdrop');
  var panel = document.getElementById('work-panel');
  var panelClose = document.getElementById('work-panel-close');
  var panelTitle = document.getElementById('work-panel-title');
  var panelCaption = document.getElementById('work-panel-caption');
  var photoViewer = document.getElementById('work-panel-photo-viewer');
  var photoStage = document.getElementById('work-panel-photo-stage');
  var photoPrev = document.getElementById('work-panel-photo-prev');
  var photoNext = document.getElementById('work-panel-photo-next');
  var photoCount = document.getElementById('work-panel-photo-count');
  var panelActions = document.getElementById('work-panel-actions');
  var panelAccordion = document.getElementById('work-panel-accordion');

  var currentPhotoTitle = '';
  var currentPhotoTotal = 0;
  var currentPhotoIndex = 0;

  function renderPhoto() {
    photoStage.innerHTML = '';
    var photo = document.createElement('div');
    photo.className = 'work-panel-photo';
    photo.setAttribute('role', 'img');
    photo.setAttribute(
      'aria-label',
      'Placeholder photo ' + (currentPhotoIndex + 1) + ' of ' + currentPhotoTotal + ' for ' + currentPhotoTitle
    );
    photo.textContent = 'Photo ' + (currentPhotoIndex + 1);
    photoStage.appendChild(photo);
    photoCount.textContent = (currentPhotoIndex + 1) + ' / ' + currentPhotoTotal;
  }

  function goToPhoto(index) {
    if (currentPhotoTotal === 0) return;
    // Wrap around at either end.
    currentPhotoIndex = (index + currentPhotoTotal) % currentPhotoTotal;
    renderPhoto();
  }

  photoPrev.addEventListener('click', function () {
    goToPhoto(currentPhotoIndex - 1);
  });

  photoNext.addEventListener('click', function () {
    goToPhoto(currentPhotoIndex + 1);
  });

  /* ---------- Coverflow: scale/blur/opacity by distance from center ---------- */

  var MAX_DIST_SCALE = 1.6; // in card-widths; beyond this, fully "far" styling
  var rafPending = false;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp01(t) {
    return Math.max(0, Math.min(1, t));
  }

  function updateCoverflow() {
    rafPending = false;
    var trackRect = track.getBoundingClientRect();
    var trackCenter = trackRect.left + trackRect.width / 2;

    cards.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      var cardCenter = rect.left + rect.width / 2;
      var dist = Math.abs(cardCenter - trackCenter);
      var t = clamp01(dist / (rect.width * MAX_DIST_SCALE));

      var scale = lerp(1, 0.78, t);
      var blur = lerp(0, 4, t);
      var opacity = lerp(1, 0.55, t);

      card.style.transform = 'scale(' + scale.toFixed(3) + ')';
      card.style.filter = blur > 0.05 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
      card.style.opacity = opacity.toFixed(3);
      card.classList.toggle('is-active', t < 0.15);
    });

    updateActiveDot();
  }

  function requestCoverflowUpdate() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(updateCoverflow);
  }

  function nearestCardIndex() {
    var trackRect = track.getBoundingClientRect();
    var trackCenter = trackRect.left + trackRect.width / 2;
    var closestIndex = 0;
    var closestDist = Infinity;
    cards.forEach(function (card, i) {
      var rect = card.getBoundingClientRect();
      var cardCenter = rect.left + rect.width / 2;
      var dist = Math.abs(cardCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    return closestIndex;
  }

  function scrollToCard(index, behavior) {
    index = Math.max(0, Math.min(cards.length - 1, index));
    cards[index].scrollIntoView({
      behavior: behavior || 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }

  /* ---------- Edge arrow buttons (click-to-navigate) ---------- */

  if (carouselPrev) {
    carouselPrev.addEventListener('click', function () {
      scrollToCard(nearestCardIndex() - 1);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', function () {
      scrollToCard(nearestCardIndex() + 1);
    });
  }

  /* ---------- Position indicator (dots) ---------- */

  var dots = [];

  function buildDots() {
    cards.forEach(function (card, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to work item ' + (i + 1) + ' of ' + cards.length);
      dot.addEventListener('click', function () {
        scrollToCard(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function updateActiveDot() {
    var active = nearestCardIndex();
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === active);
    });
  }

  /* ---------- Scroll listener (covers touch swipe + native scroll) ---------- */

  track.addEventListener('scroll', requestCoverflowUpdate, { passive: true });
  window.addEventListener('resize', requestCoverflowUpdate);

  /* ---------- Mouse drag-to-scroll (touch already scrolls natively) ---------- */

  var isDragging = false;
  var dragStartX = 0;
  var dragStartScroll = 0;
  var dragMoved = 0;

  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    isDragging = true;
    dragMoved = 0;
    dragStartX = e.clientX;
    dragStartScroll = track.scrollLeft;
    track.classList.add('dragging');
  });

  track.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    var delta = e.clientX - dragStartX;
    dragMoved = Math.max(dragMoved, Math.abs(delta));
    track.scrollLeft = dragStartScroll - delta;
    requestCoverflowUpdate();
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    // Settle on the nearest card after a drag release.
    scrollToCard(nearestCardIndex());
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointerleave', function () {
    if (isDragging) endDrag();
  });

  /* ---------- Keyboard navigation (arrow keys, when carousel has focus) ---------- */

  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToCard(nearestCardIndex() + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToCard(nearestCardIndex() - 1);
    }
  });

  /* ---------- Detail panel ---------- */

  var lastFocused = null;
  var panelFocusables = [];

  // Action buttons: rendered in this order, only when a card has the
  // matching data-* attribute. A piece with no PDF/demo/link ends up
  // with an empty (hidden) actions row -- no dead/disabled buttons.
  var ACTION_BUTTONS = [
    { attr: 'data-pdf', labelAttr: 'data-pdf-label', defaultLabel: 'View PDF' },
    { attr: 'data-demo', labelAttr: 'data-demo-label', defaultLabel: 'Watch demo' },
    { attr: 'data-link', labelAttr: 'data-link-label', defaultLabel: 'View live site' }
  ];

  function buildActions(card) {
    panelActions.innerHTML = '';

    ACTION_BUTTONS.forEach(function (btn) {
      var href = card.getAttribute(btn.attr);
      if (!href) return;

      var a = document.createElement('a');
      a.className = 'btn work-panel-action-btn';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = card.getAttribute(btn.labelAttr) || btn.defaultLabel;
      panelActions.appendChild(a);
    });

    panelActions.hidden = panelActions.childElementCount === 0;
  }

  // Accordion sections: fixed order, each omitted entirely (not shown
  // empty/disabled) when a piece has no data-* content for it.
  var ACCORDION_SECTIONS = [
    { key: 'bg', attr: 'data-bg', title: 'Background & Why' },
    { key: 'materials', attr: 'data-materials', title: 'Materials' },
    { key: 'process', attr: 'data-process', title: 'Process' },
    { key: 'reflection', attr: 'data-reflection', title: 'Reflection' }
  ];

  function buildAccordion(card) {
    panelAccordion.innerHTML = '';

    // Which section opens by default -- per-piece override via
    // data-default-open, falling back to Background & Why.
    var defaultOpenKey = card.getAttribute('data-default-open') || 'bg';

    ACCORDION_SECTIONS.forEach(function (section) {
      var content = card.getAttribute(section.attr);
      if (!content) return;

      var details = document.createElement('details');
      details.className = 'work-panel-accordion-section';
      if (section.key === defaultOpenKey) {
        details.open = true;
      }

      var summary = document.createElement('summary');
      summary.textContent = section.title;
      details.appendChild(summary);

      var body = document.createElement('p');
      body.textContent = content;
      details.appendChild(body);

      panelAccordion.appendChild(details);
    });
  }

  function getFocusables() {
    return Array.prototype.slice.call(
      panel.querySelectorAll('button, a[href], summary, [tabindex]:not([tabindex="-1"])')
    );
  }

  function openPanel(card) {
    // Ignore the click that immediately follows a real drag.
    if (dragMoved > 6) return;

    lastFocused = card;

    var title = card.getAttribute('data-title') || '';
    var caption = card.getAttribute('data-caption') || '';
    var numPhotos = parseInt(card.getAttribute('data-photo-count'), 10) || 0;

    panelTitle.textContent = title;
    panelCaption.textContent = caption;

    currentPhotoTitle = title;
    currentPhotoTotal = numPhotos;
    currentPhotoIndex = 0;

    var hasMultiplePhotos = numPhotos > 1;
    photoPrev.hidden = !hasMultiplePhotos;
    photoNext.hidden = !hasMultiplePhotos;
    photoViewer.hidden = numPhotos === 0;

    if (numPhotos > 0) {
      renderPhoto();
    } else {
      photoStage.innerHTML = '';
    }

    buildActions(card);
    buildAccordion(card);

    backdrop.hidden = false;
    panel.hidden = false;
    document.body.classList.add('panel-open');

    // Next frame so the hidden -> visible change transitions in.
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      panel.classList.add('is-open');
    });

    panelFocusables = getFocusables();
    panelClose.focus();

    document.addEventListener('keydown', onPanelKeydown);
    backdrop.addEventListener('click', closePanel);
  }

  function closePanel() {
    backdrop.classList.remove('is-open');
    panel.classList.remove('is-open');
    document.body.classList.remove('panel-open');

    document.removeEventListener('keydown', onPanelKeydown);
    backdrop.removeEventListener('click', closePanel);

    var TRANSITION_MS = 220;
    setTimeout(function () {
      backdrop.hidden = true;
      panel.hidden = true;
      if (lastFocused) {
        lastFocused.focus();
      }
    }, TRANSITION_MS);
  }

  function onPanelKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePanel();
      return;
    }

    if (e.key === 'ArrowRight' && currentPhotoTotal > 1) {
      e.preventDefault();
      goToPhoto(currentPhotoIndex + 1);
      return;
    }

    if (e.key === 'ArrowLeft' && currentPhotoTotal > 1) {
      e.preventDefault();
      goToPhoto(currentPhotoIndex - 1);
      return;
    }

    if (e.key === 'Tab' && panelFocusables.length) {
      var first = panelFocusables[0];
      var last = panelFocusables[panelFocusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  panelClose.addEventListener('click', closePanel);

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openPanel(card);
    });
  });

  /* ---------- Init ---------- */

  buildDots();
  requestCoverflowUpdate();
})();
