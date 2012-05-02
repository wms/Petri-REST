<?php

namespace app\models;
use \lithium\util\Validator;

class Arc extends \lithium\data\Model {

    public $validates = array(
        'workflow_id' => array(
            array(
                'workflowExists',
                'message' => 'The Workflow specified does not exist.'
            )
        ),
        'output' => array(
            array(
                'differToInput',
                'message' => 'Input and Output connections must differ',
                'flatten' => false
            )
        )
    );

    protected $_schema = array(
        '_id'         => array('type' => 'id'),
        'workflow_id' => array('type' => 'id', 'default' => false, 'null' => false),
        'input'       => array('type' => 'array', 'default' => false, 'null' => false),
        'output'      => array('type' => 'array', 'default' => false, 'null' => false),
    );

    public static function __init(array $options = array()) {
        Validator::add('workflowExists', function($value) {
            return Workflows::count(array(
                '_id' => $value
            ));
        });

        Validator::add('differToInput', function($value, $format, $options) {
            $output_array_keys = array_keys($value);
            return !isset($options['values']['input.' . $output_array_keys[0]]);
        });

        parent::__init($options);
    }

    public function save($arc, $data = null, array $options = array()) {
        foreach(array('input', 'output') as $element) {
            if($data[$element]) {
                $data[$element] = static::_replaceElementWithId($data[$element]);
            }
        }

        return parent::save($arc, $data, $options);
    }

    private static function _replaceElementWithId($element) {
        if(is_object($element) && get_class($element) == "lithium\\data\\entity\\Document") {
            $type = static::_getElementType($element);

            return array(
                $type . '_id' => $element->_id
            );
        }
        return $element;
    }

    private static function _getElementType($element) {
        $matches = array();
        preg_match("/app\\\\models\\\\(.*)/", $element->model(), $matches);

        return strtolower($matches[1]);
    }
}


?>
