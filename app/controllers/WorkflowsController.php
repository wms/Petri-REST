<?php

namespace app\controllers;

use app\models\Workflows;
use lithium\action\DispatchException;

class WorkflowsController extends \lithium\action\Controller {

	public function index() {
		$workflows = Workflows::all();
		return compact('workflows');
	}

	public function view() {
		$workflow = Workflows::first($this->request->id);
		return compact('workflow');
	}

	public function add() {
		$workflow = Workflows::create();
		$result = $workflow->save($this->request->data);

		return compact('result', 'workflow');
	}

	public function edit() {
		$workflow = Workflows::find($this->request->id);

		if (!$workflow) {
            //exception
            return false;
		}

        if($result = $workflow->save($this->request->data)) {
            return compact('result', 'workflow');
        }
        else {
            $error = $workflow->errors();
            $workflow->enabled = false;
            $this->response->status(400);
            return compact('result', 'error', 'workflow');
        }
	}

	public function delete() {
		$result = Workflows::find($this->request->id)->delete();

        return compact('result');
    }
}

?>