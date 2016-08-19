<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'papermec_migrate');

/** MySQL database username */
define('DB_USER', 'papermec_admin');

/** MySQL database password */
define('DB_PASSWORD', '10characterslong?');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'IjmTXfy*.qu+6A+;2LTX,3BUYfMUXry$jqu<{3^.{EIQ>04NUY3MUYrvQjrv>0n^');
define('SECURE_AUTH_KEY',  '7UAEMfjqXbi$*<fj$,>B$^37FY37FYbjQUbuy^Ycvz!4vz}08R}0JNUnFMgjr,RVo');
define('LOGGED_IN_KEY',    'h+hl~#]w-_59H*.6DHa69TaexSWpx+;lt#]DLu<2MT{ELPXqHbim*<ex+.6An^,{');
define('NONCE_KEY',        '-k~![hlt#]DKOWDHOhltZhl~_aim*<]x*.69H;69SWeLSWpt+7EIbjnTbfy^.qy$');
define('AUTH_SALT',        'Datxdlp_]:-_#9DW15CWZh9DLei+Wei+*2tx]25O];HLSl26PXbuPTaux{mq.];H*');
define('SECURE_AUTH_SALT', 'lds#Pex+;l+;2L_59Si9SWptLPiy+im*;2*.2LP69TWmtIbfy$fy$3*6AT{EIbf3');
define('LOGGED_IN_SALT',   'kgks![wz!48N#]1KO5DGOhpSZdl~_ow-:19x+_69S;29SaeKOhpt#hl~_]Dqu<{EL');
define('NONCE_SALT',       'o|[k@![CK!gCGZgk@GOhlt#dl~_5D-_59SZ18RVos9Saex*Wpx+;2t#]1KO]DKOhp');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
define('FS_METHOD', 'direct');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
