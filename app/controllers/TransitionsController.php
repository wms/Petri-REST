<?php

namespace app\controllers;

use app\models\Transition;
use lithium\action\DispatchException;

class TransitionsController extends \lithium\action\Controller {

	public function index() {
        if(isset($this->request->params['workflow_id'])) {
            $conditions = array(
                'workflow_id' => $this->request->params['workflow_id']
            );
        }
		$transitions = Transition::all(compact('conditions'));

		return compact('transitions');
	}

	public function view() {
		$transition = Transition::first($this->request->id);
		return compact('workflow');
	}

	public function add() {
		$transition = Transition::create();
		$result = $transition->save($this->request->data);

		return compact('result', 'transition');
	}

	public function edit() {
		$transition = Transition::find($this->request->id);

		if (!$transition) {
            //exception
            return false;
		}

        if($result = $transition->save($this->request->data)) {
            return compact('result', 'transition');
        }
        else {
            $error = $transition->errors();
            $transition->enabled = false;
            $this->response->status(400);
            return compact('result', 'error', 'transition');
        }
	}

	public function delete() {
		$result = Transition::find($this->request->id)->delete();

        return compact('result');
    }
}

?>
