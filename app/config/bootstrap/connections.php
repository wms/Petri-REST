<?php
use lithium\data\Connections;

Connections::add('default', array(
    'development' => array(
        'type' => 'MongoDb',
        'host' => 'localhost',
        'database' => 'pr_dev'
    ),
    'test' => array(
        'type' => 'MongoDb',
        'host' => 'localhost',
        'database' => 'pr_test'
    )
));
?>
