<?php

namespace app\tests\cases\models;

use li3_fixtures\test\Fixture;

use app\models\Workflows;

class PlaceTest extends \lithium\test\Unit {

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
    * Test that only one start Place may be set on a given workflow at one time
    */
    public function testOnlyOneStartPlaceInWorkflow() {
        $this->workflow->save($this->fixture['workflow']->first());

        $placeOne = $this->workflow->createPlace($this->fixture['place']->first());
        $placeTwo = $this->workflow->createPlace($this->fixture['place']->first());
        $data = array(
            'is_start' => true
        );

        $placeOne->save($data);

        $this->assertFalse($placeTwo->save($data));
    }
}

?>
