<?php

namespace app\controllers;

use app\models\Cases;
use lithium\action\DispatchException;

class CasesController extends \lithium\action\Controller {

	public function index() {
        if(isset($this->request->params['workflow_id'])) {
            $conditions = array(
                'workflow_id' => $this->request->params['workflow_id']
            );
        }
		$cases = Cases::all(compact('conditions'));

		return compact('cases');
	}

	public function view() {
		$case = Cases::first($this->request->id);
		return compact('workflow');
	}

	public function add() {
		$case = Cases::create();
		$result = $case->save($this->request->data);

		return compact('result', 'case');
	}

	public function edit() {
		$case = Cases::find($this->request->id);

		if (!$case) {
            //exception
            return false;
		}

        if($result = $case->save($this->request->data)) {
            return compact('result', 'case');
        }
        else {
            $error = $case->errors();
            $case->enabled = false;
            $this->response->status(400);
            return compact('result', 'error', 'case');
        }
	}

	public function delete() {
		$result = Cases::find($this->request->id)->delete();

        return compact('result');
    }
}

?>
