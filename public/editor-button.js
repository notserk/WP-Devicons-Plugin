(function($) {
    var devicons = [];

    //Add a blank line to the dropdown list.
    devicons.push({text:'',value:''});


    //For each Devicon, there's many fonts
    var fonts = [];

    //Variables to hold data retrieve from form.
    var name, style, size;
    
    //Create Object for Devicons
    //var Devicons ={
    //
    //    technologies: 'This from the ',
    //
    //    fetchJSON : function(){
    //        console.log(this.technologies);
    //
    //        $.getJSON('../wp-content/plugins/devicons-tinymce/libs/devicon-master/devicon.json', function(data){
    //
    //            $.each(data, function(k, v){
    //
    //                //Get the fonts
    //                var fonts = v.versions.font;
    //
    //                technologies.push({
    //                    text: v.name,
    //                    value: v.name,
    //                    font: fonts
    //                });
    //            });
    //        });
    //    },
    //
    //    icons : '',
    //
    //
    //};
    //
    //Devicons.fetchJSON();
    

    //Retrieves the list of fonts for each devicon.
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

    //Wrap this function up in its own method
    $.getJSON('../wp-content/plugins/devicons/libs/devicon-master/devicon.json', function(data){

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
                            name: 'technologies',
                            label: 'Choose Tech',
                            values: devicons,
                            onselect: function(e){
                                name = this.value();
                                fonts = getFonts(name);
                                editor.windowManager.open({
                                    title: 'Choose',
                                    body: [
                                        {
                                            type: 'listbox',
                                            name: 'go',
                                            label: 'Choose Style:',
                                            values: fonts,
                                            onselect: function(e){
                                                style = this.value();
                                                //console.log(this.value());
                                            }
                                        }
                                    ]

                                })
                            }
                        },
                        {
                            type: 'listbox',
                            name: 'size',
                            label: 'Choose Size',
                            values: [{text: 'Small', value: 's'},
                                {text: 'Medium', value: 'm'},
                                {text: 'Large', value: 'l'},
                                {text: 'Extra Large', value: 'xl'}],
                            onselect: function(e){
                                size = this.value();
                                //console.log(this.value());
                            }
                        }

                    ],
                    onsubmit: function(e){
                        console.log(e.data.size);
                        editor.insertContent('[devicons name=' + '"' + name + '"' + '  style=' + '"' + style + '"' + ' colored=' + '"' + e.data.color + '"' + ' size=' + '"' + size + '"' + ']');
                    }
                })
            }
        });
    });
})(jQuery);