(function (win, doc) {
    var dialog = doc.getElementById('deleteDialog'),
        button = doc.getElementById('dialogButton');


    button.addEventListener('click', function (e) {
        show(dialog);
        dialog.focus();
    });

    var clickoutside = {
        targetTimeIds: {},
        bind: function (el, callback) {
            var that = this;
            //set element focusable
            el.setAttribute('tabindex', '-1');
            el.addEventListener('focusout', function (e) {
                that.targetTimeIds[callback] = setTimeout(callback, 10);
            });
            el.addEventListener('focusin', function (e) {
                clearTimeout(that.targetTimeIds[callback]);
            });
        }
    };

    var hideFuc = hide.bind(this, dialog);
    clickoutside.bind(dialog, hideFuc);

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

    function checkSupport(el) {
        return 'onfocusin' in el && 'onfocusout' in el;
    }

})(window, document);