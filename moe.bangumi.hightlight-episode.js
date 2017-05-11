// ==UserScript==
// @name         Bangumi: Highlight ep#
// @namespace    moe.bangumi.hightlight-episode
// @version      0.10
// @description  Highlight Episode Number
// @author       Willian
// @match        https://bangumi.moe/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

const $ = unsafeWindow.$;
const angular = unsafeWindow.angular;

// let rin = angular.module('rin')
// rin['_invokeQueue'].forEach(function(value){ 
//     console.log(value[1] + ": " + value[2][0]);
// })
// rin.directive('torrentList',(e)=>{

// })

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
$(document).on("mouseenter",'[torrent-list]',function(e){
    let titleElements = $(this).find(".md-item-raised-title");

    titleElements.find("span").each(highlightMe);
    titleElements.off("mouseenter");
    titleElements.on("mouseenter",highlightMe);
    titleElements.find("span").each(highlightMe);
});
// $(document).on("mouseover",'.compact-torrent-list',function(e){
//     console.log(this)
// })