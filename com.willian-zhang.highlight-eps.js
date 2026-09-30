// ==UserScript==
// @name         Highlight ep#
// @namespace    com.willian-zhang.highlight-eps
// @version      3.0
// @description  Highlight Episode Number
// @author       Willian
// @match        https://dmhy.org/
// @match        https://dmhy.org/*
// @match        https://share.dmhy.org/*
// @match        https://bangumi.moe/*
// @include      /^https:\/\/share\.(xfsub\.com|xfapi\.top)(:\d+)?\/sort-/
// @match        https://mikanani.me/Home/Classic*
// @match        https://mikanani.me/Home/Search*
// @grant        none
// ==/UserScript==

const [S, L] = [50, 75];
const Hs = [
    0, +120, +240,
    60, 60+120, 60+240,
    90, 90+120, 90+240,
    30, 30+120, 30+240,
];
const colors = Hs.map(H => `hsl(${H}, ${S}%, ${L}%)`);
console.log(`Colors: ${colors.length}`);

// https://regex101.com/r/4ovR28/
const epRegex = /^(?<prefix>.+)(?<epText>(?:\s|\[|【|第|EP)(?:\d{1,4}[-~])?(?<ep>\d{1,4})(?:\.\d)?(?:v\d)?(?:TV)?(?:集|話|话|\s|\]|】|$))(?<suffix>.*)$/i;

const sites = [
    {
        name: 'Bangumi',
        hosts: ['bangumi.moe'],
        selector: '[torrent-list] .md-item-raised-title span',
    },
    {
        name: 'DMHY',
        hosts: ['dmhy.org'],
        selector: '.table table > tbody > tr > td.title > a',
    },
    {
        name: 'XFSub',
        hosts: ['share.xfsub.com', 'share.xfapi.top'],
        selector: '#listTable > tbody > tr > td:nth-child(2) > a:last-child',
    },
    {
        name: 'Mikan',
        hosts: ['mikanani.me'],
        // Only table rows: the mobile list duplicates these links with nested markup
        selector: 'table a[href^="/Home/Episode/"]',
    },
];

// Element -> textContent at the time it was last processed, so unchanged
// elements (highlighted or not) are skipped on later scans.
const processed = new WeakMap();

function highlightMe(element) {
    if (processed.get(element) === element.textContent) {
        return;
    }
    const text = element.textContent.trim();
    const found = epRegex.exec(text);
    if (found) {
        const { prefix, epText, ep, suffix } = found.groups;
        const highlight = document.createElement('highlight');
        highlight.style.backgroundColor = colors[Number(ep) % colors.length];
        highlight.textContent = epText;
        element.replaceChildren(prefix, highlight, suffix);
    } else {
        console.log('NO-EP', text);
    }
    processed.set(element, element.textContent);
}

const host = location.hostname;
const site = sites.find(({ hosts }) =>
    hosts.some(domain => host === domain || host.endsWith(`.${domain}`))
);

if (site) {
    console.log(`Highlighting ${site.name}`);
    const highlightAll = () => document.querySelectorAll(site.selector).forEach(highlightMe);

    // Lists may be rendered late or re-rendered (e.g. Angular on bangumi.moe, pagination),
    // so rescan on DOM changes, batched to once per frame.
    let scheduled = false;
    new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            highlightAll();
        });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });

    highlightAll();
} else {
    console.log('NO MATCH for Highlighting');
}
