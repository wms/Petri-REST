<?php
use lithium\net\http\Router;
use lithium\core\Environment;

/**
 * Add the testing routes. These routes are only connected in non-production environments, and allow
 * browser-based access to the test suite for running unit and integration tests for the Lithium
 * core, as well as your own application and any other loaded plugins or frameworks. Browse to
 * [http://path/to/app/test](/test) to run tests.
 */
if (!Environment::is('production')) {
	Router::connect('/test/{:args}', array('controller' => 'lithium\test\Controller'));
	Router::connect('/test', array('controller' => 'lithium\test\Controller'));
}

Router::connect('/', 'Pages::view');

/**
 * RESTful routing.
 * @todo: Set type as json automatically and handle missing ids and POST data here
 * to prevent cluttering controllers
 */
Router::connect('/{:controller}', array(
    'http:method' => 'GET',
    'action' => 'index',
    'type' => 'json'
));
Router::connect('/{:controller}', array(
    'http:method' => 'POST',
    'action' => 'add',
    'type' => 'json'
));
Router::connect('/{:controller}/{:id:[0-9a-f]{24}}', array(
    'http:method' => 'GET',
    'action' => 'view',
    'type' => 'json'
));
Router::connect('/{:controller}/{:id:[0-9a-f]{24}}', array(
    'http:method' => 'PUT',
    'action' => 'edit',
    'type' => 'json'
));
Router::connect('/{:controller}/{:id:[0-9a-f]{24}}', array(
    'http:method' => 'DELETE',
    'action' => 'delete',
    'type' => 'json'
));

?>