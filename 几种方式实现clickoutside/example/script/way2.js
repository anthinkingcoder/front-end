(function (win, doc) {
    var dialog = doc.getElementById('deleteDialog'),
        button = doc.getElementById('dialogButton');

    button.addEventListener('click', function (e) {
        show(dialog);
    });
    function callback(e) {
        if (e.target !== button) {
            hide(dialog);
        }
    }
    bindClickOutsideHandler(dialog, callback);
    function bindClickOutsideHandler(el, callback) {
        var clickoutsideHandler = function (e) {
            var target = e.target;
            if (containChildren(el, target)) {
                return false;
            }
            callback(e);
        };
        doc.addEventListener('click', clickoutsideHandler);
    }
    function containChildren(parent, el) {
        if (parent === el) {
            return true;
        }
        var childs = Array.prototype.slice.call(parent.childNodes), isContain = false;
        if (childs) {
            childs.forEach(function (child) {
                if (!isContain) {
                    isContain = containChildren(child, el);
                }
            });
            return isContain;
        }
    }

    function hide(el) {
        if (el.className.indexOf('ia-dialog-show') !== -1) {
            el.className = el.className.replace('ia-dialog-show', 'ia-dialog-hide');
        }
    }

    function show(el) {
        if (el.className.indexOf('ia-dialog-hide') !== -1) {
            el.className = el.className.replace('ia-dialog-hide', 'ia-dialog-show');
        }
    }

})(window, document);