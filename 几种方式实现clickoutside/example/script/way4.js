(function (win, doc) {
    var dialog = doc.getElementById('deleteDialog'),
        button = doc.getElementById('dialogButton');

    button.addEventListener('click', function (e) {
        show(dialog);
        // e.stopPropagation();
    });

    function callback(e) {
        if (e.target !== button) {
            hide(dialog);
        }
    }

    bindClickOutSide(dialog, callback);

    function bindClickOutSide(el, callback) {
        doc.addEventListener('click', function (e) {
            callback(e);
        });
        el.addEventListener('click', function (e) {
            e.stopPropagation();
        });
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