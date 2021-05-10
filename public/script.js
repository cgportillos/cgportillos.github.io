const scrollama = require("scrollama");

var scroller = scrollama();
scroller.setup({
    step: ''
}).onStepEnter(function() {
    console.log('enter');
});

