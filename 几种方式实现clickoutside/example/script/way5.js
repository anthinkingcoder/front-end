(function (win, doc) {
    var dialog = doc.getElementById('deleteDialog'),
        buttonDialog = doc.getElementById('dialogButton');

    buttonDialog.addEventListener('click', function () {
       show(dialog);
        // dialog.focus();
    });
    var hideF = hide.bind(this, dialog);
    win.FocusOutside.bind(dialog,hideF);
    win.FocusOutside.bind(buttonDialog,hideF);

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