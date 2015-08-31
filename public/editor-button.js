(function($) {
    var devicons = [];
    var fonts = [];

    var name, style;

    function getFonts(name){

        var returnedFonts = [];

        //Set Fonts
        $.each(devicons, function(k, v){

            if(v.text === name){
                //iterate through the fonts array
                for(var i = 0; i < v.font.length; i++){

                    returnedFonts.push({
                        text: v.font[i],
                        value: v.font[i]
                    });
                    //console.log(v.font[i]);
                }
            }
        });

        return returnedFonts;
    }

    $.getJSON('../wp-content/plugins/devicons-tinymce/libs/devicon-master/devicon.json', function(data){

        //console.log(data);

        $.each(data, function(k, v){

            //Get the fonts
            var fonts = v.versions.font;

            devicons.push({
                text: v.name,
                value: v.name,
                font: fonts
            });
        });



        console.dir(devicons);
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
                            'values': devicons,
                            onselect: function(e){
                                //console.log(this.value());

                                name = this.value();

                                console.dir(devicons);

                                fonts = getFonts(name);
                                console.dir(fonts);

                                editor.windowManager.open({
                                    title: 'Choose',
                                    body: [
                                        {
                                            type: 'listbox',
                                            name: 'go',
                                            label: 'Choose Style:',
                                            'values': fonts,
                                            onselect: function(e){
                                                style = this.value();
                                                //console.log(this.value());
                                            }
                                        }
                                    ]

                                })
                            }
                        }

                    ],
                    onsubmit: function(e){
                        editor.insertContent('[devicons name=' + '"' + name + '"' + '  style=' + '"' + style + '"' + ']');
                        //console.log(devicons);
                    }
                })
            }
        });
    });
})(jQuery);