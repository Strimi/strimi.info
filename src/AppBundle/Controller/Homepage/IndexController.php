<?php

namespace AppBundle\Controller\Homepage;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller {

    public function indexAction() {
        return $this->render('AppBundle:Homepage:index.html.twig');
    }

}
