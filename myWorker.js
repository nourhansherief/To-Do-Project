onmessage = function (e) {
    var msg = e.data;
    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
    postMessage(msg);
} 