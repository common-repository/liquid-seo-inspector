<?php
/*
Plugin Name: LIQUID SEO Inspector
Plugin URI: https://lqd.jp/wp/plugin/seo-inspector.html
Description: Easily inspect metadata within web pages to visualize and find issues.
Author: LIQUID DESIGN Ltd.
Author URI: https://lqd.jp/wp/
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: liquid-seo-inspector
Version: 1.0.5
*/
/*  Copyright 2022 LIQUID DESIGN Ltd. (email : info@lqd.jp)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
	published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
*/

// ------------------------------------
// Plugin
// ------------------------------------

// get_option
$liquid_seo_toggle = get_option( 'liquid_seo_toggle' );

// plugin_action_links
function liquid_seo_plugin_action_links( $links ) {
	$mylinks = '<a href="'.admin_url( 'options-general.php?page=liquid-seo-inspector' ).'">'.__( 'Settings', 'liquid-seo-inspector' ).'</a>';
    array_unshift( $links, $mylinks);
    return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'liquid_seo_plugin_action_links' );

// ------------------------------------
// Admin
// ------------------------------------

// json
if ( is_admin() ) {
    $json_liquid_seo_error = "";
    $json_liquid_seo_url = "https://lqd.jp/wp/data/p/liquid-seo-inspector.json";
    $json_liquid_seo = wp_remote_get($json_liquid_seo_url);
    if ( is_wp_error( $json_liquid_seo ) ) {
        $json_liquid_seo_error = $json_liquid_seo->get_error_message().$json_liquid_seo_url;
    }else{
        $json_liquid_seo = json_decode($json_liquid_seo['body']);
    }
}

function liquid_seo_admin_init() {
	load_plugin_textdomain( 'liquid-seo-inspector', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'admin_init', 'liquid_seo_admin_init' );

function liquid_seo_admin() {
    add_options_page(
      'LIQUID SEO Inspector',
      'LIQUID SEO Inspector',
      'administrator',
      'liquid-seo-inspector',
      'liquid_seo_admin_page'
    );
    register_setting(
      'liquid_seo_group',
      'liquid_seo_toggle',
      'liquid_seo_toggle_validation'
    );
}
add_action( 'admin_menu', 'liquid_seo_admin' );

function liquid_seo_toggle_validation( $input ) {
     $input = (int) $input;
     if ( $input === 0 || $input === 1 ) {
          return $input;
     } else {
          add_settings_error(
               'liquid_seo_toggle',
               'liquid_seo_toggle_validation_error',
               __( 'illegal data', 'error' ),
               'error'
          );
     }
}

function liquid_seo_admin_page() {
     global $json_liquid_seo;
     $liquid_seo_toggle = get_option( 'liquid_seo_toggle' );
     if( empty( $liquid_seo_toggle ) ){
          $checked_on = 'checked="checked"';
          $checked_off = '';
     } else {
          $checked_on = '';
          $checked_off = 'checked="checked"';
     }
?>
<div class="wrap">
<h1>LIQUID SEO Inspector</h1>

<div id="poststuff">

<!-- Recommend -->
<?php if( !empty($json_liquid_seo->recommend_ttl) && !empty($json_liquid_seo->recommend_url) && !empty($json_liquid_seo->recommend_img) && !empty($json_liquid_seo->recommend_txt) ){ ?>
<div class="postbox">
<h2 style="border-bottom: 1px solid #eee;"><?php _e( 'Recommend', 'liquid-seo-inspector' ); ?></h2>
<div class="inside">
    <h3><?php echo esc_html($json_liquid_seo->recommend_ttl); ?></h3>
    <a href="<?php echo esc_url($json_liquid_seo->recommend_url); ?>" target="_blank"><img src="<?php echo esc_url($json_liquid_seo->recommend_img); ?>" alt="">
    <br><?php echo esc_html($json_liquid_seo->recommend_txt); ?></a>
</div>
</div>
<?php } ?>

<!-- Settings -->
<div class="postbox">
<h2 style="border-bottom: 1px solid #eee;"><?php _e( 'Settings', 'liquid-seo-inspector' ); ?></h2>
<div class="inside">
<form method="post" action="options.php">
<?php
     settings_fields( 'liquid_seo_group' );
     do_settings_sections( 'default' );
?>
<table class="form-table">
     <tbody>
     <tr>
          <th scope="row"><?php _e( 'Enable', 'liquid-seo-inspector' ); ?> LIQUID SEO Inspector</th>
          <td>
               <label for="liquid_seo_toggle_on"><input type="radio" id="liquid_seo_toggle_on" name="liquid_seo_toggle" value="0" <?php echo $checked_on; ?>>On</label>
               <label for="liquid_seo_toggle_off"><input type="radio" id="liquid_seo_toggle_off" name="liquid_seo_toggle" value="1" <?php echo $checked_off; ?>>Off</label>
          </td>
     </tr>
     </tbody>
</table>
<?php submit_button(); ?>
</form>
</div>
</div>

</div><!-- /poststuff -->
<hr><a href="https://lqd.jp/wp/" target="_blank">LIQUID PRESS</a>
</div><!-- /wrap -->
<?php }

// enqueue
function liquid_seo_scripts() {
    wp_enqueue_script( 'liquid-seo-inspector-js', plugins_url( 'js/seo.js', __FILE__ ), array( 'jquery', 'wp-i18n' ), false, true );
    wp_enqueue_style( 'liquid-seo-inspector-css', plugins_url( 'css/style.css', __FILE__ ), array() );
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations( 'liquid-seo-inspector-js', 'liquid-seo-inspector', plugin_dir_path( __FILE__ ) . 'languages' );
    }
}
function liquid_seo_enqueue() {
    if( current_user_can('editor') || current_user_can('administrator') ){
        add_action( 'wp_enqueue_scripts', 'liquid_seo_scripts' );
    }
}
if( empty( $liquid_seo_toggle ) && !is_admin() ){
    add_action('init', 'liquid_seo_enqueue');
}

// notices
function liquid_seo_admin_notices() {
    global $json_liquid_seo, $json_liquid_seo_error;
    if ( isset( $_GET['liquid_admin_notices_dismissed'] ) ) {
        set_transient( 'liquid_admin_notices', 'dismissed', 60*60*24*30 );
    }
    if( !empty($json_liquid_seo->news_url) && !empty($json_liquid_seo->news_txt) && get_transient( 'liquid_admin_notices' ) != 'dismissed' ){
        echo '<div class="notice notice-info" style="position: relative;"><p><a href="'.esc_url($json_liquid_seo->news_url).'" target="_blank">'.esc_html($json_liquid_seo->news_txt).'</a></p><a href="?liquid_admin_notices_dismissed" style="position: absolute; right: 10px; top: 10px;">&times;</a></div>';
    }
    if(!empty($json_liquid_seo_error)) {
        echo '<script>console.log("'.esc_html($json_liquid_seo_error).'");</script>';
    }
}
add_action( 'admin_notices', 'liquid_seo_admin_notices' );

?>