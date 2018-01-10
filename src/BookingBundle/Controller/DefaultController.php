<?php

namespace Angleto\BookingBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Angleto\BookingBundle\Entity\Hotel;
use Angleto\BookingBundle\Entity\Options;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $hotelsRepo = $em->getRepository(Hotel::class);
        $optionsRepo = $em->getRepository(Options::class);

        $hotels = $hotelsRepo->findAll();
        $options = $optionsRepo->findAll();
        $jsonRepresentation = [
            'hotels' => [],
            'rooms' => [],
            'options' => [],
        ];
        foreach ($hotels as $hotel) {
            $jsonRepresentation['hotels'][$hotel->getId()] = [
                'name' => $hotel->getName(),
            ]; 
            foreach ($hotel->getRooms() as $room) {
                $jsonRepresentation['rooms'][$room->getId()] = [
                    'type' => $room->getType(),
                    'name' => $room->getName(),
                    'price' => $room->getPrice(),
                    'description' => $room->getDescription(),
                    'gallery' => [],
                ];
                foreach ($room->getImages() as $image) {
                    $jsonRepresentation['rooms'][$room->getId()]['gallery'][] = $image->getImage();
                }
            }
        }
        foreach ($options as $option) {
            $jsonRepresentation['options'][$option->getId()] = [
                'name' => $option->getName(),
                'price' => $option->getPrice(),
            ];
        }
        $jsonRepresentation = json_encode($jsonRepresentation);

        return $this->render('default/layout.html.twig', [
            'hotels' => $hotels,
            'options' => $options,
            'json' => $jsonRepresentation,
        ]);
    }
}
