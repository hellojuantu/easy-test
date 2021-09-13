function log() {
    console.log.apply(console, arguments)
}

function bindEvent(element, action, callback) {
    element.addEventListener(action, function(event) {
        callback(event)
    })
}

function ajax(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    r.send(data)
}

function loadData(callback) {
    // var method = 'GET'
    // var url = 'https://do.juantu.cn/index/index/api'
    // ajax(method, url, '', function(r) {
    //     localStorage.dududu = r.response
    //     callback()
    // })
    var d = __data || ""
    if (d != "") {
        // localStorage.dududu = d;
        callback();
    }
}

function findWithKeyword(keyword) {
    var data = __data
    for (i in data) {
        var e = data[i]
        var rawKey = e.keywords.toLowerCase()
        var userKey = keyword.toLowerCase()
        if (rawKey.includes(userKey)) {
            return e.answer
        }
    }
    return null
}

function easyTest() {
    loadData(function() {
        log("bindEvent")
        bindEvent(window, 'keyup', function(event) {
            log('keyup')
            var target = event.target
            var keyword = target.value || ""
            var answer = findWithKeyword(keyword)
            if (event.key == 'Enter' && answer != null) {
                target.value = answer
            } else {
                log('no keyword')
            }
        })
    })
}

function __main() {
    easyTest()
    // log("data:", data)
}

__main()