<?php

namespace app\controllers;

use app\models\Arc;
use lithium\action\DispatchException;

class ArcsController extends \lithium\action\Controller {

	public function index() {
        if(isset($this->request->params['workflow_id'])) {
            $conditions = array(
                'workflow_id' => $this->request->params['workflow_id']
            );
        }
		$arcs = Arc::all(compact('conditions'));

		return compact('arcs');
	}

	public function view() {
		$arc = Arc::first($this->request->id);
		return compact('workflow');
	}

	public function add() {
		$arc = Arc::create();
		$result = $arc->save($this->request->data);

		return compact('result', 'arc');
	}

	public function edit() {
		$arc = Arc::find($this->request->id);

		if (!$arc) {
            //exception
            return false;
		}

        if($result = $arc->save($this->request->data)) {
            return compact('result', 'arc');
        }
        else {
            $error = $arc->errors();
            $arc->enabled = false;
            $this->response->status(400);
            return compact('result', 'error', 'arc');
        }
	}

	public function delete() {
		$result = Arc::find($this->request->id)->delete();

        return compact('result');
    }
}

?>
