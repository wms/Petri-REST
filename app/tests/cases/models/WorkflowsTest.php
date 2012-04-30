<?php

namespace app\tests\cases\models;

use li3_fixtures\test\Fixture;

use app\models\Workflows;

class WorkflowsTest extends \lithium\test\Unit {

	public function setUp() {}

    /**
    * Test that a Workflow cannot be enabled when no start Place is set
    */
    public function testEnableWithNoStartPlace() {
        $fixture = Fixture::load('Workflow');

        $workflow = Workflows::create($fixture->first());

        $this->assertFalse($workflow->enable());
    }

    /**
     * Test that a Workflow will not create Places until it has been saved
     */
    public function testAddPlaceBeforeSave() {
        $fixture = array(
            'place'    => Fixture::load('Place'),
            'workflow' => Fixture::load('Workflow')
        );

        $workflow = Workflows::create($fixture['workflow']->first());

        $this->assertFalse(
            $workflow->createPlace(array('place' => $fixture['place']))
        );
    }

    /**
     * Test that a Workflow will create Places once it has been saved
     */
    public function testAddPlaceAfterSave() {
        $fixture = array(
            'place'    => Fixture::load('Place'),
            'workflow' => Fixture::load('Workflow')
        );

        $workflow = Workflows::create($fixture['workflow']->first());
        $workflow->save();

        $place = $workflow->createPlace(array('place' => $fixture['place']));

        $this->assertTrue($place->exists());
    }

    /**
     * Test that a Workflow will not create Transitions until it has been saved
     */
    public function testAddTransitionBeforeSave() {
        $fixture = array(
            'transition' => Fixture::load('Transition'),
            'workflow'   => Fixture::load('Workflow')
        );

        $workflow = Workflows::create($fixture['workflow']->first());

        $this->assertFalse(
            $workflow->createTransition(array('transition' => $fixture['transition']))
        );
    }

    /**
     * Test that a Workflow will create Transitions once it has been saved
     */
    public function testAddTransitionAfterSave() {
        $fixture = array(
            'transition' => Fixture::load('Transition'),
            'workflow'   => Fixture::load('Workflow')
        );

        $workflow = Workflows::create($fixture['workflow']->first());
        $workflow->save();

        $transition = $workflow->createTransition(array('transition' => $fixture['transition']));

        $this->assertTrue($transition->exists());
    }
}

?>
