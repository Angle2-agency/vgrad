<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Angleto\BookingBundle\Entity\Subscriber;

class SubscribersController extends LangualController
{   
    /**
     * @Route("/admin/subscribers")
     * 
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(Subscriber::class);

        $list = $repo->findAll();

        return $this->render('admin/subscribers.twig.html', [
            'list' => $list,
            'lang' => $this->getLang()
        ]);
    }
}