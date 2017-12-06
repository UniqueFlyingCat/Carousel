var e = function(selector) {
    return document.querySelector(selector)
}
var es = function(selector) {
    return document.querySelectorAll(selector)
}
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
var log = function() {
    console.log.apply(console, arguments)
}
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
var change = function(i, cur) {
    var len = 4
    if(i == 1) {
        var index = (len + cur - 1) % len
    }
    if(i == 2) {
        var index = (cur + 1) % len
    }
    changeDirect(index)
}
var changeDirect = function(index) {
    var element1 = e(`.img-${index}`)
    var element2 = e(`.dot${index}`)
    var button1 = e('.button-1')
    var button2 = e('.button-2')
    var button3 = e('#prev')
    var button4 = e('#next')
    button1.dataset.list = index
    button2.dataset.list = index
    button3.dataset.list = index
    button4.dataset.list = index
    removeClassAll('active')
    removeClassAll('highlight')
    toggleClass(element1, 'active')
    toggleClass(element2, 'highlight')
}
var changeAuto = function() {
    var button1 = e('.button-1')
    var cur =  parseInt(button1.dataset.list)
    var i = 2
    change(i, cur)
}
bindAll('button', 'click', (event)=> {
    var self = event.target
    var index = parseInt(self.dataset.index)
    var cur = parseInt(self.dataset.list)
    clearInterval(id)
    change(index, cur)
    id = setInterval(changeAuto, 4000)
})
bindAll('.dot', 'mouseover', (event)=> {
    var self = event.target
    var index = parseInt(self.dataset.list)
    clearInterval(id)
    changeDirect(index)
})
bindAll('.dot', 'mouseout', ()=> {
    id = setInterval(changeAuto, 4000)
})
var id = setInterval(changeAuto, 4000)
