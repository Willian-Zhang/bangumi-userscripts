// ==UserScript==
// @name         WASM Speed JS
// @namespace    moe.willian.wasm-speed
// @version      1.0.1
// @description  Auto name the magnet link in anime site
// @author       Willian
// @match        http*://dmhy.org/
// @match        http*://dmhy.org/*
// @match        http*://share.dmhy.org/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require      https://github.com/emn178/hi-base32/raw/master/build/base32.min.js
// @require      https://cdn.jsdelivr.net/combine/npm/lodash@4,npm/platform@1,npm/benchmark@2
// @require      http://localhost:5000/pkg/wasm_base32.js
// @resource     base32WASM http://localhost:5000/pkg/wasm_base32_bg.wasm
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
unsafeWindow.Benchmark = Benchmark;

let btihs = [];
$('a[href^="magnet:"]').each((_, element) => {
    let href = $(element).attr('href');
    let url = new URL(href);

    let xt = url.searchParams.get('xt').split('btih:');
    if(xt.length<=1) return console.warn('NO-xt', title)

    let btih = xt[1];
    if(btih.length<30) return console.warn('NO-btih', title)

    btihs.push(btih);
});
console.log('Total btihs', btihs.length);

//
base32.decode.asHex = (encoded) =>{
    return base32.decode.asBytes(encoded).map(e=>e.toString(16).padStart(2, '0')).join('');
}

const runWasm = async () => {
    await wasm_bindgen(GM_getResourceURL('base32WASM'));
    const base32WASM = wasm_bindgen;

    let suite = new Benchmark.Suite;
    suite.add('JS.asHex#test', function() {
        for (const btih of btihs) {
            base32.decode.asHex(btih)
        }
    })
    suite.add('WASM.asHex#test', function() {
        for (const btih of btihs) {
            base32WASM.decode_to_string(btih)
        }
    })
    .on('complete', function() {
        console.warn('Fastest is ' + this.filter('fastest').map('name'));
    })
    .on("cycle", function(event) {
        console.log(String(event.target));
    })
    .on('error', function(err) {
        console.error(err);
    })
    .run({ 'async': true });
};
runWasm();


