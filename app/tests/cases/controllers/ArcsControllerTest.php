<?php

namespace app\tests\cases\controllers;

use lithium\action\Request;
use li3_fixtures\test\Fixture;

use app\controllers\ArcsController;

class ArcsControllerTest extends \lithium\test\Unit {

    public function setUp() {
        $this->fixture = array(
            'workflow'   => Fixture::load('Workflow'),
            'place'      => Fixture::load('Workflow'),
            'transition' => Fixture::load('Workflow'),
        );

        $this->workflow = \app\models\Workflows::create();
    }

	public function tearDown() {}

    public function testAdd() {
        $this->workflow->save($this->fixture['workflow']->first());

        $place = $this->workflow->createPlace(
            $this->fixture['place']->first()
        );

        $transition = $this->workflow->createTransition(
            $this->fixture['transition']->first()
        );

        $data = array(
            'workflow_id' => $this->workflow->_id,
            'input' => array(
                'place_id'=> $place->_id
            ),
            'output' => array(
                'transition_id'  => $transition->_id
            )
        );

        $request = new Request();
        $request->data = $data;

        $controller = new ArcsController(compact('request'));

        $result = $controller->add();

        $this->assertTrue(
            $result['arc']->workflow_id           == $data['workflow_id'] &&
            $result['arc']->input->place_id       == $data['input']['place_id'] &&
            $result['arc']->output->transition_id == $data['output']['transition_id']
        );
    }
}

?>
