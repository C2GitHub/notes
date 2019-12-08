var nodes = document.getElementsByTagName('*');

// 1.
// var nodeArr = [].slice.call(nodes)

//2. 
// var nodeArr = [...nodes]

//3. 
var nodeArr = Array.from(nodes)
console.log(nodeArr instanceof Array)