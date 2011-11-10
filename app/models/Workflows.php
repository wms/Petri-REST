<?php

namespace app\models;
use \lithium\util\Validator;

class Workflows extends \lithium\data\Model {

    public $validates = array(
        'enabled' => array(
            array('hasStart', 'message' => 'This Workflow cannot be enabled until a Start node is added.')
        )
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'enabled'   => array('type' => 'boolean', 'default' => false, 'null' => false)
    );

    public static function __init(array $options = array()) {
        Validator::add('hasStart', function($value) {
            if($value) {
                return false;
            }
            return true;
        });

        parent::__init($options);
    }
}

?>