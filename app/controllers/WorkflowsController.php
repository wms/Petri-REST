<?php

namespace app\controllers;

class WorkflowsController extends \lithium\action\Controller {
    public function index() {
        return array(
            array('name' => 'foo'),
            array('name' => 'bar')
        );
    }
}

?>