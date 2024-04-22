'use strict'

// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

// console.log(document.body.firstChild);
// console.log(document.body.lastChild);
// console.log(document.body.childNodes);
// console.log(document.body.children);

// for (let val of document.body.children) {
//     console.log((val.localName + ': ') + (val.localName === 'div' ? "This DIV" : "Not DIV"));    
// }

for (const val of document.body.childNodes) {
    console.dir((val.nodeType  + ": ") + (val.nodeValue));
}