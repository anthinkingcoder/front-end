(function (win, doc) {
    var dialog = doc.getElementById('deleteDialog'), layer;

    function openDialog() {
        show(dialog);
    }

    win.openDialog = openDialog;
    function hide(el) {
        if (el.className.indexOf('ia-dialog-show') !== -1) {
            el.className = el.className.replace('ia-dialog-show', 'ia-dialog-hide');
            doc.body.removeChild(layer);
        }
    }

    function show(el) {
        if (el.className.indexOf('ia-dialog-hide') !== -1) {
            el.className = el.className.replace('ia-dialog-hide', 'ia-dialog-show');
            if (!layer) {
                layer = doc.createElement('div');
                layer.className = 'ia-dialog-layer';
                layer.addEventListener('click', function () {
                    hide(dialog);
                })
            }
            doc.body.appendChild(layer);
        }
    }

})(window, document);