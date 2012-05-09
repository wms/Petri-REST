<?php

namespace app\tests\cases\models;

use li3_fixtures\test\Fixture;

use app\models\Workflows;
use app\models\Cases;
use app\models\Transition;

class TransitionTest extends \lithium\test\Unit {

    /**
    * For each test, set up a Workflow with Start and Finish places, and insert a 
    * Transition under test between them connected with Arcs
     */
    public function setUp() {
        $this->fixture = array(
            'workflow'   => Fixture::load('Workflow'),
            'place'      => Fixture::load('Place'),
            'transition' => Fixture::load('Transition'),
            'arc'        => Fixture::load('Arc'),
            'case'       => Fixture::load('Case')
        );

        $this->workflow = Workflows::create();
        $this->workflow->save($this->fixture['workflow']->first());

        $this->inputPlace = $this->workflow->createPlace(
            $this->fixture['place']->first() + array(
                'is_start' => true
            )
        );

        $this->outputPlace = $this->workflow->createPlace(
            $this->fixture['place']->first()
        );

        $this->transition = $this->workflow->createTransition(
            $this->fixture['transition']->first()
        );

        $this->workflow->createArc(array(
            'input' => $this->inputPlace,
            'output' => $this->transition
        ));

        $this->workflow->createArc(array(
            'input' => $this->transition,
            'output' => $this->outputPlace
        ));
    }

    public function tearDown() {}

    /**
    * Test that we are able to get the Input Place for a transition
    */
    public function testGetInputPlace() {
        $this->assertEqual(
            $this->inputPlace->_id,
            $this->transition->getInputPlace()->_id
        );
    }

    /**
     * Test that a Transition is able to fire for an applicable Token 
     * specified by Case
     */
    public function testCanFireByCase() {
        $case = Cases::create();
        $case->save($this->fixture['case']->first());

        $this->workflow->startCase($case);

        $this->assertTrue(
            $this->transition->canFire(compact('case'))
        );
    }
    
    /**
     * Test that triggering a Workflow consumes the cases' Token from the Input 
     * Place specified by Case.
     */
    public function testInputTokenConsumptionByCase() {
        $case = Cases::create();
        $case->save($this->fixture['case']->first());

        $this->workflow->startCase($case);

        $this->transition->fire(compact('case'));

        $this->assertEqual(0, $this->inputPlace->countTokens()->count());
    }

    /**
     * Test that triggering a Workflow produces a Token in the Output
     * Place specified by Case.
     */
    public function testOutputTokenProductionByCase() {
        $case = Cases::create();
        $case->save($this->fixture['case']->first());

        $this->workflow->startCase($case);

        $this->transition->fire(compact('case'));

        $this->assertEqual(1, $this->outputPlace->countTokens()->count());
    }
}

?>
