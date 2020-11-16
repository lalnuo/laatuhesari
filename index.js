console.log("Laatuhesari käynnistetty");

const forbiddenKeywords = ["korona", "trump"];
const elementContainsForbiddenKey = (node) =>
    forbiddenKeywords.some(word => (node.textContent || "").toLowerCase().indexOf(word) !== -1)


const removeArticle = (domNode) => {
    if (domNode.tagName === "ARTICLE") {
        domNode.remove();
    } else if (domNode.parentNode) {
        removeArticle(domNode.parentNode);
    }
};

const checkForForbiddenKeywords = (domNode) => {
    if (domNode && elementContainsForbiddenKey(domNode)) {
        removeArticle(domNode);
    }
    if (domNode && domNode.childNodes) {
        domNode.childNodes.forEach((x) => {
            checkForForbiddenKeywords(x);
        });
    }
};

document.addEventListener("DOMNodeInserted", (event) => {
    if (elementContainsForbiddenKey(event.target)) {
        checkForForbiddenKeywords(event.target);
    }
});

checkForForbiddenKeywords(document);
