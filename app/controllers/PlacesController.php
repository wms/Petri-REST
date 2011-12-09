<?php

namespace app\controllers;

use app\models\Place;
use lithium\action\DispatchException;

class PlacesController extends \lithium\action\Controller {

	public function index() {
		$places = Place::all();
		return compact('places');
	}

	public function view() {
		$place = Place::first($this->request->id);
		return compact('workflow');
	}

	public function add() {
		$place = Place::create();
		$result = $place->save($this->request->data);

		return compact('result', 'place');
	}

	public function edit() {
		$place = Place::find($this->request->id);

		if (!$place) {
            //exception
            return false;
		}

        if($result = $place->save($this->request->data)) {
            return compact('result', 'place');
        }
        else {
            $error = $place->errors();
            $place->enabled = false;
            $this->response->status(400);
            return compact('result', 'error', 'place');
        }
	}

	public function delete() {
		$result = Place::find($this->request->id)->delete();

        return compact('result');
    }
}

?>