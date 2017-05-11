// ==UserScript==
// @name         DMHY: Highlight ep#
// @namespace    org.dmhy.hightlight-episode
// @version      0.12
// @description  Highlight Episode Number
// @author       Willian
// @match        https://share.dmhy.org/topics/list*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

const $doc = unsafeWindow.$;
const angular = unsafeWindow.angular;

const colors = [
    "#FF0097",
    "#A200FF",
    "#00ABA9",
    "#8CBF26",
    "#E671B8",
    "#F09609",
    "#1BA1E2"
];
const epRegex = /((.+)([\s|\[|【|第]))(\d{1,3}(?:[-|~]\d{1,3})?)(([集|話|话|\s|\]|】])(.*))/g;

const highlightMe = function(){
    let $element = $(this);
    if($element.html().match(/<highlight/g)){
        return;
    }
    var text = $element.text().trim();
    var found = epRegex.exec(text);
    if(found !== null){
        let ep = Number(found[4]) >-1 ? Number(found[4]) : 0;
        let color = colors[ep % colors.length];
        $element.empty().append([
            document.createTextNode(found[1]),
            `<highlight style="background-color: ${color}">${found[4]}</highlight>`,
            document.createTextNode(found[5])
        ]);
    }else{
        console.log(text);
        console.log(found);
    }
};
$doc(document).ready(function(){
    let table = $(".main > .table  table > tbody");
    let titles = table.find('tr');
    let titlesA = titles.find('td.title > a');
    titlesA.each(highlightMe);
    titlesA.each(highlightMe);
    titles.off("mouseenter");
    titles.on("mouseenter",highlightMe);
});
