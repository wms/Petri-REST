<?php

namespace app\tests\cases\models;

use li3_fixtures\test\Fixture;

use app\models\Arc;
use app\models\Workflows;

class ArcTest extends \lithium\test\Unit {

    public function setUp() {
        $this->workflow = Workflows::create();

        $this->fixture['workflow'] = Fixture::load('Workflow');
        $this->fixture['place'] = Fixture::load('Place');
        $this->fixture['transition'] = Fixture::load('Transition');
    }

	public function tearDown() {}

    /**
     * Test that an Arc cannot connect a Place to another Place
     */
    public function testPlaceToPlace() {
        $workflow = Workflows::create($this->fixture['workflow']->first());
        $workflow->save();

        $input_place = $workflow->createPlace($this->fixture['place']->first());

        $output_place = $workflow->createPlace($this->fixture['place']->first());

        $arc = $workflow->createArc(array(
            'input'  => $input_place,
            'output' => $output_place
        ));

        $this->assertFalse($arc);
    }

    /**
     * Test that an Arc can connect a Place to a Transition
     */
    public function testPlaceToTransition() {
        $workflow = Workflows::create($this->fixture['workflow']->first());
        $workflow->save();

        $input_place = $workflow->createPlace($this->fixture['place']->first());

        $output_transition = $workflow->createTransition($this->fixture['transition']->first());

        $arc = $workflow->createArc(array(
            'input'  => $input_place,
            'output' => $output_transition
        ));

        $this->assertTrue($arc && $arc->exists());
    }


}

?>
