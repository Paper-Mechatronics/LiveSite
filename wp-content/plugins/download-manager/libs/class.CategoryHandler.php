<?php
namespace WPDM\libs;

class CategoryHandler {

    public static function  GetAllowedRoles( $term_id ){
        $MetaData = get_option( "__wpdmcategory" );
        $MetaData = maybe_unserialize($MetaData);
        return isset($MetaData[$term_id])?$MetaData[$term_id]['access']:array();
    }

    public static function CategoryParents($cid, $offset = 1){
        $CategoryBreadcrumb = array();
        if($cid > 0) {
            $cat = get_term($cid, 'wpdmcategory');
            $parent = $cat->parent;
            $CategoryParents[] = $cat->term_id;
            while ($parent > 0) {
                $cat = get_term($parent, 'wpdmcategory');
                $CategoryParents[] = $cat->term_id;
                $parent = $cat->parent;
            }
            if($offset)
                array_pop($CategoryBreadcrumb);
            $CategoryParents = array_reverse($CategoryParents);
        }

        return $CategoryParents;

    }

    public static function CategoryBreadcrumb($cid, $offset = 1){
        $CategoryBreadcrumb = array();
        if($cid > 0) {
            $cat = get_term($cid, 'wpdmcategory');
            $parent = $cat->parent;
            $CategoryBreadcrumb[] = "<a href='#' class='folder' data-cat='{$cat->term_id}'>{$cat->name}</a>";
            while ($parent > 0) {
                $cat = get_term($parent, 'wpdmcategory');
                $CategoryBreadcrumb[] = "<a href='#' class='folder' data-cat='{$cat->term_id}'>{$cat->name}</a>";
                $parent = $cat->parent;
            }
            if($offset)
            array_pop($CategoryBreadcrumb);
            $CategoryBreadcrumb = array_reverse($CategoryBreadcrumb);
        }
        echo "<a href='#' class='folder' data-cat='0'>Home</a>&nbsp; <i class='fa fa-angle-right'></i> &nbsp;".implode("&nbsp; <i class='fa fa-angle-right'></i> &nbsp;", $CategoryBreadcrumb);

    }



}

