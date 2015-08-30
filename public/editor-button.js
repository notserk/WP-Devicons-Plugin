(function($) {
    var items = [];

    $.getJSON('../wp-content/plugins/devicons-tinymce/libs/devicon-master/devicon.json', function(data){

        //console.log(data);

        $.each(data, function(k, v){
            items.push({text: v.name, value: v.name})
        });

        //console.dir(items);

    });

    tinymce.PluginManager.add('devicons', function( editor, url ) {
        editor.addButton( 'devicons', {
            title: 'Devicons',
            text: 'Devicons',
            onclick: function() {
                
                editor.windowManager.open({
                    title: 'Hey There',
                    body: [
                        {type: 'checkbox', name: 'title', label: 'Title', text: 'test'},
                        {type: 'listbox', name: 'devicons', label: 'Choose Tech', 'values': items}

                    ],
                    onsubmit: function(e){
                        editor.insertContent(e.data.devicons);
                        console.log(items);
                    }
                })
            }
        });
    });
})(jQuery);