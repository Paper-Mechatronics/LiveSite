<?php

/**
 * Class WPDM_Crypt
 * from wpdm pro v4.1.9
 */
class WPDM_Crypt
{

    public static function Encrypt($text)
    {

        if (is_array($text)) $text = serialize($text);

        $skey = substr(md5(SECURE_AUTH_KEY), 0, 16);

        if (function_exists('mcrypt_encrypt')) {

            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $skey, $text, MCRYPT_MODE_CBC, $iv);

            $ciphertext = base64_encode($iv . $ciphertext);

        } else
            $ciphertext = base64_encode($text);

        $ciphertext = str_replace(array('+', '/', '='), array('-', '_', ''), $ciphertext);
        $ciphertext = trim($ciphertext, '=');

        return $ciphertext;
    }

    public static function Decrypt($ciphertext)
    {

        $skey = substr(md5(SECURE_AUTH_KEY), 0, 16);


        if (function_exists('mcrypt_encrypt')) {
            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

            $ciphertext = str_replace(array('-', '_'), array('+', '/'), $ciphertext);

            $ciphertext = base64_decode($ciphertext);

            $iv_dec = substr($ciphertext, 0, $iv_size);

            $ciphertext_dec = substr($ciphertext, $iv_size);

            $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $skey, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

        } else
            $plaintext_dec = base64_decode($ciphertext);

        return maybe_unserialize(trim($plaintext_dec));


    }

} 