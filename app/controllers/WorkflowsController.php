<?php

namespace app\controllers;

class WorkflowsController extends \lithium\action\Controller {
    public function index() {
        $workflows = array(
            array('name' => 'foo'),
            array('name' => 'bar')
        );

        return compact('workflows');
    }
}

?>