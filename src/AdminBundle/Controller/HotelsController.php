<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Angleto\BookingBundle\Entity\Hotel;
use Angleto\BookingBundle\Entity\HotelEn;
use Angleto\BookingBundle\Entity\Room;
use Angleto\BookingBundle\Entity\RoomEn;
use Angleto\BookingBundle\Entity\RoomGallery;
use Angleto\BookingBundle\Entity\RoomGalleryEn;

class HotelsController extends LangualController
{
    /**
     * @Route("/admin/hotels/{hotel}")
     * 
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getLang() == self::LANG_EN
            ? HotelEn::class    
            : Hotel::class
        );
        $hotel = $repo->findOneByType($request->get('hotel'));

        return $this->render('admin/hotel.twig.html', [
            'hotel' => $hotel,
        ]);
    }   

    /**
     * @Route("/admin/hotels/updateroom/{id}")
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function updateroom(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getLang() == self::LANG_EN
            ? RoomEn::class    
            : Room::class
        );

        $room = $repo->findOneById($request->get('id'));
        $room->setName($request->get('name') ?: '')
             ->setDescription($request->get('description') ?: '')
             ->setPrice($request->get('price'));

        $em->persist($room);
        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изменения успешно сохранены');
         
        return $this->redirect('/admin/hotels/' . $room->getHotel()->getType());
    }

    /**
     * @Route("/admin/hotels/rooms/uploadimage");
     *
     * @return Response
     */
    public function upload(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getLang() == self::LANG_EN
            ? RoomEn::class    
            : Room::class
        );
        $room = $repo->findOneById($request->get('id'));
        
        $image = $request->files->get('image');
        $webName = sprintf('/img/hotels/%s/%s', $room->getHotel()->getType(), $image->getClientOriginalName());
        $savePath = sprintf('%s/web/img/hotels/%s', $this->get('kernel')->getProjectDir(), $room->getHotel()->getType());
        $image->move($savePath, $image->getClientOriginalName());
        
        $image = $this->getLang() == self::LANG_EN
            ? new RoomGalleryEn
            : new RoomGallery;

        $image->setTitle($request->get('title'))
              ->setDescription($request->get('description'));

        $image->setImage($webName);
        $image->setRoom($room);
        $room->getImages()->add($image);

        $em->persist($room);
        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изображение успешно добавлено');
        
        return $this->redirect('/admin/hotels/' . $room->getHotel()->getType());
    }

    /**
     * @Route("/admin/hotels/destroyimage/{id}")
     * 
     * @return Response
     */
    public function destroyImage(Request $request)
    {   
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository($this->getLang() == self::LANG_EN
            ? RoomGalleryEn::class    
            : RoomGallery::class
        );
        $image = $repo->findOneById($request->get('id'));
        $room = $image->getRoom();
        $em->remove($image);

        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изображение успешно удалено');
        
        return $this->redirect('/admin/hotels/' . $room->getHotel()->getType());
    }
}