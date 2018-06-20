<?php

/**
 * Created by PhpStorm.
 * User: notserk
 * Date: 8/27/15
 * Time: 8:10 AM
 */
class Devicons
{

    private $json_file;

    public function initialize(){

        //Grab JSON file and store in devicon map property
        $this->json_file = $this->getDevicons();

        //Load libs
        add_action('wp_enqueue_scripts', array($this, 'LoadDeviconsCSS'));

        //Register Shortcode
        add_shortcode('devicons', array($this, 'loadView'));

        //Add TinyMCE Buttons
        add_action('init', array($this, 'addEditorButtons'));

        //Add media button
        add_action('media_buttons', array($this, 'add_devicon_media_button'));

    }

    //Load all necessary CSS files
    public function LoadDeviconsCSS(){
        wp_enqueue_style(
            'devicons-css',
            plugins_url('devicons/libs/devicon-master/devicon.min.css'),
            array(),
            '0.1.0'
        );
        wp_enqueue_style('size-devicon',
            plugins_url('devicons/public/size-devicon.css'),
            array(),
            '0.1.0'
            );

        //echo plugins_url('wp-devicons/public/dist/output/index_bundle.js');
        //Load React JS


    }

    public function add_devicon_media_button(){
        //attach react app here
        wp_enqueue_script('hello-react', plugin_dir_url( __FILE__ ) . 'dist/output/index_bundle.js', array(), '1.0', true);
        echo '<div id="root"></div>';
    }

    //Handles both the view and parameters for the shortcode
    public function loadView($atts){

        $atts = shortcode_atts(
            array(
                'name' => 'Enter Name',
                'style' => 'Enter Color/Style',
                'colored' => 'false',
                'size' => 'm'
            ), $atts, 'test' );

        //Mapped technologies and their corresponding font styles
        $mapped = $this->mapDevicon($atts['name'], $atts['style']);

        //return '<i class="devicon-'.$mapped['name'].'-'.$mapped['style'] . ' ' . ($atts['colored'] == 'true' ? 'colored' : '') . '"></i>';

        // return 'bartag: ' . $atts['foo'] . ' ' . $atts['bar'];


        require(plugin_dir_path(__FILE__) . 'shortcode-view.php');
        //require_once(plugin_dir_path(__FILE__) . 'shortcode-view.php');
    }

    public function addEditorButtons(){
        add_filter('mce_external_plugins', array($this, 'devicons_add_buttons'));
        add_filter('mce_buttons', array($this, 'devicons_register_buttons'));
    }

    public function devicons_add_buttons($plugin_array){
        $plugin_array['devicons'] = plugins_url('devicons/public/editor-button.js');
        return $plugin_array;
    }

    public function devicons_register_buttons($buttons){
        array_push($buttons, 'devicons');
        return $buttons;
    }

    private function getDevicons(){

        //Get JSON file turn it into
        $json_devicons = file_get_contents(plugin_dir_path(__FILE__) . '../libs/devicon-master/devicon.json');

        if($json_devicons == true){
            //echo 'The File was read!';

            //Converted file into Associative array.
            $json_devicons = json_decode($json_devicons, true);

            return $json_devicons;

        }
        else{
            //Fetching File failed.
        }
    }

    private function mapDevicon($name, $style){

        //Compare name
        $json = $this->json_file;
        $mapped = [
            "name" => "",
            "style" => ""
        ];

        //Iterate through the JSON File to compare
        foreach ($json as $obj ) {
            if($obj['name'] == $name){
                //return $obj['name'];
                $mapped['name'] = $obj['name'];
                for($i = 0; $i < sizeof($obj['versions']['font']); $i++){
                    if($obj['versions']['font'][$i] == $style)
                        $mapped['style'] = $obj['versions']['font'][$i];
                }
                return $mapped;
            }
            else{
                //Failed To get file
                //Handle Error
            }
        }
    }
}