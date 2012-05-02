<?php

namespace app\models;
use \lithium\util\Validator;

class Place extends \lithium\data\Model {

    public $validates = array(
        'workflow_id' => array(
			array('workflowExists', 'message' => 'The Workflow specified does not exist.'),
		),
		'is_start' => array(
			array('onlyOneInWorkflow', 'message' => 'Only one start Place may exist in a workflow')
		)
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
		'workflow_id'   => array('type' => 'id', 'default' => false, 'null' => false),
		'is_start'	=> array('type' => 'boolean', 'default' => false)
    );
}

Validator::add('workflowExists', function($value) {
    return Workflows::count(array(
        '_id' => $value
    ));
});

Validator::add('onlyOneInWorkflow', function($value, $format, $options) {
	if($value) {
		$count = Place::count(array(
			'conditions' => array(
                '_id' => array('$ne' => $options['values']['_id']),
				'workflow_id' => $options['values']['workflow_id'],
				'is_start' => true
			)
		));
		return !$count;
	}
	return true;
});

?>
