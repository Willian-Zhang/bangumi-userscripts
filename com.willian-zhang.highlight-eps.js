// ==UserScript==
// @name         Highlight ep#
// @namespace    com.willian-zhang.highlight-eps
// @version      2.5
// @description  Highlight Episode Number
// @author       Willian
// @match        http*://dmhy.org/
// @match        http*://dmhy.org/*
// @match        http*://share.dmhy.org/*
// @match        http*://bangumi.moe/*
// @match        http*://share.xfsub.com*/sort-*
// @match        http*://share.xfapi.top*/sort-*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://raw.githubusercontent.com/Willian-Zhang/bangumi-userscripts/master/com.willian-zhang.color.js
// @grant        unsafeWindow
// ==/UserScript==

// const angular = unsafeWindow.angular;

const [S, L] = [50, 75];
const Hs = [
    0, +120, +240,
    60, 60+120, 60+240,
    90, 90+120, 90+240,
    30, 30+120, 30+240,
];
const colors = Hs.map(H=> HSL2RGB(H, S, L));
console.log(`Colors: ${colors.length}`);

// https://regex101.com/r/4ovR28/
const epRegex = /((.+)((\s|\[|【|第|EP)(?:\d{1,4}[-|~])?(\d{1,4})(?:\.\d)?(?:v\d)?(?:TV)?(集|話|话|\s|\]|】))(.*))/;
// TODO: named
// ((?<prefix>.+)(?<epText>([\s|\[|【|第])(?:\d{1,3}[-|~])?(?<ep>\d{1,3})(?:\.\d)?(?:v\d)?([集|話|话|\s|\]|】]))(?<suffix>.*))

function highlightMe(){
    let $element = $(this);
    if($element.html().match(/<highlight/)){
        return;
    }
    var text = $element.text().trim();
    var found = epRegex.exec(text);
    if(found){
        let prefix = found[2];
        let epText = found[3];
        let ep = Number(found[5]);
        let suffix = found[7];

        ep = Math.max(ep, 0);
        let color = colors[ep % colors.length];
        $element.empty().append([
            document.createTextNode(prefix),
            `<highlight style="background-color: ${color}">${epText}</highlight>`,
            document.createTextNode(suffix)
        ]);
    }else{
        console.log('NO-EP',text);
    }
};
if(/bangumi.moe/.test(document.location.host)){
    console.log('Highlighting Bangumi');
    $(document).on("mouseenter",'[torrent-list]',function(e){
        let titleElements = $(this).find(".md-item-raised-title");

        titleElements.find("span").each(highlightMe);
        titleElements.off("mouseenter");
        titleElements.on("mouseenter",highlightMe);
    });
}else if(/dmhy.org/.test(document.location.host)){
    console.log('Highlighting DMHY');
    let table = $(".table  table > tbody");
    let titles = table.find('tr > td.title > a');
    titles.each(highlightMe);
    titles.off("mouseenter");
    titles.on("mouseenter",highlightMe);
}else if(
    /share.xfsub.com/.test(document.location.host) ||
    /share.xfapi.top/.test(document.location.host)
    ){
    console.log('Highlighting XFSub');
    $(document).ready(function(){
        let table = $("#listTable > tbody");
        let titles = table.find('tr > td:nth-child(2) > a:last-child');
        titles.each(highlightMe);
        titles.off("mouseenter");
        titles.on("mouseenter",highlightMe);
    });
} else{
    console.log('NO MATCH for Highlighting')
}

