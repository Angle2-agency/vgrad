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

use AdminBundle\Entity\ContentBlock;

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
        $blocksRepo = $em->getRepository(ContentBlock::class);

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

        $order = $decodedBasket = null;
        if ($orderid = $request->get('ordered')) {
            $ordersRepo = $em->getRepository(Order::class);

            $order = $ordersRepo->findOneById($orderid);
            $decodedBasket = json_decode($order->getBookingDetails(), true);
        }
        $formedBlocks = [];
        $blocks = $blocksRepo->findAll();
        foreach ($blocks as $block) {
            $formedBlocks[$block->getIdentifier()] = $block;
        }
        return $this->render('default/layout.html.twig', [
            'hotels' => $hotels,
            'options' => $options,
            'json' => $jsonRepresentation,
            'order' => $order,
            'basket' => $decodedBasket,
            'blocks' => $formedBlocks,
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
              ->setComment($data['comment'])
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

        $key = 'Q4C5UNYD8V';

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
            strrev('trGpWczHJYtU87bq76u4unE7A18ccFua')
        ));

        return $this->render('default/payment-form.html.twig', [
            'key' => $key,
            'url' => $return,
            'data' => $data,
            'sign'  => $sign,
        ]);
    }

    /**
     * @Route("/paid/{orderid}", name="paid")
     */
    public function paid(Request $request)
    {
        $order = $request->get('orderid');
        $payment = $request->get('order');

        $em = $this->getDoctrine()->getManager();
        $ordersRepo = $em->getRepository(Order::class);
        $order = $ordersRepo->findOneById($order);
        
        $order->setPaymentId($payment)
              ->setStatus(Order::STATUS_PAID);

        $em->persist($order);
        $em->flush();

        $this->sendEmailToCustomer($order->getEmail(), $order);
        $this->sendEmailToAdmin($order);

        return $this->redirect('/?ordered=' . $order->getId());
    }

    private function sendEmailToCustomer($email, $order)
    {
        $transport = \Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
                      ->setUsername('vyshegradhotel@gmail.com')
                      ->setPassword('fj9_i93jsnAc');
        $mailer = \Swift_Mailer::newInstance($transport);
        $name = $order->getName();
        $onum = $order->getPaymentId();

        $rooms = '';

        $details = json_decode($order->getBookingDetails(), true);
        foreach ($details['rooms'] as $room) {
            $rooms .= 'Категория номера - ' . $room['room']['name'] . '(' . $room['qty'] . ')<br/>';
            $rooms .= 'Тип кровати - ' . $room['bed'] . '<br/>';
            $rooms .= 'Стоимость номера - ' . $room['room']['price'] . 'грн. (' . $room['room']['price'] . ' * ' . $details['nights'] . ' = ' . ($room['room']['price'] * $details['nights'] * $room['qty']) . 'грн.) <br/>';
            $opts = [];
            $optsTotal = 0;
            foreach (@$room['options'] ?: [] as $option) {
                $opts[] = $option['name'];
                $optsTotal += $option['price'];
            }
            if (count($opts)) {
                $rooms .= 'Дополнительные опции - ' . join(', ', $opts). '<br/>';
                $rooms .= 'Стоимость доп. опций - ' . $optsTotal . 'грн. <br/>';
            }
            $rooms .= 'Итого за номер - ' . (($room['room']['price'] * $room['qty']) + $optsTotal) . 'грн. <br/>';
            $rooms .= '<hr/>';
        }

        $body = <<<EOM
Уважаемый, {$name} <br />
Спасибо за Ваш выбор! <br />
Ваша бронь: {$onum} <br />
В ближайшее время с вами свяжется администратор <br />
гостиничного комплекса.<br />
<br />
<br />
Данные по заказу: <br/>
{$rooms}
-- <br />
Администрация комплекса Vyshegrad <br />
EOM;

        $message = (new \Swift_Message('Бронь на сайте комплекса Vyshegrad'))
                ->setFrom('vyshegradhotel@gmail.com')
                ->setTo($email)
                ->setBody($body, 'text/html');

        $mailer->send($message);
    }

    private function sendEmailToAdmin($order)
    {
        $transport = \Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
                      ->setUsername('vyshegradhotel@gmail.com')
                      ->setPassword('fj9_i93jsnAc');
        $mailer = \Swift_Mailer::newInstance($transport);
        $name = $order->getName();
        $phone = $order->getPhone();
        $email = $order->getEmail();
        $dateFrom = $order->getDateFrom()->format('d-m-Y');
        $dateTo = $order->getDateTo()->format('d-m-Y');
        $total = $order->getAmount();

        $rooms = '';

        $details = json_decode($order->getBookingDetails(), true);
        foreach ($details['rooms'] as $room) {
            $rooms .= 'Категория номера - ' . $room['room']['name'] . '(Кол-во номеров:' . $room['qty'] . ')<br/>';
            $rooms .= 'Тип кровати - ' . $room['bed'] . '<br/>';
            $rooms .= 'Стоимость номера - ' . $room['room']['price'] . 'грн. (' . $room['room']['price'] . ' x ' . $room['qty'] . ' x ' . $details['nights'] . ' ночей = ' . ($room['room']['price'] * $details['nights'] * $room['qty']) . 'грн.) <br/>';
            $opts = [];
            $optsTotal = 0;
            foreach (@$room['options'] ?: [] as $option) {
                $opts[] = $option['name'];
                $optsTotal += $option['price'];
            }
            if (count($opts)) {
                $rooms .= 'Дополнительные опции - ' . join(', ', $opts). '<br/>';
                $rooms .= 'Стоимость доп. опций - ' . $optsTotal . 'грн. <br/>';
            }
            $rooms .= 'Итого за номер - ' . (($room['room']['price'] * $room['qty']) + $optsTotal) . 'грн. <br/>';
            $rooms .= '<hr/>';
        }
        $comment = $order->getComment();
        $body = <<<EOM
ФИО гостя - {$name} <br/>
Номер телефона - {$phone} <br/>
Email - {$email} <br/>
{$rooms} <br/>

Комментарий клиента - {$comment}
Дата заезда - {$dateFrom} </br>
Дата выезда - {$dateTo} <br/>
<br/>
Общая сумма {$total} грн.<br/>
EOM;

        $message = (new \Swift_Message('Бронь на сайте #' . $order->getId()))
                ->setFrom('vyshegradhotel@gmail.com')
                ->setTo('hotelvyshegrad@ukr.net')
                ->setBcc('novikovbh@gmail.com')
                ->setBody($body, 'text/html');

        $mailer->send($message);
    }

}