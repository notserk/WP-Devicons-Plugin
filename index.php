<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              krestonshirley.me
 * @since             1.0.0
 * @package           Devicons
 *
 * @wordpress-plugin
 * Plugin Name:       Devicons-TinyMCE
 * Plugin URI:        krestonshirley.me/devicons
 * Description:       Devicons allows for developers to display devicons beautifully on their site.
 * Version:           1.0.0
 * Author:            Kreston
 * Author URI:        krestonshirley.me
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       devicons
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

//Register Shortcode
require_once(plugin_dir_path(__FILE__) . 'public/shortcode-class.php');

$devicons = new Devicons();
$devicons->initialize();


