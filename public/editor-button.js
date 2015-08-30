(function($) {
    var items = [];

    $.getJSON('../wp-content/plugins/devicons-tinymce/libs/devicon-master/devicon.json', function(data){

        //console.log(data);

        $.each(data, function(k, v){

            //Get the fonts
            var fonts = v.versions.font;

            items.push({
                text: v.name,
                value: v.name,
                font: fonts
            });
        });

        console.log(items[0].font);
    });



    tinymce.PluginManager.add('devicons', function( editor, url ) {
        editor.addButton( 'devicons', {
            title: 'Devicons',
            text: 'Devicons',
            onclick: function() {

                editor.windowManager.open({
                    title: 'Choose Devicons',
                    body: [
                        {type: 'checkbox', name: 'color', label: 'Colored?', text: 'Colored?'},
                        {
                            type: 'listbox',
                            name: 'devicons',
                            label: 'Choose Tech',
                            'values': items,
                            onselect: function(){
                                console.log(this.value());
                            }
                        }

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