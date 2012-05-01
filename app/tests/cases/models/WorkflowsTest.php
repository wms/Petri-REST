<?php

namespace app\tests\cases\models;

use li3_fixtures\test\Fixture;

use app\models\Workflows;

class WorkflowsTest extends \lithium\test\Unit {

    public function setUp() {
        $this->workflow = Workflows::create();

        $this->fixture = array(
            'workflow'   => Fixture::load('Workflow'),
            'place'      => Fixture::load('Place'),
            'transition' => Fixture::load('Transition'),
            'arc'        => Fixture::load('Arc')
        );
    }

    /**
    * Test that a Workflow cannot be enabled when no start Place is set
    */
    public function testEnableWithNoStartPlace() {
        $fixture = Fixture::load('Workflow');

        $this->workflow->save($this->fixture['workflow']->first());

        $this->assertFalse($this->workflow->enable());
    }

    /**
     * Test that a Workflow will not create Places until it has been saved
     */
    public function testAddPlaceBeforeSave() {
        $place = $this->workflow->createPlace($this->fixture['place']->first());
        $this->assertFalse($place);
    }

    /**
     * Test that a Workflow will create Places once it has been saved
     */
    public function testAddPlaceAfterSave() {
        $this->workflow->save($this->fixture['workflow']->first());

        $place = $this->workflow->createPlace($this->fixture['place']->first());

        $this->assertTrue($place && $place->exists());
    }

    /**
     * Test that a Workflow will not create Transitions until it has been saved
     */
    public function testAddTransitionBeforeSave() {
        $transition = $this->workflow->createTransition($this->fixture['transition']->first());

        $this->assertFalse($transition);
    }

    /**
     * Test that a Workflow will create Transitions once it has been saved
     */
    public function testAddTransitionAfterSave() {
        $this->workflow->save($this->fixture['workflow']->first());

        $transition = $this->workflow->createTransition($this->fixture['transition']->first());

        $this->assertTrue($transition && $transition->exists());
    }

    /**
     * Test that a Workflow will not create an Arc until it has been saved
     */
    public function testAddArcBeforeSave() {
        $arc = $this->workflow->createArc($this->fixture['arc']->first());

        $this->assertFalse($arc);
    }

    /**
     * Test that a Workflow will create Arcs once it has been saved
     */
    public function testAddArcAfterSave() {
        $this->workflow->save($this->fixture['workflow']->first());

        $place = $this->workflow->createPlace($this->fixture['place']->first());
        $transition = $this->workflow->createTransition($this->fixture['transition']->first());

        $arc = $this->workflow->createArc(
            $this->fixture['arc']->first() + array(
                'input' => $place,
                'output' => $transition
            )
        );

        $this->assertTrue($arc && $arc->exists());
    }
}

?>
