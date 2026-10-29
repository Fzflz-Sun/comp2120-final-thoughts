/* COMP2120/6120 Final Thoughts — page application */
(function () {
  'use strict';

  const MODULES = [...(window.KNOWLEDGE_A || []), ...(window.KNOWLEDGE_B || [])];
  const QUESTIONS = [
    ...(window.EX_MATCHING || []).map((q) => ({ ...q, type: 'matching' })),
    ...(window.EX_SELECTION || []).map((q) => ({ ...q, type: 'selection' })),
    ...(window.EX_SHORT || []).map((q) => ({ ...q, type: 'short' })),
    ...(window.EX_APPLIED || []).map((q) => ({ ...q, type: 'applied' }))
  ];

  const TYPE_META = {
    matching: { label: 'Matching', zh: '情景匹配', badge: 'badge-matching' },
    selection: { label: 'Selection', zh: '多选', badge: 'badge-selection' },
    short: { label: 'Short Answer', zh: '简答', badge: 'badge-short' },
    applied: { label: 'Applied', zh: '应用分析', badge: 'badge-applied' }
  };

  const LS_KEY = 'comp2120.final-thoughts.v1';
  const moduleById = Object.fromEntries(MODULES.map((m) => [m.id, m]));

  let state = loadState();

  function loadState() {
    const empty = { revealed: {}, picks: {}, drafts: {} };
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return empty;
      const parsed = JSON.parse(raw);
      return {
        revealed: parsed.revealed || {},
        picks: parsed.picks || {},
        drafts: parsed.drafts || {}
      };
    } catch (err) {
      return empty;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (err) {
      /* storage may be unavailable (private mode); progress is then session-only */
    }
  }

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function stripHtml(html) {
    return String(html || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ------------------------------------------------------------------ */
  /* knowledge                                                          */
  /* ------------------------------------------------------------------ */

  function renderKnowledge() {
    const host = $('#knowledgeList');
    const glossary = $('#glossaryList');
    const sideNav = $('#sideNav');
    let html = '';
    let glossaryHtml = '';
    let nav = '';
    let conceptCount = 0;

    MODULES.forEach((mod) => {
      nav +=
        '<li><a href="#module-' + mod.id + '" data-module="' + mod.id + '">' +
        '<span class="num">' + mod.num + '</span>' +
        '<span><span class="zh">' + mod.zh + '</span><span class="en">' + mod.en + '</span></span>' +
        '</a></li>';

      html += '<article class="module" id="module-' + mod.id + '" data-module="' + mod.id + '">';
      html += '<header class="module-head">';
      html += '<div class="module-num">' + mod.num + '</div>';
      html += '<div class="module-title">';
      html += '<h3>' + mod.zh + '</h3>';
      html += '<span class="en">' + mod.en + '</span>';
      html += '<p class="lead">' + mod.lead + '</p>';
      html += '<p class="module-meta">' +
        (mod.slides ? escapeHtml(mod.slides) + ' · ' : '') +
        mod.cards.length + ' concepts</p>';
      html += '</div></header>';
      html += '<div class="card-grid">';

      mod.cards.forEach((card, i) => {
        conceptCount += 1;
        const anchor = 'card-' + mod.id + '-' + i;
        const searchBlob = [
          card.t, card.en, card.zh,
          (card.list || []).join(' '),
          card.code ? card.code.join(' ') : ''
        ].join(' ').toLowerCase();

        html += '<section class="card" id="' + anchor + '" data-search="' +
          escapeHtml(searchBlob) + '">';
        html += '<h4 class="card-term">' + card.t + '</h4>';

        html += '<div class="card-block">';
        html += '<span class="card-label en-label">EN</span>';
        html += '<div><p>' + card.en + '</p>';
        if (card.list && card.list.length) {
          html += '<ul class="card-list">';
          card.list.forEach((li) => { html += '<li>' + li + '</li>'; });
          html += '</ul>';
        }
        html += '</div></div>';

        html += '<div class="card-block zh">';
        html += '<span class="card-label zh-label">中文</span>';
        html += '<div><p>' + card.zh + '</p></div>';
        html += '</div>';

        if (card.flow && card.flow.length) {
          html += '<div class="flow">';
          card.flow.forEach((step) => { html += '<span>' + step + '</span>'; });
          html += '</div>';
        }

        if (card.table) {
          html += '<div class="table-wrap"><table><thead><tr>';
          card.table.head.forEach((h) => { html += '<th>' + h + '</th>'; });
          html += '</tr></thead><tbody>';
          card.table.rows.forEach((row) => {
            html += '<tr>';
            row.forEach((cell) => { html += '<td>' + cell + '</td>'; });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        }

        if (card.code) {
          html += '<div class="card-code"><pre><code>' +
            escapeHtml(card.code.join('\n')) + '</code></pre></div>';
        }

        html += '</section>';

        glossaryHtml +=
          '<a class="glossary-item" href="#' + anchor + '" data-search="' +
          escapeHtml(searchBlob) + '"><b>' + card.t + '</b><span>' +
          mod.zh + '</span></a>';
      });

      html += '</div>';

      if (mod.callout) {
        html += '<div class="module-callout">';
        html += '<p class="zh">' + mod.callout.zh + '</p>';
        html += '<p class="en">' + mod.callout.en + '</p>';
        html += '</div>';
      }

      html += '</article>';
    });

    host.innerHTML = html;
    glossary.innerHTML = glossaryHtml;
    sideNav.innerHTML = nav;

    $('#statConcepts').textContent = conceptCount;
    $('#statModules').textContent = MODULES.length;
    $('#statQuestions').textContent = QUESTIONS.length;
  }

  /* ------------------------------------------------------------------ */
  /* questions                                                          */
  /* ------------------------------------------------------------------ */

  function revealKey(q) { return q.id; }

  function isRevealed(q) { return !!state.revealed[revealKey(q)]; }

  function picksOf(q) {
    const p = state.picks[q.id];
    return Array.isArray(p) ? p : [];
  }

  function correctIndices(q) {
    return q.type === 'matching' ? [q.answer] : (q.answers || []);
  }

  function isCorrect(q) {
    const picked = picksOf(q).slice().sort();
    const correct = correctIndices(q).slice().sort();
    return picked.length === correct.length && picked.every((v, i) => v === correct[i]);
  }

  function optionHtml(q, opt, i) {
    return (
      '<li><button class="option" type="button" data-q="' + q.id + '" data-i="' + i + '" aria-pressed="false">' +
      '<span class="letter">' + String.fromCharCode(65 + i) + '</span>' +
      '<span class="opt-text">' + opt + '</span>' +
      '<span class="mark" aria-hidden="true"></span>' +
      '</button></li>'
    );
  }

  function questionHtml(q, index) {
    const meta = TYPE_META[q.type];
    const mod = moduleById[q.topic];
    const answerText = q.answerHtml || ('<p>' + (q.explain || '') + '</p>');

    let html = '<article class="q-card" id="q-' + q.id + '" data-id="' + q.id + '" data-type="' + q.type + '" data-topic="' + q.topic + '">';
    html += '<div class="q-head">';
    html += '<span class="q-index">Q' + String(index + 1).padStart(2, '0') + '</span>';
    html += '<span class="badge ' + meta.badge + '">' + meta.label + ' · ' + meta.zh + '</span>';
    html += '<span class="q-topic">' + (mod ? mod.zh : q.topic) + '</span>';
    html += '</div>';

    html += '<div class="q-prompt">' + q.prompt + '</div>';

    if (q.code) {
      html += '<div class="q-code"><pre><code>' + escapeHtml(q.code.join('\n')) + '</code></pre></div>';
    }

    if (q.type === 'matching' || q.type === 'selection') {
      html += '<ul class="options">';
      q.options.forEach((opt, i) => { html += optionHtml(q, opt, i); });
      html += '</ul>';
    }

    if (q.type === 'short' || q.type === 'applied') {
      html += '<textarea class="write-area" data-draft="' + q.id + '" placeholder="Write your own answer first… (optional, saved locally)"></textarea>';
      html += '<div class="write-meta"><span>先自己作答，再展开参考答案</span><span>草稿自动保存在本机</span></div>';
    }

    html += '<div class="q-actions">';
    html += '<button class="reveal-btn" type="button" data-reveal="' + q.id + '" aria-expanded="false" aria-controls="answer-' + q.id + '">显示参考答案 · Show answer</button>';
    html += '<span class="answer-hint">' +
      (q.type === 'matching' ? '单选 · one option' :
        q.type === 'selection' ? '多选 · select all that apply' :
          q.type === 'short' ? '简答 · explain / compare / recommend' :
            '应用题 · analyse, fix, test') + '</span>';
    html += '</div>';

    html += '<div class="q-answer" id="answer-' + q.id + '" data-answer="' + q.id + '" hidden>';
    html += '<div class="answer-head"><h4>Model answer</h4><span class="verdict neutral">English</span></div>';
    html += '<div class="answer-body" data-answer-body="' + q.id + '">' + answerText + '</div>';
    html += '</div>';

    html += '</article>';
    return html;
  }

  function renderQuestions() {
    const host = $('#questionList');
    host.innerHTML = QUESTIONS.map(questionHtml).join('');

    const counts = { all: QUESTIONS.length, matching: 0, selection: 0, short: 0, applied: 0 };
    QUESTIONS.forEach((q) => { counts[q.type] += 1; });
    $('#countAll').textContent = counts.all;
    $('#countMatching').textContent = counts.matching;
    $('#countSelection').textContent = counts.selection;
    $('#countShort').textContent = counts.short;
    $('#countApplied').textContent = counts.applied;

    const select = $('#topicFilter');
    MODULES.forEach((m) => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.num + ' · ' + m.zh;
      select.appendChild(opt);
    });

    // restore drafts
    $$('.write-area').forEach((area) => {
      const id = area.getAttribute('data-draft');
      if (state.drafts[id]) area.value = state.drafts[id];
    });
  }

  function paintQuestion(card, q, index) {
    const revealed = isRevealed(q);
    const picked = picksOf(q);
    const correct = correctIndices(q);

    $$('.option', card).forEach((btn) => {
      const i = Number(btn.getAttribute('data-i'));
      btn.classList.toggle('is-picked', picked.indexOf(i) !== -1);
      btn.classList.remove('is-correct', 'is-wrong');
      const mark = $('.mark', btn);
      if (mark) mark.textContent = '';
      if (revealed) {
        btn.disabled = true;
        if (correct.indexOf(i) !== -1) {
          btn.classList.add('is-correct');
          if (mark) mark.textContent = '✓';
        }
        if (picked.indexOf(i) !== -1 && correct.indexOf(i) === -1) {
          btn.classList.add('is-wrong');
          if (mark) mark.textContent = '✕';
        }
      } else {
        btn.disabled = false;
      }
      btn.setAttribute('aria-pressed', picked.indexOf(i) !== -1 ? 'true' : 'false');
    });

    const answer = $('[data-answer="' + q.id + '"]', card);
    const btn = $('.reveal-btn', card);
    if (answer) {
      if (revealed) {
        answer.hidden = false;
        const head = $('.answer-head', answer);
        if (head) {
          const old = $('.verdict', head);
          if (old) {
            const isMc = q.type === 'matching' || q.type === 'selection';
            old.className = 'verdict ' + (isMc ? (isCorrect(q) ? 'ok' : 'bad') : 'neutral');
            old.textContent = isMc
              ? (isCorrect(q) ? '✓ 回答正确 · Correct' : '✗ 与参考答案不同 · Review')
              : 'English model answer';
          }
        }
      } else {
        answer.hidden = true;
      }
    }
    if (btn) {
      btn.textContent = revealed ? '隐藏参考答案 · Hide answer' : '显示参考答案 · Show answer';
      btn.classList.toggle('is-open', revealed);
      btn.setAttribute('aria-expanded', revealed ? 'true' : 'false');
    }
  }

  function refreshAllCards() {
    $$('.q-card').forEach((card) => {
      const id = card.getAttribute('data-id');
      const q = QUESTIONS.find((item) => item.id === id);
      if (q) paintQuestion(card, q);
    });
    updateProgress();
  }

  function updateProgress() {
    const total = QUESTIONS.length;
    const done = QUESTIONS.filter(isRevealed).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const text = done + ' / ' + total;

    $('#qProgress').style.width = pct + '%';
    $('#qProgressText').textContent = text + ' · ' + pct + '%';
    $('#miniProgress').style.width = pct + '%';
    $('#miniProgressText').textContent = text;

    const mc = QUESTIONS.filter((q) => q.type === 'matching' || q.type === 'selection');
    const mcDone = mc.filter(isRevealed);
    const mcRight = mcDone.filter(isCorrect).length;
    if (mcDone.length) {
      $('#qProgressText').textContent =
        text + ' · ' + pct + '% ｜ 客观题正确 ' + mcRight + '/' + mcDone.length;
    }
  }

  /* ------------------------------------------------------------------ */
  /* events                                                             */
  /* ------------------------------------------------------------------ */

  function bindEvents() {
    const qHost = $('#questionList');

    qHost.addEventListener('click', (event) => {
      const option = event.target.closest('.option');
      if (option) {
        const id = option.getAttribute('data-q');
        const i = Number(option.getAttribute('data-i'));
        const q = QUESTIONS.find((item) => item.id === id);
        if (!q || isRevealed(q)) return;
        if (q.type === 'matching') {
          state.picks[id] = [i];
        } else {
          const current = picksOf(q).slice();
          const at = current.indexOf(i);
          if (at === -1) current.push(i); else current.splice(at, 1);
          state.picks[id] = current;
        }
        saveState();
        const card = option.closest('.q-card');
        paintQuestion(card, q);
        return;
      }

      const revealBtn = event.target.closest('.reveal-btn');
      if (revealBtn) {
        const id = revealBtn.getAttribute('data-reveal');
        const q = QUESTIONS.find((item) => item.id === id);
        if (!q) return;
        if (isRevealed(q)) {
          delete state.revealed[id];
        } else {
          state.revealed[id] = true;
        }
        saveState();
        paintQuestion(revealBtn.closest('.q-card'), q);
        updateProgress();
      }
    });

    let draftTimer = null;
    qHost.addEventListener('input', (event) => {
      const area = event.target.closest('.write-area');
      if (!area) return;
      const id = area.getAttribute('data-draft');
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => {
        state.drafts[id] = area.value;
        saveState();
      }, 350);
    });

    $('#toggleAll').addEventListener('click', () => {
      const visible = $$('.q-card').filter((card) => !card.classList.contains('is-hidden'));
      const anyHidden = visible.some((card) => {
        const q = QUESTIONS.find((item) => item.id === card.getAttribute('data-id'));
        return q && !isRevealed(q);
      });
      visible.forEach((card) => {
        const q = QUESTIONS.find((item) => item.id === card.getAttribute('data-id'));
        if (!q) return;
        if (anyHidden) state.revealed[q.id] = true;
        else delete state.revealed[q.id];
      });
      saveState();
      refreshAllCards();
      $('#toggleAll').textContent = anyHidden ? '收起全部答案' : '展开全部答案';
    });

    $$('#typeFilters .filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        $$('#typeFilters .filter-chip').forEach((c) => c.classList.remove('is-on'));
        chip.classList.add('is-on');
        applyFilters();
      });
    });

    $('#topicFilter').addEventListener('change', applyFilters);
    $('#searchQuestions').addEventListener('input', applyFilters);
    $('#searchKnowledge').addEventListener('input', applyKnowledgeSearch);

    $('#resetProgress').addEventListener('click', () => {
      if (!window.confirm('确定要清空所有作答记录与草稿吗？此操作不可撤销。')) return;
      state = { revealed: {}, picks: {}, drafts: {} };
      saveState();
      $$('.write-area').forEach((area) => { area.value = ''; });
      refreshAllCards();
      $('#toggleAll').textContent = '展开全部答案';
    });

    const toTop = $('#toTop');
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    let ticking = false;
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > 700);
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateTopNav();
        ticking = false;
      });
    }, { passive: true });

    setupScrollSpy();
    updateTopNav();
  }

  function applyFilters() {
    const typeChip = $('#typeFilters .filter-chip.is-on');
    const type = typeChip ? typeChip.getAttribute('data-type') : 'all';
    const topic = $('#topicFilter').value;
    const query = $('#searchQuestions').value.trim().toLowerCase();

    let shown = 0;
    $$('.q-card').forEach((card) => {
      const id = card.getAttribute('data-id');
      const q = QUESTIONS.find((item) => item.id === id);
      if (!q) return;
      const hay = [
        stripHtml(q.prompt),
        (q.options || []).map(stripHtml).join(' '),
        stripHtml(q.answerHtml || ''),
        q.explain || ''
      ].join(' ').toLowerCase();

      const okType = type === 'all' || q.type === type;
      const okTopic = topic === 'all' || q.topic === topic;
      const okQuery = !query || hay.indexOf(query) !== -1;
      const visible = okType && okTopic && okQuery;
      card.classList.toggle('is-hidden', !visible);
      if (visible) shown += 1;
    });

    $('#emptyState').hidden = shown !== 0;
    const total = $$('.q-card').length;
    $('#searchQuestions').setAttribute('aria-label', '检索题目，当前显示 ' + shown + ' / ' + total);
  }

  function applyKnowledgeSearch() {
    const query = $('#searchKnowledge').value.trim().toLowerCase();
    let shown = 0;
    let total = 0;

    $$('.card').forEach((card) => {
      total += 1;
      const ok = !query || (card.getAttribute('data-search') || '').indexOf(query) !== -1;
      card.classList.toggle('is-hidden', !ok);
      if (ok) shown += 1;
    });

    $$('.module').forEach((mod) => {
      const any = $$('.card', mod).some((card) => !card.classList.contains('is-hidden'));
      mod.style.display = any ? '' : 'none';
    });

    $$('.glossary-item').forEach((item) => {
      const ok = !query || (item.getAttribute('data-search') || '').indexOf(query) !== -1;
      item.classList.toggle('is-hidden', !ok);
    });

    const status = $('#searchStatus');
    if (query) {
      status.textContent = '匹配 ' + shown + ' / ' + total + ' 个知识点';
    } else {
      status.textContent = total + ' 个知识点 · ' + MODULES.length + ' 个模块';
    }
  }

  function updateTopNav() {
    const links = $$('.top-nav a');
    const targets = ['knowledge', 'practice', 'glossary']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const marker = window.scrollY + 160;
    let current = null;
    targets.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href === '#' + current);
    });
  }

  function setupScrollSpy() {
    const links = $$('#sideNav a');
    const sections = $$('.module');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('data-module');
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('data-module') === id);
        });
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------ */

  function init() {
    renderKnowledge();
    renderQuestions();
    refreshAllCards();
    bindEvents();
    applyKnowledgeSearch();
    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
