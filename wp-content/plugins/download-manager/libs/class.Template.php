<?php

namespace WPDM;


class Template
{
    public $Vars;

    function __construct(){
        return $this;
    }

    public static function Locate($file, $tpldir = ''){

        if(file_exists(get_stylesheet_directory().'/download-manager/'.$file))
            $path = get_stylesheet_directory().'/download-manager/'.$file;
        else if(file_exists(get_template_directory().'/download-manager/'.$file))
            $path = get_template_directory().'/download-manager/'.$file;
        else if($tpldir !='' && file_exists($tpldir.'/'.$file))
            $path = $tpldir.'/'.$file;
        else if($tpldir !='' && file_exists(get_template_directory().'/download-manager/'.$tpldir.'/'.$file))
            $path = get_template_directory().'/download-manager/'.$tpldir.'/'.$file;
        else $path = WPDM_BASE_DIR.'tpls/'.$file;

        return $path;

    }

    function Assign($var, $val){
        $this->Vars[$var] = $val;
        return $this;
    }

    function Fetch($template, $tpldir = ''){
        $template = self::Locate($template, $tpldir);
        extract($this->Vars);
        ob_start();
        include $template;
        return ob_get_clean();
    }

}