<?php

namespace app\models;

class Workflows extends \lithium\data\Model {

	public $validates = array();

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'enabled'   => array('type' => 'boolean', 'default' => false, 'null' => false)
    );
}

?>