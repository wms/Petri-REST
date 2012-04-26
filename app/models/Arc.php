<?php

namespace app\models;
use app\models\Workflows;
use \lithium\util\Validator;

class Arc extends \lithium\data\Model {

    public $validates = array(
        'workflow_id' => array(
            array('workflowExists', 'message' => 'The Workflow specified does not exist.')
        )
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'workflow_id'   => array('type' => 'id', 'default' => false, 'null' => false)
    );
}

Validator::add('workflowExists', function($value) {
    return Workflows::count(array(
        '_id' => $value
    ));
});

?>
