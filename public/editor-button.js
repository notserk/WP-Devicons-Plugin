(function() {
    tinymce.PluginManager.add('devicons', function( editor, url ) {
        editor.addButton( 'devicons', {
            title: 'Devicons',
            text: 'Devicons',
            onclick: function() {
                editor.windowManager.open({
                    title: 'Hey There',
                    body: [{type: 'textbox', name: 'title', label: 'Title'}],
                    onsubmit: function(e){
                        editor.insertContent(e.data.title);
                    }
                })
            }
        });
    });
})();