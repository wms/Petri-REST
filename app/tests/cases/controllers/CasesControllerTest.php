<?php

namespace app\tests\cases\controllers;

use lithium\action\Request;
use li3_fixtures\test\Fixture;

use app\controllers\CasesController;

class CasesControllerTest extends \lithium\test\Unit {

    public function setUp() {
        $this->fixture = array(
            'workflow'   => Fixture::load('Workflow'),
            'place'      => Fixture::load('Place'),
            'transition' => Fixture::load('Transition'),
            'case'       => Fixture::load('Case'),
        );

        $this->workflow = \app\models\Workflows::create();
        $this->workflow->save($this->fixture['workflow']->first());

        $this->place = $this->workflow->createPlace(
            $this->fixture['place']->first() + array(
                'is_start' => true
            )
        );

        $this->transition = $this->workflow->createTransition(
            $this->fixture['transition']->first()
        );

    }

	public function tearDown() {}

    public function testAdd() {
        $request = new Request();
        $request->data = $this->fixture['case']->first();
        $request->params = array(
            'workflow_id' => $this->workflow->_id
        );

        $controller = new CasesController(compact('request'));

        $result = $controller->add();

        $this->assertTrue(
            $result['case']->workflow_id == $this->workflow->_id
        );
    }
}

?>
