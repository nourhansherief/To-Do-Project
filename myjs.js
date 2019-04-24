var addButton = document.getElementById("addButton");

var task = document.getElementById("task");

var tasks = document.getElementById("tasks");

var searchButton = document.getElementById("searchButton");


var taskItems = [];


var storedTaskItems;



addButton.addEventListener("click", function () {
    if (task.value != " ") {
        storedTaskItems.push(task.value);
        localStorage.setItem("taskItems", JSON.stringify(storedTaskItems));
    }
    createNode(task.value);

});






storedTaskItems = JSON.parse(localStorage.getItem("taskItems") || "[]");
function getListItems() {
    console.log(storedTaskItems);
    if (storedTaskItems.length > 0) {
        for (i = 0; i < storedTaskItems.length; i++) {
            createNode(storedTaskItems[i]);
        }
    }
}

function createNode(val) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    var spanNode = document.createElement("SPAN");
    // spanNode.class = 'del';
    spanNode.classList.add("del");
    var textDeletenode = document.createTextNode("x");
    spanNode.appendChild(textDeletenode);
    node.appendChild(spanNode);
    tasks.appendChild(node);
    spanNode.addEventListener("click", function () {
        var itemVal = this.parentElement.textContent;
        itemVal = itemVal.slice(0, -1);
        var index = storedTaskItems.indexOf(itemVal);
        if (index !== -1) {
            storedTaskItems.splice(index, 1);
        }
        this.parentElement.remove();
        localStorage.setItem("taskItems", JSON.stringify(storedTaskItems));

    });
}
getListItems();

var delee = document.getElementsByClassName('del');;
console.log(delee);
var list = document.getElementsByClassName("del");
for (let item of list) {
    // log(item.id);
    item.addEventListener("click", function () {
        var itemVal = this.parentElement.textContent;
        itemVal = itemVal.slice(0, -1);

        console.log(storedTaskItems);
        console.log(itemVal);
        var index = storedTaskItems.indexOf(itemVal);
        console.log(index);
        if (index !== -1) {
            storedTaskItems.splice(index, 1);
        }
        this.parentElement.remove();
        console.log(storedTaskItems);
        localStorage.setItem("taskItems", JSON.stringify(storedTaskItems));
        //     createNode(task.value);

    });
}
var searchWorker = new Worker('./myWorker.js');
searchButton.addEventListener("click", function () {
    console.log("rrrr");
    searchWorker.postMessage(this.value);
    console.log('Message posted to worker');
});


searchWorker.onmessage = function (e) {
    console.log("ffff");
    console.log(e.data);
    task.value = e.data;
};