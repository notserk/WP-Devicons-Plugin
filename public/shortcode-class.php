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

        //Add media button
        add_action('media_buttons', array($this, 'add_devicon_media_button'));
    }

    //Load all necessary CSS files
    public function LoadDeviconsCSS(){
        wp_enqueue_style(
            'devicons-css', 'https://cdn.rawgit.com/konpa/devicon/68b52f74/devicon.min.css',
            array(),
            '0.1.0'
        );
    }

    public function add_devicon_media_button(){
        //attach react app here
        wp_enqueue_script('devicons-js', plugin_dir_url( __FILE__ ) . 'js/output/index_bundle.js', array(), '1.0', true);
        wp_enqueue_style('devicon-min-css', 'https://cdn.rawgit.com/konpa/devicon/68b52f74/devicon.min.css', array(), '1.0');
        echo '<div id="root"></div>';
    }

    //Handles both the view and parameters for the shortcode
    public function loadView($atts){

        $shortcode_atts = shortcode_atts(
            array(
                'name' => 'Enter Name',
                'style' => 'Enter Color/Style',
                'colored' => 'false',
                'size' => 'm'
            ), $atts, 'devicons' );

        //Mapped technologies and their corresponding font styles
        //$mapped = $this->mapDevicon($atts['name'], $atts['style']);




        require(plugin_dir_path(__FILE__) . 'shortcode-view.php');
    }

    private function getDevicons(){

        //Get JSON file turn it into
        $json_devicons = file_get_contents(plugin_dir_path(__FILE__) . '../libs/devicon-master/devicon.json');

        if($json_devicons == true){

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
            if($obj['name'] === $name){

                $mapped['name'] = $obj['name'];

                for($i = 0; $i < sizeof($obj['versions']['font']); $i++){
                    if($obj['versions']['font'][$i] === $style)
                        $mapped['style'] = $obj['versions']['font'][$i];
                }
                return $mapped;
            }
            else{

            }
        }
    }
}