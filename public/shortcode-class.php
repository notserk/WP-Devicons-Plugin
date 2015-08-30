<?php

/**
 * Created by PhpStorm.
 * User: notserk
 * Date: 8/27/15
 * Time: 8:10 AM
 */
class Shortcode
{
    public function initialize(){
        //Load libs
        add_action('wp_enqueue_scripts', array($this, 'LoadDeviconsCSS'));

        //Register Shortcode
        add_shortcode('devicons', array($this, 'loadView'));

        //Add TinyMCE Buttons
        add_action('init', array($this, 'addEditorButtons'));
    }

    public function LoadDeviconsCSS(){
        wp_enqueue_style(
            'devicons-css',
            plugins_url('devicons-tinymce/libs/devicon-master/devicon.css'),
            array(),
            '0.1.0'
        );
    }

    public function loadView($atts){

        $atts = shortcode_atts(
            array(
                'name' => 'yo default'
            ), $atts, 'test' );

        // return 'bartag: ' . $atts['foo'] . ' ' . $atts['bar'];

        require_once(plugin_dir_path(__FILE__) . 'shortcode-view.php');
    }

    public function addEditorButtons(){
        add_filter('mce_external_plugins', array($this, 'devicons_add_buttons'));
        add_filter('mce_buttons', array($this, 'devicons_register_buttons'));
    }

    public function devicons_add_buttons($plugin_array){
        $plugin_array['devicons'] = plugins_url('devicons-tinymce/public/editor-button.js');
        return $plugin_array;
    }

    public function devicons_register_buttons($buttons){
        array_push($buttons, 'devicons');
        return $buttons;
    }

}