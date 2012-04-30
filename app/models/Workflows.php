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

    public static function createPlace($workflow, array $options = array()) {
        if($workflow->exists() && $options['place']) {
            if(gettype($options['place']) != 'array') {
                $options['place'] = $options['place']->to('array');
            }

            $options['place']['workflow_id'] = $workflow->_id;

            $place = Place::create($options['place']);
            $place->save();

            return $place;
        }
        return false;
    }

    public static function createTransition($workflow, array $options = array()) {
        if($workflow->exists() && $options['transition']) {
            if(gettype($options['transition']) != 'array') {
                $options['transition'] = $options['transition']->to('array');
            }

            $options['transition']['workflow_id'] = $workflow->_id;

            $transition = Transition::create($options['transition']);
            $transition->save();

            return $transition;
        }
        return false;
    }
}

?>
