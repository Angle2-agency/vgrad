<?php

namespace Angleto\BookingBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Angleto\BookingBundle\Entity\Hotel;
use Angleto\BookingBundle\Entity\Options;
use Angleto\BookingBundle\Entity\Order;

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

    /**
     * @Route("/book", name="book")
     */
    public function bookAction(Request $request)
    {
        $data = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
            'comment' => $request->get('comment'),
            'from' => $request->get('from'),
            'to'   => $request->get('to'),
            'basket' => $request->get('basket')
        ];
        $errors = [];
        foreach (['name', 'email', 'phone', 'from', 'to'] as $field) {
            if (empty($data[$field])) {
                $errors[] = $field;
            }
        }
        if ($data['email'] != filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'email';
        }
        if (empty($data['basket']['rooms'])) {
            $errors[] = 'basket';            
        }
        if (count($errors)) {
            return new JsonResponse([
                'errors' => $errors
            ]);
        }
        $order = new Order();
        $order->setName($data['name'])
              ->setEmail($data['email'])
              ->setPhone($data['phone'])
              ->setDateFrom(new \DateTime($data['from']))
              ->setDateTo(new \DateTime($data['to']))
              ->setBookingDetails(json_encode($data['basket']))
              ->setAmount($data['basket']['total']);
        $em = $this->getDoctrine()->getManager();
        $em->persist($order);
        $em->flush();

        $response = [
            'goto' => '/payment/' . $order->getId(),
        ];

        return new JsonResponse($response);
    }

    /**
     * 
     * @Route("/payment/{order}", name="payment")
     */
    public function paymentAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $ordersRepo = $em->getRepository(Order::class);
        $order = $ordersRepo->findOneById($request->get('order'));

        $key = 'ANQCAMCWUY';

        $data = base64_encode(json_encode(array(
            'amount' => number_format($order->getAmount(),2, '.', ''),
            'description' => 'Заказ номеров с - по',
            'currency' => 'UAH'
        )));
        $return = 'http://' . $request->getHost() . '/paid/' . $order->getId();
        $sign = md5(strtoupper(
            strrev($key).
            'CC'.
            strrev($data).
            strrev($return).
            strrev('fpDFKy9anC9t0vudb0Z4v4CPnbbWnMvs')
        ));

        return $this->render('default/payment-form.html.twig', [
            'key' => $key,
            'url' => $return,
            'data' => $data,
            'sign'  => $sign,
        ]);
    }

    /**
     * @Route("/paid/{order}", name="paid")
     */
    public function paid(Request $request)
    {
        die('frv yng');
    }
}
