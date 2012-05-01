<?php

namespace app\models;
use \lithium\util\Validator;

class Workflows extends \lithium\data\Model {

    public $validates = array(
        'enabled' => array(
            array('hasStart', 'message' => 'This Workflow cannot be enabled until a Start Place is defined.')
        )
    );

    protected $_schema = array(
        '_id'       => array('type' => 'id'),
        'enabled'   => array('type' => 'boolean', 'default' => false, 'null' => false)
    );

    public static function __init(array $options = array()) {
        Validator::add('hasStart', function($value, $format, $options) {
            if($value) {
                return isset($options['values']['start_place_id']);
            }
            return true;
        });

        parent::__init($options);
    }

    public static function enable($workflow) {
        return $workflow->save(array(
            'enabled' => true
        ));
    }

    public static function createPlace($workflow, $place, array $options = array()) {
        if($workflow->exists()) {
            $place['workflow_id'] = $workflow->_id;

            $newPlace = Place::create($place);

            if($newPlace->save()) {
                return $newPlace;
            }
        }
        return false;
    }

    public static function createTransition($workflow, $transition, array $options = array()) {
        if($workflow->exists()) {
            $transition['workflow_id'] = $workflow->_id;

            $newTransition = Transition::create($transition);

            if($newTransition->save()) {
                return $newTransition;
            }
        }
        return false;
    }

    public static function createArc($workflow, $arc = null, array $options = array()) {
        if($workflow->exists()) {
            $arc['workflow_id'] = $workflow->_id;

            $newArc = Arc::create($arc);

            if($newArc->save($arc)) {
                return $newArc;
            }
        }
        return false;
    }
}

?>
