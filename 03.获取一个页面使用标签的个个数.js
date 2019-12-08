function getPageTags() {
    var allNode = document.getElementsByTagName('*')
    // var allTags = Array.from(allNode).map(v => v.tagName)
    var allTags = [...allNode].map(v => v.tagName)
    return new Set(allTags).size

}