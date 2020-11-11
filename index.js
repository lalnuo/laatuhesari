console.log("Laatuhesari käynnistetty");

const forbiddenArticles = ["korona", "trump"];
const elementHasCorona = (node) =>
    forbiddenArticles.some(word => (node.textContent || "").toLowerCase().indexOf(word) > 0)


const removeArticle = (domNode) => {
    if (domNode.tagName === "ARTICLE") {
        domNode.remove();
    } else if (domNode.parentNode) {
        removeArticle(domNode.parentNode);
    }
};

const checkForCorona = (domNode) => {
    if (domNode && elementHasCorona(domNode)) {
        removeArticle(domNode);
    }
    if (domNode && domNode.childNodes) {
        domNode.childNodes.forEach((x) => {
            checkForCorona(x);
        });
    }
};

document.addEventListener("DOMNodeInserted", (event) => {
    if (elementHasCorona(event.target)) {
        checkForCorona(event.target);
    }
});

checkForCorona(document);
