<?php

namespace app\models;
use app\models\Workflows;
use \lithium\util\Validator;

class Place extends \lithium\data\Model {

    public $validates = array(
        'workflow_id' => array(
            array('workflowExists', 'message' => 'The Workflow specified does not exist.')
        )
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'workflow_id'   => array('type' => 'id', 'default' => false, 'null' => false)
    );

    public function countTokens($place) {
        return Tokens::find('all', array(
            'conditions' => array(
                'place_id'    => $place->_id,
                'workflow_id' => $place->workflow_id
            )
        ));
    }
}

Validator::add('workflowExists', function($value) {
    return Workflows::count(array(
        '_id' => $value
    ));
});

?>
