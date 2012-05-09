<?php

namespace app\models;
use app\models\Workflows;
use \lithium\util\Validator;

class Transition extends \lithium\data\Model {

    public $validates = array(
        'workflow_id' => array(
            array('workflowExists', 'message' => 'The Workflow specified does not exist.')
        )
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'workflow_id'   => array('type' => 'id', 'default' => false, 'null' => false)
    );

    /**
     * Return the Input Place for a Transition
     */
    public function getInputPlace($transition) {
        $arc = Arc::find('first', array(
            'conditions' => array(
                'workflow_id' => $transition->workflow_id,
                'output.transition_id' => $transition->_id
            )
        ));

        return Place::find('first', array(
            'conditions' => array(
                '_id' => $arc->input->place_id
            )
        ));
    }

    /**
     * Return the Output Place for a Transition
     */
    public function getOutputPlace($transition) {
        $arc = Arc::find('first', array(
            'conditions' => array(
                'workflow_id' => $transition->workflow_id,
                'input.transition_id' => $transition->_id
            )
        ));

        return Place::find('first', array(
            'conditions' => array(
                '_id' => $arc->output->place_id
            )
        ));
    }

    /**
    * Determine if a Transition can fire for a given case. If it can, return the 
    * token that will be consumed.
    */
    public function canFire($transition, array $options = array()) {
        if($options['case']) {
            return Tokens::find('first', array(
                'conditions' => array(
                    'workflow_id' => $transition->workflow_id,
                    'place_id'    => $transition->getInputPlace()->_id,
                    'case_id'     => $options['case']->_id
                )
            ));
        }
        return false;
    }

    /**
     * Fire a Transition for a given case. Consume the approriate token from the 
     * Input place and create a new token at the Output place.
     */
    public function fire($transition, array $options = array()) {
        if($token = $transition->canFire($options)) {
            if($token->delete()) {
                // @todo: refactor into Place::createToken()
                $data = array(
                    'workflow_id' => $transition->workflow_id,
                    'place_id'    => $transition->getOutputPlace()->_id,
                    'case_id'     => $options['case']->_id
                );

                $token = Tokens::create();
                $token->save($data);

                return $token;
            }
        }
        return false;
    }
}

Validator::add('workflowExists', function($value) {
    return Workflows::count(array(
        '_id' => $value
    ));
});
 

?>
